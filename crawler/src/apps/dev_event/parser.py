import re
from typing import List, Optional
from datetime import date
from src.apps.dev_event.models import DevEvent

def parse_dev_events(markdown: str) -> List[DevEvent]:
    """Parse raw markdown content into DevEvent objects."""
    lines = markdown.split("\n")
    events: List[DevEvent] = []

    current_event: Optional[dict] = None
    
    # Regex patterns
    # Matches: - __[Title](Link)__
    event_regex = re.compile(r'^- __\[(.*?)\]\((.*?)\)__')
    # Matches:   - Key: Value
    meta_regex = re.compile(r'^  - (.*?): (.*)')
    # Matches headers: ## Section
    header_regex = re.compile(r'^## (.*)')

    for line in lines:
        line = line.rstrip()
        
        # Check for Section Header (Optional: use section for context)
        header_match = header_regex.match(line)
        if header_match:
            # section = header_match.group(1).strip()
            continue

        # Check for Event Title
        event_match = event_regex.match(line)
        if event_match:
            # Save previous event
            if current_event and is_valid_event(current_event):
                events.append(DevEvent(**current_event))
            
            # Start new event
            current_event = {
                "title": event_match.group(1).strip(),
                "link": event_match.group(2).strip(),
                "status": "recruiting",
                "tags": [],
                "source": "github"
            }
            continue

        # Check for Meta Data
        meta_match = meta_regex.match(line)
        if meta_match and current_event:
            key = meta_match.group(1).strip()
            value = meta_match.group(2).strip()

            if key == "분류":
                # Parse tags
                dry_value = value.replace('`', '')
                tags = [t.strip() for t in dry_value.split(',')]
                current_event["tags"] = tags
                
                # Determine Category based on tags
                current_event["category"] = determine_category(tags)
                
            elif key == "주최":
                current_event["host"] = value
            elif key == "접수" or key == "일시":
                current_event["date"] = value
                # Optional: Parse start/end date here if needed

    # Push last event
    if current_event and is_valid_event(current_event):
        events.append(DevEvent(**current_event))

    return events

def is_valid_event(event: dict) -> bool:
    return bool(event.get("title") and event.get("link"))

def determine_category(tags: List[str]) -> str:
    if any(t in tags for t in ["대회", "해커톤", "공모전"]):
        return "Competition"
    elif any(t in tags for t in ["교육", "부트캠프", "강의"]):
        return "Education"
    elif any(t in tags for t in ["컨퍼런스", "세미나"]):
        return "Conference"
    elif any(t in tags for t in ["모임", "커뮤니티"]):
        return "Community"
    return "Other"
