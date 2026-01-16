# StackLoad Crawler

StackLoad 프로젝트의 데이터 수집을 담당하는 크롤러 모듈입니다.
Python 기반으로 작성되었으며, Saramin 채용 공고 크롤링 및 기술 블로그 RSS 수집 기능을 포함합니다.

## 🚀 시작하기

### 1. 환경 설정

**가상환경 생성 및 활성화**

```bash
# 가상환경 생성 (.venv)
python -m venv .venv

# 활성화 (Mac/Linux)
source .venv/bin/activate

# 활성화 (Windows)
.venv\Scripts\activate
```

**의존성 설치**

```bash
pip install -r requirements.txt
```

**환경 변수 설정**

`.env.example` 파일을 복사하여 `.env` 파일을 생성하고 필요한 값을 입력하세요.

```bash
cp .env.example .env
```

### 2. 실행 방법

#### Saramin 독립형 크롤러 실행

기존 루트 디렉토리에 있던 독립형 스크립트는 이제 `scripts` 폴더에서 실행할 수 있습니다.

```bash
# 프로젝트 루트(crawler/)에서 실행
python scripts/saramin_standalone.py
```

#### 메인 크롤러 앱 실행

(크롤러 앱의 진입점이 있다면 여기에 추가 설명, 현재 구조상 `src/main.py` 등이 있다면)
```bash
python src/main.py
```

## 📁 디렉토리 구조

- `src/`: 크롤러 핵심 로직 소스 코드
- `scripts/`: 독립적으로 실행 가능한 유틸리티 스크립트 모음
    - `saramin_standalone.py`: 사람인 채용 공고 크롤링 스크립트
- `.env`: 환경 변수 설정 파일 (git ignored)
