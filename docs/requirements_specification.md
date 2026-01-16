# 요구사항 명세서 (Requirements Specification)

**Project Status**: `Development` (Next.js 14 App Router, Supabase, Workspace Server Separated)

## 1. AI 면접 및 분석 (AI Interview)
**Status**: `User Interface Implemented` / `Real-time Logic In Progress`

| ID | 명칭 | 설명 | 상태 | Implementation Ref |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-AI-000** | **AI 면접 및 분석** | **사용자 맞춤형 면접 학습지원** | - | `web/app/interview` |
| REQ-AI-001 | 공고 URL 파싱 | 사용자가 입력한 채용 공고 URL(사람인 등)에서 본문/이미지를 추출 | **Done** | `crawler/scripts/saramin_standalone.py` |
| REQ-AI-002 | 핵심 데이터 구조화 | Firecrawl + Gemini를 활용하여 JD, 자격요건, 우대사항 등 구조화 | **Done** | `crawler` |
| REQ-AI-003 | 역량 매칭 분석 시각화 | 유저 스택 vs 공고 스택 비교 및 매칭 점수 시각화 | Planned | - |
| REQ-AI-004 | 맞춤형 면접 질문 생성 | JD 기반 기술/인성/적합성 질문 생성 (Gemini 2.0 Flash) | Implemented | `web/app/interview/pre-qna` |
| REQ-AI-005 | 하드웨어 체크 | 입장 전 웹캠/마이크 권한 및 상태 확인 UI | **Done** | `web/app/interview/room` |
| REQ-AI-006 | 실시간 화상 면접 | WebRTC (LiveKit) 기반 화상 면접 화면 구성 (좌:AI, 우:User) | **Done** | `web/app/interview/room` |
| REQ-AI-007 | TTS/STT 질문 답변 | AI 질문 음성 출력 및 사용자 답변 실시간 텍스트 변환 | Planned | - |
| REQ-AI-008 | 면접 피드백 리포트 | 종합 점수 및 개선안 리포트 페이지 | **Done** (UI) | `web/app/interview/result` |

## 2. 커리어 (Career)
**Status**: `Data Collection Implemented` (Crawler) / `Web UI Implemented`

| ID | 명칭 | 설명 | 상태 | Implementation Ref |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-CAR-000** | **커리어 성장 지원** | **개발자 맞춤형 채용 공고 및 대외활동 정보 제공** | - | `web/app/career`, `crawler` |
| REQ-CAR-001 | 채용 공고 딥 서치 | 키워드 매칭 + 의미 검색 (Deep Search) | Planned | - |
| REQ-CAR-002 | 기술 스택 자동 분류 | 공고 텍스트에서 기술 태그 자동 추출 (Gemini) | **Done** | `crawler` |
| REQ-CAR-003 | 대외활동 정보 애그리게이션 | 해커톤, 부트캠프 등 정보 수집 및 제공 | Planned | - |
| REQ-CAR-004 | 기술 블로그 모음 (StackLoad) | 기업/개인 기술 블로그 RSS 수집 및 피드 제공 | **Done** | `web/app/career`, `crawler` (StackLoad Logic) |

## 3. 워크스페이스 (Workspace)
**Status**: `Server Architecture Separated` / `Real-time Collab In Progress`

| ID | 명칭 | 설명 | 상태 | Implementation Ref |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-WS-000** | **실시간 협업 워크스페이스** | **팀 빌딩 및 프로젝트 관리** | - | `web/app/workspace`, `workspace-server` |
| REQ-WS-001 | 워크스페이스 서버 분리 | Scalability를 위해 WebSocket/CRDT 서버를 별도 Node.js 앱으로 분리 | **Done** | `workspace-server` |
| REQ-WS-002 | 칸반 보드 (Kanban) | dnd-kit 기반 태스크 관리, 상태 변경, 드래그 앤 드롭 | **Done** (UI) | `web/components/features/workspace/kanban-board.tsx` |
| REQ-WS-003 | 실시간 동기화 (Yjs) | 다중 사용자 간 태스크 이동/수정 사항 실시간 반영 | **In Progress** | `workspace-server/src/modules/board` |
| REQ-WS-004 | 아이디어 보드 (Whiteboard) | tldraw/Excalidraw 기반 화이트보드 협업 | **Done** (UI) | `web/components/features/workspace/idea-board` |
| REQ-WS-005 | 채팅 및 Presence | 실시간 채팅 및 현재 접속자 커서/상태 표시 | Planned | `workspace-server` (Socket.io ready) |
| REQ-WS-006 | 해커톤 팀 빌딩 | 해커톤 참여 -> 팀 생성 -> 워크스페이스 자동 생성 흐름 | Planned | `docs/HACKATHON_WORKSPACE_PLAN.md` |

## 4. 커뮤니티 (Community)
**Status**: `Planned`

| ID | 명칭 | 설명 | 상태 | Implementation Ref |
| :--- | :--- | :--- | :--- | :--- |
| REQ-COM-001 | 카테고리별 게시판 | Q&A, 자유, 스터디 모집 등 | Planned | `web/app/community` |
| REQ-COM-002 | 마크다운 에디터 | Tiptap 기반 블로그형 에디터 | **Done** (Component) | `web/components/details/editor` |
