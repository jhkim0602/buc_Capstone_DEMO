# 품질 고도화 Tasks

## Content
- [x] 비교 기준/사이트 선정
- [x] 비교 분석 요약 문서화
- [x] 고도화 계획 수립
- [ ] 챕터별 체크리스트 적용(Deque/Hash/Graph 우선)
- [x] Graph 내 DFS/BFS 분리 (그래프는 구조/표현 중심으로 축소)
- [x] Algorithms DFS/BFS 목차 확장(코딩테스트 유형 중심 재구성)
- [x] Algorithms DFS/BFS 예제 데이터셋을 개념별 대표 사례로 고정(코드 내 난이도 선택 제거)
- [x] Algorithms DFS/BFS 문제 리스트 난이도 스케일링 조정
- [x] DFS/BFS/Shortest/MST 핵심 설명 보강(정의/불변식/플레이그라운드 설명)
- [x] Graph 개념 챕터 서술 확장(DFS/BFS/사이클/최단경로)
- [x] 알고리즘(정렬/이분탐색/DP) + 비선형(트리/힙/트라이/UF) 설명 대폭 보강
- [x] 선형(배열/해시) 핵심 설명 보강 및 불변식/플레이그라운드 안내 강화
- [x] 선형(스택/큐/연결리스트) 설명 보강 및 실습 요약 추가

## Simulator
- [x] Queue/Deque/Hash 시뮬레이터 점수화
- [x] 개선 트랙(A/B) 정의
- [x] 시뮬레이터 운영 정책(버튼/코드 단계) 정의
- [x] 전 챕터 모드 매핑 작성
- [x] 트랙 선택 및 설계 상세화 (Queue/Deque/Hash는 Code 전환)
- [x] Queue/Deque/PQ 코드 기반 전환
- [x] Hash Collision/Implement 코드 기반 전환
- [ ] Hash 버킷/충돌 시각화 고도화 (리해시/프로빙 애니메이션) - 버킷 하이라이트 + rehashing/probe_path/rehash_bucket/rehash_entry 1차 적용 완료
- [x] 시뮬레이터 점수 임시 재평가(런타임 전)
- [x] 커스텀 코드 호환성 평가 반영
- [x] 커스텀 클래스/필드 스캔 지원(Queue/Deque/Hash 어댑터)
- [x] Hash Implement 점수 재조정(리해시 항목 강조 반영)
- [x] Graph/Trie/Union-Find 코드 기반 시뮬레이터 전환
- [x] Algorithms 전 챕터 코드 기반 시뮬레이터 전환
- [x] Graph/Trie/Union-Find 전용 구조 시각화 설계(Visualizer/Adapter)
- [x] Graph/Trie/Union-Find 전용 Adapter 도입
- [x] 시각화 학습 효과 리서치 문서 작성
- [x] Tracer 이벤트 스펙 초안 작성
- [x] 시각화 아키텍처 제안 문서 작성
- [x] Graph/Trie/Union-Find 초기 코드 하이라이트 변수 적용
- [x] Graph 상태/거리 하이라이트 1차 적용 (state/dist/compare_nodes)
- [x] Union-Find 경로/랭크 하이라이트 1차 적용 (path_nodes/rank)
- [x] Graph/Trie/Union-Find 코드 실행 상태 하이라이트 1차 적용
- [x] Algorithms 하이라이트 규약 정의(variables → status)
- [x] Array/Grid Adapter 하이라이트 지원 추가
- [x] Algorithms 초기 코드에 하이라이트 변수 적용
- [x] Cytoscape 재실행 시 공백 문제 원인 확정/수정 (V2 SVG 전환)
- [x] 런타임 검증(브라우저) 및 점수 재평가 확정 (사용자 확인)
- [x] 그래프/알고리즘 상태 요약 패널 추가(방문 순서/큐/스택/거리/부모)
- [x] Graph 개념 챕터 정다각형 레이아웃 적용
- [x] Graph 예제 노드 수 확대(DFS/BFS/Cycle/Shortest Path/MST)
- [x] Graph 개념 챕터 traceOnly 해제(전체 구조 고정 렌더링)
- [x] 상태 패널 옵션화(showStatePanel/statePanelMode) + DFS/BFS 선택적 적용
- [x] Sorting 모듈 상태 패널 비활성화
- [x] MST/Algorithms DFS-BFS 정다각형 레이아웃 적용
- [x] Algorithms DFS/BFS traceOnly 해제(전체 구조 고정 렌더링)
- [x] Graph 간선 라벨(w/d) 표시 적용
- [x] 비선형 Graph(DFS/BFS/Cycle/Shortest/MST) 상태 패널 기본 활성화
- [x] Graph 범례 추가 및 edge_relax 강조 적용
- [x] 상태 패널 토글 UX 추가(온/오프)
- [x] 요약 모드에서도 이벤트 로그 표시
- [x] traceOnly 모듈 이벤트 누락 점검 및 최소 규약 적용(노드/간선/완료)
- [x] dist_update 스키마 확장(parent/from) + 간선 라벨(dist) 중심으로 전환
- [x] Dijkstra 정다각형 레이아웃 적용 + Floyd-Warshall 행렬 유지

## TOC
- [x] 정적 검사: sub-concepts config 필수 섹션 확인
- [x] 공유 컴포넌트 data-toc 유지 확인(코드 스캔)
- [x] 런타임 TOC Debug 실행 (`?tocDebug=1`) (사용자 확인)
- [x] Graph DFS/BFS 분리 반영 (curriculum + registry + config)

## QA (Deferred)
- [ ] QA 체크리스트 전면 실행 (`qa-checklist.md`)
- [ ] 런타임 에러/깜빡임/시각화 누락 항목 리그레션 점검
- [ ] 챕터별 시뮬레이션 학습 효과 재점수화
