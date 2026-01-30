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
    client = get_firecrawl_client()
    if not client:
        return None

    try:
        # Scrape only proper content
        # Firecrawl v1/v2 uses .scrape()
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

# Global flag to circuit break AI calls if quota is exceeded
AI_AVAILABLE = True

def process_content_with_gemini(title: str, raw_markdown: str):
    global AI_AVAILABLE
    
    if not GEMINI_API_KEY:
        logger.warning("⚠️ GEMINI_API_KEY is missing in config.")
        return None

    logger.info(f"🔑 Configuring Gemini with Key: {GEMINI_API_KEY[:5]}... ({len(GEMINI_API_KEY)} chars)")
    genai.configure(api_key=GEMINI_API_KEY)

    if not AI_AVAILABLE:
        # Fail fast if we already know quota is exceeded
        return {
            "title_ko": title,
            "content_markdown": f"""
## 💡 행사 소개 (Overview)
*AI 할당량 초과로 원문 데이터를 표시합니다.*

{raw_markdown}
            """.strip()
        }

    # Using gemini-1.5-flash as configured
    model = genai.GenerativeModel("gemini-2.5-flash")

    # Limit chars to avoid token limits
    truncated_md = raw_markdown[:15000]

    prompt = f"""
    You are an expert tech event curator. Analyze the following event information and extract structured data.
    
    Event Title: {title}
    
    Raw Content:
    {truncated_md}
    
    Task:
    Extract the following fields into a pure JSON object (Language: Korean):
    1. **title_ko**: Translated Korean title.
    2. **summary**: A 2-3 sentence engaging summary of the event.
    3. **target_audience**: List of target audience (e.g. "Junior Developers", "Students").
    4. **fee**: Cost of entry (e.g. "Free", "10,000 KRW").
    5. **schedule**: List of schedule items (e.g. "14:00 Registration", "14:30 Keynote").
    6. **benefits**: List of benefits (e.g. "Swag", "Networking", "Dinner provided").
    7. **description**: A cleaned, well-structured Markdown version of the event details.
       - **CRITICAL**: Remove ALL "YouTube/Video player" text.
       - Remove navigation menus, footers, sidebars, and "Related Links" sections.
       - Remove text that functions as buttons like "Go to Apply", "Read More", "Shortcut", "바로가기".
       - **Remove the Event Title, Date, Time, and Location** from the top if they are just metadata (since we show them in the header).
       - Keep valuable details like **Introduction, Speaker Bios, Session Descriptions, and detailed FAQ**.
       - Use H2/H3 headers for sections.
    
    IMPORTANT: You MUST generate the 'description' field. Do not leave it empty.
    If the content is short, just clean it up.

    Output JSON Format:
    {{
        "title_ko": "...",
        "summary": "...",
        "target_audience": ["..."],
        "fee": "...",
        "schedule": ["..."],
        "benefits": ["..."],
        "description": "Markdown string..."
    }}
    """

    max_retries = 3 # Increased retries
    retry_delay = 5

    for attempt in range(max_retries):
        try:
            response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
            text = response.text.strip()
            
            # Basic cleanup
            if text.startswith("```"):
                text = text.replace("```json", "").replace("```", "").strip()

            result = json.loads(text)
            
            # Handle list response
            if isinstance(result, list):
                if len(result) > 0 and isinstance(result[0], dict):
                    result = result[0]
                else:
                    return None
            
            logger.info(f"✨ Gemini keys: {list(result.keys())}") 
            return result
        except Exception as e:
            error_str = str(e)
            if "429" in error_str or "quota" in error_str.lower():
                logger.error(f"❌ Gemini Quota Exceeded: {e}")
                logger.warning("🚫 Disabling AI for subsequent events to speed up crawling.")
                AI_AVAILABLE = False # Trip the circuit breaker
                break 
            elif "404" in error_str and "not found" in error_str:
                 logger.error(f"❌ Gemini Model Not Found: {e}")
                 # Try to switch? For now just disable
                 AI_AVAILABLE = False
                 break
            else:
                logger.error(f"❌ Gemini failed: {e}")
                break
    
    # FALLBACK: Return raw content if AI fails
    logger.warning("⚠️ Using raw content fallback due to AI failure.")
    return {
        "title_ko": title, # Keep original title
        "content": f"""
## 💡 행사 소개 (Overview)
*AI 요약 실패로 원문 데이터를 표시합니다.*

{raw_markdown}
        """.strip()
    }

def deep_crawl_event(event):
    """
    Orchestrates scraping and processing for a single event.
    Returns (title_ko, content_markdown) or None.
    """
    logger.info(f"🕵️ Deep Crawling: {event.title} ({event.link})")
    
    # 1. Scrape
    raw_md = scrape_url_content(event.link)
    if not raw_md:
        return None
    
    # Proactive rate limiting
    logger.info("⏳ Rate limiting: Waiting 20s to be polite...")
    time.sleep(20) 

    # 2. Process with Gemini
    result = process_content_with_gemini(event.title, raw_md)
    
    # Inject Content logic
    if result:
        # If AI provided a cleaned description, use it as the main content
        if result.get('description'):
            result['content'] = result.get('description')
        else:
            # Fallback to raw if logic missing
            result['content'] = raw_md
    
    return result
