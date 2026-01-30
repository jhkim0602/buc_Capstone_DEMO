import time
import json
from pathlib import Path
from loguru import logger
from src.apps.dev_event.fetcher import fetch_dev_event_readme
from src.apps.dev_event.parser import parse_dev_events
from src.shared.database import fetch_thumbnail_from_web
import uuid

# Path to save JSON file
# Assuming running from crawler/ directory
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent.parent # stackload_DeMo-main/
DATA_DIR = BASE_DIR / "web" / "public" / "data"
JSON_FILE = DATA_DIR / "dev-events.json"

from src.apps.dev_event.processor import deep_crawl_event

def load_existing_events():
    if JSON_FILE.exists():
        try:
            with open(JSON_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                # Map by link for easy lookup
                return {item['link']: item for item in data}
        except Exception:
            return {}
    return {}

def run_dev_event_crawler(limit: int = 5):
    logger.info(f"🚀 Starting Dev-Event Crawler (Deep Crawl Limit: {limit})...")
    
    # 0. Load existing data to preserve 'content' and 'thumbnail'
    existing_map = load_existing_events()
    logger.info(f"Loaded {len(existing_map)} existing events.")

    # 1. Fetch
    content = fetch_dev_event_readme()
    if not content:
        logger.error("Failed to fetch content. Aborting.")
        return

    # 2. Parse (These are fresh objects)
    events = parse_dev_events(content)
    logger.info(f"Parsed {len(events)} events from README.")

    # 3. Merge & Process
    processed_count = 0
    
    for event in events:
        # Check against existing
        existing = existing_map.get(event.link)
        
        if existing:
            # Preserve existing expensive fields if they exist
            if existing.get('thumbnail'):
                event.thumbnail = existing.get('thumbnail')
            if existing.get('content'):
                event.content = existing.get('content')
            
            # Preserve parsed fields if they exist and we're skipping deep crawl (optional)
            # Actually, if we re-run deep crawl, we might want to update them.
            # But the logic below says "if NOT event.content", so if it exists, skip.
            # However, allow updating if we want to refresh structured data?
            # For now, let's stick to "fill missing" logic to respect the limit.
            if existing.get('summary'): # Check if structured data exists
                 event.summary = existing.get('summary')
                 event.target_audience = existing.get('target_audience', [])
                 event.fee = existing.get('fee')
                 event.schedule = existing.get('schedule', [])
                 event.benefits = existing.get('benefits', [])
        
        # 3.1 Fetch Thumbnail if missing
        if not event.thumbnail:
             try:
                 time.sleep(0.5)
                 thumb = fetch_thumbnail_from_web(event.link, "DevEvent")
                 if thumb:
                     event.thumbnail = thumb
             except Exception as e:
                logger.warning(f"Failed to fetch thumbnail for {event.title}: {e}")

        # 3.2 Deep Crawl if missing content OR missing structured data
        # Check if we should crawl: 
        # (Missing Content OR Missing Structured Data) AND Below Limit
        needs_crawl = (not event.content or not event.summary)
        
        if needs_crawl and processed_count < limit:
            try:
                logger.info(f"🧠 Generating content for: {event.title}")
                result = deep_crawl_event(event)
                if result:
                    # Update fields
                    if result.get('title_ko'):
                         # Log change if significant
                         # logger.info(f"   KR Title: {result.get('title_ko')}")
                         event.title = result.get('title_ko')
                    
                    # Ensure list type for list fields
                    def ensure_list(val):
                        if isinstance(val, list): return val
                        if isinstance(val, str) and val: return [val]
                        return []

                    event.content = result.get('content')
                    event.description = result.get('description')
                    event.summary = result.get('summary')
                    event.target_audience = ensure_list(result.get('target_audience'))
                    event.fee = result.get('fee')
                    event.schedule = ensure_list(result.get('schedule'))
                    event.benefits = ensure_list(result.get('benefits'))
                    
                    processed_count += 1
            except Exception as e:
                logger.error(f"Deep crawl failed for {event.title}: {e}")

    # 4. Save to JSON File
    save_events_to_json(events)

def save_events_to_json(events):
    try:
        # Ensure directory exists
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        
        # Convert to list of dicts
        data = [event.model_dump() for event in events]
        
        # Add ID if missing (simple index or hash)
        # Add ID if missing (simple index or hash)
        seen_ids = set()
        for item in data:
            # Generate deterministic ID based on link + title to avoid collisions on same-link events
            base_str = f"{item['link']}-{item['title']}"
            item_id = str(uuid.uuid5(uuid.NAMESPACE_URL, base_str))
            
            # If collision still happens (rare but possible with exact duplicates), append random suffix
            original_id = item_id
            counter = 0
            while item_id in seen_ids:
                counter += 1
                item_id = str(uuid.uuid5(uuid.NAMESPACE_URL, f"{base_str}-{counter}"))
            
            item['id'] = item_id
            seen_ids.add(item_id)

        with open(JSON_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        logger.info(f"✅ Saved {len(events)} events to {JSON_FILE}")
        
    except Exception as e:
        logger.error(f"Failed to save JSON: {e}")
