import requests
from loguru import logger

README_URL = "https://raw.githubusercontent.com/brave-people/Dev-Event/master/README.md"

def fetch_dev_event_readme() -> str:
    """Fetch the raw README.md content from the Dev-Event repository."""
    try:
        logger.info(f"Fetching Dev-Event README from {README_URL}...")
        response = requests.get(README_URL, timeout=30)
        response.raise_for_status()
        return response.text
    except Exception as e:
        logger.error(f"Failed to fetch Dev-Event README: {e}")
        return ""
