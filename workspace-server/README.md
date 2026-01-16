# Workspace Server

StackLoad 프로젝트의 실시간 협업 기능을 담당하는 WebSocket 서버입니다.
Socket.IO 및 Yjs를 사용하여 실시간 화이트보드, 채팅, 커서 공유 등의 기능을 제공합니다.

## 🏗 아키텍처 및 연결 구조 (Architecture & Connection)

**Web Client(`web`)**와 **Workspace Server**는 **WebSocket (Port 4000)**을 통해 실시간으로 연결됩니다.

### 1. 연결 프로토콜 및 포트
- **Port**: `4000` (단일 포트에서 경로/프로토콜에 따라 분기 처리)
- **Protocols**:
    - **Yjs (`ws://`)**: 실시간 화이트보드 동기화 (Excalidraw)
    - **Socket.io (`ws://`)**: 채팅, 룸 입장, 사용자 상태(Presence) 관리

### 2. 기능별 구현 현황

#### A. 화이트보드 (Whiteboard) - [연결됨]
- **Web**: `y-websocket`을 사용하여 `ws://localhost:4000`에 접속합니다. (`IdeaBoardSDK` 컴포넌트)
- **Server**: `Yjs Gateway`가 HTTP Upgrade 요청을 감지하여 WebSocket 연결을 수립하고, 드로잉 데이터를 실시간 동기화합니다.

#### B. 채팅 및 상태 (Chat & Presence) - [서버 준비 완료]
- **Web**: 현재 연동 전입니다. (`socket.io-client` 추가 필요)
- **Server**: `Socket.io Gateway`가 구현되어 있으며, 룸 입장(`join`) 및 메시지 이벤트 등을 처리할 준비가 되어 있습니다.

## 🚀 시작하기

### 1. 환경 설정

**의존성 설치**

```bash
npm install
# 또는
pnpm install
```

**환경 변수 설정**

`.env.example` 파일을 복사하여 `.env` 파일을 생성하고 설정을 확인하세요.

```bash
cp .env.example .env
```

### 2. 실행 방법

**개발 모드 실행**

```bash
npm run dev
```
서버는 기본적으로 `4000` 포트에서 실행됩니다. (`.env`에서 변경 가능)

**프로덕션 빌드 및 실행**

```bash
npm run build
npm start
```

## 📁 디렉토리 구조

- `src/`
    - `modules/`
        - `board/`: Yjs 화이트보드 게이트웨이 및 로직
        - `chat/`: 채팅 비즈니스 로직
        - `socket/`: Socket.io 게이트웨이 및 이벤트 핸들러
    - `config/`: 환경 변수 등 설정
    - `index.ts`: 서버 엔트리포인트 (HTTP Server + Socket.io + WebSocket 결합)
- `.env`: 환경 변수 설정
