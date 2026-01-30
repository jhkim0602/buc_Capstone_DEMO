# Architecture Decision: Dual-Track Visualization

## 결론
- **선형 구조(배열/리스트/스택/큐/해시)**는 기존 ReactFlow + Adapter + Skulpt 기반을 유지한다.
- **고난이도 구조(Graph/Trie/Union-Find/Advanced Graph/일부 알고리즘)**는 Tracer/DSL 기반 전용 시각화 아키텍처로 전환한다.
- **전용 시각화 백엔드: 커스텀 SVG(GraphSvgVisualizer) 채택** (ReactFlow는 유지 영역에서만 사용)

## 근거
- 선형 구조는 배열/포인터 상태만으로 충분히 학습 효과를 제공.
- 그래프/트라이는 구조 + 경로/상태 전이가 핵심이며 ReactFlow만으로 표현이 제한적.
- 전체 교체는 비용이 크므로 **이원화 전략**이 합리적.
- React Flow는 노드/엣지 상태 변경이 잦을 때 재렌더 비용이 커질 수 있음.
- Cytoscape 시도 중 **렌더 공백/재실행 이슈**가 발생했고, 안정성 우선 원칙에 따라 대체 필요.
- 커스텀 SVG 렌더러는 **레이아웃 규칙을 결정적으로 고정**할 수 있어 재실행 신뢰도 확보에 유리.

## 범위
- 유지: Array, Linked List, Stack, Queue, Hash Table
- 전환: Graph, Trie, Union-Find, Advanced Graph, 일부 알고리즘(DFS, BFS, Shortest Path)

## 영향
- 기존 Adapter는 유지하되, Tracer 이벤트 수집 레이어 추가
- 고난이도 구조는 **GraphSvgVisualizer** 기준으로 이벤트/레이아웃 규약 고정
