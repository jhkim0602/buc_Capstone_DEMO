# Core Spec

## 1) Information Architecture
- 상위 구조: Linear / Non-Linear / Algorithms
- 사이드바: Category → Concept → Chapter Topics
- TOC: `data-toc="main"` / `data-toc="sub"` 자동 수집

## 2) Navigation Mapping Rules
- CTP_DATA: 사이드바/랜딩/서브챕터 기준
- CTP_CONTENT_REGISTRY: 개념/콘텐츠 연결
- 각 Concept는 반드시 subConcepts 보유

## 3) Learning Flow (공통)
1) Intro
2) Features
3) Visualization
4) Complexity
5) Implementation
6) Practice

## 4) Chapter Topics (요약)
### Linear
- Array: 1D / 2D / String
- Linked List: Singly / Doubly / Circular / Two Pointers
- Stack: LIFO / Array / Linked / Monotonic
- Queue: Linear / Circular / Deque / Priority Queue

### Non-Linear
- Tree: Basics / Traversal / BST
- Heap: Basics / Min / Max
- Graph: Representation / DFS / BFS / Cycle / Shortest Path / MST
- Trie: Basics / Prefix / Applications
- Union-Find: Basics / Rank / Path Compression / Applications

### Algorithms
- Sorting: Bubble / Selection / Insertion / Merge / Quick / Heap
- Binary Search: Basic / Parametric
- DFS: Basics
- DFS: Basics / Backtracking / Tree Traversal / Cycle Detection / Path Reconstruction
- BFS: Basics / Grid Traversal / Multi-Source / 0-1 BFS / Path Reconstruction
- Shortest Path: Dijkstra / Floyd-Warshall
- Advanced Graph: Topological Sort / MST
- DP: Basics / 1D / 2D / Patterns


## 5) Content Template
- Intro: Problem / Definition / Analogy
- Features: 2~3개 핵심 특징
- Visualization: Guide(실습 가이드)
- Complexity: Access / Search / Insert / Delete
- Implementation: Python only, 실행 가능 코드
- Practice: Baekjoon 2~3문제 (id/title/tier/description)
