import sys
import argparse
import asyncio
import json
from loguru import logger
from src.apps.job_post.service import analyze_jd_by_url

# Configure loguru to stderr so it doesn't pollute stdout (which holds the JSON result)
logger.remove()
logger.add(sys.stderr, level="INFO")

def main():
    parser = argparse.ArgumentParser(description="StackLoad JD Crawler CLI")
    parser.add_argument("url", help="Job Description URL to crawl")
    args = parser.parse_args()

    try:
        # Run async function
        result = asyncio.run(analyze_jd_by_url(args.url))
        
        # Print Result as JSON to Stdout
        print(result.model_dump_json(indent=2))
        
    except Exception as e:
        logger.error(f"CLI Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
