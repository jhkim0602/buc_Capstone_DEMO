# Session Refactor Tasks (Detailed)

## 목적
- 세션별(Linear / Non-Linear / Algorithms) 시각화 리팩토링을 **작업 단위**로 세분화한다.
- 이후 커리큘럼 재구성을 위한 **난이도/맥락/문제 대비 기준**을 확보한다.

---

## 공통 인프라 (R1)
1) Tracer 이벤트 스펙 확정
   - Graph / Trie / Union-Find / DFS / BFS / Shortest Path 공통 키 정의
   - 이벤트 → 상태 매핑 규칙(Active/Compare/Visited/Found)
2) Skulpt Worker 이벤트 수집 레이어
   - 실행 단계에서 이벤트 스트림 기록
   - StepPlayer 동기화 (속도/일시정지/단계 이동)
3) 안전 가드
   - 실행 타임아웃 처리
   - 이벤트 버퍼 제한/성능 최적화

---

## Linear DS (유지/보강)
1) Adapter 변수명 규약 고정
2) 하이라이트 정확도 개선 (swap/move/compare)
3) 스냅샷 정밀도 표준화
4) 문서 업데이트: 학습 흐름 + 규약

---

## Non-Linear DS (전환)

### Graph
1) Tracer 이벤트 템플릿
   - node_visit, edge_consider, edge_relax, node_finalize, dist_update
2) Graph 전용 시각화 컴포넌트 도입
3) DFS/BFS 경로 이벤트 연동
4) Dijkstra/MST 이벤트 연동

### Trie
1) insert/search/prefix 이벤트 정의
2) trie_step/trie_prefix 기반 경로 강조 규칙 확정
3) Trie 전용 시각화 컴포넌트 적용

### Union-Find
1) find_path/union_merge/parent_update 이벤트 정의
2) compress 이벤트 기반 경로 압축 시각화
3) 전용 시각화 컴포넌트 적용

---

## Algorithms (전환 확대)

### DFS
1) 그래프 이벤트 연동 (node_visit/stack)
2) 방문 순서 강조 (active/visited)

### BFS
1) 큐 상태 시각화 + 레벨 확장 강조(queue_push/queue_pop)
2) 격자 탐색 이벤트 템플릿 확정

### Shortest Path
1) dist_update/node_finalize 이벤트
2) 경로 복원 강조 (prev 배열 시각화)

### Advanced Graph
1) Topo: in-degree/queue 변화 (queue_push/queue_pop)
2) MST: edge_consider/edge_relax/union_merge 이벤트

---

---

## 커리큘럼 재구성 준비 (후속)
- 리팩토링 완료 후 **난이도/선수지식/문제 대비** 기준으로 Chapter Topics 재정렬
- DFS/BFS/Shortest Path/Union-Find/Trie를 코딩테스트 대비 중심으로 재배치
- 과도한 나열 방지: “개념 → 패턴 → 문제 유형” 구조로 통합

---

## 산출물
- Tracer 이벤트 스펙 확정판
- Graph/Trie/Union-Find 시각화 컴포넌트 1차
- Algorithms 이벤트 템플릿/샘플 코드
- 리팩토링 체크리스트 및 점수 재평가 기록
