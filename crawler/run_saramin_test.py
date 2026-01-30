import sys
from pathlib import Path

# Add crawler root to sys.path
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))

from src.apps.saramin.service import run_saramin_crawler

if __name__ == "__main__":
    limit = 10
    if len(sys.argv) > 1:
        try:
            limit = int(sys.argv[1])
        except ValueError:
            print("Usage: python run_saramin_test.py [limit]")
            sys.exit(1)
            
    run_saramin_crawler(limit=limit)
