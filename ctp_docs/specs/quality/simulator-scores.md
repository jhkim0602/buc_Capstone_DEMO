# 시뮬레이터 점수화 리포트 (세션별)

## 세션-시뮬레이터 정합성 평가 (요약)
- **Linear DS**: 코드 기반 시각화가 핵심 연산(인덱스/포인터/버킷)을 보여 주며 학습 적합도 높음.
- **Non-Linear (Tree/Heap)**: 구조 이해용 시각화는 적합하나, 코드-시각화 연계는 추가 강화 필요.
- **Graph/Trie/Union-Find**: Trace 기반 구조 시각화로 고난이도 개념의 흐름을 설명 가능. 학습 적합도 중상.
- **Algorithms**: 정렬/DP는 코드-시각화 연결이 여전히 약하며 학습 효과 보강 필요.
- **코드 편집성**: 출력 헬퍼 블록을 짧게 유지하고, 변수명 리스트 편집만으로 출력 범위를 조정 가능.

## 최근 변경 (2026-01-28)
- **print 표준화 적용**: 기본 코드에 출력 로직을 추가하여 실행 피드백 개선.
- Meta & 시스템 디자인 챕터 제거로 **CTP 범위가 DS/Algorithms 중심으로 정제**됨.
- GraphSvgVisualizer **중앙 정렬 보정**으로 화면 고정/쏠림 이슈 완화.
- GraphSvgVisualizer **자동 축소(fit) 적용**으로 큰 그래프 가시성 개선.
- GraphSvgVisualizer **사용자 줌/드래그(패닝) 지원** 추가.
- 줌 레벨 표시/리셋 버튼/핀치 줌 지원으로 대형 그래프 탐색성 개선.
- Sorting 시뮬레이터를 막대 차트 방식으로 전환 (비교/스왑 시각성 강화).

## 평가 기준
- Topic alignment: 해당 챕터 핵심 개념 시각화 정도
- Interactivity: 사용자가 조작하며 개념을 체득할 수 있는가
- Code-to-Visual: 코드 실행 결과가 시각화와 연결되는가
- Custom Robustness: 커스텀 구현 시 인식 가능성

점수는 **0~10** (런타임 확인 완료, V2 SVG 렌더 기준)

---

## Linear Data Structures

### Array
- 1D Array: **8/10**
  - Skulpt + ArrayAdapter (arr/nums/items/data 탐지), 코드-시각화 연계 우수
- 2D Array: **8/10**
  - GridAdapter로 grid/matrix/board 탐지, 좌표 시각화 명확
- String: **6/10**
  - 커스텀 파서 기반(실제 실행 아님). 설명성은 높으나 범용성 제한

### Linked List
- Singly: **7/10**
- Doubly: **7/10**
- Circular: **6/10**
- Two Pointers: **7/10**
  - Node-like 탐지로 유연하나 구조가 크게 다르면 실패 가능

### Stack
- LIFO Basics: **3/10**
  - 버튼 기반, 시각화/코드 연결 미흡
- Array Stack: **7/10**
  - dataMapper로 class/array/top 인식, 코드-시각화 양호
- Linked Stack: **6/10**
  - linked list 기반 시각화(Top 포인터) 인식
- Monotonic Stack: **7/10**
  - 입력/스택/결과 3구역 시각화, 개념 매칭 우수

### Queue
- Linear Queue: **5/10**
  - 버튼 기반, dead space 직관은 있으나 코드 연계 없음
- Circular Queue: **6/10**
  - 코드 기반 전환 + queue/front/rear/count 규약 필요
- Deque: **6/10**
  - 코드 기반 전환 + data/front/size 규약 필요
- Priority Queue Basics: **5/10**
  - 코드 기반 전환이나 PQ 특유 구조(정렬/힙) 시각화는 제한적

### Hash Table
- Hash Basics: **3/10**
  - 버튼 기반(개념 직관용). 버킷 구조 표현은 약함
- Collision Handling: **4/10**
  - 코드 기반 + 버킷/충돌 경로 하이라이트(1차)
- Hash Implement: **5/10**
  - 코드 기반 + rehashing/rehash_bucket/rehash_entry 하이라이트(1차)

---

## Non-Linear Data Structures

### Tree
- Tree Basics: **5/10**
  - 버튼 기반 기본 트리 구조 시각화
- Binary Traversal: **5/10**
  - 전위 순회 step 강조(버튼 기반)
- BST: **6/10**
  - 삽입/검색 동작 시각화 (interactive)

### Heap
- Heap Basics: **4/10**
  - 버튼 기반 루트 강조 정도 (개념 직관용)
- Min Heap: **6/10**
- Max Heap: **6/10**
  - push/pop 동작 시각화는 있으나 코드 연계 없음

### Graph
- Graph Representation: **4/10**
- DFS: **6/10**
- BFS: **6/10**
- Cycle Detection: **6/10**
- Shortest Path: **7/10**
- MST: **6/10**
  - V2 SVG 구조 시각화 + Trace 이벤트(active/visit/consider/relax/dist) 반영

### Trie
- Trie Basics: **2/10**
- Prefix Search: **6/10**
- Trie Applications: **6/10**
  - prefix ID 기반 구조 + 경로 하이라이트 안정화

### Union-Find
- DS Basics: **2/10**
- Union by Rank: **6/10**
- Path Compression: **6/10**
- Applications: **6/10**
  - Trace 이벤트(node_active/visit/compare) 반영

---

## Algorithms
- Sorting (Bubble/Selection/Insertion/Merge/Quick/Heap): **3/10**
- Binary Search (Basic/Parametric): **3/10**
- DFS (Basics/Backtracking/Tree/Cycle/Path): **6/10**
- BFS (Basics/Grid/Multi-Source/0-1/Path): **6/10**
- Shortest Path (Dijkstra/Floyd): **6/10**
- Advanced Graph (Topo/MST): **6/10**
- DP (Basics/1D/2D/Patterns): **3/10**
  - DFS/BFS/Dijkstra/Topo/MST는 V2 SVG + Trace 이벤트 반영 (런타임 확인)

### DFS/BFS 분리 타당성(학습 관점)
- 비선형(그래프) 챕터는 **구조/표현/탐색 흐름**에 집중하는 데 적합
- 알고리즘 챕터에서 **DFS/BFS를 분리**함으로써
  - 개념 설명 → 코드 구현 → 시각화 흐름이 단순해짐
  - BFS/DFS 차이를 비교하는 학습 부담이 낮아짐
  - 각각의 문제 유형(그래프/격자)에 맞춘 예시를 배치 가능

---

## 종합 결론
- **코드 기반 시뮬레이터(배열/리스트/스택 일부)**는 학습 효과가 높음
- **버튼 기반(초반 직관)**은 유효하나, 심화 챕터에는 부족
- **Graph/Trie/Union-Find/Algorithms**는 구조 시각화 1차 도입 완료
