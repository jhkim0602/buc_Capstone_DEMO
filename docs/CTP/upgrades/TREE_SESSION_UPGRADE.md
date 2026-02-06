# Tree Session Upgrade Log

## 목적
트리 세션(`tree-basics`, `binary-traversal`, `bst`)을
- 학습 흐름(입문 -> 규칙 -> 적용) 강화
- 시뮬레이션 가독성/설명력 강화
- 과도한 기능 추가 없이 기존 CTP 패턴 유지
방향으로 고도화한다.

## 범위
- 대상 경로:
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-basics/*`
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/binary-traversal/*`
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/bst/*`
  - `web/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer.tsx`
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/components/TreeOverview.tsx`

## 2026-02-06 (1차)

### 변경 요약
1. `tree-basics` 인터랙티브 품질 향상
- `peek` 1회 클릭마다 학습 관점이 순환되도록 변경
  - Root -> Internal -> Leaf -> Unique Path
- 로그를 단계형 메시지(1/4 ~ 4/4)로 변경
- 노드 라벨에 depth/role 정보 부여
- edge label(L/R) 추가
- complexity 설명을 오개념이 적은 표현으로 보정

2. `binary-traversal` 교과서형 코드 시뮬레이션 강화
- `MODE = preorder | inorder | postorder` 스위치 방식으로 개선
- state-machine 스택으로 3가지 순회 로직을 한 템플릿에서 비교 가능하게 변경
- `active_node`, `visited_nodes`, `compare_nodes`, `order`를 명시적으로 관리
- story/features/complexity 문구를 비교 학습 중심으로 개편

3. `bst` 시뮬레이션 적용성 강화
- `ACTION = search | insert` 스위치 방식 도입
- search/insert 경로(path), 비교(compare_nodes), 결과(result) 출력 강화
- insert 시 `nodes/edges/tree` 업데이트를 코드에서 직접 확인 가능하게 개선
- 복잡도 표기를 균형/편향 트리 현실에 맞게 보정

4. 트리 visualizer 정보 전달력 강화
- `success` 상태 스타일 추가
- `isHighlighted` fallback 반영
- 범례(legend) UI 추가

5. overview 문구 정리
- Tree 커리큘럼 안내를 "기초 불변식 -> 순회 비교 -> BST 적용" 흐름으로 정리

### 작업 원칙 준수
- 퀴즈/신규 대형 UI/새로운 학습 시스템 추가 없음
- 기존 CTP 컴포넌트/모듈 구조 유지
- 모드 전환 없이 기존 라우팅 호환 유지

### 남은 개선 후보 (2차)
- `binary-traversal`에 재귀 버전/반복 버전 토글 예시 추가(현재는 반복 기반 중심)
- `bst` 삭제(delete) 케이스(리프/한 자식/두 자식) 시각화 버전 추가
- tree 전용 상태 패널 preset(현재는 공용 상태 패널)

### 검증 메모
- `next lint`는 프로젝트 ESLint 초기 설정 대화형 프롬프트로 자동 검증 불가 상태
- 런타임 검증은 페이지 수동 확인 기준으로 진행 필요

## 2026-02-06 (2차)

### 변경 요약
1. 챕터 확장: `tree-properties` 신규 추가
- 차수/거리/레벨/너비/크기/서브트리를 별도 세션으로 분리
- 파일:
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-properties/config.ts`
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-properties/logic.ts`
- 목차/라우팅 연결:
  - `web/lib/ctp-curriculum.ts`
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/tree-registry.ts`
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/components/TreeOverview.tsx`

2. `tree-basics` 시각화 확장
- 노드 수 6 -> 10으로 확장
- `peek` 단계 4 -> 5로 확장:
  - degree-distance
  - level-width
  - size
  - subtree
  - unique path
- stage 로그를 지표 중심 문구로 교체

3. content expansion 그룹 동기화
- `tree-properties`를 tree 그룹 확장 대상에 포함
- tree 공통 observation 문구를 "차수/거리/레벨/너비/크기 + 순회 의미" 관점으로 보정

### 의도/트레이드오프
- 과도한 UI(퀴즈/추가 패널) 없이 기존 CTP 패턴 유지
- 개념 추가는 1개(`tree-properties`)로 제한해 다른 세션과 밀도 균형 유지
- 시간복잡도 섹션은 삭제하지 않고, "성질 계산 관점"으로 최소/실전형 표현 유지

### 후속 검증 체크
- 페이지 확인:
  - `/insights/ctp/non-linear-ds/tree`
  - `/insights/ctp/non-linear-ds/tree?view=tree-basics`
  - `/insights/ctp/non-linear-ds/tree?view=tree-properties`
- 확인 포인트:
  - overview 순서(4단계) 노출
  - `tree-properties` 6단계 인터랙티브 순환 정상 여부
  - `tree-basics` 5단계 로그/강조 상태 순환

## 2026-02-06 (2차-보정)

### 변경 요약
1. `tree-properties` 학습 모드 보정
- 기존 `code` 모드에서 `interactive` 모드로 전환
- 이유: 개념 고정(차수/거리/레벨/너비/크기/서브트리) 목적에는 단계형 시각화가 더 직관적

2. 플레이그라운드 동선 통일
- `Tree Basics`와 동일한 버튼 기반 동선(`peek`, `reset`)으로 통일
- 6단계 순환:
  - 노드 차수
  - 트리 차수
  - 거리
  - 레벨/너비
  - 크기
  - 서브트리

3. 코드 템플릿 제거
- `tree-properties/config.ts`의 대형 `initialCode` 제거
- 구현 예시(`implementation`)만 유지하여 이론/실습 균형 유지

## 2026-02-06 (2차-UI 보강)

### 변경 요약
1. 인터랙티브 플레이그라운드 레이아웃 개선
- 대상: `tree-basics`, `tree-properties` (공통 컴포넌트 적용)
- 파일: `web/components/features/ctp/playground/ctp-interactive-module.tsx`
- 추가 기능:
  - 전체화면 토글
  - 좌/우 패널 드래그 리사이즈
  - 우측 내부(동작 패널/학습 노트) 상/하 리사이즈

2. 학습 노트 가독성 강화
- 로그 패널을 콘솔 스타일에서 카드형 학습 노트로 전환
- 단계/정의/핵심값/관찰 포맷 표시

## 2026-02-06 (2차-가독성 보정)

### 변경 배경
- `tree-basics`, `tree-properties`에서 노드 상단 라벨 문자열이 길어, 동일 레벨 노드 간 라벨 겹침이 발생함.
- 범례가 영문(`active`, `comparing` 등)이라 한국어 학습 흐름과 톤이 맞지 않음.

### 적용 대책
1. 범례 한국어화
- 파일: `web/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer.tsx`
- 변경:
  - `active` -> `현재 기준`
  - `comparing` -> `비교 중`
  - `found/success` -> `정답/강조`
  - `visited` -> `확인 완료`

2. 라벨 겹침 완화 (3중 대응)
- 파일: `web/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer.tsx`
  - 라벨 스타일을 축소/멀티라인 대응(`text-[9px]`, `max-w`, `whitespace-normal`)으로 변경
  - Dagre 레이아웃 간격 확대(`nodesep`, `ranksep`, `margin`) 적용
- 파일:
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-basics/logic.ts`
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-properties/logic.ts`
  - 노드 라벨을 축약 표기(`d0·l0 루트`, `d2 리프`)로 변경

### 기대 효과
- 레벨 2 이상의 밀집 구간에서 라벨 충돌이 크게 줄어듦
- 범례/라벨/로그가 모두 한국어 중심으로 통일되어 학습 맥락 일치

## 2026-02-06 (2차-경량 개선 3종)

### 목표
- 과도한 기능 추가 없이 직관 학습성만 개선
- 기존 인터랙티브 구조(`peek/reset`)와 CTP 패턴 유지

### 적용 항목 (딱 3개)
1. `Peek` 로그 메시지 축약
- 파일:
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-basics/logic.ts`
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-properties/logic.ts`
- 변경:
  - 장문 설명을 핵심값 중심 2~3줄 포맷으로 축약
  - reset 안내도 한 줄 요약형으로 조정

2. 노드 클릭 정보 카드 추가
- 파일:
  - `web/components/features/ctp/playground/ctp-interactive-module.tsx`
  - `web/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer.tsx`
  - `web/components/features/ctp/common/types.ts`
- 변경:
  - 트리 노드 클릭 시 선택 상태 강조
  - 우측 `선택 노드 정보` 카드에 차수/레벨/유형 출력
  - `selectedNodeId`, `selectedSummary`, `onNodeSelect` runtime 필드 확장

3. `tree-properties` 단계 6 -> 3 단순화
- 파일:
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-properties/logic.ts`
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-properties/config.ts`
- 변경:
  - 학습 단계: `구조` -> `거리` -> `크기`
  - story/playground 설명도 3단계 기준으로 동기화

### 문서 구조 정리
- `docs/CTP`를 하위 폴더로 재배치:
  - `docs/CTP/foundation/*`
  - `docs/CTP/operations/*`
  - `docs/CTP/upgrades/*`
- 인덱스 갱신: `docs/CTP/README.md`

## 2026-02-06 (2차-시각/타이포 보정)

### 변경 요약
1. 노드 상단 라벨 스타일 단순화
- 파일: `web/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer.tsx`
- 변경:
  - 장문 class 조합을 단순 라벨 스타일로 축소
  - 노드 위 텍스트를 더 직관적으로 읽히게 정리

2. 선택 노드 시각 강조 강화
- 파일: `web/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer.tsx`
- 변경:
  - 선택 노드에 보라색 강한 하이라이트(색/링/스케일)
  - 노드 하단에 `선택` 배지 추가
  - 범례에 `선택 노드` 항목 추가

3. 우측 정보 카드/학습 노트 폰트 확대
- 파일: `web/components/features/ctp/playground/ctp-interactive-module.tsx`
- 변경:
  - `선택 노드 정보` 카드 텍스트 크기 상향
  - 학습 노트(기존 콘솔 영역) 제목/본문/세부 텍스트 크기 상향

## 2026-02-06 (2차-동작/표기 미세 보정)

### 변경 요약
1. `Peek` 동작 안정성 보강
- 파일:
  - `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-basics/logic.ts`
  - `web/components/features/ctp/playground/ctp-interactive-module.tsx`
- 변경:
  - `tree-basics` handlers에 `reset` 키를 명시 추가
  - 인터랙티브 패널 버튼에 `type="button"` 지정(폼 submit 부작용 방지)

2. 선택 상태 반영 리렌더 보정
- 파일: `web/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer.tsx`
- 변경:
  - `useMemo` dependency에 `selectedNodeId`, `onNodeSelect` 추가

3. 범례 텍스트 최소화
- 파일: `web/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer.tsx`
- 변경:
  - `현재 기준/비교 중/정답·강조/확인 완료/선택 노드`를
    `기준/비교/강조/완료/선택`으로 축약

## 2026-02-06 (2차-선택 클릭 안정화)

### 변경 배경
- `Peek` 이후 노드를 클릭해도 그래프 상 선택 하이라이트가 일관되게 보이지 않는 케이스가 발생함.
- 원인 후보:
  - 노드 상단 라벨이 클릭 이벤트를 가로채는 구간
  - 노드 드래그 동작과 클릭 동작의 경합

### 변경 요약
1. 클릭 이벤트 경로 이중화
- 파일: `web/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer.tsx`
- 변경:
  - 노드 내부 `onClick` 유지
  - `ReactFlow onNodeClick` 추가로 선택 콜백을 상위에서 직접 보장

2. 라벨/배지 클릭 간섭 제거
- 파일: `web/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer.tsx`
- 변경:
  - 라벨과 `선택` 배지에 `pointer-events-none` 적용
  - 텍스트 선택 방지를 위한 `select-none` 적용

3. 선택 하이라이트 대비 강화
- 파일: `web/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer.tsx`
- 변경:
  - 선택 노드에 `!border`, `!bg`, `!text` 우선 스타일 적용
  - 스케일/글로우를 강화해 상태색(기준/비교/강조/완료) 위에서도 선택이 식별되도록 보정

4. 클릭 UX 보정
- 파일: `web/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer.tsx`
- 변경:
  - `nodesDraggable={false}`로 클릭 중심 학습 모드에 맞춤(드래그 오동작 감소)

## 2026-02-06 (2차-선택 배지 정리)

### 변경 요약
- 파일: `web/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer.tsx`
- 변경:
  - 선택 노드 하단 `선택` 배지(`absolute -bottom-5 ...`) 렌더링 블록 제거
  - 선택 상태는 노드 자체 하이라이트(링/색상/스케일)로만 표현

## 2026-02-06 (2차-config 재점검)

### 점검 범위
- `tree-basics/config.ts`
- `tree-properties/config.ts`
- `binary-traversal/config.ts`
- `bst/config.ts`

### 변경 요약
1. `tree-basics`
- playground 설명에 `노드 클릭 -> 선택 노드 정보 카드` 흐름 명시
- description 문구를 5단계 인터랙티브 중심으로 축약

2. `tree-properties`
- 제목에 `너비(width)` 명시 추가
- 6개 성질을 3단계로 묶어 학습한다는 동선 설명 추가
- complexity 하단 설명을 `조회/계산/갱신` 관점으로 보정

3. `binary-traversal`
- MODE 변경 후 실행 동선을 playground 설명에 명시
- complexity 문구를 순회 세션 의미에 맞게 보정
  - search: `O(N)` (순회 기반 탐색)
  - deletion: `O(H)` (스택/재귀 프레임 정리)

4. `bst`
- ACTION 전환(search/insert), target/insert_value 변경 포인트를 설명에 명시
- complexity 하단 라벨을 불변식/재연결 맥락으로 보정
