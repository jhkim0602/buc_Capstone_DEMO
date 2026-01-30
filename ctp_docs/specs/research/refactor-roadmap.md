# 대규모 리펙토링 로드맵 (Draft)

> 세션별 상세 계획은 `session-visualization-refactor-plan.md` 및 `session-refactor-tasks.md` 참조

## 0) 목표
- 난이도 높은 구조(Graph/Trie/Union-Find/Advanced Graph)의 학습 효과를 **Tracer 기반 시각화**로 개선한다.
- 기존 선형 구조는 현재 아키텍처를 유지한다.

## 1) Phase R0: 설계 확정
- Tracer 이벤트 스펙 확정 (`tracer-spec.md` 기반)
- 시각화 백엔드 선택(ReactFlow 유지 영역 vs **GraphSvgVisualizer 전환 영역**)
- 전환 대상 챕터 확정
 - Status: 완료 (2026-01-28)

## 2) Phase R1: Tracer 런타임 도입
- Skulpt 실행 단계에 Tracer 이벤트 수집 레이어 추가
- 이벤트 → 시각화 상태 변환 파이프라인 구축
- Step Player와 이벤트 동기화
 - Status: 완료 (2026-01-28)

## 3) Phase R2: Graph/Trie/Union-Find 전환
- Graph/Trie/UF 시각화 컴포넌트 전환
- Tracer 이벤트 기반 하이라이트 적용
- 대표 알고리즘(DFS, BFS, Union/Find, Prefix Search) 완성
 - Status: 완료 (2026-01-28)

## 4) Phase R3: Advanced Graph/Shortest Path 고도화
- Dijkstra, Topological Sort, MST에 Tracer 이벤트 적용
- 경로/거리 갱신 시각화 강화
 - Status: 완료 (2026-01-28)

## 5) Phase R4: 정렬 챕터 세분화
- Sorting을 Bubble/Selection/Insertion/Merge/Quick/Heap 등 개별 Topic으로 분리
- 각 Topic 별 시뮬레이터/문제 세트 구성
- Status: 완료 (2026-01-28)

## 6) Phase R5: 품질 재평가
- 시뮬레이터 점수 재평가
- 학습 효과 사용자 테스트 기록
 - Status: 완료 (사용자 확인)
