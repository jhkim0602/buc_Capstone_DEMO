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
    Uses Gemini to summarize the job posting and extract tech tags.
    Returns: { "content_markdown": str, "tags": List[str] }
    """
    if not GEMINI_API_KEY:
        logger.warning("⚠️ GEMINI_API_KEY is missing.")
        return {
            "content_markdown": "## 안내\n\nAPI 키가 설정되지 않아 상세 내용을 불러올 수 없습니다.",
            "tags": []
        }

    genai.configure(api_key=GEMINI_API_KEY)
    
    # Switching to Flash Lite for potentially better free tier availability
    model = genai.GenerativeModel("gemini-2.0-flash")

    # Limit chars to avoid token limits (Saramin details can be long)
    truncated_md = raw_markdown[:20000]

    prompt = f"""
    You are an expert IT Recruiter. Your task is to analyze a raw job posting and transform it into a structured, professional technical document for developers, and extract key technology tags.

    Job Title: {job_title}
    Company: {company}
    
    Raw Content (Markdown):
    {truncated_md}
    
    Task:
    1. **Summarize & Structure**: Rewrite the content into a clean, minimalist Markdown format.
    2. **Extract Tags**: Identify specific programming languages, frameworks, tools, and cloud services mentioned or implied (e.g., 'React', 'Python', 'AWS', 'Docker').
    
    Guidelines:
    - **Language**: Korean (한국어).
    - **Tone**: Professional, Clean, Minimalist (Like official technical documentation).
    - **STRICTLY NO EMOJIS**: Do NOT use emojis in headers, lists, or text (e.g., no 🚀, 🛠, 🎁).
    - **Formatting**:
        - Use **Tables** for 'Tech Stack' allowing easy comparison.
        - Use **Blockquotes** for 'Company Introduction'.
        - Use **Bold** for emphasis on key skills.

    Required Markdown Structure:
    
    > **Company Introduction**
    > [Brief introduction]

    ## 주요 업무 (Responsibilities)
    - [List of main tasks as bullet points]
    
    ## 자격 요건 (Qualifications)
    - [List of requirements as bullet points]
    
    ## 우대 사항 (Preferred Qualifications)
    - [List of preferred skills as bullet points]
    
    ## 기술 스택 (Tech Stack)
    | Category | Stacks |
    |----------|--------|
    | Languages | [List] |
    | Frameworks| [List] |
    | Tools     | [List] |
    
    ## 혜택 및 복지 (Benefits)
    - [List benefits]
    
    ## 기타 정보
    - [Any other relevant info]

    Output Format (JSON):
    {{
        "content_markdown": "Full structured markdown string...",
        "tags": ["Tag1", "Tag2", "Tag3"]
    }}
    """

    max_retries = 3 
    
    for attempt in range(max_retries):
        try:
            response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
            result = json.loads(response.text)
            return result
        except Exception as e:
            logger.error(f"❌ Gemini attempt {attempt+1} failed: {e}")
            time.sleep(2)
            
    # FALLBACK (Simple Guide Message)
    logger.warning("⚠️ AI verification failed after retries.")
    return {
        "content_markdown": "## ⚠️ 안내\n\n상세 내용을 분석하는 중 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.",
        "tags": []
    }

def deep_crawl_job(job):
    """
    Orchestrates scraping and processing for a single job.
    Returns the updated job object or None if failed.
    """
    logger.info(f"🕵️ Deep Crawling: {job.company} - {job.title}")
    
    # 1. Scrape (Firecrawl)
    # Saramin often has content in iframe. The link provided in list is usually the main page.
    # The main page usually contains the iframe or is the detail page itself.
    # Firecrawl is quite good at handling this context usually.
    # However, saramin URLs often redirect.
    # Let's try scraping the `job.link` directly.
    raw_md = scrape_url_content(job.link)
    
    if not raw_md or len(raw_md) < 50:
        logger.warning(f"   ⚠️ Content too short or failed for {job.id}")
        return job # Return original job without update if failed
    
    # Proactive rate limiting - increased to 5s to help with quota
    time.sleep(5) 

    # 2. Process (Gemini)
    result = process_job_with_gemini(job.title, job.company, raw_md)
    
    if result:
        job.content = result.get("content_markdown", "")
        extracted_tags = result.get("tags", [])
        
        # Merge tags: We might already have tags from the list view (if any) or previous fallback
        # But actually list view tags are generic (like 'Back-end'). Gemini tags are specific.
        # Let's prioritize Gemini tags but keep unique existing ones if valid.
        
        # Simple merge and dedupe
        current_tags = set(job.tags)
        for t in extracted_tags:
            current_tags.add(t)
        
        job.tags = list(current_tags)
        
        logger.info(f"   ✅ Processed: {len(job.content)} chars, {len(job.tags)} tags")
    
    return job
