# Tracer 이벤트 시스템

고난이도 구조(Graph/Trie/Union-Find/Algorithms)의 시각화를 위한 이벤트 기반 추적 시스템입니다.

문서: `ctp_docs/specs/research/tracer-spec.md`

## 개요

### 목적
- 코드 실행과 시각화를 **이벤트 단위로 동기화**
- 알고리즘의 상태 전이 과정을 명시적으로 추적
- 구조별 최소 이벤트 집합으로 재사용성 확보

### 핵심 원칙
1. **명시적 이벤트 호출**: `trace()` 함수로 상태 변화 기록
2. **Step 단위 누적**: 각 단계의 이벤트를 배열로 수집
3. **Visualizer 렌더링**: 누적 이벤트를 상태 맵으로 변환

---

## 1. 이벤트 스키마

```typescript
interface TraceEvent {
  type: string;                    // "node_active", "edge_relax" 등
  scope: TraceScope;               // "graph", "trie", "dfs", "bfs" 등
  payload?: Record<string, any>;   // 임의의 데이터
  line?: number;                   // 실행 라인 번호
  step?: number;                   // 프레임 인덱스
  timestamp?: number;
}

type TraceScope =
  | "graph" | "trie" | "union-find"
  | "dfs" | "bfs" | "shortest-path" | "mst" | "topo"
  | "sorting" | "array";
```

---

## 2. 공통 이벤트 (모든 구조)

### 노드 이벤트

#### node_active
```python
trace("node_active", scope="graph", id=u)
```
- 현재 처리 중인 노드
- 시각화: 파란색 강조

#### node_visit
```python
trace("node_visit", scope="graph", ids=[u, v])
```
- 방문/확정된 노드들
- 시각화: 회색

#### node_finalize
```python
trace("node_finalize", scope="graph", id=u)
```
- 최종 확정 (DFS 완료, 최단거리 확정 등)
- 시각화: 초록색

#### node_compare
```python
trace("node_compare", scope="graph", ids=[a, b])
```
- 비교/후보 노드들
- 시각화: 주황색

### 간선 이벤트

#### edge_active
```python
trace("edge_active", scope="graph", u=u, v=v)
```
- 현재 따라가는 간선
- 시각화: 파란색

#### edge_consider
```python
trace("edge_consider", scope="graph", u=u, v=v, w=weight)
```
- 후보 간선 (아직 선택 안됨)
- 시각화: 주황색

#### edge_relax
```python
trace("edge_relax", scope="graph", u=u, v=v, w=weight, dist=new_dist)
```
- 선택/갱신된 간선 (MST 간선, 최단경로 갱신)
- 시각화: 초록색

### 거리/값 이벤트

#### dist_update
```python
trace("dist_update", scope="graph", id=v, dist=new_dist, parent=u)
```
- 거리 값 갱신
- 시각화: 노드 라벨에 `d=값` 표시, 부모 간선 추가

---

## 3. 자료구조별 이벤트

### 3.1 Graph

Scope: `"graph"`, `"dfs"`, `"bfs"`, `"shortest-path"`, `"mst"`, `"topo"`

#### DFS 예시
```python
def dfs(u):
    trace("node_active", scope="graph", id=u)
    visited.append(u)
    trace("node_visit", scope="graph", ids=[u])

    for v in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        if v not in visited:
            dfs(v)

    trace("node_finalize", scope="graph", id=u)
```

#### Dijkstra 예시
```python
dist[start] = 0
trace("dist_update", scope="graph", id=start, dist=0)

while heap:
    d, u = heappop(heap)
    trace("node_active", scope="graph", id=u)

    for v, w in graph[u]:
        nd = d + w
        if nd < dist[v]:
            dist[v] = nd
            trace("edge_relax", scope="graph", u=u, v=v, w=w)
            trace("dist_update", scope="graph", id=v, dist=nd, parent=u)
```

#### MST (Kruskal) 예시
```python
for u, v, w in edges:
    trace("edge_consider", scope="graph", u=u, v=v, w=w)

    ru = find(u)
    rv = find(v)

    if ru != rv:
        trace("edge_relax", scope="graph", u=u, v=v, w=w)
        union(ru, rv)
        mst_edges.append((u, v, w))
```

### 3.2 Trie

Scope: `"trie"`

#### ID 규약
- 노드 ID = **접두사 문자열** (예: "a", "ap", "app")
- 루트 ID = `"root"`

#### trie_step / trie_prefix
```python
def insert(word):
    path = []
    for i in range(len(word)):
        prefix = word[:i+1]
        path.append(prefix)

    trace("trie_step", scope="trie", path=path)
```

#### trie_insert
```python
trace("trie_insert", scope="trie", word="apple", path=["a", "ap", "app", "appl", "apple"])
```

#### trie_mark_end
```python
trace("trie_mark_end", scope="trie", nodeId="apple")
```
- 단어 종료 노드 표시 (초록색)

### 3.3 Union-Find

Scope: `"union-find"`

#### 기본 이벤트 (1차)
```python
def find(x):
    trace("node_active", scope="union-find", id=x)

    path = [x]
    while parent[x] != x:
        x = parent[x]
        path.append(x)

    trace("node_visit", scope="union-find", ids=path)
    return x

def union(a, b):
    ra = find(a)
    rb = find(b)

    trace("node_compare", scope="union-find", ids=[ra, rb])

    if ra != rb:
        parent[rb] = ra
```

#### 고급 이벤트 (선택)
```python
# find_path
trace("find_path", scope="union-find", path=[5, 3, 1, 0], root=0)

# parent_update
trace("parent_update", scope="union-find", id=child, parent=new_parent)

# compress (Path Compression)
trace("compress", scope="union-find", path=[5, 3, 1], root=0)
```

### 3.4 Sorting

Scope: `"sorting"`

#### swap
```python
trace("swap", scope="sorting", i=2, j=5)
```

#### pivot
```python
trace("pivot", scope="sorting", i=pivot_index)
```

#### range (분할 범위)
```python
trace("range", scope="sorting", l=left, r=right)
```

---

## 4. Python에서 trace() 사용

### Worker 주입

Skulpt Worker는 `trace()` 함수를 자동으로 주입합니다:

```javascript
// Worker 내부
Sk.builtins.trace = new Sk.builtin.func(function(pyType, pyKwargs) {
  const type = Sk.ffi.remapToJs(pyType);
  const kwargs = Sk.ffi.remapToJs(pyKwargs);

  traceBuffer.push({
    type,
    scope: kwargs.scope || 'graph',
    ...kwargs
  });
});
```

### 사용 예시

```python
# 함수 시그니처 (키워드 인자만 지원)
trace(type, scope=..., id=..., ids=..., u=..., v=..., w=...)

# 예시
trace("node_active", scope="graph", id=0)
trace("edge_relax", scope="graph", u=0, v=1, w=5)
trace("dist_update", scope="graph", id=1, dist=5, parent=0)
```

---

## 5. GraphSvgVisualizer 이벤트 처리

위치: `web/components/features/ctp/playground/visualizers/graph/graph-svg-visualizer.tsx`

### 누적 이벤트 계산

```typescript
const currentEvents = useMemo(() => {
  return steps
    .slice(0, currentStepIndex + 1)
    .flatMap(step => step.events ?? []);
}, [steps, currentStepIndex]);
```

### 이벤트 기반 노드/간선 구성 (traceOnly 모드)

```typescript
const { derivedNodes, derivedEdges } = useMemo(() => {
  if (!traceOnly) return { derivedNodes: inputNodes, derivedEdges: edges };

  const nodeIds = new Set<string>();
  const edgesList: GraphEdge[] = [];

  events.forEach(event => {
    // 노드 추출
    if (event.type === "node_active" || event.type === "node_finalize") {
      nodeIds.add(String(event.id));
    }
    if (event.type === "node_visit" || event.type === "node_compare") {
      (event.ids || []).forEach(id => nodeIds.add(String(id)));
    }

    // 간선 추출
    if (event.type === "edge_active" || event.type === "edge_relax") {
      nodeIds.add(String(event.u));
      nodeIds.add(String(event.v));
      edgesList.push({
        source: String(event.u),
        target: String(event.v),
        label: event.w !== undefined ? String(event.w) : undefined
      });
    }

    // Trie 경로
    if (event.type === "trie_step" || event.type === "trie_prefix") {
      const path = event.path || [];
      let prev = rootId || "root";
      path.forEach(p => {
        nodeIds.add(p);
        edgesList.push({ source: prev, target: p });
        prev = p;
      });
    }
  });

  const nodes = Array.from(nodeIds).map(id => ({
    id, value: id, label: id, status: undefined
  }));

  return { derivedNodes: nodes, derivedEdges: edgesList };
}, [events, traceOnly]);
```

### 상태 결정

```typescript
// 최신 이벤트를 우선 적용
const nodeStates = new Map<string, string>();
const edgeStates = new Map<string, string>();

currentEvents.forEach(event => {
  if (event.type === "node_active") {
    nodeStates.set(event.id, "active");
  }
  if (event.type === "node_visit") {
    (event.ids || []).forEach(id => nodeStates.set(id, "visited"));
  }
  if (event.type === "node_finalize") {
    nodeStates.set(event.id, "found");
  }
  if (event.type === "edge_relax") {
    edgeStates.set(`${event.u}->${event.v}`, "relax");
  }
});

// 렌더링 시 상태 적용
nodes.forEach(node => {
  const state = nodeStates.get(node.id);
  node.status = state as 'active' | 'visited' | 'found';
});
```

---

## 6. 실전 예제

### Example 1: BFS with Queue Tracking

```python
# === USER CODE START ===
from collections import deque

graph = { 0: [1, 2], 1: [3, 4], 2: [5], 3: [], 4: [], 5: [] }
start = 0

visited = []
queue = deque([start])
order = []

def bfs():
    while queue:
        u = queue.popleft()
        trace("node_active", scope="bfs", id=u)

        if u in visited:
            continue

        visited.append(u)
        order.append(u)
        trace("node_visit", scope="bfs", ids=[u])

        for v in graph[u]:
            trace("edge_consider", scope="bfs", u=u, v=v)
            if v not in visited:
                queue.append(v)

bfs()
# === USER CODE END ===
```

시각화:
- `node_active` → 노드 u 파란색
- `node_visit` → 노드 u 회색으로 전환
- `edge_consider` → 간선 u→v 주황색
- Queue 상태는 상태 패널에 표시

### Example 2: Dijkstra with Distance Labels

```python
# === USER CODE START ===
graph = {
    0: [(1, 4), (2, 1)],
    1: [(3, 1)],
    2: [(1, 2), (3, 5)],
    3: []
}

INF = float('inf')
dist = [INF] * 4
dist[0] = 0
parent = [-1] * 4

# Simple priority queue (min heap)
heap = [(0, 0)]  # (distance, node)

trace("dist_update", scope="graph", id=0, dist=0)

while heap:
    d, u = heap.pop(0)  # 간단한 구현
    trace("node_active", scope="graph", id=u)

    if d > dist[u]:
        continue

    for v, w in graph[u]:
        nd = d + w
        trace("edge_consider", scope="graph", u=u, v=v, w=w)

        if nd < dist[v]:
            dist[v] = nd
            parent[v] = u
            trace("edge_relax", scope="graph", u=u, v=v, w=w)
            trace("dist_update", scope="graph", id=v, dist=nd, parent=u)
            heap.append((nd, v))
            heap.sort()  # 정렬

    trace("node_finalize", scope="graph", id=u)
# === USER CODE END ===
```

시각화:
- `dist_update` → 노드 라벨에 `d=5` 표시
- `edge_relax` → 간선 초록색
- `parent` → 부모 간선 추가
- `node_finalize` → 노드 초록색 테두리

### Example 3: Trie Insert with Path

```python
# === USER CODE START ===
words = []

def insert(word):
    words.append(word)

    # 경로 생성
    path = []
    for i in range(len(word)):
        prefix = word[:i+1]
        path.append(prefix)

    trace("trie_step", scope="trie", path=path)
    trace("trie_mark_end", scope="trie", nodeId=word)

insert("app")
insert("apple")
insert("application")

# 검색
prefix = "app"
path_for_search = []
for i in range(len(prefix)):
    path_for_search.append(prefix[:i+1])

trace("trie_prefix", scope="trie", path=path_for_search)
# === USER CODE END ===
```

시각화:
- `trie_step` → 경로 노드들 회색, 마지막 노드 파란색
- `trie_mark_end` → 단어 종료 노드 초록색
- `trie_prefix` → 접두사 경로 강조

### Example 4: Union-Find with Path Tracking

```python
# === USER CODE START ===
n = 6
parent = list(range(n))
rank = [0] * n

def find(x):
    path = [x]
    trace("node_active", scope="union-find", id=x)

    while parent[x] != x:
        x = parent[x]
        path.append(x)

    trace("node_visit", scope="union-find", ids=path)
    return x

def union(a, b):
    ra = find(a)
    rb = find(b)

    trace("node_compare", scope="union-find", ids=[ra, rb])

    if ra != rb:
        if rank[ra] < rank[rb]:
            ra, rb = rb, ra
        parent[rb] = ra
        if rank[ra] == rank[rb]:
            rank[ra] += 1

union(0, 1)
union(2, 3)
union(1, 2)

result = find(3)
# === USER CODE END ===
```

---

## 7. 이벤트 흐름

```
Python Code 실행
    ↓
trace("node_active", scope="graph", id=0)
    ↓
Worker: traceBuffer.push({ type: "node_active", scope: "graph", id: 0 })
    ↓
Step 완료 시: VisualStep { events: [...traceBuffer] }
    ↓
traceBuffer 클리어
    ↓
다음 Step...
    ↓
모든 Step 수집 후 Batch 전송
    ↓
useSkulptEngine: setSteps(processedSteps)
    ↓
CTPPlayground: currentEvents = steps[0..currentStepIndex].flatMap(s => s.events)
    ↓
GraphSvgVisualizer: 누적 이벤트 → 노드/간선 상태 결정
    ↓
SVG 렌더링
```

---

## 8. 베스트 프랙티스

### 8.1 이벤트 타이밍
- **진입 시**: `node_active` (함수 시작, while 시작)
- **처리 완료 시**: `node_visit` (visited 추가 후)
- **최종 확정 시**: `node_finalize` (재귀 종료, 거리 확정)
- **간선 탐색 시**: `edge_consider` (for v in graph[u])
- **간선 선택 시**: `edge_relax` (MST 추가, 거리 갱신)

### 8.2 Scope 선택
- Graph 구조 시각화: `scope="graph"`
- DFS 알고리즘: `scope="dfs"` (또는 `"graph"`)
- BFS 알고리즘: `scope="bfs"`
- Dijkstra: `scope="shortest-path"` (또는 `"graph"`)
- MST: `scope="mst"`
- Topological Sort: `scope="topo"`

### 8.3 ID 형식
- **Graph**: 노드 값 그대로 (정수 또는 문자열)
- **Trie**: 접두사 문자열 ("a", "ap", "app")
- **Union-Find**: 노드 인덱스 (0, 1, 2, ...)

---

## 9. 디버깅

### 이벤트 확인

```python
# Python 코드 끝에 추가
print("=== Debug ===")
# trace() 호출이 정상 작동하는지 확인
```

Worker 콘솔:
```javascript
console.log("[Skulpt] Trace Buffer:", traceBuffer);
```

### Visualizer 확인

```typescript
// GraphSvgVisualizer 내부
useEffect(() => {
  console.log("Current Events:", currentEvents);
  console.log("Derived Nodes:", derivedNodes);
  console.log("Derived Edges:", derivedEdges);
}, [currentEvents]);
```

---

## 10. 제약사항

### Skulpt 제한
- `heapq` 미지원 → 직접 구현 필요
- `locals()` 미지원 → `globals()` 사용
- `collections.defaultdict` 부분 지원

### 성능
- 이벤트는 각 Step마다 클리어되므로 메모리 누수 없음
- MAX_STEPS 제한으로 무한루프 방지
- 이벤트 버퍼 크기 제한 권장

---

## 참고

- Tracer 스펙: `ctp_docs/specs/research/tracer-spec.md`
- GraphSvgVisualizer: `web/components/features/ctp/playground/visualizers/graph/graph-svg-visualizer.tsx`
- Worker 구현: `public/workers/skulpt.worker.js`
- 시각화 정책: `ctp_docs/specs/quality/policy.md`
