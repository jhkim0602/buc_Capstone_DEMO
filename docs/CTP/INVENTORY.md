# CTP Inventory Snapshot

기준: 현재 코드베이스 자동 스캔 결과

## 1) 전체 통계

- 총 서브컨셉 디렉토리: **57**
- 모드 분포: code=50, interactive=7
- 시뮬레이션 타입: SKULPT=49, STATE=6, OTHER=2

- Adapter 사용량:
  - graph: 19
  - array: 10
  - grid: 4
  - hash-table: 2
  - linked-list: 2
  - queue: 2
  - heap: 2
  - heap-sort: 1
  - merge-sort: 1
  - circular-linked-list: 1
  - doubly-linked-list: 1
  - deque: 1

## 2) Concept 단위 맵

| category(folder) | categoryId(route) | conceptId | routeExposed | modules(registry) | moduleKeys | route | index | registry |
|---|---|---|---|---:|---|---|---|---|
| algorithms | algorithms | bfs | yes | 5 | bfs-basics, grid-traversal, bfs-multi-source, bfs-zero-one, bfs-path-reconstruction | `/insights/ctp/algorithms/bfs` | `web/components/features/ctp/contents/categories/algorithms/concepts/bfs/index.tsx` | `web/components/features/ctp/contents/categories/algorithms/concepts/bfs/bfs-registry.ts` |
| algorithms | algorithms | binary-search | yes | 2 | basic-binary-search, parametric-search | `/insights/ctp/algorithms/binary-search` | `web/components/features/ctp/contents/categories/algorithms/concepts/binary-search/index.tsx` | `web/components/features/ctp/contents/categories/algorithms/concepts/binary-search/binary-search-registry.ts` |
| algorithms | algorithms | dfs | yes | 5 | dfs-basics, dfs-backtracking, dfs-tree-traversal, dfs-cycle-detection, dfs-path-reconstruction | `/insights/ctp/algorithms/dfs` | `web/components/features/ctp/contents/categories/algorithms/concepts/dfs/index.tsx` | `web/components/features/ctp/contents/categories/algorithms/concepts/dfs/dfs-registry.ts` |
| algorithms | algorithms | dfs-bfs | no | 3 | dfs-basics, bfs-basics, grid-traversal | `/insights/ctp/algorithms/dfs-bfs` | `web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/index.tsx` | `web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/dfs-bfs-registry.ts` |
| algorithms | algorithms | dp | yes | 4 | dp-basics, dp-1d, dp-2d, dp-patterns | `/insights/ctp/algorithms/dp` | `web/components/features/ctp/contents/categories/algorithms/concepts/dp/index.tsx` | `web/components/features/ctp/contents/categories/algorithms/concepts/dp/dp-registry.ts` |
| algorithms | algorithms | graph-advanced | yes | 2 | topological-sort, mst | `/insights/ctp/algorithms/graph-advanced` | `web/components/features/ctp/contents/categories/algorithms/concepts/graph-advanced/index.tsx` | `web/components/features/ctp/contents/categories/algorithms/concepts/graph-advanced/graph-advanced-registry.ts` |
| algorithms | algorithms | shortest-path | yes | 2 | dijkstra, floyd-warshall | `/insights/ctp/algorithms/shortest-path` | `web/components/features/ctp/contents/categories/algorithms/concepts/shortest-path/index.tsx` | `web/components/features/ctp/contents/categories/algorithms/concepts/shortest-path/shortest-path-registry.ts` |
| algorithms | algorithms | sorting | yes | 6 | bubble-sort, selection-sort, insertion-sort, merge-sort, quick-sort, heap-sort | `/insights/ctp/algorithms/sorting` | `web/components/features/ctp/contents/categories/algorithms/concepts/sorting/index.tsx` | `web/components/features/ctp/contents/categories/algorithms/concepts/sorting/sorting-registry.ts` |
| linear | linear-ds | array | yes | 3 | 1d-array, 2d-array, string | `/insights/ctp/linear-ds/array` | `web/components/features/ctp/contents/categories/linear/concepts/array/index.tsx` | `web/components/features/ctp/contents/categories/linear/concepts/array/array-registry.ts` |
| linear | linear-ds | hash-table | yes | 3 | hash-basics, collision, hash-implement | `/insights/ctp/linear-ds/hash-table` | `web/components/features/ctp/contents/categories/linear/concepts/hash-table/index.tsx` | `web/components/features/ctp/contents/categories/linear/concepts/hash-table/hash-table-registry.ts` |
| linear | linear-ds | linked-list | yes | 4 | singly, doubly, circular, two-pointers | `/insights/ctp/linear-ds/linked-list` | `web/components/features/ctp/contents/categories/linear/concepts/linked-list/index.tsx` | `web/components/features/ctp/contents/categories/linear/concepts/linked-list/linked-list-registry.ts` |
| linear | linear-ds | queue | yes | 4 | linear-queue, circular-queue, deque, pq-basics | `/insights/ctp/linear-ds/queue` | `web/components/features/ctp/contents/categories/linear/concepts/queue/index.tsx` | `web/components/features/ctp/contents/categories/linear/concepts/queue/queue-registry.ts` |
| linear | linear-ds | stack | yes | 4 | lifo-basics, array-stack, linked-stack, monotonic | `/insights/ctp/linear-ds/stack` | `web/components/features/ctp/contents/categories/linear/concepts/stack/index.tsx` | `web/components/features/ctp/contents/categories/linear/concepts/stack/stack-registry.ts` |
| non-linear | non-linear-ds | graph | yes | 6 | graph-representation, dfs, bfs, cycle-detection, shortest-path, mst | `/insights/ctp/non-linear-ds/graph` | `web/components/features/ctp/contents/categories/non-linear/concepts/graph/index.tsx` | `web/components/features/ctp/contents/categories/non-linear/concepts/graph/graph-registry.ts` |
| non-linear | non-linear-ds | heap | yes | 3 | heap-basics, min-heap, max-heap | `/insights/ctp/non-linear-ds/heap` | `web/components/features/ctp/contents/categories/non-linear/concepts/heap/index.tsx` | `web/components/features/ctp/contents/categories/non-linear/concepts/heap/heap-registry.ts` |
| non-linear | non-linear-ds | tree | yes | 4 | tree-basics, tree-properties, binary-traversal, bst | `/insights/ctp/non-linear-ds/tree` | `web/components/features/ctp/contents/categories/non-linear/concepts/tree/index.tsx` | `web/components/features/ctp/contents/categories/non-linear/concepts/tree/tree-registry.ts` |

## 3) 서브컨셉 전체 매트릭스 (CSV)

```csv
category_folder,concept_id,subconcept_id,mode,sim_type,adapter_type,data_mapper,config_path,logic_path
algorithms,binary-search,basic-binary-search,code,SKULPT,array,,web/components/features/ctp/contents/categories/algorithms/concepts/binary-search/sub-concepts/basic-binary-search/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/binary-search/sub-concepts/basic-binary-search/logic.ts
algorithms,binary-search,parametric-search,code,SKULPT,array,,web/components/features/ctp/contents/categories/algorithms/concepts/binary-search/sub-concepts/parametric-search/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/binary-search/sub-concepts/parametric-search/logic.ts
algorithms,dfs-bfs,bfs-basics,code,SKULPT,graph,,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/bfs-basics/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/bfs-basics/logic.ts
algorithms,dfs-bfs,bfs-multi-source,code,SKULPT,graph,,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/bfs-multi-source/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/bfs-multi-source/logic.ts
algorithms,dfs-bfs,bfs-path-reconstruction,code,SKULPT,graph,,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/bfs-path-reconstruction/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/bfs-path-reconstruction/logic.ts
algorithms,dfs-bfs,bfs-zero-one,code,SKULPT,graph,,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/bfs-zero-one/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/bfs-zero-one/logic.ts
algorithms,dfs-bfs,dfs-backtracking,code,SKULPT,graph,,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/dfs-backtracking/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/dfs-backtracking/logic.ts
algorithms,dfs-bfs,dfs-basics,code,SKULPT,graph,,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/dfs-basics/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/dfs-basics/logic.ts
algorithms,dfs-bfs,dfs-cycle-detection,code,SKULPT,graph,,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/dfs-cycle-detection/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/dfs-cycle-detection/logic.ts
algorithms,dfs-bfs,dfs-path-reconstruction,code,SKULPT,graph,,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/dfs-path-reconstruction/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/dfs-path-reconstruction/logic.ts
algorithms,dfs-bfs,dfs-tree-traversal,code,SKULPT,graph,,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/dfs-tree-traversal/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/dfs-tree-traversal/logic.ts
algorithms,dfs-bfs,grid-traversal,code,SKULPT,grid,,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/grid-traversal/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/dfs-bfs/sub-concepts/grid-traversal/logic.ts
algorithms,dp,dp-1d,code,SKULPT,array,,web/components/features/ctp/contents/categories/algorithms/concepts/dp/sub-concepts/dp-1d/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/dp/sub-concepts/dp-1d/logic.ts
algorithms,dp,dp-2d,code,SKULPT,grid,,web/components/features/ctp/contents/categories/algorithms/concepts/dp/sub-concepts/dp-2d/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/dp/sub-concepts/dp-2d/logic.ts
algorithms,dp,dp-basics,code,SKULPT,array,,web/components/features/ctp/contents/categories/algorithms/concepts/dp/sub-concepts/dp-basics/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/dp/sub-concepts/dp-basics/logic.ts
algorithms,dp,dp-patterns,code,SKULPT,array,,web/components/features/ctp/contents/categories/algorithms/concepts/dp/sub-concepts/dp-patterns/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/dp/sub-concepts/dp-patterns/logic.ts
algorithms,graph-advanced,mst,code,SKULPT,graph,,web/components/features/ctp/contents/categories/algorithms/concepts/graph-advanced/sub-concepts/mst/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/graph-advanced/sub-concepts/mst/logic.ts
algorithms,graph-advanced,topological-sort,code,SKULPT,graph,,web/components/features/ctp/contents/categories/algorithms/concepts/graph-advanced/sub-concepts/topological-sort/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/graph-advanced/sub-concepts/topological-sort/logic.ts
algorithms,shortest-path,dijkstra,code,SKULPT,graph,,web/components/features/ctp/contents/categories/algorithms/concepts/shortest-path/sub-concepts/dijkstra/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/shortest-path/sub-concepts/dijkstra/logic.ts
algorithms,shortest-path,floyd-warshall,code,SKULPT,grid,,web/components/features/ctp/contents/categories/algorithms/concepts/shortest-path/sub-concepts/floyd-warshall/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/shortest-path/sub-concepts/floyd-warshall/logic.ts
algorithms,sorting,bubble-sort,code,SKULPT,array,,web/components/features/ctp/contents/categories/algorithms/concepts/sorting/sub-concepts/bubble-sort/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/sorting/sub-concepts/bubble-sort/logic.ts
algorithms,sorting,heap-sort,code,SKULPT,heap-sort,,web/components/features/ctp/contents/categories/algorithms/concepts/sorting/sub-concepts/heap-sort/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/sorting/sub-concepts/heap-sort/logic.ts
algorithms,sorting,insertion-sort,code,SKULPT,array,,web/components/features/ctp/contents/categories/algorithms/concepts/sorting/sub-concepts/insertion-sort/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/sorting/sub-concepts/insertion-sort/logic.ts
algorithms,sorting,merge-sort,code,SKULPT,merge-sort,,web/components/features/ctp/contents/categories/algorithms/concepts/sorting/sub-concepts/merge-sort/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/sorting/sub-concepts/merge-sort/logic.ts
algorithms,sorting,quick-sort,code,SKULPT,array,,web/components/features/ctp/contents/categories/algorithms/concepts/sorting/sub-concepts/quick-sort/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/sorting/sub-concepts/quick-sort/logic.ts
algorithms,sorting,selection-sort,code,SKULPT,array,,web/components/features/ctp/contents/categories/algorithms/concepts/sorting/sub-concepts/selection-sort/config.ts,web/components/features/ctp/contents/categories/algorithms/concepts/sorting/sub-concepts/selection-sort/logic.ts
linear,array,1d-array,code,SKULPT,array,,web/components/features/ctp/contents/categories/linear/concepts/array/sub-concepts/1d-array/config.ts,web/components/features/ctp/contents/categories/linear/concepts/array/sub-concepts/1d-array/logic.ts
linear,array,2d-array,code,SKULPT,grid,,web/components/features/ctp/contents/categories/linear/concepts/array/sub-concepts/2d-array/config.ts,web/components/features/ctp/contents/categories/linear/concepts/array/sub-concepts/2d-array/logic.ts
linear,array,string,code,OTHER,,,web/components/features/ctp/contents/categories/linear/concepts/array/sub-concepts/string/config.ts,web/components/features/ctp/contents/categories/linear/concepts/array/sub-concepts/string/logic.ts
linear,hash-table,collision,code,SKULPT,hash-table,,web/components/features/ctp/contents/categories/linear/concepts/hash-table/sub-concepts/collision/config.ts,web/components/features/ctp/contents/categories/linear/concepts/hash-table/sub-concepts/collision/logic.ts
linear,hash-table,hash-basics,interactive,STATE,,,web/components/features/ctp/contents/categories/linear/concepts/hash-table/sub-concepts/hash-basics/config.ts,web/components/features/ctp/contents/categories/linear/concepts/hash-table/sub-concepts/hash-basics/logic.ts
linear,hash-table,hash-implement,code,SKULPT,hash-table,,web/components/features/ctp/contents/categories/linear/concepts/hash-table/sub-concepts/hash-implement/config.ts,web/components/features/ctp/contents/categories/linear/concepts/hash-table/sub-concepts/hash-implement/logic.ts
linear,linked-list,circular,code,SKULPT,circular-linked-list,,web/components/features/ctp/contents/categories/linear/concepts/linked-list/sub-concepts/circular/config.ts,web/components/features/ctp/contents/categories/linear/concepts/linked-list/sub-concepts/circular/logic.ts
linear,linked-list,doubly,code,SKULPT,doubly-linked-list,,web/components/features/ctp/contents/categories/linear/concepts/linked-list/sub-concepts/doubly/config.ts,web/components/features/ctp/contents/categories/linear/concepts/linked-list/sub-concepts/doubly/logic.ts
linear,linked-list,singly,code,SKULPT,linked-list,,web/components/features/ctp/contents/categories/linear/concepts/linked-list/sub-concepts/singly/config.ts,web/components/features/ctp/contents/categories/linear/concepts/linked-list/sub-concepts/singly/logic.ts
linear,linked-list,two-pointers,code,SKULPT,linked-list,,web/components/features/ctp/contents/categories/linear/concepts/linked-list/sub-concepts/two-pointers/config.ts,web/components/features/ctp/contents/categories/linear/concepts/linked-list/sub-concepts/two-pointers/logic.ts
linear,queue,circular-queue,code,SKULPT,queue,,web/components/features/ctp/contents/categories/linear/concepts/queue/sub-concepts/circular-queue/config.ts,web/components/features/ctp/contents/categories/linear/concepts/queue/sub-concepts/circular-queue/logic.ts
linear,queue,deque,code,SKULPT,deque,,web/components/features/ctp/contents/categories/linear/concepts/queue/sub-concepts/deque/config.ts,web/components/features/ctp/contents/categories/linear/concepts/queue/sub-concepts/deque/logic.ts
linear,queue,linear-queue,interactive,STATE,,,web/components/features/ctp/contents/categories/linear/concepts/queue/sub-concepts/linear-queue/config.ts,web/components/features/ctp/contents/categories/linear/concepts/queue/sub-concepts/linear-queue/logic.ts
linear,queue,pq-basics,code,SKULPT,queue,,web/components/features/ctp/contents/categories/linear/concepts/queue/sub-concepts/pq-basics/config.ts,web/components/features/ctp/contents/categories/linear/concepts/queue/sub-concepts/pq-basics/logic.ts
linear,stack,array-stack,code,SKULPT,,,web/components/features/ctp/contents/categories/linear/concepts/stack/sub-concepts/array-stack/config.ts,web/components/features/ctp/contents/categories/linear/concepts/stack/sub-concepts/array-stack/logic.ts
linear,stack,lifo-basics,interactive,OTHER,,,web/components/features/ctp/contents/categories/linear/concepts/stack/sub-concepts/lifo-basics/config.ts,web/components/features/ctp/contents/categories/linear/concepts/stack/sub-concepts/lifo-basics/logic.ts
linear,stack,linked-stack,code,SKULPT,,,web/components/features/ctp/contents/categories/linear/concepts/stack/sub-concepts/linked-stack/config.ts,web/components/features/ctp/contents/categories/linear/concepts/stack/sub-concepts/linked-stack/logic.ts
linear,stack,monotonic-stack,code,SKULPT,,,web/components/features/ctp/contents/categories/linear/concepts/stack/sub-concepts/monotonic-stack/config.ts,web/components/features/ctp/contents/categories/linear/concepts/stack/sub-concepts/monotonic-stack/logic.ts
non-linear,graph,bfs,code,SKULPT,graph,,web/components/features/ctp/contents/categories/non-linear/concepts/graph/sub-concepts/bfs/config.ts,web/components/features/ctp/contents/categories/non-linear/concepts/graph/sub-concepts/bfs/logic.ts
non-linear,graph,cycle-detection,code,SKULPT,graph,,web/components/features/ctp/contents/categories/non-linear/concepts/graph/sub-concepts/cycle-detection/config.ts,web/components/features/ctp/contents/categories/non-linear/concepts/graph/sub-concepts/cycle-detection/logic.ts
non-linear,graph,dfs,code,SKULPT,graph,,web/components/features/ctp/contents/categories/non-linear/concepts/graph/sub-concepts/dfs/config.ts,web/components/features/ctp/contents/categories/non-linear/concepts/graph/sub-concepts/dfs/logic.ts
non-linear,graph,graph-representation,interactive,STATE,,,web/components/features/ctp/contents/categories/non-linear/concepts/graph/sub-concepts/graph-representation/config.ts,web/components/features/ctp/contents/categories/non-linear/concepts/graph/sub-concepts/graph-representation/logic.ts
non-linear,graph,mst,code,SKULPT,graph,,web/components/features/ctp/contents/categories/non-linear/concepts/graph/sub-concepts/mst/config.ts,web/components/features/ctp/contents/categories/non-linear/concepts/graph/sub-concepts/mst/logic.ts
non-linear,graph,shortest-path,code,SKULPT,graph,,web/components/features/ctp/contents/categories/non-linear/concepts/graph/sub-concepts/shortest-path/config.ts,web/components/features/ctp/contents/categories/non-linear/concepts/graph/sub-concepts/shortest-path/logic.ts
non-linear,heap,heap-basics,interactive,STATE,,,web/components/features/ctp/contents/categories/non-linear/concepts/heap/sub-concepts/heap-basics/config.ts,web/components/features/ctp/contents/categories/non-linear/concepts/heap/sub-concepts/heap-basics/logic.ts
non-linear,heap,max-heap,code,SKULPT,heap,,web/components/features/ctp/contents/categories/non-linear/concepts/heap/sub-concepts/max-heap/config.ts,web/components/features/ctp/contents/categories/non-linear/concepts/heap/sub-concepts/max-heap/logic.ts
non-linear,heap,min-heap,code,SKULPT,heap,,web/components/features/ctp/contents/categories/non-linear/concepts/heap/sub-concepts/min-heap/config.ts,web/components/features/ctp/contents/categories/non-linear/concepts/heap/sub-concepts/min-heap/logic.ts
non-linear,tree,binary-traversal,code,SKULPT,graph,,web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/binary-traversal/config.ts,web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/binary-traversal/logic.ts
non-linear,tree,bst,code,SKULPT,graph,,web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/bst/config.ts,web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/bst/logic.ts
non-linear,tree,tree-basics,interactive,STATE,,,web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-basics/config.ts,web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-basics/logic.ts
non-linear,tree,tree-properties,interactive,STATE,,,web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-properties/config.ts,web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-properties/logic.ts
```

## 4) Interactive 모듈 목록

| concept | subConcept | config | logic |
|---|---|---|---|
| hash-table | hash-basics | `web/components/features/ctp/contents/categories/linear/concepts/hash-table/sub-concepts/hash-basics/config.ts` | `web/components/features/ctp/contents/categories/linear/concepts/hash-table/sub-concepts/hash-basics/logic.ts` |
| queue | linear-queue | `web/components/features/ctp/contents/categories/linear/concepts/queue/sub-concepts/linear-queue/config.ts` | `web/components/features/ctp/contents/categories/linear/concepts/queue/sub-concepts/linear-queue/logic.ts` |
| stack | lifo-basics | `web/components/features/ctp/contents/categories/linear/concepts/stack/sub-concepts/lifo-basics/config.ts` | `web/components/features/ctp/contents/categories/linear/concepts/stack/sub-concepts/lifo-basics/logic.ts` |
| graph | graph-representation | `web/components/features/ctp/contents/categories/non-linear/concepts/graph/sub-concepts/graph-representation/config.ts` | `web/components/features/ctp/contents/categories/non-linear/concepts/graph/sub-concepts/graph-representation/logic.ts` |
| heap | heap-basics | `web/components/features/ctp/contents/categories/non-linear/concepts/heap/sub-concepts/heap-basics/config.ts` | `web/components/features/ctp/contents/categories/non-linear/concepts/heap/sub-concepts/heap-basics/logic.ts` |
| tree | tree-basics | `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-basics/config.ts` | `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-basics/logic.ts` |
| tree | tree-properties | `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-properties/config.ts` | `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-properties/logic.ts` |

## 5) 특이사항

- `algorithms/dfs`, `algorithms/bfs`는 registry에서 `../dfs-bfs/sub-concepts/*`를 참조하는 shared 구조다.
- `algorithms/dfs-bfs` 폴더는 route 노출 대상이 아니며(shared 소스 저장소 역할), 실제 사용자 라우트는 `dfs`, `bfs`다.
- 일부 모듈은 `adapterType` 대신 `dataMapper` 기반 커스텀 파싱을 사용한다(예: stack 하위 일부).
- `mode: interactive` 구현은 두 가지:
  - 로직에서 `interactive` runtime 직접 반환 (`CTPInteractiveModule`)
  - 로직 최소화 + `CTPInteractivePlayground` fallback