from loguru import logger

from src.apps.saramin.crawler import SaraminCrawler
from src.apps.saramin.models import RecruitJob
from src.apps.saramin.processor import deep_crawl_job
from src.apps.saramin.repository import SaraminRepository
from src.shared.tagger import generate_tags_fallback

SEARCH_KEYWORDS = ["Frontend", "Backend", "Mobile", "AI/ML", "DevOps"]


def run_saramin_crawler(limit: int = 10, repository: SaraminRepository | None = None):
    repository = repository or SaraminRepository()
    logger.info(f"🚀 Starting Saramin Crawler (Limit: {limit})...")

    crawler = SaraminCrawler()
    job_map = {}

    logger.info("🔍 Phase 1: Searching for 'IT General' (Category Scan)...")
    target_pages = (limit // 40) + 2
    jobs = crawler.fetch_jobs_by_keyword("개발자", limit_pages=target_pages)

    for job in jobs:
        if job.id not in job_map:
            job_map[job.id] = job

    logger.info(f"   found {len(jobs)} jobs.")

    unique_jobs = list(job_map.values())[:limit]
    logger.info(f"✅ Phase 1 Complete. {len(unique_jobs)} unique jobs selected for Deep Crawl.")

    logger.info("🕷️ Phase 2: Deep Crawling & Tagging...")
    processed_jobs = []

    for i, job in enumerate(unique_jobs):
        if i % 10 == 0:
            logger.info(f"   Processing {i}/{len(unique_jobs)}...")

        try:
            job = crawler.scrape_job_detail(job)
        except Exception as e:
            logger.warning(f"   ⚠️ Legacy scrape failed for {job.id}: {e}")

        try:
            job = deep_crawl_job(job)
        except Exception as e:
            logger.error(f"   ❌ Deep crawl failed for {job.id}: {e}")

        if not job.tags:
            fallback_tags = generate_tags_fallback(job.title, job.content, job.company)
            if fallback_tags:
                job.tags = fallback_tags

        processed_jobs.append(job)

    logger.info("💾 Phase 3: Saving to JSON...")
    save_jobs_to_json(processed_jobs, repository)
    logger.info("🎉 Saramin Crawler Finished!")


def save_jobs_to_json(jobs: list[RecruitJob], repository: SaraminRepository):
    data = [job.to_dict() for job in jobs]
    repository.save_all(data)
    logger.info(f"Saved {len(jobs)} jobs to {repository.file_path}")

