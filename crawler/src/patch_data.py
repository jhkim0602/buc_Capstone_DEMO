import json
from pathlib import Path
import re

# Path to the JSON file
BASE_DIR = Path(__file__).resolve().parent.parent # crawler/
JSON_FILE = BASE_DIR.parent / "web" / "public" / "data" / "dev-events.json"

def patch_data():
    if not JSON_FILE.exists():
        print(f"❌ File not found: {JSON_FILE}")
        return

    with open(JSON_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    updated_count = 0
    
    # Mappings from Old Header -> New Header
    replacements = {
        r"## 1\. Overview": "## 💡 행사 소개 (Overview)",
        r"## 2\. Key Details": "## 📅 핵심 정보 (Key Information)",
        r"## 3\. Agenda/Schedule": "## 📝 프로그램 일정 (Agenda)",
        r"## 4\. Speakers": "## 🎤 연사 소개 (Speakers)",
        r"## 5\. Target Audience": "## 🎯 참가 대상 (Target Audience)",
        r"## 3\. Speakers": "## 🎤 연사 소개 (Speakers)", # Duplicate for safety
        r"## 4\. Target Audience": "## 🎯 참가 대상 (Target Audience)",
        r"## 2\. Community Statistics": "## 📊 커뮤니티 통계 (Statistics)", # Special case
        r"## 6\. .*": "## 🔗 신청 및 상세 정보", # Catch-all for last section if it varies
        r"## 5\. .*": "## 🔗 신청 및 상세 정보", # Case where speakers/audience might be skipped
    }

    # Additional manual replacement for the "Link/Registration" section which varies
    # Usually "## 3. Agenda" etc followed by "## Link" or "## Registration"
    # But let's stick to the specific ones observed first.

    for event in data:
        content = event.get("content", "")
        if not content:
            continue
            
        original_content = content
        
        # Apply Regex Replacements
        for old, new in replacements.items():
            content = re.sub(old, new, content)

        # Fix "## 6. 신청 및 상세 정보" or similar if they exist in old format
        # Old format might not have had a consistent last header, but let's try specific ones
        content = re.sub(r"## \d+\. (Registration|Register|Link|신청).*", "## 🔗 신청 및 상세 정보", content)

        if content != original_content:
            event["content"] = content
            updated_count += 1
            print(f"✅ Patched: {event['title']}")

    if updated_count > 0:
        with open(JSON_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"🎉 Successfully patched {updated_count} events.")
    else:
        print("✨ No events needed patching.")

if __name__ == "__main__":
    patch_data()
