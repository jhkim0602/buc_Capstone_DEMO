import argparse
import asyncio
import sys
from loguru import logger


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Job Post crawler CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)

    crawl_parser = subparsers.add_parser(
        "crawl-text", help="Crawl and print plain text from a job post URL"
    )
    crawl_parser.add_argument("url", help="Job post URL")

    analyze_parser = subparsers.add_parser(
        "analyze", help="Analyze a job post URL using Firecrawl + AI"
    )
    analyze_parser.add_argument("url", help="Job post URL")

    return parser


def main() -> None:
    logger.remove()
    logger.add(sys.stderr, level="INFO")

    parser = _build_parser()
    args = parser.parse_args()

    if args.command == "crawl-text":
        from src.apps.job_post.crawler import crawl_job_description

        print(crawl_job_description(args.url))
        return

    if args.command == "analyze":
        from src.apps.job_post.service import analyze_jd_by_url

        result = asyncio.run(analyze_jd_by_url(args.url))
        print(result.model_dump_json(indent=2))
        return

    parser.print_help()


if __name__ == "__main__":
    main()

