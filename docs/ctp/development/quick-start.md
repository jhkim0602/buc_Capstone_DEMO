# 빠른 시작 가이드

새로운 서브개념을 추가하는 전체 과정을 단계별로 안내합니다.

## 전제 조건

- CTP 프로젝트 구조 이해 ([데이터 모델](../architecture/data-model.md) 참고)
- TypeScript/React 기본 지식
- Python 기본 문법 (Skulpt 실행용)

---

## 1. CTP_DATA에 서브개념 추가

파일: `web/lib/ctp-curriculum.ts`

### 예시: Queue에 "Priority Queue Heap Implementation" 추가

```typescript
{
  id: "queue",
  title: "큐 & 덱 (Queue & Deque)",
  subConcepts: [
    { id: "linear-queue", title: "선형 큐 (Linear Queue)" },
    { id: "circular-queue", title: "원형 큐 (Circular Queue)" },
    { id: "deque", title: "덱 (Deque)" },
    { id: "pq-basics", title: "우선순위 큐 기초 (Priority Queue)" },
    { id: "pq-heap", title: "우선순위 큐 힙 구현" }  // ← 추가
  ]
}
```

---

## 2. 디렉토리 생성

```bash
mkdir -p web/components/features/ctp/contents/categories/linear/concepts/queue/sub-concepts/pq-heap
```

---

## 3. config.ts 작성

파일: `web/components/features/ctp/contents/categories/linear/concepts/queue/sub-concepts/pq-heap/config.ts`

### 템플릿

```typescript
import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const PQ_HEAP_CONFIG: CTPModuleConfig = {
  title: "우선순위 큐 힙 구현",
  description: "힙 자료구조를 사용한 효율적인 우선순위 큐 구현",
  tags: ["힙", "우선순위", "O(log N)"],

  // Story (필수)
  story: {
    problem: `선형 큐는 삽입/삭제가 O(N)이지만, 힙을 사용하면 O(log N)으로 개선할 수 있습니다.`,

    definition: `힙은 완전 이진 트리로 부모가 항상 자식보다 크거나 작은 성질을 유지합니다.
최솟값/최댓값을 O(1)에 조회하고, 삽입/삭제를 O(log N)에 수행합니다.`,

    analogy: `계단식 조직도에서 상사가 항상 부하보다 높은 급여를 받는 것과 같습니다.`,

    playgroundDescription: `힙의 삽입/삭제 시 재정렬 과정을 확인하세요.`
  },

  // Features (2-4개 권장)
  features: [
    {
      title: "O(log N) 삽입/삭제",
      description: "트리 높이만큼만 이동하므로 효율적입니다."
    },
    {
      title: "힙 불변식",
      description: "부모는 항상 자식보다 작습니다(Min Heap 기준)."
    }
  ],

  // Complexity (필수)
  complexity: {
    access: "O(1)",      // peek
    search: "O(N)",      // 일반 탐색
    insertion: "O(log N)",
    deletion: "O(log N)"
  },

  // Practice Problems (2-3개)
  practiceProblems: [
    {
      id: 11279,
      title: "최대 힙",
      tier: "Silver II",
      description: "최대 힙을 구현하여 최댓값을 빠르게 추출합니다."
    }
  ],

  // Implementation (Python only)
  implementation: [{
    language: 'python',
    description: "Python heapq 모듈 사용",
    code: `import heapq

pq = []
heapq.heappush(pq, 5)
heapq.heappush(pq, 3)
heapq.heappush(pq, 7)

print(heapq.heappop(pq))  # 3 (최솟값)`
  }],

  // Initial Code (필수)
  initialCode: {
    python: `# === USER CODE START ===
# Priority Queue (Heap Implementation)
heap = []

# heapq 모듈은 Skulpt에서 미지원이므로 직접 구현
def push(heap, val):
    heap.append(val)
    # Bubble up
    i = len(heap) - 1
    while i > 0:
        parent = (i - 1) // 2
        if heap[parent] > heap[i]:
            heap[parent], heap[i] = heap[i], heap[parent]
            i = parent
        else:
            break

def pop(heap):
    if len(heap) == 0:
        return None
    if len(heap) == 1:
        return heap.pop()

    root = heap[0]
    heap[0] = heap.pop()
    # Bubble down
    i = 0
    while True:
        left = 2 * i + 1
        right = 2 * i + 2
        smallest = i
        if left < len(heap) and heap[left] < heap[smallest]:
            smallest = left
        if right < len(heap) and heap[right] < heap[smallest]:
            smallest = right
        if smallest != i:
            heap[i], heap[smallest] = heap[smallest], heap[i]
            i = smallest
        else:
            break
    return root

# 테스트
push(heap, 5)
push(heap, 3)
push(heap, 7)
push(heap, 1)

result = []
result.append(pop(heap))
result.append(pop(heap))
# === USER CODE END ===

# --- 출력 확인 ---
def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["heap", "result"]:
    _dump(_k)
`
  }
};
```

---

## 4. logic.ts 작성

파일: `web/components/features/ctp/contents/categories/linear/concepts/queue/sub-concepts/pq-heap/logic.ts`

```typescript
import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export function usePQHeapSimulation() {
  const { run } = useSkulptEngine({ adapterType: 'array' });

  return { runSimulation: run };
}
```

### adapterType 선택 기준

| 자료구조 | adapterType |
|---------|------------|
| 배열 기반 | `'array'` |
| 2D 배열 | `'grid'` |
| 연결 리스트 | `'linked-list'` or `'doubly-linked-list'` |
| 큐/덱 | `'queue'` or `'deque'` |
| 해시 테이블 | `'hash-table'` |
| 그래프 | `'graph'` |
| 힙 | `'heap'` |
| 트라이 | `'trie'` |
| Union-Find | `'union-find'` |
| 병합 정렬 | `'merge-sort'` |
| 힙 정렬 | `'heap-sort'` |

---

## 5. Registry에 모듈 등록

파일: `web/components/features/ctp/contents/categories/linear/concepts/queue/queue-registry.ts`

```typescript
import { PQ_HEAP_CONFIG } from "./sub-concepts/pq-heap/config";
import { usePQHeapSimulation } from "./sub-concepts/pq-heap/logic";
import { ArrayGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/array-graph-visualizer";

export const QUEUE_MODULES: Record<string, CTPModule> = {
  'linear-queue': { ... },
  'circular-queue': { ... },
  'deque': { ... },
  'pq-basics': { ... },
  'pq-heap': {  // ← 추가
    config: PQ_HEAP_CONFIG,
    useSim: usePQHeapSimulation,
    Visualizer: ArrayGraphVisualizer
  }
};
```

---

## 6. 테스트

### URL 접속
```
http://localhost:3000/insights/ctp/linear-ds/queue?view=pq-heap
```

### 확인 사항
1. 페이지가 정상 로드되는가?
2. Intro/Features/Complexity/Implementation/Practice가 표시되는가?
3. Playground에서 코드 실행이 되는가?
4. 시각화가 정상 작동하는가?
5. TOC가 올바르게 수집되는가? (`?tocDebug=1`)

---

## 7. 체크리스트

- [ ] CTP_DATA에 subConcept 추가
- [ ] 디렉토리 생성
- [ ] config.ts 작성 (story, features, complexity, implementation, initialCode)
- [ ] logic.ts 작성 (useSkulptEngine + adapterType)
- [ ] Registry에 모듈 등록
- [ ] 브라우저에서 실행 테스트
- [ ] TOC 디버그 확인
- [ ] 시각화 동작 확인

---

## 8. 자주 사용하는 템플릿

### 간단한 Button 모드

```typescript
export const EXAMPLE_CONFIG: CTPModuleConfig = {
  title: "예제 개념",
  description: "설명",
  mode: "interactive",
  interactive: {
    components: ['push', 'pop', 'peek', 'reset'],
    maxSize: 10
  },
  // story, features, complexity, practiceProblems, implementation
  // initialCode는 불필요 (interactive 모드)
};
```

### 고급 Tracer 기반

```typescript
export const GRAPH_EXAMPLE_CONFIG: CTPModuleConfig = {
  // ... 기본 필드
  initialCode: {
    python: `# === USER CODE START ===
graph = { 0: [1, 2], 1: [3], 2: [3], 3: [] }
visited = []

def dfs(u):
    trace("node_active", scope="graph", id=u)
    visited.append(u)
    trace("node_visit", scope="graph", ids=[u])
    for v in graph[u]:
        if v not in visited:
            dfs(v)

dfs(0)
# === USER CODE END ===`
  },
  showStatePanel: true,
  statePanelMode: "summary"
};
```

```typescript
// logic.ts
export function useGraphExampleSimulation() {
  const { run } = useSkulptEngine({ adapterType: 'graph' });
  return { runSimulation: run };
}
```

Registry:
```typescript
import { GraphSvgVisualizer } from "@/components/features/ctp/playground/visualizers/graph/graph-svg-visualizer";

{
  'example': {
    config: GRAPH_EXAMPLE_CONFIG,
    useSim: useGraphExampleSimulation,
    Visualizer: GraphSvgVisualizer
  }
}
```

---

## 다음 단계

- [어댑터 시스템](./adapters.md) - 변수명 규약 상세
- [Tracer 이벤트](./tracer-events.md) - 이벤트 스펙 및 사용법
- [컨텐츠 추가하기](./adding-content.md) - 상세 가이드
