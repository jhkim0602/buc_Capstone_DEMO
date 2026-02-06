import re

from src.common.config.settings import DEV_EVENT_JSON_PATH
from src.common.storage.json_repo import JsonFileRepository


def patch_data():
    repo = JsonFileRepository(DEV_EVENT_JSON_PATH)
    data = repo.load_list()

    if not data:
        print(f"❌ File not found or empty: {DEV_EVENT_JSON_PATH}")
        return

    updated_count = 0

    replacements = {
        r"## 1\. Overview": "## 💡 행사 소개 (Overview)",
        r"## 2\. Key Details": "## 📅 핵심 정보 (Key Information)",
        r"## 3\. Agenda/Schedule": "## 📝 프로그램 일정 (Agenda)",
        r"## 4\. Speakers": "## 🎤 연사 소개 (Speakers)",
        r"## 5\. Target Audience": "## 🎯 참가 대상 (Target Audience)",
        r"## 3\. Speakers": "## 🎤 연사 소개 (Speakers)",
        r"## 4\. Target Audience": "## 🎯 참가 대상 (Target Audience)",
        r"## 2\. Community Statistics": "## 📊 커뮤니티 통계 (Statistics)",
        r"## 6\. .*": "## 🔗 신청 및 상세 정보",
        r"## 5\. .*": "## 🔗 신청 및 상세 정보",
    }

    for event in data:
        content = event.get("content", "")
        if not content:
            continue

        original_content = content
        for old, new in replacements.items():
            content = re.sub(old, new, content)

        content = re.sub(
            r"## \d+\. (Registration|Register|Link|신청).*",
            "## 🔗 신청 및 상세 정보",
            content,
        )

        if content != original_content:
            event["content"] = content
            updated_count += 1
            print(f"✅ Patched: {event.get('title', '<unknown>')}")

    if updated_count > 0:
        repo.save_list(data)
        print(f"🎉 Successfully patched {updated_count} events.")
    else:
        print("✨ No events needed patching.")


if __name__ == "__main__":
    patch_data()

