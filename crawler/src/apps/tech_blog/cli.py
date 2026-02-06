import argparse


def main() -> None:
    parser = argparse.ArgumentParser(description="Tech Blog crawler CLI")
    parser.parse_args()

    from src.apps.tech_blog.crawler import run_tech_blog_crawler

    run_tech_blog_crawler()


if __name__ == "__main__":
    main()

