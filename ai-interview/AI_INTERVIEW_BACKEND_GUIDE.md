# AI 면접 백엔드 개발 가이드 (Implementation Guide)

본 문서는 프론트엔드의 "5단계 면접 준비(Setup) -> 실전 면접(Session)" 플로우를 뒷받침하기 위한 백엔드 구현 가이드입니다.

---

## 🏗️ 전체 아키텍처 흐름

1.  **Stateless Analysis (분석 단계)**
    - 프론트엔드에서 JD URL이나 이력서 파일을 보내면, 백엔드는 DB 저장 없이 **즉시 분석 결과(JSON)를 반환**합니다.
    - 사용자는 이 JSON 데이터를 프론트엔드에서 수정/검토합니다. (Human-in-the-loop)
2.  **Stateful Session (면접 시작)**
    - 사용자가 "Final Check"를 마치고 "면접 시작"을 누르면, 최종 수정된 데이터를 백엔드로 보냅니다.
    - 이때 백엔드는 **DB에 세션을 생성**하고 면접관 페르소나를 로딩합니다.

---

## 🚀 API 명세 (API Specifications)

### 1단계: 채용공고(JD) 분석

**Endpoint**: `POST /api/v1/analysis/jd`

-   **설명**: 텍스트 또는 URL 형태의 채용공고를 분석하여 구조화된 데이터로 변환합니다.
-   **Request Body**:
    ```json
    {
      "type": "url", // "url" | "text"
      "content": "https://wanted.co.kr/wd/..."
    }
    ```
-   **Response Body**:
    ```json
    {
      "role": "Frontend Developer",
      "company": "Toss",
      "main_responsibilities": ["React 기반 웹 서비스 개발", ...],
      "qualifications": ["React 3년 이상", ...],
      "preferred_skills": ["Next.js", "TypeScript"],
      "tech_stack": ["React", "TypeScript", "Next.js"]
    }
    ```
-   **Implementation Hint**:
    -   `Playwright`나 `BeautifulSoup`으로 텍스트 추출.
    -   LLM(GPT-4o/Claude)에 "채용공고에서 주요 업무, 자격요건, 우대사항, 기술스택을 JSON으로 추출해줘"라고 프롬프팅.

### 2단계: 이력서(Resume) 분석

**Endpoint**: `POST /api/v1/analysis/resume`

-   **설명**: 업로드된 이력서(PDF/Image) 또는 텍스트를 분석하여 핵심 역량과 경험을 추출합니다.
-   **Request**: `multipart/form-data` (file)
-   **Response Body**:
    ```json
    {
      "personal_info": { "name": "김개발", "email": "...", "intro": "..." },
      "skills": [{ "name": "React", "level": "Advanced" }, ...],
      "experience": [
        {
          "company": "A Corp",
          "period": "2021.01 - 2023.12",
          "position": "Frontend Dev",
          "description": "..."
        }
      ],
      "projects": [
        {
          "name": "B Project",
          "description": "...",
          "achievements": ["매출 20% 증대", "로딩 속도 50% 개선"]
        }
      ]
    }
    ```
-   **Implementation Hint**:
    -   `PyPDFLoader` 또는 `LlamaParse`로 텍스트/이미지 추출.
    -   LLM을 사용해 위 JSON 스키마에 맞춰 데이터 구조화.
    -   **Resume Check Step**에서 사용자가 수정할 수 있음을 고려하여, 너무 과한 요약보다는 "팩트 추출"에 집중.

### 3단계: 면접 세션 생성 (Final Check 완료 시)

**Endpoint**: `POST /api/v1/interviews/init`

-   **설명**: 검증이 완료된 JD와 이력서 데이터를 받아 면접 세션을 생성하고 초기화합니다.
-   **Request Body**:
    ```json
    {
      "jd_data": { ... },     // 사용자가 수정한 최종 JD 데이터
      "resume_data": { ... }, // 사용자가 수정한 최종 이력서 데이터
      "config": {
        "question_count": 5,
        "mode": "simulation", // "simulation" | "practice"
        "difficulty": "hard"
      }
    }
    ```
-   **Response Body**:
    ```json
    {
      "session_id": "uuid-v4...",
      "socket_url": "wss://api.stackload.com/ws/interview/{session_id}",
      "first_question": {
          "text": "안녕하세요, 지원해주신 OOO 포지션 면접을 시작하겠습니다. 간단한 자기소개 부탁드립니다.",
          "audio_url": "https://..." // TTS 오디오 (Optional)
      }
    }
    ```
-   **Implementation Logic**:
    1.  **DB 저장**: `sessions` 테이블에 `jd_snapshot`, `resume_snapshot` 저장 (분석 결과 보존).
    2.  **질문 생성 체인 가동**: JD와 이력서를 Combine하여 맞춤형 질문 리스트(5~10개) 생성 후 `questions` 테이블에 적재.
    3.  **첫 질문 반환**: 세션 ID와 함께 첫 번째 질문(보통 자기소개)을 반환.

---

## 🛠️ 기술 스택 권장사항 (Tech Stack)

1.  **Core Framework**: FastAPI (Python) - 비동기 처리에 유리.
2.  **LLM Orchestration**: LangChain + LangGraph
    -   `LangGraph`를 사용하여 면접의 흐름(질문 -> 답변 -> 꼬리질문 판단 -> 다음질문)을 상태 머신으로 관리하는 것을 추천.
3.  **Database**:
    -   RDB (PostgreSQL): 사용자 정보, 세션 메타데이터, 질문/답변 로그.
    -   Vector DB (Optional): RAG 기반 지식 검색이 필요한 경우 (예: "우리 회사 인재상" 검색).
4.  **Real-time**: WebSocket (FastAPI built-in).

## ✅ 개발 체크리스트

- [ ] JD 파싱/구조화 프롬프트 최적화 (특히 기술스택 추출 정확도)
- [ ] 이력서 파싱 시 PDF 포맷 대응 (표, 2단 레이아웃 등)
- [ ] 면접 질문 생성 로직 (JD의 요구사항과 이력서의 경험을 매칭하는 프롬프트)
- [ ] WebSocket 연결 안정성 테스트
