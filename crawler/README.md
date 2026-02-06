# StackLoad Crawler

StackLoad 프로젝트의 데이터 수집 모듈입니다.
현재 구조는 **크롤러별 독립 실행**으로 완전히 정리되어 있습니다.

## 빠른 시작 (uv)

1. `crawler/` 디렉토리에서 의존성 동기화

```bash
uv sync
```

2. 환경 변수 파일 준비

```bash
cp .env.example .env
```

### 선택 환경 변수 (출력 경로/테이블)

`src/common/config/settings.py`에서 아래 값을 단일 로딩합니다.

```bash
# web/public/data 기본 경로를 바꾸고 싶을 때
WEB_DATA_DIR=
DEV_EVENT_JSON_PATH=
SARAMIN_JOBS_JSON_PATH=

# Supabase 테이블명 커스텀
SUPABASE_BLOGS_TABLE=blogs
```

## 독립 실행 명령

모든 명령은 `crawler/` 루트에서 실행합니다.

### 1) Tech Blog RSS

```bash
uv run python -m src.apps.tech_blog.cli
```

### 2) Saramin 채용공고

```bash
uv run python -m src.apps.saramin.cli --limit 20
```

### 3) Dev Event

```bash
uv run python -m src.apps.dev_event.cli --limit 10
```

### 4) Job Post

```bash
# 원문 텍스트 추출
uv run python -m src.apps.job_post.cli crawl-text "<job_url>"

# Firecrawl + AI 분석
uv run python -m src.apps.job_post.cli analyze "<job_url>"
```

## 리팩토링 문서

- 리팩토링 계획: `docs/refactoring-plan.md`
- 경로 매핑/정리 현황: `docs/migration-map.md`
