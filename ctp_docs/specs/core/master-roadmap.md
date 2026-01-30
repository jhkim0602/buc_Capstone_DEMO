# Master Roadmap (완성까지의 기획서)

## 목적
- CTP를 **완성 상태**(콘텐츠/시각화/커리큘럼/검증)로 끌고 가기 위한 전체 로드맵이다.
- 세션별 리팩토링(Tracer 도입)과 커리큘럼 재구성을 **동기화**한다.

---

## 완성 정의 (Definition of Done)
1) 모든 Chapter Topics에 **교재형 구성**(개념→시각화→코드→문제) 완비
2) 고난이도 구조(Graph/Trie/Union-Find/Advanced Graph) **Tracer 기반 시각화 전환**
3) 시뮬레이터 점수 재평가 완료 + 런타임 검증 기록
4) 커리큘럼 재정렬(난이도/선수지식/코딩테스트 대비) 완료
5) 문서/코드/Registry/CTP_DATA 정합성 100%

---

## 전체 로드맵

### 아키텍처 전환 요약
- **유지 전략**: Array/Linked List/Stack/Queue/Hash는 ReactFlow + Adapter + Skulpt 유지
- **전환 전략**: Graph/Trie/Union-Find/Advanced Graph/Shortest Path는 Tracer 기반 구조 시각화
- **Sorting 세분화**: Bubble/Selection/Insertion/Merge/Quick/Heap로 분리 (완료)

### Phase A — 기초 안정화 (완료)
- Linear/Non-Linear/Algorithms 콘텐츠 스켈레톤
- Python-only 정책 적용
- DFS/BFS 분리, Sorting 세분화
- 시뮬레이터 모드 매핑 완료 (Button vs Code)

### Phase B — 세션별 리팩토링 설계 (완료)
- 리팩토링 로드맵/태스크 문서화
- 세션별 시각화 리팩토링 상세 태스크 확정
- 커리큘럼 재구성 전략 수립

### Phase C — Tracer 기반 전환 (완료)
1) Tracer 이벤트 스펙 확정
2) Skulpt Worker 이벤트 수집 레이어 구축
3) StepPlayer 이벤트 동기화
4) Graph/Trie/Union-Find 전용 시각화 컴포넌트 적용
5) Algorithms(DFS/BFS/Shortest Path/Advanced Graph) 이벤트 연동

### Phase D — 커리큘럼 재배치 (완료)
- 난이도/선수지식/문제 유형 기준으로 Chapter Topics 재정렬
- BFS/DFS/Shortest Path/Union-Find/Trie 재배치
- 중복/과다 나열 제거, 교재형 흐름 강화

### Phase E — 최종 검증/완성 (완료)
- 런타임 검증 체크리스트 완료 (사용자 확인)
- 시뮬레이터 점수 재평가 및 리포트 확정
- 콘텐츠 QA + 링크/난이도 일관성 검증 (정적 스캔)

### Phase F — 콘텐츠 심화/교재화 (신규)
- 각 Chapter의 **설명 분량/예제/실습** 확장
- 기본 코드에 `print()` 포함 표준화
- 커스텀 코드 가이드(변수명 규약/Tracer 이벤트) 문서화 강화

---

## 산출물(최종)
- Tracer 스펙 확정판
- 전용 시각화 컴포넌트(3종 이상)
- 커리큘럼 재정렬 최종본
- 시뮬레이터 점수 리포트
- 인수인계서/운영 정책/검증 기록

---

## 의존성/리스크
- Tracer 이벤트 안정성(성능/시간초과) → 반드시 타임아웃 가드 필요
- Graph/Trie/Union-Find 시각화 전환 시 학습 흐름 재검증 필요
- 커리큘럼 재배치 시 TOC/Registry/URL 정합성 이슈 발생 가능

---

## 다음 실행 항목 (우선순위)
1) Tracer 이벤트 스펙 확정 (R0)
2) Skulpt Worker 이벤트 수집 레이어 (R1)
3) Graph/Trie/Union-Find 시각화 전환 (R2)
4) Algorithms Tracer 연동 (R3)
5) 커리큘럼 재배치 + QA (R4)
