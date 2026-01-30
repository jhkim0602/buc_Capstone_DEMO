# Tracer/DSL Spec (v1)

## 0) 목적
- 코드 실행(파이썬)과 시각화를 **이벤트 단위로 동기화**하기 위한 공통 스펙이다.
- 고난이도 구조(Graph/Trie/Union-Find/Algorithms)의 시각화 품질을 확보한다.

## 1) 설계 원칙
- **명시적 이벤트 호출**로 상태를 정의한다(암묵적 변수 해석 최소화).
- 구조별 **최소 이벤트 집합**으로 재사용성을 높인다.
- 이벤트는 **step 프레임 단위로 누적**되어 재생/되감기가 가능해야 한다.
- 렌더러는 이벤트를 **상태 맵**으로 변환한다.

## 2) 이벤트 스키마
```ts
type TraceScope =
  | "graph" | "trie" | "union-find"
  | "dfs" | "bfs" | "shortest-path" | "mst" | "topo"
  | "sorting" | "array";

interface TraceEvent {
  type: string;                 // "node_active", "edge_relax" 등
  scope: TraceScope;            // 시각화 도메인
  payload?: Record<string, any>;
  line?: number;                // 실행 라인 번호
  step?: number;                // 프레임 인덱스(선택)
  timestamp?: number;           // optional
}

interface TraceFrame {
  line?: number;
  events: TraceEvent[];
}
```

## 3) 공통 이벤트(모든 구조 공용)
- `node_active({ id })` : 현재 처리 중인 노드
- `node_compare({ ids })` : 비교 대상(큐 후보/Union 비교 등)
- `node_visit({ ids })` : 방문/확정된 노드
- `node_finalize({ id })` : 최종 확정(최단거리 확정 등)
- `node_value({ id, value })` : 노드 값/라벨 업데이트
- `edge_active({ u, v })` : 현재 따라가는 간선
- `edge_consider({ u, v, w? })` : 후보 간선
- `edge_relax({ u, v, w?, dist? })` : 선택/갱신 간선
- `dist_update({ id, dist })` : 거리 갱신

## 4) 자료구조별 이벤트

### 4-1. Array/Sorting
- `swap({ i, j })`
- `pivot({ i })`
- `range({ l, r })`
- `write({ i, value })`

### 4-2. Graph (공통)
- 기본 규약은 공통 이벤트 사용
- **ID 규약**: 그래프 노드의 실제 값(정수/문자열)을 그대로 사용
- `queue_push({ id })`, `queue_pop({ id })` : BFS/Topo 큐 상태(선택)
- `dist_update({ id, dist })` : Dijkstra/Shortest Path

### 4-3. Trie
- **ID 규약**: 접두사 문자열을 노드 ID로 사용 (예: "a", "ap", "app")
- `trie_insert({ word, path })`
- `trie_step({ path })`           // path: ["a","ap","app"]
- `trie_mark_end({ nodeId })`
- `trie_prefix({ path })`

### 4-4. Union-Find
- 1차 적용은 공통 이벤트로 통일 (node_active/node_visit/node_compare)
- 선택 이벤트(고도화 단계):
  - `find_path({ path, root })`      // path: [x, parent, ...]
  - `union_merge({ a, b, root })`
  - `parent_update({ id, parent })`
  - `compress({ path, root })`

## 5) 최소 구현 예시 (Python)
```python
# tracer는 글로벌 함수로 주입
trace("node_active", scope="graph", id=u)
trace("node_visit", scope="graph", ids=[u])
trace("edge_relax", scope="graph", u=u, v=v, w=w, dist=nd)
```

## 6) 적용 전략
- Skulpt 실행 과정에서 이벤트를 수집 → TraceFrame 생성
- 프레임 단위로 StepPlayer에 전달
- Adapter 대신 **Tracer 기반 시각화 레이어**로 전환

## 7) 우선 적용 대상
- Graph/Trie/Union-Find
- Algorithms: DFS, BFS, Shortest Path, Advanced Graph
