# Dibut Web Frontend

**Dibut (디벗_Buddy for Developers)**의 프론트엔드 애플리케이션입니다. 개발자 기술 블로그 큐레이션, 커리어 관리, 그리고 AI 인터뷰 및 협업 기능을 제공합니다.

## 🛠 기술 스택 (Tech Stack)

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui (Radix UI 기반)
- **State Management**:
    - Server State: React Server Components, Server Actions
    - Client State: Zustand, React Context (Theme, Auth)
    - Real-time: Yjs ("workspace" 화이트보드), LiveKit ("interview" 화상)
- **Database Access**: Supabase (via `@supabase/auth-helpers-nextjs`)

---

## 🏗 아키텍처 (Architecture)

### 1. App Router & Server Actions
Next.js의 **App Router**를 사용하여 파일 시스템 기반 라우팅을 구현했습니다.
데이터 페칭과 뮤테이션(Mutation)은 별도의 API 라우트 없이 **Server Actions**를 통해 타입 안전하게 처리합니다. (`lib/actions/` 참고)

### 2. Feature-based Directory Structure
기능(Feature) 단위로 코드를 응집시켜 유지보수성을 높였습니다.

```
web/
├── app/                 # 라우팅 및 페이지 컴포넌트
│   ├── (main)/          # 기술 블로그, 커뮤니티 등 메인 레이아웃 적용
│   ├── workspace/       # 협업 공간 (별도 레이아웃)
│   └── interview/       # AI 인터뷰 (SPA 구조, 별도 레이아웃)
├── components/
│   ├── ui/              # 공통 UI 컴포넌트 (Button, Input 등)
│   └── features/        # 비즈니스 로직이 포함된 기능별 컴포넌트
│       ├── tech-blog/   # 기술 블로그 관련 (Card, List, Filter)
│       ├── workspace/   # 협업 도구 (Idea Board, Kanban)
│       └── interview/   # 인터뷰 관련 (Room, Setup, Report)
└── lib/                 # 유틸리티 및 서버 액션
    ├── actions/         # Server Actions (DB 작업)
    └── utils.ts         # 공통 유틸리티
```

---

## 🧩 주요 기능 및 현황 (Features & Status)

### 1. 📚 Tech Blog (`/`)
- **기능**: 국내외 유명 기술 블로그의 RSS를 수집하여 보여주는 메인 피드.
- **구현**: `rss-parser`를 이용한 데이터 수집 및 태그 기반 필터링 제공.

### 2. 💼 Career (`/career`)
- **기능**: 채용 공고 일정 관리 및 활동 추적.
- **구현**: FullCalendar 라이브러리를 활용한 캘린더 뷰와 칸반 보드 형태의 지원 현황 관리.

### 3. 👥 Community (`/community`)
- **기능**: 개발자 스터디/프로젝트 멤버 모집(Squad).
- **구현**: Supabase DB와 연동된 게시판 기능.

### 4. 📝 Workspace (`/workspace/[id]`)
- **기능**: 실시간 아이디어 회의 및 프로젝트 관리.
- **연동**: **Workspace Server** (Port 4000)와 WebSocket 연결.
- **구성 요소**:
    - **Idea Board**: `Excalidraw` + `Yjs`를 이용한 실시간 화이트보드 동기화.
    - **Kanban**: `dnd-kit`을 이용한 태스크 관리 (Local State 위주).

### 5. 🤖 AI Interview (`/interview`)
> **🚧 Status**: Planning / Front-Only (Mock Data)
- **개요**: AI 면접관과의 실시간 모의 면접 서비스.
- **구조**: **SPA (Single Page Application)** 형태의 Setup Wizard.
    - `Setup -> Room -> Result` 로 이어지는 흐름을 끊김 없이 제공.
- **특이사항**: 현재 백엔드 로직(`ai-interview/`)은 기획 단계이며, 프론트엔드는 `web/mocks/interview-data.ts`의 더미 데이터를 사용하여 UI 흐름을 시연합니다.

---

## 🚀 개발 가이드 (Development)

### 환경 변수 설정
`.env.example`을 참고하여 `.env` 파일을 생성하세요.

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# LiveKit (For Interview)
NEXT_PUBLIC_LIVEKIT_URL=...

# Workspace Server (For Board)
NEXT_PUBLIC_SOCKET_URL=ws://localhost:4000
```

### 실행
```bash
pnpm install
pnpm dev
```
`localhost:3000`에서 접속 가능합니다.
