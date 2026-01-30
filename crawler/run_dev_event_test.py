import sys
from pathlib import Path
from dotenv import load_dotenv as _load_dotenv

# Add crawler root to sys.path
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))

# Load web/.env.local explicitly to ensure keys are present before imports
# This is redundant if config.py does it, but safer for test scripts
env_path = BASE_DIR.parent / "web" / ".env.local"
if env_path.exists():
    _load_dotenv(env_path)
    print(f"🔧 [Test Script] Loaded env from {env_path}")

from src.apps.dev_event.service import run_dev_event_crawler

if __name__ == "__main__":
    # Default limit
    limit = 5
    
    # Check CLI args
    if len(sys.argv) > 1:
        try:
            limit = int(sys.argv[1])
        except ValueError:
            print("Usage: python run_dev_event_test.py [limit]")
            sys.exit(1)
            
    run_dev_event_crawler(limit=limit)
