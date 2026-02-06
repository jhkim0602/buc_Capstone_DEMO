from typing import Any

from src.common.config.settings import DEV_EVENT_JSON_PATH
from src.common.storage.json_repo import JsonFileRepository


class DevEventRepository:
    def __init__(self, file_path=DEV_EVENT_JSON_PATH):
        self._repo = JsonFileRepository(file_path)

    @property
    def file_path(self):
        return self._repo.file_path

    def load_existing_by_link(self) -> dict[str, dict[str, Any]]:
        data = self._repo.load_list()
        return {
            item["link"]: item
            for item in data
            if isinstance(item, dict) and isinstance(item.get("link"), str)
        }

    def save_all(self, rows: list[dict[str, Any]]) -> None:
        self._repo.save_list(rows)

