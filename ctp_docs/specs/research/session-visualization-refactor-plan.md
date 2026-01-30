# Session Visualization Refactor Plan

## 목적
- 세션별(Linear/Non-Linear/Algorithms)로 **시각화 전략을 분리**하고,
  학습 난이도에 맞는 **구현 중심 시뮬레이터**로 고도화한다.
- ReactFlow의 한계를 넘기 위해 **Tracer 기반 이벤트 시각화**를 도입한다.

## 범위
- 유지/보강: Linear DS (Array/Linked/Stack/Queue/Hash)
- 전환: Non-Linear 고난이도(Graph/Trie/Union-Find/Advanced Graph)
- 확장: Algorithms(DFS/BFS/Shortest Path/Advanced Graph) Tracer 연동

---

## 세션별 목표/전략

### 1) Linear DS (유지 + 보강)
- **현 상태**: ReactFlow + Adapter + Skulpt
- **목표**: 코드→시각화 학습 효과 유지, 하이라이트 규약 일관화
- **핵심 과제**
  - Adapter 변수 규약 문서 고정(활성/비교/방문)
  - 시뮬레이터 상태 스냅샷 정밀도 개선(재할당/재배열)
  - 운영 정책 유지(Button → Code)

### 2) Non-Linear DS (부분 전환)
- **Tree/Heap**: ReactFlow 유지(기본 구조 학습/코드 기반 가능)
- **Graph/Trie/Union-Find**: Tracer 기반 구조 시각화 전환 + **GraphSvgVisualizer 적용**
  - Graph: 방문/간선Relax/확정 노드/거리 갱신 이벤트
  - Trie: insert/search/prefix 경로 이벤트
  - Union-Find: find 경로/union 병합/부모 갱신 이벤트

### 3) Algorithms (Tracer 확대 적용)
- **DFS/BFS**: 그래프 이벤트 기반 하이라이트 강화
- **Shortest Path**: 거리 갱신/확정 노드/경로 복원 강조
- **Advanced Graph**: Topo/MST에서 간선 선택/차단 시각화
- **Sorting/DP**: 기존 Code 기반 유지, 필요 시 Tracer 확장 고려



---

## 단계별 실행 계획

### Phase R0: 설계 확정
- Tracer 이벤트 스펙 확정 (graph/trie/union-find)
- 전환 대상 확정 및 타임라인 확정
- 샘플 코드 규약(변수명/이벤트명) 고정

### Phase R1: Tracer 런타임
- Skulpt Worker에서 이벤트 수집 레이어 추가
- 이벤트 → 상태 변환 파이프라인 구축
- StepPlayer 동기화 및 안전 가드(무한 루프 방지)

### Phase R2: Non-Linear 전환
- Graph/Trie/Union-Find 전용 시각화 컴포넌트 구축
- 이벤트 기반 하이라이트 적용 (경로/부모/거리)
- 기존 ReactFlow 기반 시각화와 비교 검증

### Phase R3: Algorithms 전환
- DFS/BFS/Shortest Path/Advanced Graph 이벤트 연동
- 알고리즘별 이벤트 템플릿/코드 샘플 제공

### Phase R4: QA/평가
- 런타임 검증 체크리스트 적용
- 시뮬레이터 점수 재평가
- 학습 효과 테스트 기록

---

## Deliverables
- Tracer 스펙 문서 확정판
- 세션별 이벤트 템플릿/샘플 코드
- 신규 시각화 컴포넌트 3종(Graph/Trie/Union-Find)
- 운영 정책/학습 가이드 업데이트
- 점수 재평가 리포트

---

## 성공 기준
- 고난이도 구조에서 **코드→시각화 일관성** 확보
- ReactFlow의 구조 한계(복잡한 경로/부모 갱신)가 해소됨
- 런타임 오류/무한 루프 이슈 0건
