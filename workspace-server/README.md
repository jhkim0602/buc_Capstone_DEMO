# Workspace Server

StackLoad 프로젝트의 실시간 협업 기능을 담당하는 WebSocket 서버입니다.
Socket.IO 및 Yjs를 사용하여 실시간 화이트보드, 채팅, 커서 공유 등의 기능을 제공합니다.

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

- `src/`: 서버 소스 코드
    - `modules/`: 기능별 모듈 (board, chat, socket 등)
- `.env`: 환경 변수 설정
