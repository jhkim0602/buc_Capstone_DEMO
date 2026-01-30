# 대규모 리펙토링 Tasks

## Phase R0: 설계 확정
- [x] Tracer 이벤트 스펙 확정 (tracer-spec.md)
- [x] 시각화 백엔드 선택 결정 (ReactFlow vs GraphSvgVisualizer)
- [x] 전환 대상 챕터 확정

## Phase R1: Tracer 런타임
- [x] Skulpt worker에 tracer 이벤트 수집 레이어 추가
- [x] 이벤트 → 시각화 상태 변환 파이프라인 구성
- [x] StepPlayer 이벤트 동기화

## Phase R2: Graph/Trie/Union-Find 전환
- [x] Graph/Trie/UF 전용 시각화 컴포넌트 구현
- [x] DFS/BFS(알고리즘), Prefix, Union/Find 이벤트 연동
- [x] Trie Prefix/Apps 이벤트 연동
- [x] Algorithms DFS/BFS 이벤트 연동

## Phase R3: Advanced Graph
- [x] Dijkstra 이벤트 연동
- [x] MST 이벤트 연동
- [x] Topological Sort 이벤트 연동
- [x] 거리/경로/정점 상태 강조

## Phase R4: Sorting 세분화
- [x] Bubble Sort Topic 추가
- [x] Selection Sort Topic 추가
- [x] Insertion Sort Topic 추가
- [x] Merge Sort Topic 추가
- [x] Quick Sort Topic 추가
- [x] Heap Sort Topic 추가
- [x] 기존 Sorting 챕터 재구성

## Phase R5: 품질 재평가
- [x] 시뮬레이터 점수 재평가
- [x] 학습 효과 테스트 기록 (사용자 확인)
