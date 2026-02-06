import argparse


def main() -> None:
    parser = argparse.ArgumentParser(description="Dev Event crawler CLI")
    parser.add_argument(
        "--limit",
        type=int,
        default=5,
        help="Maximum number of events to deep-crawl",
    )
    args = parser.parse_args()

    from src.apps.dev_event.service import run_dev_event_crawler

    run_dev_event_crawler(limit=args.limit)


if __name__ == "__main__":
    main()

