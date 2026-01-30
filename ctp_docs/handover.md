# CTP 인수인계서

## 1) 목적/범위
- CTP 콘텐츠/시뮬레이터 고도화 진행 상황을 인수인계하기 위한 문서
- **코드 기반 시뮬레이터 전환(Queue/Deque/Hash + Graph/Trie/Union-Find/Algorithms)** 완료
- Graph 시각화는 **GraphSvgVisualizer 기반**으로 전환되어 구조/이벤트/레이아웃 제어 가능
- 콘텐츠 설명량(정의/불변식/플레이그라운드 관찰 포인트) 대폭 보강 완료

## 2) 문서 맵 (Spec Kit 스타일)
- 상위 개요/정책
  - `ctp_docs/overview.md`
  - `ctp_docs/decisions.md`
  - `ctp_docs/risks.md`
- 진행 상황
  - `ctp_docs/progress-tasks.md`
- Core 스펙 묶음
  - `ctp_docs/specs/core/README.md`
  - `ctp_docs/specs/core/spec.md`
  - `ctp_docs/specs/core/plan.md`
  - `ctp_docs/specs/core/tasks.md`
  - `ctp_docs/specs/core/validation.md`
- 품질 스펙 묶음
  - `ctp_docs/specs/quality/README.md`
  - `ctp_docs/specs/quality/spec.md`
  - `ctp_docs/specs/quality/analysis.md`
  - `ctp_docs/specs/quality/plan.md`
  - `ctp_docs/specs/quality/tasks.md`
  - `ctp_docs/specs/quality/policy.md`
  - `ctp_docs/specs/quality/mode-map.md`
  - `ctp_docs/specs/quality/simulator-scores.md`
  - `ctp_docs/specs/quality/runtime-visualization-report.md`
  - `ctp_docs/specs/quality/qa-checklist.md`

## 3) 최근 주요 변경 요약
- Graph 시각화: **GraphSvgVisualizer**로 전환
  - 정다각형 레이아웃 적용 + 줌/드래그/리셋 지원
  - `edge_relax` 강조 + w/d 간선 라벨 표시
  - 상태 패널(온/오프) + 이벤트 로그 표시
- DFS/BFS/Shortest/MST 등 이벤트 보강(`node_finalize`, parent 전달)
- Sorting/Graph/DP/Trie/Union-Find/Tree 등 **교재형 설명 대폭 보강**
- 코드 편집은 **USER CODE 블록만 편집** 가능한 정책 적용(시각화/출력 라인 숨김)

## 4) 현재 동작 요약
- Graph/Trie/Union-Find: 구조 시각화 + 이벤트 기반 강조 동작
- Algorithms: DFS/BFS/Shortest/Topo/MST 등 코드 실행 + 시각화 연동
- 상태 패널: 숨기기/보기 토글 제공, 요약 모드에서도 이벤트 로그 표시
- 버튼 기반 모드는 **입문 개념용**, 나머지는 코드 기반 시뮬레이터 중심

## 5) 알려진 제약/리스크
- 커스텀 구현은 변수명/trace 규약에 의존
  - Adapter/Tracer 규약을 벗어나면 시각화 반영률 저하
- Hash 충돌/리해시 애니메이션은 1차 적용 완료 상태(추가 고도화 여지 있음)
- QA(런타임 검증)는 **보류** 상태 → `qa-checklist.md` 기반 일괄 수행 필요

## 6) 다음 해야 할 일 (핵심)
1) QA 체크리스트 전면 실행
   - `ctp_docs/specs/quality/qa-checklist.md`
2) 런타임 회귀 점검 및 점수 재평가
   - `simulator-scores.md`, `analysis.md` 업데이트

## 7) 작업 포인트(코드 경로)
- Graph: `web/components/features/ctp/contents/categories/non-linear/concepts/graph/`
- Trie: `web/components/features/ctp/contents/categories/non-linear/concepts/trie/`
- Union-Find: `web/components/features/ctp/contents/categories/non-linear/concepts/union-find/`
- Algorithms: `web/components/features/ctp/contents/categories/algorithms/concepts/`
- Adapter: `web/components/features/ctp/adapters/`
- Visualizer: `web/components/features/ctp/playground/visualizers/`

## 8) 검증 가이드(간단)
- 런타임: 해당 챕터 페이지에서 코드 실행 → 시각화 업데이트 확인
- TOC: `?tocDebug=1` 실행 후 챕터 목차 확인
- 점수 업데이트: `ctp_docs/specs/quality/simulator-scores.md`와 `analysis.md`

## 9) 비고
- lint는 실행하지 않음(요청사항 준수)
- 문서/점수는 런타임 검증 후 확정 필요

## 10) 컨텍스트 재시작 시 필수 절차
- 새 세션/모델은 작업 전 **문서 맵(섹션 2)**를 먼저 읽고 진행
- 특히 `ctp_docs/progress-tasks.md`와 `ctp_docs/specs/research/refactor-tasks.md`를 확인해
  현재 단계/완료 범위를 먼저 동기화할 것
