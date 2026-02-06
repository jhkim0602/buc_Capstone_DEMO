import importlib
from loguru import logger
from firecrawl import FirecrawlApp
from src.shared.job_models import JobAnalysisResult
from src.common.config.settings import FIRECRAWL_API_KEY

import sys
from pathlib import Path

AI_SRC_DIR = Path(__file__).resolve().parents[4] / "ai" / "src"

def get_firecrawl_client():
    if not FIRECRAWL_API_KEY:
        logger.warning("⚠️ FIRECRAWL_API_KEY is missing.")
        return None
    return FirecrawlApp(api_key=FIRECRAWL_API_KEY)


def _get_jd_analyzer_class():
    if AI_SRC_DIR.exists() and str(AI_SRC_DIR) not in sys.path:
        sys.path.append(str(AI_SRC_DIR))

    try:
        module = importlib.import_module("open_llm_vtuber.agent.rag.jd_analyzer")
        return module.JDAnalyzer
    except ModuleNotFoundError as e:
        raise ModuleNotFoundError(
            f"JDAnalyzer module not found. Expected import path under: {AI_SRC_DIR}"
        ) from e

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
    JDAnalyzer = _get_jd_analyzer_class()
    analyzer = JDAnalyzer(model_name="gemini-2.0-flash-exp")
    
    try:
        result = await analyzer.analyze(raw_markdown)
        return result
    except Exception as e:
        logger.error(f"❌ AI Analysis Error: {e}")
        raise e
