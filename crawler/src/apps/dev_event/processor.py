import time
import os
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
        logger.warning("⚠️ GEMINI_API_KEY is missing.")
        return None

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

    genai.configure(api_key=GEMINI_API_KEY)
    
    # Using gemini-2.0-flash-exp as configured
    model = genai.GenerativeModel("gemini-2.0-flash-exp")

    # Limit chars to avoid token limits
    truncated_md = raw_markdown[:15000]

    prompt = f"""
    You are an expert tech event curator. Your goal is to transform raw event information into a compelling, easy-to-read event detail page for developers, AND to translate the event title into natural Korean if it's in English.
    
    Event Title: {title}
    
    Raw Content (Markdown):
    {truncated_md}
    
    Task:
    1. **Translate Title**: Provide a natural Korean title for this event. If it's already Korean, keep it or refine it (remove dates/hosts if redundant).
    2. **Refine Content**: Analyze the raw content and regenerate it into a structured, engaging Markdown document.
    
    
    Guidelines for Content:
    1. **Language**: **MUST BE KOREAN (한국어)**. You must translate ALL content into natural Korean, even if the source is English.
    2. **Tone**: Professional yet inviting for developers.
    3. **Structure**: Use the exact structure below.
    4. **Formatting**: Use emojis, bold text for emphasis, and bullet points.
    
    Required Structure for Markdown Content:
    
    ## 행사 소개 (Overview)
    [Write a compelling 2-3 sentence summary of what this event is and why developers should attend.]
    
    ## 핵심 정보 (Key Information)
    | 구분 | 내용 |
    |---|---|
    | **일시** | [Date & Time] |
    | **장소** | [Location or Online URL] |
    | **비용** | [Cost (e.g., Free, 10,000 KRW)] |
    | **대상** | [Target Audience (e.g., Junior Devs, AI Researchers)] |
    
    ## 프로그램 일정 (Agenda)
    [List the schedule clearly. Use a table or time-ordered list.]
    - **14:00 - 14:30**: 등록 및 안내
    - ...
    
    ## 연사 소개 (Speakers)
    [If available, list speakers with their roles/companies.]
    
    ## 신청 및 상세 정보
    [Focus on how to register or where to find more info.]
    
    **Note**: If any section information is missing in the raw content, explicitly state "정보 없음" or omit the section if it's minor. Do not hallucinate details.
    
    Output Format (JSON):
    {{
        "title_ko": "Translated Korean Title",
        "content_markdown": "Full Markdown content string..."
    }}

    IMPORTANT: 
    - You must output valid JSON. 
    - If the markdown content contains backslashes (e.g. LaTeX, paths), you MUST escape them as double backslashes (\\\\) in the JSON string.
    - Do not use single backslashes in the output string value.
    """

    max_retries = 1 # Fail fast if quota is out
    retry_delay = 2 

    for attempt in range(max_retries):
        try:
            # gemini-pro generally supports JSON output via prompt instruction even if strict JSON mode isn't enforced
            # But let's try strict mode first. If it fails (some versions of pro don't support it), retry without.
            response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
            
            text = response.text.strip()
            # Clean Markdown code blocks if present
            if text.startswith("```"):
                text = text.replace("```json", "").replace("```", "").strip()
            
            import json
            import re
            
            def repair_json(json_str):
                # Fix common invalid escape sequences in LLM JSON
                # 1. Escape backslashes that are strictly NOT part of valid JSON escapes
                # Valid escapes: " \\ / b f n r t uXXXX
                # Regex looks for backslash NOT followed by one of these chars
                pattern = r'\\(?![/u"bfnrt\\])'
                return re.sub(pattern, r'\\\\', json_str)

            try:
                result = json.loads(text)
            except json.JSONDecodeError:
                # Attempt repair
                repaired_text = repair_json(text)
                try:
                    result = json.loads(repaired_text)
                except Exception:
                     # One last try: aggressive escape? No, better fail and fallback.
                     # Or try demjson if installed (not installed here).
                     logger.warning(f"JSON Parse failed even after repair. Raw text sample: {text[:100]}...")
                     raise
            
            # Handle list response (take first item)
            if isinstance(result, list):
                if len(result) > 0:
                    result = result[0]
                else:
                    raise ValueError("Gemini returned an empty list")
            
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
        "content_markdown": f"""
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
    logger.info("⏳ Rate limiting: Waiting 4s to be polite...")
    time.sleep(4) 

    # 2. Process with Gemini
    result = process_content_with_gemini(event.title, raw_md)
    
    return result
