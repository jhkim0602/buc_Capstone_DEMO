import time
import os
import json
from firecrawl import FirecrawlApp
import google.generativeai as genai
from loguru import logger
from src.shared.config import GEMINI_API_KEY

# Initialize Firecrawl
FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY")

def get_firecrawl_client():
    if not FIRECRAWL_API_KEY:
        logger.warning("⚠️ FIRECRAWL_API_KEY is missing.")
        return None
    return FirecrawlApp(api_key=FIRECRAWL_API_KEY)

def scrape_url_content(url: str):
    """
    Uses Firecrawl to scrape the given URL and return Markdown content.
    """
    client = get_firecrawl_client()
    if not client:
        return None

    try:
        # Scrape only proper content
        # Firecrawl v1 uses .scrape()
        scrape_result = client.scrape(url, formats=['markdown'])
        
        # Handle object or dict response
        if isinstance(scrape_result, dict):
            return scrape_result.get('markdown', '')
        elif hasattr(scrape_result, 'markdown'):
            return scrape_result.markdown
        else:
            logger.warning(f"⚠️ Unexpected Firecrawl response format for {url}")
            return str(scrape_result)

    except Exception as e:
        logger.error(f"❌ Firecrawl failed for {url}: {e}")
        return None

def process_job_with_gemini(job_title: str, company: str, raw_markdown: str):
    """
    Uses Gemini to summarize the job posting and extract structured data.
    Returns: JSON Object with fields
    """
    if not GEMINI_API_KEY:
        logger.warning("⚠️ GEMINI_API_KEY is missing.")
        return None

    genai.configure(api_key=GEMINI_API_KEY)
    # Using 2.0-flash as initially intended or 1.5 depending on availability, defaulting to stable fast model
    model = genai.GenerativeModel("gemini-2.0-flash") 

    truncated_md = raw_markdown[:30000]

    prompt = f"""
    You are an expert IT Recruiter. Analyze the following Job Posting and extract structured data.
    
    Job Title: {job_title}
    Company: {company}
    
    Raw Content:
    {truncated_md}
    
    Task:
    Extract the following fields into a pure JSON object (Language: Korean):
    1. **summary**: A 2-3 sentence professional summary of the position.
    2. **responsibilities**: List of main tasks (Major duties).
    3. **qualifications**: List of mandatory requirements (Skills, Experience).
    4. **preferred**: List of preferred qualifications (Nice-to-haves).
    5. **benefits**: List of company benefits and perks.
    6. **tags**: List of technical skills, languages, frameworks, and tools (e.g. 'React', 'Python', 'AWS').

    Output JSON Format:
    {{
      "summary": "String...",
      "responsibilities": ["Task 1", "Task 2"],
      "qualifications": ["Req 1", "Req 2"],
      "preferred": ["Pref 1", "Pref 2"],
      "benefits": ["Benefit 1", "Benefit 2"],
      "tags": ["Tag1", "Tag2"]
    }}
    """

    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
            data = json.loads(response.text)
            
            # Safely handle if AI returns a list [ {...} ] instead of { ... }
            if isinstance(data, list):
                if len(data) > 0 and isinstance(data[0], dict):
                    return data[0]
                return {} # Invalid format
            
            return data
        except Exception as e:
            logger.error(f"❌ Gemini attempt {attempt+1} failed: {e}")
            time.sleep(5) # Increased retry wait
            
    return None

def deep_crawl_job(job):
    """
    Orchestrates scraping and processing for a single job.
    """
    logger.info(f"🕵️ Deep Crawling: {job.company} - {job.title}")
    
    # 1. Scrape (Firecrawl)
    raw_md = scrape_url_content(job.link)
    
    if not raw_md or len(raw_md) < 50:
        logger.warning(f"   ⚠️ Content too short or failed for {job.id}")
        return job
    
    # Ratelimit - Increased to 10s to avoid 429 Resource Exhausted
    time.sleep(10) 

    # 2. Process (Gemini)
    result = process_job_with_gemini(job.title, job.company, raw_md)
    
    if result and isinstance(result, dict):
        # Populate new fields
        job.summary = result.get("summary", "")
        job.responsibilities = result.get("responsibilities", [])
        job.qualifications = result.get("qualifications", [])
        job.preferred = result.get("preferred", [])
        job.benefits = result.get("benefits", [])
        
        # Tags merge
        extracted_tags = result.get("tags", [])
        current_tags = set(job.tags)
        for t in extracted_tags:
            current_tags.add(t)
        job.tags = list(current_tags)
        
        # Legacy Content Field 
        # For compatibility, if summary exists, maybe prepend it or just keep raw
        if job.summary:
            job.content = f"## Summary\n{job.summary}\n\n" + raw_md[:3000]
        else:
            job.content = raw_md[:5000]
        
        logger.info(f"   ✅ Processed: {job.title} (R:{len(job.responsibilities)}, Q:{len(job.qualifications)})")
    
    return job
