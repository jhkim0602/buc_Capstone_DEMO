# 어댑터 시스템

Adapter는 Skulpt 실행 결과(Python globals)를 시각화 가능한 데이터로 변환합니다.

## 개요

### 역할
- Python 변수(globals)를 파싱하여 VisualItem 타입으로 변환
- 변수명 규약에 따라 하이라이트/상태 결정
- Visualizer가 렌더링할 수 있는 표준 형식 제공

### 위치
- `web/components/features/ctp/adapters/`

---

## 1. Adapter 인터페이스

### BaseAdapter

파일: `web/components/features/ctp/adapters/base-adapter.ts`

```typescript
export interface DataAdapter {
  parse(globals: any): any;
}

export abstract class BaseAdapter implements DataAdapter {
  abstract parse(globals: any): any;

  protected cleanValue(val: any): string | number {
    if (val === undefined || val === null) return '?';
    return val;
  }
}
```

---

## 2. Linear Adapters

### 2.1 ArrayAdapter

위치: `web/components/features/ctp/adapters/linear/array-adapter.ts`

#### 인식 변수
```python
# 배열 변수 (우선순위 순)
arr, nums, items, data

# 하이라이트 변수
active_index      # 현재 처리 중인 인덱스 (파란색)
current_index     # 동일
pivot_index       # 피벗 인덱스
mid               # 중간 인덱스

compare_indices   # 비교 중인 인덱스 리스트 (주황색)
active_indices    # 활성 인덱스 리스트
pivot_indices     # 피벗 리스트

found_index       # 탐색 성공 인덱스 (초록색)
target_index      # 타겟 인덱스

visited_indices   # 방문한 인덱스 리스트 (기본 하이라이트)
highlight_indices # 강조 인덱스 리스트

low, high         # 이진탐색 범위 (주황색)
```

#### 출력 타입
```typescript
LinearItem[] = {
  id: string;
  value: string | number;
  label: string;              // 인덱스 번호
  status?: 'active' | 'comparing' | 'success';
  isHighlighted?: boolean;
}[]
```

### 2.2 GridAdapter

위치: `web/components/features/ctp/adapters/linear/grid-adapter.ts`

#### 인식 변수
```python
# 2D 배열 변수
grid, matrix, board

# 하이라이트 변수
active_cell = (row, col)         # 현재 셀 (파란색)
active_cells = [(r1,c1), (r2,c2)] # 활성 셀 리스트
frontier_cell                     # 프론티어 (BFS)
frontier_cells                    # 프론티어 리스트
path_cells                        # 경로 (초록색)
visited_cells                     # 방문 셀 리스트
visited = [[True, False], ...]    # 2D 방문 배열
```

#### 출력 타입
```typescript
GridItem[][] = {
  id: string;
  value: string | number;
  label: string;              // 좌표 "r,c"
  status?: 'active' | 'comparing' | 'success';
  isHighlighted?: boolean;
}[][]
```

### 2.3 QueueAdapter

위치: `web/components/features/ctp/adapters/linear/queue-adapter.ts`

#### 인식 변수
```python
# 큐 데이터
queue, data      # 배열
front, rear      # 포인터 인덱스
count, size      # 현재 크기
capacity         # 최대 크기

# 또는 클래스 인스턴스
class Queue:
    def __init__(self):
        self.data = []
        self.front = 0
        self.rear = 0
        self.count = 0
```

#### 출력 타입
```typescript
LinearItem[] + metadata {
  front: number;
  rear: number;
  count: number;
  capacity: number;
}
```

### 2.4 HashAdapter

위치: `web/components/features/ctp/adapters/linear/hash-adapter.ts`

#### 인식 변수
```python
# 해시 테이블
buckets = [[], [], [], ...]   # 버킷 배열

# 하이라이트 변수
last_index         # 마지막 접근 버킷
probe_path = [1, 2, 5]  # 충돌 경로
rehashing = True   # 리해시 진행 중
rehash_bucket      # 리해시 중인 버킷 인덱스
rehash_key, rehash_value  # 리해시 항목
```

#### 출력 타입
```typescript
{
  buckets: Bucket[];
  metadata: {
    lastIndex?: number;
    rehashing?: boolean;
    probePath?: number[];
    rehashBucket?: number;
  }
}
```

### 2.5 LinkedListAdapter

위치: `web/components/features/ctp/adapters/linear/linked-list/base-ll-adapter.ts`

#### 인식 변수
```python
# Node 클래스 (Duck Typing)
class Node:
    def __init__(self, val):
        self.val = val      # 또는 self.value, self.data
        self.next = None

# 포인터 변수
head, curr, prev, tail

# 모든 Node 객체는 자동으로 __id 부여 (Worker 내부)
```

#### 출력 타입
```typescript
LinkedListNode[] = {
  id: string;
  value: any;
  nextId?: string | null;
  prevId?: string | null;   // Doubly
  label?: string;           // "Head", "Curr" 등
  isHighlighted?: boolean;
}[]
```

---

## 3. Non-Linear Adapters

### 3.1 GraphAdapter

위치: `web/components/features/ctp/adapters/non-linear/graph-adapter.ts`

#### 인식 변수
```python
# 그래프 구조
graph = { 0: [1, 2], 1: [3], ... }
adj = [[1, 2], [3], ...]

# 상태 변수
visited = []
active_node = 0
compare_nodes = [1, 2]
dist = [0, INF, INF, ...]
parent = [-1, 0, 0, ...]
```

#### 출력 타입
```typescript
{
  nodes: VisualItem[];
  edges: GraphEdge[];
}
```

### 3.2 TrieAdapter

위치: `web/components/features/ctp/adapters/non-linear/trie-adapter.ts`

#### 인식 변수
```python
# 삽입된 단어
words = ["app", "apple", "application"]
strings = [...]
inserted = [...]

# 현재 검색/삽입 중인 접두사
prefix = "app"
active_prefix = "appl"
active_node = "app"

# 경로 노드
path_nodes = ["a", "ap", "app"]
visited_nodes = [...]
```

#### ID 규약
- 노드 ID는 **접두사 문자열** (예: "a", "ap", "app", "appl")
- 루트는 "root"

#### 출력 타입
```typescript
{
  nodes: VisualItem[];
  edges: GraphEdge[];
  rootId: "root";
}
```

### 3.3 UnionFindAdapter

위치: `web/components/features/ctp/adapters/non-linear/union-find-adapter.ts`

#### 인식 변수
```python
# Union-Find 구조
parent = [0, 0, 1, 2, ...]
rank = [0, 1, 0, ...]

# 하이라이트 변수
path_nodes = [5, 3, 1, 0]    # find 경로
compare_indices = [3, 5]      # union 대상
active_node = 5               # 현재 처리 노드
```

#### 출력 타입
```typescript
{
  nodes: VisualItem[];
  edges: GraphEdge[];
}
```

---

## 4. Sorting Adapters

### 4.1 MergeSortAdapter

위치: `web/components/features/ctp/adapters/sorting/merge-sort-adapter.ts`

#### 인식 변수
```python
arr = [...]           # 전체 배열
left_arr = [...]      # 왼쪽 부분
right_arr = [...]     # 오른쪽 부분
merged_arr = [...]    # 병합 결과
```

#### 출력 타입
```typescript
{
  arr: LinearItem[];
  left: LinearItem[];
  right: LinearItem[];
  merged: LinearItem[];
}
```

### 4.2 HeapSortAdapter

위치: `web/components/features/ctp/adapters/sorting/heap-sort-adapter.ts`

#### 인식 변수
```python
arr = [...]           # 전체 배열
heap_size = 10        # 힙 영역 크기
swap_indices = [2, 5] # 스왑 중인 인덱스
```

#### 출력 타입
```typescript
{
  nodes: VisualItem[];      // 힙 트리 노드
  edges: GraphEdge[];       // 부모-자식 간선
  arr: LinearItem[];        // 배열 뷰
  heapSize: number;
}
```

---

## 5. Adapter 작성 가이드

### 단계별 프로세스

1. **변수 탐지**: globals에서 예상 변수명 찾기
2. **상태 변수 추출**: 하이라이트/활성 상태 변수
3. **VisualItem 생성**: id, value, label, status 설정
4. **메타데이터 추가**: 필요 시 추가 정보 (front/rear/capacity 등)

### 템플릿

```typescript
import { BaseAdapter } from '../base-adapter';
import { VisualItem } from '@/components/features/ctp/common/types';

export class CustomAdapter extends BaseAdapter {
  parse(globals: any): VisualItem[] {
    // 1. 메인 데이터 탐지
    const mainData = globals['data'] || globals['items'] || [];
    if (!Array.isArray(mainData)) return [];

    // 2. 상태 변수 추출
    const activeIndex = globals['active_index'];
    const visited = globals['visited'] || [];

    // 3. VisualItem 변환
    return mainData.map((val, idx) => {
      let status: VisualItem['status'];
      if (activeIndex === idx) status = 'active';
      else if (visited.includes(idx)) status = 'visited';

      return {
        id: `item-${idx}`,
        value: this.cleanValue(val),
        label: idx.toString(),
        status,
        isHighlighted: false
      };
    });
  }
}
```

---

## 6. 커스텀 코드 호환성

문서: `ctp_docs/specs/quality/analysis.md`

### 호환성 점수

| Adapter | 점수 | 이유 |
|---------|------|------|
| ArrayAdapter | 8/10 | 변수명 탐지 범위 넓음 (arr/nums/items/data) |
| LinkedListAdapter | 7/10 | Node-like 탐지로 유연 |
| QueueAdapter | 3/10 | `queue/front/rear/count` 규약 강의존 |
| HashAdapter | 3/10 | `buckets` 구조 필수 |

### 호환성 개선 전략

#### 클래스 인스턴스 스캔
```typescript
// QueueAdapter 예시
let queueData = globals['queue'];

// Fallback: 클래스 인스턴스 탐지
if (!queueData) {
  for (const [key, val] of Object.entries(globals)) {
    if (val && typeof val === 'object' && 'data' in val && 'front' in val) {
      queueData = val.data;
      front = val.front;
      rear = val.rear;
      break;
    }
  }
}
```

#### 다중 변수명 지원
```typescript
const arr = globals['arr']
  || globals['nums']
  || globals['items']
  || globals['data']
  || globals['array'];
```

---

## 7. AdapterFactory

위치: `web/components/features/ctp/adapters/index.ts`

### 사용법

```typescript
import { AdapterFactory } from '@/components/features/ctp/adapters';

const adapter = AdapterFactory.getAdapter('array');
const visualData = adapter.parse(globals);
```

### 지원 타입

```typescript
export type AdapterType =
  | 'array'
  | 'grid'
  | 'queue'
  | 'deque'
  | 'hash-table'
  | 'graph'
  | 'heap'
  | 'trie'
  | 'union-find'
  | 'linked-list'
  | 'doubly-linked-list'
  | 'circular-linked-list'
  | 'merge-sort'
  | 'heap-sort';
```

---

## 8. 새 Adapter 추가하기

### Step 1: Adapter 클래스 작성

파일: `web/components/features/ctp/adapters/linear/custom-adapter.ts`

```typescript
import { BaseAdapter } from '../base-adapter';
import { VisualItem } from '@/components/features/ctp/common/types';

export class CustomAdapter extends BaseAdapter {
  parse(globals: any): VisualItem[] {
    // 구현
    return [];
  }
}
```

### Step 2: AdapterFactory 등록

파일: `web/components/features/ctp/adapters/index.ts`

```typescript
import { CustomAdapter } from './linear/custom-adapter';

export type AdapterType =
  | 'array' | 'grid'
  | 'custom';  // ← 추가

export class AdapterFactory {
  static getAdapter(type: AdapterType): DataAdapter {
    switch (type) {
      case 'array': return new ArrayAdapter();
      // ...
      case 'custom': return new CustomAdapter();  // ← 추가
      default: return new ArrayAdapter();
    }
  }
}
```

### Step 3: logic.ts에서 사용

```typescript
export function useCustomSimulation() {
  const { run } = useSkulptEngine({ adapterType: 'custom' });
  return { runSimulation: run };
}
```

---

## 9. Adapter 예제

### Example 1: Stack Adapter

```typescript
export class StackAdapter extends BaseAdapter {
  parse(globals: any): LinearItem[] {
    // 1. 스택 데이터 탐지
    let stackData = globals['stack'] || globals['data'] || [];

    // 2. 클래스 인스턴스 지원
    if (!Array.isArray(stackData)) {
      const instance = Object.values(globals).find(
        v => v && typeof v === 'object' && 'data' in v && 'top' in v
      );
      if (instance) {
        stackData = instance.data;
      }
    }

    if (!Array.isArray(stackData)) return [];

    // 3. Top 변수 추출
    const top = globals['top'] ?? stackData.length - 1;

    // 4. VisualItem 생성
    return stackData.map((val, idx) => ({
      id: `item-${idx}`,
      value: this.cleanValue(val),
      label: idx.toString(),
      status: idx === top ? 'active' : undefined,
      isHighlighted: false
    }));
  }
}
```

### Example 2: BFS Grid Adapter (활용)

```typescript
export class GridAdapter extends BaseAdapter {
  parse(globals: any): GridItem[][] {
    const grid = globals['grid'] || globals['matrix'] || globals['board'];
    if (!Array.isArray(grid)) return [];

    const activeCells = this.parseCellList(globals['active_cells']);
    const frontierCells = this.parseCellList(globals['frontier_cells']);
    const pathCells = this.parseCellList(globals['path_cells']);
    const visitedCells = this.parseCellList(globals['visited_cells']);
    const visitedMatrix = globals['visited']; // 2D boolean array

    return grid.map((row, rIdx) => {
      if (!Array.isArray(row)) return [];
      return row.map((val, cIdx) => {
        let status: GridItem['status'];
        const coord = `${rIdx},${cIdx}`;

        if (this.hasCellAt(activeCells, rIdx, cIdx)) status = 'active';
        else if (this.hasCellAt(frontierCells, rIdx, cIdx)) status = 'comparing';
        else if (this.hasCellAt(pathCells, rIdx, cIdx)) status = 'success';

        const isVisited = this.hasCellAt(visitedCells, rIdx, cIdx) ||
          (Array.isArray(visitedMatrix) && visitedMatrix[rIdx]?.[cIdx]);

        return {
          id: `cell-${rIdx}-${cIdx}`,
          value: this.cleanValue(val),
          label: coord,
          status,
          isHighlighted: !status && isVisited ? true : undefined
        };
      });
    });
  }

  private parseCellList(cells: any): Array<[number, number]> {
    if (!Array.isArray(cells)) return [];
    return cells.filter(c => Array.isArray(c) && c.length === 2);
  }

  private hasCellAt(cells: Array<[number, number]>, r: number, c: number): boolean {
    return cells.some(([row, col]) => row === r && col === c);
  }
}
```

---

## 10. 디버깅

### Adapter 출력 확인

```typescript
// useSkulptEngine.ts 내부
const visualData = dataMapper(globals);
console.log("Adapter Output:", visualData);
```

### 변수 탐지 실패 시

```python
# Python 코드 끝에 디버그 출력 추가
print("globals:", list(globals().keys()))
print("arr:", arr)
print("active_index:", active_index)
```

### 클래스 인스턴스 확인

```python
class MyQueue:
    def __init__(self):
        self.data = []
        self.front = 0

queue = MyQueue()
queue.data.append(10)

# Worker는 queue 객체를 JSON으로 직렬화
# Adapter는 queue.data, queue.front를 읽을 수 있음
```

---

## 참고

- [변수명 규약 전체 목록](../reference/naming-conventions.md)
- [Adapter 구현 코드](../../../../web/components/features/ctp/adapters/)
- 품질 분석: `ctp_docs/specs/quality/analysis.md`
