# AI 면접 서비스 애자일 개발 기획서 (FastAPI 백엔드) - v2.2

본 문서는 Frontend V2.0 (5-Step Setup Flow: Target -> JD -> Resume -> Check -> Final)에 맞춰 **사용자 검증 루프**를 포함하도록 고도화된 백엔드 시스템 기획서입니다.
기존 시스템의 정교한 RAG 로직을 계승하되, **"분석 -> 사용자 검토/수정 -> 최종 확정 -> 면접 생성"**의 명확한 흐름을 지원하는 API 설계를 목표로 합니다.

---

## 1. 프로젝트 비전 및 목표 (Vision & Goals)

### 비전 (Vision)
단순한 질문 생성을 넘어, **"내가 제출한 서류를 AI와 함께 정밀하게 검토하고"**, 이를 바탕으로 **"가장 나다운 면접"**을 경험하게 한다.

### 핵심 목표 (Key Goals)
1.  **Interactive Analysis (상호작용적 분석)**: 백엔드는 **Raw Analysis Data(JSON)**를 제공하고, 최종 컨텍스트의 결정권은 사용자(프론트엔드)에게 위임한다. (Human-in-the-loop)
2.  **Structured Context (구조화된 컨텍스트)**: 'Final Check' 단계에서 확정된 데이터(Verified Context)를 기반으로 질문을 생성하여 신뢰성을 극대화한다.
3.  **Real-time Logic Parity**: WebSocket 기반의 저지연(Low Latency) 음성/텍스트 인터뷰 환경을 구축한다.

---

## 2. 에픽 & 매핑 (Epics & Feature Mapping)

| ID | 에픽 명 (Epic Name) | 설명 (Description) | Frontend Step (V2) |
|:--:|:---|:---|:---|
| **E01** | **채용공고(JD) 분석 엔진** | URL/텍스트를 직무/요구사항/기술스택으로 구조화 | Step 2: `JD Check` |
| **E02** | **이력서(Resume) 인사이트 엔진** | 이력서를 파싱하여 핵심 역량, 경험, 프로젝트 구조화 | Step 4: `Resume Check` |
| **E03** | **맞춤형 면접 설계 엔진** | **Final Check(Step 5)** 완료된 데이터를 수신하여 면접 세션 및 질문 생성 | `Start Interview` Action |
| **E04** | **실시간 인터뷰 세션** | WebSocket을 통한 음성 스트리밍(TTS/STT) 및 인터랙션 제어 | `/interview/dashboard` |
| **E05** | **종합 피드백 리포트** | 면접 결과, 스크립트, 분석 그래프를 포함한 상세 리포트 제공 | `/interview/result` |

---

## 3. 프로덕트 백로그 & 유저 스토리 (Detailed)

### E01. 채용공고(JD) 분석 엔진
> **Goal**: 프론트엔드 Step 2에서 사용자가 확인할 초안 데이터를 생성한다.

- **US-1.1 (JD Parsing API)**: `POST /api/v1/analysis/jd`
    - Logic: Playwright(URL) or Text Analysis -> LLM Structuring -> JSON Return
    - **중요**: 저장은 하지 않음 (Stateless).

### E02. 이력서(Resume) 인사이트 엔진
> **Goal**: 프론트엔드 Step 4에서 사용자가 확인할 초안 데이터를 생성한다.

- **US-2.1 (Resume Parsing API)**: `POST /api/v1/analysis/resume`
    - Logic: `PyPDFLoader` -> LLM Summary Chain -> Key Experience Extraction -> JSON Return
    - **중요**: 사용자가 수정/삭제할 수 있도록 최대한 상세하게 구조화하여 반환.

### E03. 맞춤형 면접 설계 엔진 (Context Fusion)
> **Goal**: Step 5(Final Check)에서 사용자가 "면접 시작"을 눌렀을 때 호출됨.

- **US-3.1 (Session Initialization API)**: `POST /api/v1/interviews/init`
    - **Input**: `jd_data` (Final), `resume_data` (Final), `config`
    - **Logic**:
        1.  User-verified Data 수신 (프론트엔드가 Source of Truth)
        2.  Session DB 생성 및 데이터 스냅샷 저장
        3.  `QuestionGenerationChain` 실행 (System Prompt에 Persona 반영)
        4.  초기 질문 생성 (Ice Breaking)

### E04. 실시간 인터뷰 세션 (Live Session)
- **US-4.1 (WebSocket Connection)**: `ws://api.../ws/interview/{session_id}`
    - STT/TTS 파이프라인 통합.
    - AI Agent(LangGraph 추천)가 대화 흐름 제어 (질문 -> 답변듣기 -> 평가 -> 꼬리질문 or 다음질문).

---

## 4. 마이그레이션 & 고도화 포인트
1.  **Stateful vs Stateless**: 분석 단계(Step 1~4)는 **Stateless**하게 설계하여 불필요한 DB I/O를 줄인다.
2.  **Final Context Authority**: 백엔드는 스스로 파싱한 데이터보다, **클라이언트가 최종적으로 전송한 JSON 데이터**를 무조건적으로 신뢰하여 질문 생성의 재료로 사용한다.

