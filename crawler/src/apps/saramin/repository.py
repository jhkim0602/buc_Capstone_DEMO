from typing import Any

from src.common.config.settings import SARAMIN_JOBS_JSON_PATH
from src.common.storage.json_repo import JsonFileRepository


class SaraminRepository:
    def __init__(self, file_path=SARAMIN_JOBS_JSON_PATH):
        self._repo = JsonFileRepository(file_path)

    @property
    def file_path(self):
        return self._repo.file_path

    def save_all(self, rows: list[dict[str, Any]]) -> None:
        self._repo.save_list(rows)

    def load_all(self) -> list[dict[str, Any]]:
        return self._repo.load_list()

