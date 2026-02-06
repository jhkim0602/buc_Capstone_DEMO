import json
from pathlib import Path
from typing import Any


class JsonFileRepository:
    def __init__(self, file_path: Path):
        self.file_path = Path(file_path)

    def load_list(self) -> list[dict[str, Any]]:
        if not self.file_path.exists():
            return []

        try:
            with open(self.file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception:
            return []

        if isinstance(data, list):
            return [item for item in data if isinstance(item, dict)]
        return []

    def save_list(self, data: list[dict[str, Any]]) -> None:
        self.file_path.parent.mkdir(parents=True, exist_ok=True)
        with open(self.file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

