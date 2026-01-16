import sys
from pathlib import Path

# Add crawler root to sys.path
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))

from src.apps.saramin.service import run_saramin_crawler

if __name__ == "__main__":
    run_saramin_crawler()
