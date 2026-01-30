# 시각화 시스템

CTP의 이원화 시각화 아키텍처를 설명합니다.

## 아키텍처 결정

문서: `ctp_docs/specs/research/architecture-decision.md`

### 이원화 전략 (Dual-Track)

#### Track 1: ReactFlow + Adapter (선형 구조)
- **대상**: Array, Linked List, Stack, Queue, Hash Table
- **장점**: 배열/포인터 상태만으로 충분한 학습 효과
- **파이프라인**: Code → Skulpt → Adapter → VisualItem[] → ReactFlow

#### Track 2: Tracer + SVG (고난이도 구조)
- **대상**: Graph, Trie, Union-Find, Algorithms
- **장점**: 구조 + 경로/상태 전이를 이벤트 기반으로 추적
- **파이프라인**: Code → Skulpt → Tracer Events → GraphSvgVisualizer

---

## 1. Adapter 기반 시각화 (Track 1)

### 1.1 실행 파이프라인

```
Python Code
    ↓
Skulpt Worker 실행
    ↓
각 실행 단계마다 globals (변수 스냅샷) 수집
    ↓
AdapterFactory.getAdapter(type)
    ↓
Adapter.parse(globals) → VisualItem[]
    ↓
Visualizer 렌더링
```

### 1.2 Adapter 종류

| Adapter | 입력 변수명 | 출력 타입 |
|---------|------------|----------|
| ArrayAdapter | `arr`, `nums`, `items`, `data` | `LinearItem[]` |
| GridAdapter | `grid`, `matrix`, `board` | `GridItem[][]` |
| QueueAdapter | `queue`, `front`, `rear`, `count` | `LinearItem[]` + metadata |
| DequeAdapter | `data`, `front`, `size` | `LinearItem[]` + metadata |
| HashAdapter | `buckets` | Bucket visualization data |
| LinkedListAdapter | `head`, `curr`, Node 객체 | `LinkedListNode[]` |

### 1.3 변수명 하이라이트 규약

**ArrayAdapter**
```python
active_index = 2           # active 상태
compare_indices = [1, 3]   # comparing 상태
found_index = 5            # success 상태
visited_indices = [0, 1]   # 기본 하이라이트
low, high = 0, 9           # comparing 상태 (이진탐색)
```

**GridAdapter**
```python
active_cell = (2, 3)       # active 상태
active_cells = [(1,1), (2,2)]
frontier_cells = [(0,0)]   # frontier (BFS)
path_cells = [(0,0), (1,1)] # success 경로
visited_cells = [(0,0), (0,1)] # 방문 처리
visited = [[True, False], ...] # 2D 방문 배열
```

### 1.4 Visualizer 매핑

- **ArrayGraphVisualizer**: 1D 배열 (가로 배치)
- **StringGraphVisualizer**: 문자열 전용 (파싱 기반)
- **GridVisualizer**: 2D 배열 (행렬)
- **QueueVisualizer**: 원형 큐 레이아웃
- **HashVisualizer**: 버킷 테이블 + 충돌 경로

---

## 2. Tracer 기반 시각화 (Track 2)

문서: `ctp_docs/specs/research/tracer-spec.md`

### 2.1 실행 파이프라인

```
Python Code (with trace() calls)
    ↓
Skulpt Worker 실행
    ↓
각 단계마다:
  - globals 스냅샷
  - trace() 호출 → 이벤트 수집
    ↓
VisualStep {
  data: Adapter 결과 (또는 빈 객체)
  events: TraceEvent[]
  variables: raw globals
}
    ↓
GraphSvgVisualizer
  - traceOnly=true → 이벤트만으로 노드/간선 구성
  - traceOnly=false → Adapter 결과 + 이벤트 병합
```

### 2.2 Tracer 이벤트 스펙

#### 공통 이벤트
```typescript
interface TraceEvent {
  type: string;
  scope: "graph" | "trie" | "union-find" | "dfs" | "bfs" | ...;
  payload: Record<string, any>;
  line?: number;
  step?: number;
}
```

#### 노드 이벤트
- `node_active({ id })` - 현재 처리 중인 노드 (파란색)
- `node_visit({ ids })` - 방문/확정된 노드 (회색)
- `node_finalize({ id })` - 최종 확정 (초록색, 최단거리 등)
- `node_compare({ ids })` - 비교 대상 (노란색)

#### 간선 이벤트
- `edge_active({ u, v })` - 현재 따라가는 간선
- `edge_consider({ u, v, w? })` - 후보 간선 (주황색)
- `edge_relax({ u, v, w?, dist? })` - 선택/갱신 간선 (초록색)

#### 거리/상태 이벤트
- `dist_update({ id, dist, parent? })` - 거리 갱신 (라벨에 `d=값` 표시)

#### Trie 이벤트
- `trie_step({ path })` - 경로 강조 (path: ["a", "ap", "app"])
- `trie_prefix({ path })` - 접두사 탐색
- `trie_mark_end({ nodeId })` - 단어 종료 노드 (초록색)

### 2.3 Python 코드 예시

```python
# Graph DFS
def dfs(u):
    trace("node_active", scope="graph", id=u)
    visited.append(u)
    trace("node_visit", scope="graph", ids=[u])

    for v in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        if v not in visited:
            dfs(v)

    trace("node_finalize", scope="graph", id=u)

# Dijkstra
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

---

## 3. GraphSvgVisualizer

위치: `web/components/features/ctp/playground/visualizers/graph/graph-svg-visualizer.tsx`

### 3.1 Props

```typescript
interface GraphSvgVisualizerProps {
  data?: VisualItem[];           // Adapter 결과 (nodes)
  nodes?: VisualItem[];          // 명시적 노드 리스트
  edges?: GraphEdge[];           // 명시적 간선 리스트
  emptyMessage?: string;
  layoutMode?: "graph" | "polygon" | "trie" | "union-find" | "order" | "mst";
  rootId?: string | null;
  events?: any[];                // Tracer 이벤트
  traceOnly?: boolean;           // true → 이벤트만으로 구조 구성
}
```

### 3.2 Layout 모드

- **graph**: 기본 그래프 레이아웃 (레벨 기반)
- **polygon**: 정다각형 배치 (Graph 구조 개념용)
- **trie**: 트라이 레벨 레이아웃
- **union-find**: Union-Find 트리 레이아웃
- **order**: 위상 정렬 순서 레이아웃
- **mst**: MST 간선 추적 레이아웃

### 3.3 이벤트 기반 노드/간선 구성

`traceOnly=true`인 경우:
1. 이벤트를 순회하며 노드/간선 추출
2. `node_active`, `node_visit` → 노드 추가
3. `edge_active`, `edge_relax` → 간선 추가
4. `dist_update` → 노드 + 부모 간선 추가
5. `trie_step` → 경로 노드/간선 추가

### 3.4 상태 스타일

```typescript
const STATUS_STYLE = {
  active: { fill: "#3b82f6", stroke: "#2563eb", text: "#ffffff" },    // 파란색
  comparing: { fill: "#f59e0b", stroke: "#d97706", text: "#0f172a" }, // 주황색
  visited: { fill: "#e5e7eb", stroke: "#9ca3af", text: "#6b7280" },   // 회색
  found: { fill: "#22c55e", stroke: "#16a34a", text: "#ffffff" },     // 초록색
};

const EDGE_COLORS = {
  active: "#3b82f6",    // 파란색
  consider: "#f59e0b",  // 주황색
  relax: "#22c55e",     // 초록색
  default: "#94a3b8",   // 회색
};
```

### 3.5 줌/드래그 기능

- 마우스 휠: 줌 인/아웃
- 드래그: 패닝
- 핀치 줌: 모바일 지원
- 리셋 버튼: 초기 뷰로 복귀
- Zoom 레벨 표시

---

## 4. 특수 시각화

### 4.1 SortingBarVisualizer

위치: `web/components/features/ctp/playground/visualizers/sorting/sorting-bar-visualizer.tsx`

특징:
- 막대 차트 기반
- FLIP 애니메이션 (스왑 이동)
- 색상: active(파란색), comparing(주황색), sorted(초록색)
- 높이 비례 렌더링

### 4.2 MergeSortBarVisualizer

위치: `web/components/features/ctp/playground/visualizers/sorting/merge-sort-bar-visualizer.tsx`

특징:
- 4행 레이아웃: Left Array / Right Array / Merged Array / Full Array
- 각 행에 독립적인 막대 차트
- 병합 과정 시각화

### 4.3 HeapSortBarVisualizer

위치: `web/components/features/ctp/playground/visualizers/sorting/heap-sort-bar-visualizer.tsx`

특징:
- 수직 분할: 상단 Heap Tree + 하단 Array
- Heap Tree: TreeGraphVisualizer 사용
- Array: SortingBarVisualizer 재사용

---

## 5. 모드별 운영 정책

문서: `ctp_docs/specs/quality/mode-map.md`, `policy.md`

### Button 모드 (초급 개념)
- **대상**: LIFO Basics, Linear Queue, Hash Basics, Tree Basics, Heap Basics, Graph Representation, DS Basics
- **특징**: 버튼 클릭으로 연산 실행 → 직관적 피드백
- **구현**: CTPInteractiveModule 또는 CTPInteractivePlayground

### Code 모드 (고급 개념)
- **대상**: 대부분의 서브개념 (1D Array, Linked List, Stack 변형, Queue 변형, Hash 충돌/구현, Graph 알고리즘, Algorithms 전체)
- **특징**: Skulpt 기반 코드 실행 → Adapter/Tracer → 시각화
- **구현**: CTPPlayground + useSkulptEngine

---

## 6. 시각화 품질 점수

문서: `ctp_docs/specs/quality/simulator-scores.md`

### 평가 기준
- **Topic Alignment**: 챕터 핵심 개념 시각화 정도
- **Interactivity**: 사용자 조작/체험 가능성
- **Code-to-Visual**: 코드 실행 결과와 시각화 연결성
- **Custom Robustness**: 커스텀 구현 인식 가능성

### 점수 요약 (0-10)
- **High (7-8)**: 1D Array, 2D Array, Linked List, Array/Linked/Monotonic Stack, Shortest Path
- **Medium (5-6)**: Queue, Deque, Hash Implement, Graph (DFS/BFS/MST), Trie, Union-Find
- **Low (3-4)**: LIFO Basics, Hash Basics, Collision Handling

---

## 7. 시각화 컴포넌트 레퍼런스

### ArrayGraphVisualizer
```typescript
<ArrayGraphVisualizer
  data={linearItems}
  emptyMessage="배열이 비어있습니다."
/>
```

### GraphSvgVisualizer
```typescript
<GraphSvgVisualizer
  nodes={nodes}
  edges={edges}
  events={traceEvents}
  layoutMode="polygon"
  rootId="root"
  traceOnly={true}
  emptyMessage="그래프가 비어있습니다."
/>
```

### SortingBarVisualizer
```typescript
<SortingBarVisualizer
  data={linearItems}
  emptyMessage="배열이 비어있습니다."
/>
```

---

## 8. 상태 패널 (State Panel)

위치: `web/components/features/ctp/playground/ctp-playground.tsx`

### 활성화 조건
```typescript
config.showStatePanel = true;
config.statePanelMode = "summary" | "full";
```

### 표시 항목
- **방문 순서** (Order): `visited` 배열
- **큐** (Queue): `queue` 배열
- **스택** (Stack): `stack` 배열
- **거리** (Distance): `dist` 배열 또는 객체
- **부모** (Parent): `parent` 배열 또는 객체

### 모드
- **summary**: 요약 보기 (접기/펼치기 가능)
- **full**: 전체 변수 표시

---

## 9. 레이아웃 규칙

### Graph Layout (기본)
- BFS 레벨 기반 계층 레이아웃
- 루트 노드부터 레벨별 정렬
- 각 레벨은 가로로 균등 배치

### Polygon Layout
- 정다각형 배치 (원형)
- 노드 개수에 따라 각도 자동 계산
- 중심점 기준 반지름 고정

### Trie Layout
- 레벨 기반 트리 레이아웃
- 루트 → 접두사 경로 순서

### Union-Find Layout
- 부모-자식 관계 기반 트리
- 루트를 상단에 배치

### Order Layout (Topological Sort)
- 위상 정렬 순서에 따라 가로 배치
- 레벨 차이 시각화

### MST Layout
- edge_relax 이벤트 기반 간선 추적
- 선택된 간선 중심으로 구조 구성

---

## 10. 애니메이션

### FLIP 애니메이션 (Sorting)
- **F**irst: 변경 전 위치 기록
- **L**ast: 변경 후 위치 계산
- **I**nvert: transform으로 원래 위치로 이동
- **P**lay: transition으로 새 위치로 애니메이션

### 적용 대상
- SortingBarVisualizer (스왑 이동)
- MergeSortBarVisualizer (배열 간 이동)
- HeapSortBarVisualizer (힙 ↔ 배열 이동)

---

## 11. 확장 가이드

### 새 Adapter 추가
1. `adapters/` 하위에 새 Adapter 클래스 작성
2. `BaseAdapter` 상속
3. `parse(globals): any` 메서드 구현
4. `AdapterFactory`에 등록
5. `AdapterType` 타입 추가

### 새 Visualizer 추가
1. `playground/visualizers/` 하위에 컴포넌트 작성
2. Props: `{ data, emptyMessage, ... }`
3. Registry에서 Visualizer로 지정
4. CTPModuleLoader에서 특수 케이스 처리 (필요 시)

### Tracer 이벤트 확장
1. `tracer-spec.md`에 이벤트 타입 추가
2. Python 코드에서 `trace()` 호출
3. GraphSvgVisualizer의 `derivedNodes/derivedEdges` 로직에 이벤트 처리 추가
4. 상태 스타일 정의 (색상/레이블)

---

## 참고

- Adapter 구현: `web/components/features/ctp/adapters/`
- Visualizer 구현: `web/components/features/ctp/playground/visualizers/`
- Tracer 스펙: `ctp_docs/specs/research/tracer-spec.md`
- 시각화 아키텍처: `ctp_docs/specs/research/visualization-architecture.md`
