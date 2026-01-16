# AI 인터뷰 프론트엔드 UI-First 기획서 (Next.js App Router) - v2.0

본 문서는 **"화면을 보며 기능을 확정"**하는 목적에 맞춰, 백엔드 연동 없이 **단순 UI + 개발자 친화 가이드(호버 툴팁)**만으로 구성되는 인터뷰 섹션 화면 기획서입니다.
Latest Update: SPA 구조 전환, 이력서 분석 통합, 사이드바 추가

---

## 0. 범위 정의

### 목표 (Goal)
- 실제 기능 연동 없이도 **화면 흐름**과 **UI 구조**를 확정할 수 있는 설계
- **단일 페이지 애플리케이션(SPA)** 경험을 유지하며 매끄러운 단계 이동 구현
- **사이드바(Sidebar)**를 통한 직관적인 진행 단계 시각화
- 최근 면접 기록/리포트/사전 QnA 히스토리 화면 포함

### 제외 (Non-Goal)
- 백엔드 API 연동, 인증, 스트리밍, 실시간 처리 구현
- 복잡한 상태 관리/비즈니스 로직 (현재는 `sessionStorage`와 로컬 State 활용)

---

## 1. 기술 스택 (Tech Stack)
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: 로컬 상태(useState) + Session Storage (새로고침 방지)
  - *변경사항*: 복잡한 URL 라우팅 대신 `viewState` 기반의 SPA 네비게이션 채택
- **Form**: React Hook Form + Zod (편집 화면용)
- **Icons**: Lucide React

---

## 2. 프로젝트 구조 (Refined)

기존 `/web` 구조를 유지하되, Setup 단계는 `/interview/page.tsx` 내부에서 처리합니다.

```
/web
  /app
    /interview
      /page.tsx           # 통합 인터뷰 대시보드 & Setup Wizard (SPA)
                          # (Dash -> JD -> Resume -> Mode Flow)
      /pre-qna/page.tsx   # 사전 QnA (UI 전용, Static)
      /room/page.tsx      # 실전 면접실 (UI 전용, Static)
      /result/page.tsx    # 결과 리포트 (UI 전용, Static)
  /components
    /features
      /interview
        /setup            # Setup 관련 컴포넌트 폴더
          /job-url-input.tsx      # JD URL/File 입력
          /job-analysis-result.tsx # JD 분석 결과
          /resume-analysis-result.tsx # 이력서 분석 결과
          /mode-selection.tsx     # 면접 방식 선택
          /setup-sidebar.tsx      # [NEW] 진행 단계 표기 사이드바
        /setup-resume     # 이력서 입력 컴포넌트
          /resume-input.tsx       # 이력서 텍스트/파일 입력
        /pre-qna          # QnA UI
        /room             # Live Room UI
        /result           # 결과 리포트 UI
        /guide            # Dev Hint (호버 툴팁) 전용 컴포넌트
  /mocks
    interview-data.ts     # Mock 데이터 정의
  /types
    interview.ts          # 타입 정의
```

---

## 3. 인터뷰 섹션 UI 설계 (Updated Flow)

### 3.1 인터뷰 메인 & Setup Flow (`/interview/page.tsx`)

**구조 변경 핵심**:
URL이 변하지 않는 **SPA 구조**를 채택하여, 페이지 깜빡임 없이 자연스럽게 준비 단계로 진입합니다.

**State Flow (`viewState`)**:
1.  **Dashboard**: 메인 랜딩. 히스토리 확인 및 JD 입력 시작.
2.  **Job Analysis**: JD 분석 결과 확인 및 수정.
3.  **Resume Input**: [NEW] 이력서 업로드 또는 텍스트 입력.
4.  **Resume Result**: [NEW] 이력서 분석(강점/경험) 결과 확인.
5.  **Mode Selection**: 면접 모드(채팅/화상) 및 페르소나 선택.

**UI 구성 요소**:
*   **Setup Sidebar**: Dashboard가 아닐 때(Setup 모드 진입 시) 좌측에 등장. 현재 단계(JD->Resume->Mode)를 하이라이트.
*   **Navigation**: 각 단계별 `다음` 및 `이전으로` 버튼 제공. `sessionStorage`로 진행 상태 보존.

---

### 3.2 JD 입력 및 분석 (`JobUrlInput`, `JobAnalysisResult`)

**기능**:
- URL 입력 또는 파일(PDF) 업로드.
- AI 분석 결과(Mock)를 카드 형태로 보여주고 수정 가능.

---

### 3.3 [NEW] 이력서 통합 (`ResumeInput`, `ResumeAnalysisResult`)

**목표**: JD뿐만 아니라 사용자 이력서를 함께 분석하여 맞춤형 질문 생성.

**UI 계층**:
- `ResumeInput`
    - 탭: 파일 업로드(PDF/Img) / 텍스트 직접 입력
    - Mock OCR 로딩 시뮬레이션
- `ResumeAnalysisResult`
    - 핵심 역량(Core Competencies) 태그
    - 주요 경험(Key Experiences) 요약
    - 예상 질문(Potential Questions) 미리보기

**Mock 타입**:
```ts
export interface ResumeAnalysis {
  summary: string;
  skills: string[];
  experiences: {
    title: string;
    description: string;
    keywords: string[];
  }[];
  strength: string[];
}
```

---

### 3.4 면접 방식 선택 (`ModeSelection`)

**UI**:
- **사전 QnA**: 채팅 기반 텍스트 면접
- **실전 모의 면접**: 화상/음성 기반 면접
- **페르소나 설정**: 면접관 성향(온화/압박/기술) 선택

---

### 3.5 세션 페이지 (Static Routes)

*   `/interview/pre-qna`: 텍스트 전용 채팅 인터페이스. 별도 설정 없이 바로 진입.
*   `/interview/room`: 화상 면접 인터페이스. 카메라/마이크 권한 제어 및 면접관 이미지 표시.
*   `/interview/result`: 면접 결과 리포트. 차트 및 피드백 시각화.

*Note: 동적 라우팅(`[id]`)은 현재 단계에서 제거하고 Static Route로 단순화하여 UI 개발에 집중합니다.*

---

## 4. 개발자 친화 UI 가이드 (Hover Tooltip)

기존 계획 동일 유지. `DevHint` 컴포넌트를 사용하여 각 주요 기능, 특히 **Mock 데이터가 사용되는 부분**이나 **백엔드 연동 시 주의사항**을 툴팁으로 안내합니다.

---

## 5. Mock 데이터 전략

- `/mocks/interview-data.ts` 확장:
    - `MOCK_RESUME_ANALYSIS` 추가
    - `MOCK_HISTORY`에 이력서 기반 면접 케이스 추가

---

## 6. 유지보수 관점 원칙 (V2.0 Update)
- **SPA & Sidebar**: 유저가 "준비 과정"을 하나의 흐름으로 느끼게 하는 것이 핵심입니다.
- **State Persistence**: `sessionStorage`를 활용하여 새로고침 시에도 `viewState`를 유지해야 합니다.
- **Visual Consistency**: Setup 과정의 Header와 Layout이 Dashboard와 이질감이 없도록 공통 컴포넌트나 스타일을 유지합니다.

---

문서 끝.
