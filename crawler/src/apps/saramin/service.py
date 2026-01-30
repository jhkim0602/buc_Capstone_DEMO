from pathlib import Path
import json
from loguru import logger
from datetime import datetime

from .crawler import SaraminCrawler
from .models import RecruitJob
from .processor import deep_crawl_job
from src.shared.tagger import generate_tags_fallback

# Output path
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent # crawler/
OUTPUT_FILE = BASE_DIR.parent / "web" / "public" / "data" / "recruit-jobs.json"

SEARCH_KEYWORDS = ["Frontend", "Backend", "Mobile", "AI/ML", "DevOps"]

def run_saramin_crawler(limit: int = 10):
    logger.info(f"🚀 Starting Saramin Crawler (Limit: {limit})...")
    
    crawler = SaraminCrawler()
    
    # 1. Collect Jobs (List Phase)
    # Use a dict to handle duplicates automatically
    job_map = {} 
    
    logger.info("🔍 Phase 1: Searching for 'IT General' (Category Scan)...")
    
    # Adjust page limit based on target item count (rough estimate: 40 items per page)
    target_pages = (limit // 40) + 2
    jobs = crawler.fetch_jobs_by_keyword("개발자", limit_pages=target_pages)
    
    for job in jobs:
        if job.id not in job_map:
            job_map[job.id] = job
    
    logger.info(f"   found {len(jobs)} jobs.")

    unique_jobs = list(job_map.values())
    
    # Limit to requested count
    unique_jobs = unique_jobs[:limit]
    
    logger.info(f"✅ Phase 1 Complete. {len(unique_jobs)} unique jobs selected for Deep Crawl.")
    
    # 2. Deep Crawl Phase & Tagging
    logger.info("🕷️ Phase 2: Deep Crawling & Tagging...")
    
    processed_jobs = []
    
    for i, job in enumerate(unique_jobs):
        # Progress log every 10
        if i % 10 == 0:
            logger.info(f"   Processing {i}/{len(unique_jobs)}...")
            
        # 2.1 Deep Crawl
        
        # Step A: Legacy Scrape (BeautifulSoup) for Image URL & Basic Content
        # We do this first to ensure we get the image_url which Firecrawl doesn't return explicitly
        try:
             job = crawler.scrape_job_detail(job)
        except Exception as e:
             logger.warning(f"   ⚠️ Legacy scrape failed for {job.id}: {e}")

        # Step B: Advanced Crawl (Firecrawl + Gemini) for Markdown & Tags
        try:
            job = deep_crawl_job(job)
        except Exception as e:
            logger.error(f"   ❌ Deep crawl failed for {job.id}: {e}")
        
        # 2.2 Tagging is now handled inside deep_crawl_job via Gemini
        # But if Gemini failed or returned no tags, we might want fallback?
        # The processor's fallback logic already returns empty tags if failed.
        # We can keep the old `generate_tags_fallback` as a secondary backup if tags are still empty.
        
        if not job.tags:
             fallback_tags = generate_tags_fallback(job.title, job.content, job.company)
             if fallback_tags:
                 job.tags = fallback_tags
        
        processed_jobs.append(job)

    # 3. Save to JSON
    logger.info("💾 Phase 3: Saving to JSON...")
    save_jobs_to_json(processed_jobs)
    logger.info("🎉 Saramin Crawler Finished!")

def save_jobs_to_json(jobs: list[RecruitJob]):
    data = [job.to_dict() for job in jobs]
    
    # Ensure directory exists
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    logger.info(f"Saved {len(jobs)} jobs to {OUTPUT_FILE}")
