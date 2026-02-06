# Dibut 워크스페이스 구축 및 고도화 전략 (Workspace Deep Dive Planning)

> **문서 개요**: 본 문서는 Dibut의 핵심 엔진인 **'실시간 협업 워크스페이스(Workspace)'**의 현재 구현 상태와 향후 고도화 전략을 다룹니다. `workspace-server` 분리 및 초기 UI 구현이 완료된 시점을 기준으로 작성되었습니다.

---

## 1. 워크스페이스 현황 및 기능 진단 (Current Status Analysis)

현재 Dibut 워크스페이스는 별도의 WebSocket 서버(`workspace-server`)를 분리하여 운영 중이며, `shadcn/ui` 기반의 프론트엔드와 연동되어 있습니다.

### 1.1 구현된 기능 (Implemented Features)
*   **Architecture**:
    *   **Server Separation**: `workspace-server` (Node.js/Express + Socket.io + Yjs)가 분리되어 독립적으로 실행됨.
    *   **Tech Stack**: Next.js 14 (Web) + Node.js (Server).
*   **Kanban Board**:
    *   `dnd-kit`을 활용한 태스크 카드 이동 UI 구현 완료.
    *   컬럼 추가/삭제 및 순서 변경 UI 구현 완료.
    *   빈 컬럼 숨기기/보이기 토글 기능 구현 완료.
*   **Idea Board (Whiteboard)**:
    *   화이트보드 SDK (`components/features/workspace/detail/idea-board/idea-board-sdk.tsx`) 연동.
    *   기본적인 그리기 및 객체 조작 가능.
*   **UI/UX**:
    *   `shadcn/ui` 기반의 Sheet(사이드패널), Dialog, Dropdown 등 통일된 디자인 시스템 적용.

### 1.2 진행 중 및 예정 과제 (In Progress & Planned)
*   **실시간 동기화 (Real-time Sync)**:
    *   `workspace-server`에 Yjs Gateway가 설정되어 있으나, 프론트엔드 연동 최적화 필요.
    *   칸반 보드 데이터의 완전한 CRDT 적용 (동시 수정 충돌 방지).
*   **채팅 및 Presence**:
    *   접속자 목록 및 실시간 커서 공유 기능 연동 예정.

---

## 2. 상세 요구사항 명세서 (Detailed Requirements Specification)

실제 구현된 서버 아키텍처를 바탕으로 한 상세 요구사항입니다.

### 2.1 P0: 실시간 협업 엔진 (The Real-time Engine)

`workspace-server`가 전담하는 핵심 기능입니다.

*   **[REQ-WS-CORE-001] Socket.io + Yjs 하이브리드 아키텍처 (Implemented)**
    *   **Socket.io**: 룸(Room) 기반의 가벼운 이벤트(채팅, 알림, Presence) 처리.
    *   **Yjs**: 화이트보드 및 문서와 같은 복잡한 상태의 충돌 없는 병합(CRDT) 처리.
    *   **Persistence**: Yjs 업데이트(Update)를 주기적으로 DB에 스냅샷 저장 (Throttling).

*   **[REQ-WS-CORE-002] Presence System**
    *   **Avatar Pile**: 현재 워크스페이스에 접속한 사용자 목록 실시간 표시.
    *   **Mouse Tracking**: (옵션) 사용자 커서 위치 공유 (화이트보드 내).

### 2.2 P1: 심도 있는 프로젝트 관리 (Advanced Management)

*   **[REQ-WS-PM-001] 뷰(View) 시스템 강화**
    *   현재 구현된 칸반 뷰 외에 `List View`, `Calendar View` 확장 예정.
*   **[REQ-WS-PM-002] 컬럼 및 카드 기능 고도화**
    *   카드 내 서브 태스크(Checklist), 첨부 파일 기능 구현.
    *   컬럼 별 WIP(Work In Progress) 제한 설정 기능.

---

## 3. 기술 아키텍처 (Technical Architecture)

### 3.1 Workspace Server Structure
```
workspace-server/
├── src/
│   ├── modules/
│   │   ├── board/       # Yjs 기반 화이트보드/칸반 로직
│   │   ├── chat/        # Socket.io 기반 채팅 로직
│   │   └── socket/      # 소켓 게이트웨이 및 인증 처리
│   ├── index.ts         # 서버 엔트리포인트 (Http + Socket + Yjs)
│   └── ...
```

### 3.2 Frontend State Management
*   **Server State**: React Query를 사용하여 초기 데이터를 페칭.
*   **Real-time State**: Yjs Provider 혹은 Socket 이벤트를 통해 수신된 변경사항을 로컬 상태에 반영.
*   **Optimistic UI**: 사용자 액션 즉시 UI 반영 → 소켓 전송 → 실패 시 롤백 패턴 적용.

---

## 4. 로드맵 (Roadmap)

*   **Phase 1 (Current)**:
    *   `workspace-server` 분리 및 기본 실행 환경 구축. (완료)
    *   칸반/화이트보드 UI 컴포넌트 구현. (완료)
*   **Phase 2 (Next)**:
    *   칸반 보드 Yjs 연동 (실시간 이동 동기화).
    *   화이트보드 데이터 영속성 처리.
*   **Phase 3**:
    *   채팅 시스템 구현.
    *   해커톤 템플릿 적용 및 팀 초대 흐름 완성.
