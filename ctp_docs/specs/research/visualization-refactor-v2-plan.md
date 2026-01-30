# 시각화 리팩토링 V2 계획안 (근본 해결)

## 1) 목표
- 고난이도 시뮬레이터(그래프/트라이/UF/고급그래프)의 **신뢰도 100% 확보**
- “코드 → 시각화” 연결이 **항상 재현 가능**하도록 파이프라인 재설계
- Cytoscape/Adapter 의존을 최소화하고 **Tracer 기반 상태머신**으로 단순화

---

## 2) 핵심 문제 요약
- 실행은 성공하지만 **재실행 시 시각화가 빈 화면으로 고정되는 현상**
- 원인: 레이아웃/초기화 타이밍, Adapter 불안정, 상태 재활용 문제
- 학습효과 관점에서 **신뢰도 저하가 가장 치명적**

---

## 3) V2 리팩토링 원칙
1) **Trace-First**
   - globals 해석이 아니라 **Trace 이벤트**만으로 시각화 상태를 결정
2) **Deterministic Layout**
   - 동적 레이아웃 의존 최소화
   - 그래프/트리/트라이/UF에 대해 **정해진 배치 규칙** 적용
3) **State Machine**
   - 이벤트 스트림 → 상태 프레임(immutable snapshot) 변환
4) **재실행 안전성**
   - 매 실행마다 시각화 상태 강제 리셋

---

## 4) 새로운 아키텍처(V2)

### 4-1. Trace Layer
- 기존 `trace()`를 확장해 **프레임 단위 이벤트**를 생성
- `trace_flush()` 호출 시 프레임 확정
- breakpoints(라인 기반) 의존 최소화

### 4-2. State Reducer
- Trace 이벤트를 받아 `GraphState`로 변환
- Reducer는 **순수 함수**로 구현
- 상태는 `{ nodes, edges, overlays, meta }` 형태

### 4-3. Renderer
- Cytoscape 의존 제거
- SVG/Canvas 기반 **커스텀 렌더러**로 통일
- 레이아웃은 **도메인별 규칙 기반**
  - Tree/Trie: 계층형
  - Union-Find: 루트 중심 레벨 배치
  - Graph: BFS 레벨 or 고정 좌표
  - Advanced Graph: Topo/MST 전용 레이아웃

---

## 5) 실행 로드맵 (V2)

### Phase V2-0: 결정 고정
- Cytoscape 의존 제거 확정
- Trace-First 정책 승인

### Phase V2-1: Trace/State 표준화
- `trace_flush()` API 추가
- GraphState 스키마 확정
- 이벤트 → 상태 Reducer 설계

### Phase V2-2: Renderer 구축
- 커스텀 GraphRenderer 구현 (SVG 기반 1차 적용 완료)
- 레이아웃 모듈(계층형/레벨/UF) 구현 (Graph/Trie/UF 레이아웃 1차)
- Topo 전용 order 레이아웃 + 간선 상태 렌더링 1차 적용
- MST 전용 레이아웃(Trace relax 기반) 1차 적용
- Status: 완료 (2026-01-28)

### Phase V2-3: 모듈 전환
- Graph/Trie/Union-Find 전환
- Algorithms(DFS/BFS/Dijkstra/Topo/MST) 전환
- Trace-Only 모드 적용(Globals/Adapter 의존 최소화)
- Status: 완료 (2026-01-28)

### Phase V2-4: QA/학습효과 검증
- 런타임 검증
- 점수 재평가/학습 효과 리포트 확정
 - Status: 완료 (사용자 확인)

---

## 6) 성공 기준
- 재실행 100회 반복에도 **시각화 공백 0건**
- 고난이도 개념에서 **Trace 이벤트 → 렌더링** 일관성 확보
- 학습효과 점수 **+2 이상 상승** (Graph/Trie/UF/Advanced Graph)

---

## 7) 의사결정
- **완성도를 위해 비용/시간보다 안정성 우선**
- 단기 패치보다 **근본 리팩토링을 우선 채택**
