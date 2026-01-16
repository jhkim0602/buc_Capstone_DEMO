import os
import asyncio
from loguru import logger
from firecrawl import FirecrawlApp
from src.shared.job_models import JobAnalysisResult

# Import JD Analyzer
# Note: Based on project structure, we need to make sure we can import from ai/src
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../ai/src")))
from open_llm_vtuber.agent.rag.jd_analyzer import JDAnalyzer

# Initialize Firecrawl
FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY")

def get_firecrawl_client():
    if not FIRECRAWL_API_KEY:
        logger.warning("⚠️ FIRECRAWL_API_KEY is missing.")
        return None
    return FirecrawlApp(api_key=FIRECRAWL_API_KEY)

async def analyze_jd_by_url(url: str) -> JobAnalysisResult:
    """
    Full pipeline: Scrape URL -> Clean -> Analyze with AI
    """
    logger.info(f"⏳ Starting Analysis for: {url}")

    # 1. Scrape with Firecrawl
    client = get_firecrawl_client()
    if not client:
        raise ValueError("Firecrawl Client initialization failed. Check API Key.")
    
    try:
        # Run synchronous scrape in executor if needed, but Firecrawl might be fast enough
        # or we just run it blocking for now since this is a CLI mainly.
        logger.info("🔥 Scraping with Firecrawl...")
        scrape_result = client.scrape_url(url, params={'formats': ['markdown']})
        
        # Parse Firecrawl v1 response
        raw_markdown = ""
        if isinstance(scrape_result, dict):
            raw_markdown = scrape_result.get('markdown', '') or scrape_result.get('content', '')
        elif hasattr(scrape_result, 'markdown'):
            raw_markdown = scrape_result.markdown
            
        if not raw_markdown or len(raw_markdown) < 100:
             logger.error(f"❌ Scraped content is too short: {scrape_result}")
             raise ValueError("Failed to scrape meaningful content.")
             
        logger.info(f"✅ Scraped {len(raw_markdown)} chars.")

    except Exception as e:
        logger.error(f"❌ Firecrawl Error: {e}")
        raise e

    # 2. AI Analysis
    analyzer = JDAnalyzer(model_name="gemini-2.0-flash-exp")
    
    try:
        result = await analyzer.analyze(raw_markdown)
        return result
    except Exception as e:
        logger.error(f"❌ AI Analysis Error: {e}")
        raise e
