# Dibut 해커톤 팀빌딩 워크스페이스 기획서

## 0. 요약
해커톤 정보를 제공하는 웹에서 "팀원 모집 -> 초대 -> 해커톤 전용 워크스페이스 생성" 흐름을 완성한다. 생성된 워크스페이스는 별도로 분리된 **`workspace-server`**를 통해 팀 멤버들에게 실시간 화이트보드 및 칸반 협업 환경을 제공한다.

## 1. 목표
- 해커톤 페이지에서 팀 빌딩과 초대가 자연스럽게 이어지는 흐름 제공.
- 초대 링크 기반으로 팀원이 워크스페이스에 합류.
- **실시간성 보장**: `workspace-server` (Yjs/Socket.io)를 통한 끊김 없는 협업.

## 2. 사용자/역할 (Roles)
- **Organizer**: 해커톤 주최자.
- **Team Lead**: 팀 생성 및 초대 권한 보유.
- **Member**: 협업 참여 (코드 편집, 태스크 이동 등).
- **Viewer**: 읽기 전용 접근.

## 3. 핵심 사용자 흐름 (User Flow)
### 3.1 해커톤 -> 팀 빌딩 -> 워크스페이스 생성 (Planned)
1) 해커톤 상세 페이지에서 "팀원 모집" 버튼 클릭.
2) 팀 생성(팀명, 목표, 필요 역할/기술, 간단 소개).
3) 해커톤 템플릿 기반 워크스페이스 자동 생성. (DB Trigger 또는 API 호출)
4) 팀 리더가 초대 링크를 공유.

### 3.2 워크스페이스 내 협업 (In Progress)
- **화이트보드**: `workspace-server`의 Yjs 게이트웨이를 통해 실시간 드로잉 동기화.
- **칸반 보드**: 업무 흐름 시각화 및 실시간 상태 동기화.
- **채팅**: 팀 채널 및 스레드 (Socket.io).

## 4. 해커톤 워크스페이스 기본 구조
- **Board**: 칸반 보드 (UI 구현 완료, 실시간 연동 예정)
- **Ideas**: 화이트보드 (UI 구현 완료, SDK 적용됨)
- **Docs**: 요구사항/기획 정리 (Tiptap 에디터 적용됨)

## 5. 기술 구현 전략 (Technical Status)
현재 **Phase 1-2** 단계로 진입하여, 독립적인 워크스페이스 서버가 구축되어 있습니다.

### 5.1 아키텍처
- **Front-end**: Next.js 14, shadcn/ui.
- **Back-end**: Node.js `workspace-server` (Separate Repo/Folder).
- **Sync Engine**:
    - **Yjs**: 화이트보드, 문서 등 텍스트/좌표 데이터의 충돌 없는 병합.
    - **Socket.io**: 채팅, 알림, Presence 이벤트.

### 5.2 저장 및 히스토리
- **Snapshot**: Yjs 바이너리 업데이트를 일정 주기마다 Supabase에 Blob 형태로 저장.
- **History**: 중요 마일스톤마다 스냅샷 생성 기능 제공 예정.

## 6. 구현 로드맵
Phase 1 (MVP) - **[Completed]**:
- [x] 워크스페이스 서버 분리 (`workspace-server`)
- [x] 칸반, 화이트보드 기본 UI 구현

Phase 2 (안정화) - **[In Progress]**:
- [ ] Yjs-Frontend 연동 (실시간 커서, 드로잉 Sync)
- [ ] 해커톤 팀 생성 Flow UI 개발

Phase 3 (Production):
- [ ] Redis Adapter 도입 (Scale-out)
- [ ] 음성/화상 채팅 연동 (LiveKit 활용)
