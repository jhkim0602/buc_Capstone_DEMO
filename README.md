# StackLoad Demo 🚀

**StackLoad**는 기술 블로그 어그리게이터와 AI VTuber 인터랙션 기술을 결합한 통합 데모 프로젝트입니다. 개발자들을 위한 최신 기술 트렌드 수집과 실시간 AI 음성 대화 환경을 제공합니다.

---

## 📂 프로젝트 구조 (Project Structure)

DDD(도메인 주도 설계) 원칙에 따라 리팩토링된 프로젝트 구조 명세서입니다.
새로운 기능을 추가하거나 코드를 수정할 때 이 문서를 참고하세요.

### 1. AI Interview (`ai-interview/`)
> **🚧 Status**: Planning Phase (기획 단계)
> 현재 백엔드 로직은 기획서(`AI_INTERVIEW_BACKEND_PLAN.md`)로만 존재하며, 프론트엔드(`web`)는 Mock Data를 기반으로 동작하도록 구성되어 있습니다.

본 프로젝트는 **"분석 -> 사용자 검토 -> 면접 생성"**의 3단계 흐름을 따르는 AI 면접 서비스를 지향합니다.

*   **Backend Plan (`ai-interview/AI_INTERVIEW_BACKEND_PLAN.md`)**:
    *   **Goal**: FastAPI 비동기 서버, 상호작용적 분석(Interactive Analysis), 모듈형 RAG 아키텍처
    *   **Engines**: 채용공고(JD) 분석, 이력서 인사이트, 맞춤형 면접 설계, 실시간 인터뷰 세션(WebSocket)

*   **Frontend Plan (`ai-interview/AI_INTERVIEW_FRONTEND_PLAN.md`)**:
    *   **Goal**: 백엔드 연동 없이 화면 흐름(Setup Flow)과 UI 구조를 확정하기 위한 **UI-First** 접근
    *   **Features**: SPA 구조의 Setup Wizard (Dashboard -> JD -> Resume -> Mode), 사이드바 네비게이션



### 2. Web Frontend (`web/`)

기능(Feature) 단위로 컴포넌트를 응집시켰습니다.

```
web/components/features/              # 도메인별 기능 컴포넌트
├── interview/                        # [면접] 도메인
│   ├── room/                         # 화상 면접실 화면 (LiveKit, Avatar, Video)
│   │   ├── interview-livekit.tsx     # 메인 컨테이너
│   │   └── (user-video, control...)  # 하위 제어 요소
│   ├── result/                       # 결과 대시보드 화면
│   │   ├── feedback-report.tsx       # 리포트 메인
│   │   └── (charts, summary...)      # 분석 차트 및 요약
│   └── setup/                        # 입장 전 설정 화면
│       ├── job-url-input.tsx         # 채용공고 입력
│       └── mode-selection.tsx        # 면접 모드 선택
└── tech-blog/                        # [기술블로그] 도메인
```

#### 💡 Frontend 개발 가이드: 코드를 어디에 넣을까?
*   **새로운 페이지 기능 개발**: `web/components/features/` 아래에 새로운 폴더(도메인) 생성. (예: 마이페이지 -> `features/mypage`)
*   **면접 관련 UI 수정**: `features/interview/` 내부에서 `room`(진행중), `result`(결과), `setup`(설정) 중 성격에 맞는 곳 수정.
    *   *Note: 현재 면접 진행은 Mock Data를 사용하므로 `web/mocks/` 데이터도 함께 확인하세요.*
*   **여러 곳에서 쓰는 버튼/입력창**: `web/components/ui` (Shadcn UI) 또는 `web/components/shared` 활용.

### 3. Workspace Server (`workspace-server/`)
실시간 협업(화이트보드, 채팅)을 위한 전용 Node.js 서버입니다.

- `src/modules/board/`: 화이트보드 (Yjs)
- `src/modules/chat/`: 채팅 (Socket.io)
- `src/modules/socket/`: 소켓 게이트웨이

### 4. Crawler (`crawler/src`)

수집 대상(Domain)과 수집 엔진(Core)을 분리했습니다.

```
crawler/src/
├── main.py                           # 크롤러 실행 진입점
├── core/                             # 크롤링 엔진 공통 로직
│   ├── config.py                     # 설정
│   └── database.py                   # DB 연결
├── domains/                          # 수집 대상별 로직
│   ├── job_post/                     # 채용 공고 (원티드, 점핏 등)
│   └── tech_blog/                    # 기술 블로그 (Velog, Tistory 등)
└── infra/                            # 외부 서비스 연동
    └── tagger.py                     # Gemini AI 자동 태깅 서비스
```

#### 💡 Crawler 개발 가이드: 코드를 어디에 넣을까?
*   **새로운 사이트 크롤러 추가**: `domains/` 아래에 새로운 폴더 생성 (예: `domains/youtube_script`).
*   **수집 데이터를 AI로 가공**: `infra/` 폴더에 AI 처리 로직 추가.
*   **DB 저장 로직 변경**: `core/database.py` 수정.

---

## 🛠 기술 스택

### Web (Frontend)
- **Framework**: Next.js 14+ (App Router, SPA Structure)
- **Styling**: Tailwind CSS + shadcn/ui
- **State/Data**: Supabase, LiveKit Client
- **Deployment**: Vercel

### AI Agent (Interview - Planned)
- **Status**: Planning (기획 단계)
- **Plan**: LiveKit Agents, Python 3.10+, Gemini 2.0 Flash

### Workspace Server (Collaboration)
- **Runtime**: Node.js (TypeScript)
- **Real-time**: Socket.IO, Yjs (WebSocket)

### Crawler
- **Language**: Python
- **Libraries**: BeautifulSoup4, Feedparser, Google Generative AI (Tagging)
- **Database**: Supabase

---

## 🚀 시작하기

### 1. 환경 변수 설정
각 디렉토리(`. /workspace-server`, `./web`, `./crawler`)에 있는 `.env.example` 파일을 참고하여 `.env` 파일을 생성하고 필요한 API Key를 설정하세요.
- Gemini API Key
- Supabase URL & Service Role Key
- LiveKit API Key & Secret

### 2. 실행 방법

#### Web
```bash
cd web
pnpm install
pnpm dev
```

#### Workspace Server
```bash
cd workspace-server
npm install
npm run dev
```

#### AI Agent (Planning)
*현재 기획 단계로 실행 가능한 코드가 없습니다. `ai-interview/` 내의 기획 문서를 참고하세요.*

#### Crawler
```bash
cd crawler
uv sync
uv run main.py
```

---

## 📝 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.
