import argparse


def main() -> None:
    parser = argparse.ArgumentParser(description="Saramin crawler CLI")
    parser.add_argument(
        "--limit",
        type=int,
        default=10,
        help="Maximum number of jobs to process",
    )
    args = parser.parse_args()

    from src.apps.saramin.service import run_saramin_crawler

    run_saramin_crawler(limit=args.limit)


if __name__ == "__main__":
    main()

