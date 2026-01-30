# 품질 분석 요약

## 참고 기준(대표 학습 사이트)
- 백과/정의 중심: Wikipedia
- 구현/예제 중심: GeeksforGeeks
- 시각화 중심: VisuAlgo
- 표준 라이브러리 문서: Python 공식 문서

## Content 분석 요약
- 강점: "스토리-시각화-코드-문제" 흐름이 명확
- 약점: 정의/불변식/경계조건 설명 부족
- 개선 필요:
  - 연산 정의/불변식 명시(예: deque front/rear 규칙)
  - 평균/최악 복잡도 분리 표기
  - 구현 시 주의점 강조(list.pop(0) 등)
  - 대표 패턴과의 연결 강화

## Simulator 점수 요약 (코드 기준, UI 미실행)
- Linear Queue: 5/10
- Circular Queue: 6/10
- Deque: 4/10
- Priority Queue Basics: 5/10
- Hash Basics: 2/10
- Collision Handling: 2/10
- Hash Implement: 2/10
- Stack LIFO: 3/10
- Array Stack: 7/10
- Linked Stack: 6/10
- Monotonic Stack: 7/10

### 요약 근거
- Queue/Deque: 포인터 이동은 있으나 값 입력/코드-시각화 연결 부족
- Hash: 버킷/해시/충돌/리해시 시각화 부재(placeholder 수준)
- Stack LIFO: 버튼 기반이지만 시각화/코드 연결 약함
- Array/Linked/Monotonic: Skulpt 기반으로 코드-시각화 연결 우수

## 세션별 상세 점수
- 상세 목록은 `simulator-scores.md` 참고

## 업데이트 메모
- Circular Queue/Deque/PQ, Hash Collision/Implement은 **코드 기반 전환 완료**
- Graph/Trie/Union-Find(중급/응용) **코드 기반 전환 완료**
- Algorithms 전 챕터 **코드 기반 전환 완료**
- Algorithms 하이라이트 규약 정의 + Array/Grid Adapter 지원 추가
- Algorithms 초기 코드에 하이라이트 변수 적용
- Graph/Trie/Union-Find 초기 코드에 하이라이트 변수 적용
- Graph/Trie/Union-Find 구조 시각화 V2 SVG 전환 + Trace 이벤트 연동
- Algorithms DFS/BFS/Dijkstra/Topo/MST V2 SVG 전환 + Trace 이벤트 연동
- Graph/Trie/Union-Find/Algorithms 본문 텍스트 보강 완료
- 기본 코드 `print()` 표준화로 실행 피드백 개선
- Meta & 시스템 디자인 챕터 제거로 범위 정제
- Skulpt 미지원 `locals()` 사용 제거 (print 표준화 호환성 수정)
- GraphSvgVisualizer 레이아웃 중앙 정렬 보정 (시각화 위치 고정 문제 완화)
- GraphSvgVisualizer **자동 축소(zoom-out) fit** 적용 (큰 그래프 가시성 개선)
- GraphSvgVisualizer **사용자 줌/드래그(패닝) 지원** 추가
- 줌 레벨 표시 + 리셋 버튼 + 핀치 줌 대응 추가
- Sorting 시뮬레이터를 **막대 차트 애니메이션** 방식으로 전환
- SortingBarVisualizer 최소 높이/스트레치 적용(막대차트 렌더 공백 방지)
- Sorting 시뮬레이터 줌 컨트롤 추가(줌아웃/리셋)
- Sorting 초기 배열 길이 20개로 확장 (정렬 체감 강화)
- SortingBarVisualizer 스왑 이동 애니메이션(FLIP) 적용
- Sorting 색상 규칙 도움말(legend) 추가
- Sorting 전용 Playground 분리(legend/active/comparing/sorted 인덱스 표시)
- SortingBarVisualizer 위치 이동만 애니메이션(높이 변화 애니메이션 제거)
- Merge Sort 전용 Playground/Visualizer 분리(분할 구간 + left/right/merged)
- Heap Sort 전용 Playground/Visualizer 분리(Heap Tree + Array)
- Merge/Heap 전용 Adapter 도입 및 초기 코드 전환
- Skulpt MAX_STEPS 상향(복잡한 정렬/그래프 시뮬레이션 실행 안정화)
- Merge Sort 시각화 막대차트 전환(Left/Right/Merged/Array)
- Heap Sort 시각화 레이아웃 수직 분할(상/하)
- Merge/Heap 정렬 바 교체 애니메이션(스왑 이동) 적용
- Merge/Heap 정렬 전용 Playground에 색상 legend 추가
- Sorting Definition 텍스트 보강(교과서형 설명 강화)
- 정렬 개별 알고리즘 Definition 확장(버블/선택/삽입/병합/퀵/힙)
- 정렬 심화 포인트를 개별 알고리즘 기준으로 분리 적용
- Merge Sort BarRow hook 순서 오류 수정
- 기본 코드에 시각화 상태 변수 포함됨(정책 문서화)
- Playground에서 알고리즘 코드만 노출(시각화/출력 라인 숨김 처리)
- 시뮬레이션 초기화 버튼이 코드 재설정을 하지 않도록 변경
- 커스텀 코드 시각화 호환 전략 문서 추가
- 편집 제한 모드 적용(USER CODE 블록만 편집)
- 출력 헬퍼 블록을 USER CODE 밖으로 이동(숨김 처리)
- Graph 내 DFS/BFS 분리(그래프는 구조/표현 중심 유지)
- Algorithms DFS/BFS 챕터 확장(백트래킹/트리 순회/사이클/경로 복원, 멀티 소스/0-1 BFS 추가)
- Algorithms DFS/BFS 세부 본문 보강(Backtracking/Tree/Path/Multi-source/0-1)
- Algorithms DFS/BFS 예제 데이터셋을 **개념별 대표 사례로 고정**(난이도 선택 로직 제거)
- CTPPlayground 상태 요약 패널 추가(방문 순서/큐/스택/거리/부모 표시)
- Graph 개념 챕터 정다각형 레이아웃 적용(구조 인지 개선)
- Graph 기본 예제 노드 수 확대(DFS/BFS/Cycle/Dijkstra/MST)로 학습 밀도 강화
- Graph 개념 챕터 traceOnly 해제(전체 구조 고정 렌더링)
- MST/Algorithms DFS-BFS 정다각형 레이아웃 적용(요청 반영)
- Algorithms DFS/BFS traceOnly 해제(전체 구조 고정 렌더링)
- Graph 간선 라벨(w/d) 표시 적용(거리 업데이트 가시화)
- 비선형 Graph 모듈 상태 패널 기본 활성화(요약 모드)
- Graph 범례(색상/라벨 의미) 추가 및 edge_relax 강조 적용
- 상태 패널 옵션화(showStatePanel/statePanelMode) 및 DFS/BFS 선택 적용
- Sorting 모듈 상태 패널 비활성화(시각화 면적 확보)
- CTP Intro 헤더 자간 축소(가독성 개선)
- CTP Intro Definition 본문 자간 축소
- CTP Intro Definition 본문 줄간격/문단 간격 축소
- CTP Intro Definition 본문 가독성 재조정(줄간격/문단 간격)
- Hash는 `last_index` 기반 버킷 하이라이트 1차 적용
- Hash는 `rehashing` 플래그 기반 전체 버킷 강조 1차 적용
- Hash는 `probe_path` 기반 충돌 경로 하이라이트 1차 적용
- Hash는 `rehash_bucket` 기반 리해시 진행 버킷 강조 1차 적용
- Hash는 `rehash_key/rehash_value` 기반 리해시 항목 강조 1차 적용
- 전환 이후 점수 재평가 확정(런타임 확인 완료)

## 점수 재평가 (런타임 확인)
- Hash Collision Handling: 2/10 → **4/10**
- Hash Implement: 2/10 → **5/10**
 - 재평가 기준: 버킷 하이라이트 + rehashing/rehash_entry 시각화 추가
 - Graph/Trie/Union-Find/Algorithms: Trace 이벤트 + V2 SVG 전환 반영(상세는 simulator-scores.md)

## 커스텀 코드 호환성 평가 (Adapter 기준)
- Array(1D/2D): **8/10** — 변수명 탐지 범위 넓음(arr/nums/items/board 등)
- Linked List: **7/10** — Node-like 탐지로 유연하나 구조가 크게 다르면 실패
- Stack(Array/Linked/Monotonic): **6/10** — 특정 변수명/구조 기대
- Queue/Deque/PQ: **3/10** — `queue/data/front/rear/count/size` 규약 의존
- Hash Collision/Implement: **3/10** — `buckets` 구조와 key/value 표현에 의존

### 해석
- 현재 Code 기반 시뮬레이터는 **템플릿 변수 규약을 지킬 때** 안정적으로 시각화됨.
- 사용자가 완전히 커스텀 클래스/변수명으로 구현하면 시각화가 **미반영될 가능성이 높음**.

### 보완 진행
- Queue/Deque/Hash는 클래스 인스턴스 내부 필드 스캔 지원을 추가함
- 점수는 런타임 확인 후 재평가 예정

## TOC 정합성 정적 검증 결과
- configs: 66
- missing sections: 0
- 런타임 TOC Debug: 미실행 (실행 필요)

## 학습 효과 테스트 기록 (임시)
- 2026-01-28: Tracer/GraphSvgVisualizer 전환 후 **코드-시각화 연결성** 향상 확인.
- 런타임 검증(브라우저) 완료 후 실제 학습 효과 테스트 결과로 갱신 예정.
