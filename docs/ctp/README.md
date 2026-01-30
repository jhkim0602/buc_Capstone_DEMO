# CTP (Code-to-Playground) 문서

자료구조 & 알고리즘 학습 플랫폼 CTP의 전체 아키텍처와 개발 가이드입니다.

## 빠른 시작
- [프로젝트 개요](./overview.md) - CTP가 무엇인지, 왜 만들어졌는지
- [빠른 시작 가이드](./development/quick-start.md) - 새 컨텐츠를 추가하는 방법

## 아키텍처
- [데이터 모델](./architecture/data-model.md) - CTP_DATA, Registry, Config 구조
- [컴포넌트 계층](./architecture/component-hierarchy.md) - React 컴포넌트 구조
- [시각화 시스템](./architecture/visualization-system.md) - 이원화 아키텍처 (Adapter vs Tracer)
- [실행 파이프라인](./architecture/execution-pipeline.md) - Skulpt 엔진과 데이터 흐름

## 개발 가이드
- [컨텐츠 추가하기](./development/adding-content.md) - 새 챕터/서브개념 추가 방법
- [어댑터 시스템](./development/adapters.md) - Adapter 작성 및 변수명 규약
- [Tracer 이벤트](./development/tracer-events.md) - Tracer 이벤트 스펙 및 사용법

## 레퍼런스
- [파일 구조](./reference/file-structure.md) - 디렉토리 구조 상세 설명
- [변수명 규약](./reference/naming-conventions.md) - Adapter가 인식하는 변수명
- [API 레퍼런스](./reference/api-reference.md) - 주요 타입 및 인터페이스

## 가이드
- [시각화 모드](./guides/visualization-modes.md) - Button vs Code 모드 정책
- [문제 해결](./guides/troubleshooting.md) - 자주 발생하는 문제 및 해결 방법

## 원본 문서
프로젝트 개발 과정의 상세 문서는 `/ctp_docs`에 보관되어 있습니다.
- `ctp_docs/handover.md` - 최신 인수인계서
- `ctp_docs/specs/core/` - 핵심 스펙
- `ctp_docs/specs/quality/` - 품질 문서
- `ctp_docs/specs/research/` - 리서치 문서
