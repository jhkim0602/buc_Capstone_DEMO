# AI 면접 서비스 애자일 개발 기획서 (FastAPI 백엔드) - v2.1

본 문서는 Frontend V2.0 (SPA Setup Flow, 이력서/JD 분석 선행)에 맞춰 **사용자 검증 루프**를 포함하도록 고도화된 백엔드 시스템 기획서입니다.
기존 시스템의 정교한 RAG 로직을 계승하되, **"분석 -> 사용자 검토 -> 면접 생성"**의 명확한 3단계를 지원하는 API 설계를 목표로 합니다.

---

## 1. 프로젝트 비전 및 목표 (Vision & Goals)

### 비전 (Vision)
단순한 질문 생성을 넘어, **"내가 제출한 서류를 AI와 함께 검토하고"**, 이를 바탕으로 **"가장 나다운 면접"**을 경험하게 한다.

### 핵심 목표 (Key Goals)
1.  **Interactive Analysis (상호작용적 분석)**: 이력서와 JD를 단순히 내부적으로 씹어먹는 것이 아니라, **분석 결과를 JSON으로 리턴**하여 사용자가 확인하고 수정할 수 있게 한다.
2.  **Structured Context (구조화된 컨텍스트)**: 사용자가 검증 완료한 이력서/JD 데이터(Modified Context)를 기반으로 질문을 생성하여 신뢰성을 높인다.
3.  **Real-time Logic Parity**: 기존 `API-develop`의 비언어/질문생성 로직을 FastAPI 비동기 파이프라인으로 완전 이식한다.
4.  **Modular RAG**: 이력서 분석, JD 분석, 질문 생성을 각각 독립적인 모듈(Chain)로 구성하여 재사용성을 높인다.

---

## 2. 에픽 (Epics) - 핵심 기능 그룹 (Updated)

| ID | 에픽 명 (Epic Name) | 설명 (Description) | Frontend 연동 |
|:--:|:---|:---|:---|
| **E01** | **채용공고(JD) 분석 엔진** | URL/텍스트 입력을 받아 직무/우대사항/기술스택으로 구조화하여 반환 | `JobAnalysisResult` |
| **E02** | **이력서(Resume) 인사이트 엔진** | 이력서(PDF/Text)를 파싱하여 핵심 역량, 주요 경험, 예상 강점을 추출하여 반환 | `ResumeAnalysisResult` |
| **E03** | **맞춤형 면접 설계 엔진** | 검증된 JD + 이력서 데이터를 결합하여 면접 질문(Hard/Soft/Situational) 생성 | `ModeSelection` -> `Room` |
| **E04** | **실시간 인터뷰 세션** | WebSocket을 통한 음성 스트리밍(TTS/STT) 및 인터랙션 제어 | `/interview/room` |
| **E05** | **비언어적 행동 분석** | 시선, 표정, 자세, 목소리 톤 등의 멀티모달 신호 분석 및 그래프 생성 | Report Background |
| **E06** | **종합 피드백 리포트** | 면접 결과, 스크립트, 5대 분석 그래프를 포함한 상세 리포트 제공 | `/interview/result` |

---

## 3. 프로덕트 백로그 & 유저 스토리 (Detailed)

### E01. 채용공고(JD) 분석 엔진
> **Goal**: 프론트엔드의 "Step 1: 공고 분석 결과"에 매핑되는 데이터를 생성한다.

- **US-1.1 (JD Parsing API)**: `POST /api/analyze/jd`
    - Input: `url` or `text` or `file`
    - Output: `{ company, position, responsibilities[], qualifications[], techStack[] }`
    - Logic: Playwright(URL) or OCR -> LLM Structuring -> JSON Return
- **US-1.2 (User Modification Support)**: 사용자가 프론트엔드에서 수정한 JD 데이터를 이후 "면접 생성" 단계의 Input으로 받아들일 수 있어야 한다.

### E02. 이력서(Resume) 인사이트 엔진 [NEW]
> **Goal**: 프론트엔드의 "Step 3: 이력서 분석 결과"에 매핑되는 데이터를 생성한다.

- **US-2.1 (Resume Parsing API)**: `POST /api/analyze/resume`
    - Input: `file` (PDF/Img) or `text`
    - Output: `{ summary, skills[], experiences[{title, desc}], strengths[] }`
    - Logic: `PyPDFLoader` -> LLM Summary Chain -> Key Experience Extraction
    - **중요**: 여기서 추출된 `strengths`(강점)는 추후 면접 질문 생성의 핵심 재료로 쓰임.

### E03. 맞춤형 면접 설계 엔진 (Context Fusion)
> **Goal**: 검증된 서류 데이터(JD + Resume)를 합쳐 최적의 질문 리스트를 만든다.

- **US-3.1 (Session Initialization API)**: `POST /api/interview/init`
    - Input: `jd_data` (Final), `resume_data` (Final), `mode` ('video'|'chat'), `persona`
    - Output: `session_id`, `first_question` (audio_url if video)
    - Logic:
        1.  User-verified Data 수신 (프론트에서 수정된 최종본)
        2.  `QuestionGenerationChain` 실행 (System Prompt에 Persona 반영)
        3.  초기 질문 생성 및 Session DB 생성

### E04. 실시간 인터뷰 세션 (Live Session)
- **US-4.1 (WebSocket Connection)**: `ws://api/interview/{session_id}/ws`
    - 양방향 통신: [Client] Audio Stream -> [Server] STT -> LLM -> TTS -> [Client] Audio Stream
    - Latency 1초 이내 목표.

### E05. 비언어적 행동 분석 (Non-Verbal)
- **US-5.1 (Multi-modal Pipeline)**:
    - Video Frame & Audio Chunk를 받아 분석 수행.
    - 프론트엔드에 실시간 결과를 주지 않고, **DB에 시계열로 적재**만 수행 (부하 분산).

### E06. 종합 피드백 리포트
- **US-6.1 (Report Generation API)**: `GET /api/interview/{session_id}/report`
    - 세션 종료 후 호출 시, 적재된 대화 로그 + 비언어 데이터를 집계하여 리턴.

---

## 4. API 인터페이스 명세 (Draft)

### 4.1 분석 (Setup Phase)
- `POST /v1/analysis/jd`: 채용공고 분석
- `POST /v1/analysis/resume`: 이력서 분석 (파일 업로드 포함)

### 4.2 인터뷰 (Session Phase)
- `POST /v1/interviews`: 인터뷰 세션 생성 (최종 JD/이력서 데이터 포함)
- `WS /v1/interviews/{id}/chat`: 텍스트 면접 소켓 (Pre-QnA용)
- `WS /v1/interviews/{id}/stream`: 화상 면접 소켓 (Audio/Video 스트림)

### 4.3 결과 (Result Phase)
- `GET /v1/interviews/{id}/report`: 최종 리포트 조회
- `GET /v1/users/history`: 내 면접 기록 조회

---

## 5. 테크 스택 업데이트
- **Schema Validation**: Pydantic v2 (프론트엔드 타입과 동기화 용이)
- **Parsing**: `LlamaParse` or `Unstructured` (복잡한 이력서 파싱 강화 고려)
- **Orchestration**: `LangGraph` 도입 고려 (분석 -> 검토 -> 생성 흐름 제어)

---

## 6. 마이그레이션 & 고도화 포인트
1.  **Stateful vs Stateless**: 분석 단계(Setup)는 **Stateless**하게(요청->분석->반환) 설계하고, 최종 세션 생성 시점에만 **Stateful**하게(DB저장) 전환하여 서버 리소스를 아낀다.
2.  **프론트엔드 데이터 신뢰**: 백엔드는 "자신이 파싱한 데이터"보다 "프론트엔드에서 사용자가 수정해서 보낸 데이터"를 최종본으로 신뢰하는 구조로 간다. (Human-in-the-loop)
