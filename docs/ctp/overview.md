# CTP 프로젝트 개요

## 프로젝트 소개

CTP (Code-to-Playground)는 자료구조와 알고리즘을 **코드 실행과 실시간 시각화 동기화**를 통해 학습하는 인터랙티브 교육 플랫폼입니다.

### 핵심 특징
- **코드 → 시각화 동기화**: Python 코드를 실행하면 자료구조의 상태 변화를 실시간으로 시각화
- **단계별 실행**: 코드를 한 줄씩 실행하며 각 단계의 상태를 확인
- **교재형 구성**: 문제 → 정의 → 비유 → 시각화 → 구현 → 문제 풀이
- **Tracer 기반 고급 시각화**: 그래프, 트라이, Union-Find 등 복잡한 구조의 알고리즘 흐름 추적

## 기술 스택

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Python 실행**: Skulpt (브라우저 내 Python 인터프리터)
- **상태 관리**: Zustand
- **시각화**:
  - ReactFlow (선형 구조)
  - 커스텀 SVG Renderer (GraphSvgVisualizer - 고난이도 구조)
- **스타일**: Tailwind CSS, Framer Motion

## 학습 범위

### 1. Linear Data Structures (선형 자료구조)
- Array (1D/2D/String)
- Linked List (Singly/Doubly/Circular/Two-Pointers)
- Stack (LIFO/Array/Linked/Monotonic)
- Queue (Linear/Circular/Deque/Priority Queue)
- Hash Table (Basics/Collision/Implement)

### 2. Non-Linear Data Structures (비선형 자료구조)
- Tree (Basics/Traversal/BST)
- Heap (Basics/Min/Max)
- Graph (Representation/DFS/BFS/Cycle/Shortest Path/MST)
- Trie (Basics/Prefix Search/Applications)
- Union-Find (Basics/Union by Rank/Path Compression/Apps)

### 3. Algorithms (알고리즘)
- Sorting (Bubble/Selection/Insertion/Merge/Quick/Heap)
- Binary Search (Basic/Parametric)
- DFS (Basics/Backtracking/Tree Traversal/Cycle/Path)
- BFS (Basics/Grid Traversal/Multi-Source/0-1 BFS/Path)
- Shortest Path (Dijkstra/Floyd-Warshall)
- Advanced Graph (Topological Sort/MST)
- Dynamic Programming (Basics/1D/2D/Patterns)

## 학습 플로우

각 개념은 다음의 6단계로 구성됩니다:

1. **Intro** - 문제 상황, 정의, 실생활 비유
2. **Features** - 핵심 특징 2-3가지
3. **Visualization** - 인터랙티브 플레이그라운드
4. **Complexity** - 시간복잡도 분석
5. **Implementation** - Python 구현 예제
6. **Practice** - Baekjoon 문제 2-3개

## 프로젝트 상태

- **Phase F 완료** (2026-01-28)
- 전체 챕터 콘텐츠 작성 완료
- Queue/Deque/Hash/Graph/Trie/UF/Algorithms 코드 기반 시뮬레이터 전환 완료
- Tracer 기반 시각화 적용 완료
- 런타임 검증 완료

## 다음 단계

- 추가 요구사항에 따른 기능 확장
- 커스텀 코드 호환성 개선
- 학습 효과 측정 및 피드백 반영
