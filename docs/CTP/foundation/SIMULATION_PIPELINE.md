# Simulation Pipeline

## 1) 실행 모드

| 모드 | 기준 | 실행 경로 |
|---|---|---|
| `code` (기본) | `config.mode` 미지정 또는 `"code"` | CodeEditor -> `runSimulation(code)` -> step 재생 |
| `interactive` | `config.mode === "interactive"` | 버튼 핸들러로 local state 변화 (코드 실행 없음 또는 제한) |

현재 전체 56 서브컨셉 기준:
- `code`: 50
- `interactive`: 6

## 2) Code Mode 데이터 흐름

```text
CTPPlayground.handleRun
  -> useSim().runSimulation(code)
  -> useSkulptEngine.run(code)
  -> Worker(RUN_CODE)
  -> breakpoints + globals snapshot + trace events 수집
  -> BATCH_STEPS 반환
  -> use-skulpt-engine에서 dataMapper(adapter) 적용
  -> useCTPStore.setSteps(VisualStep[])
  -> CTPModuleLoader가 currentStepIndex 데이터 추출
  -> Visualizer(data, edges, events...) 렌더
```

핵심 파일:
- 엔진 훅: `web/hooks/use-skulpt-engine.ts`
- 워커: `web/public/workers/skulpt.worker.js`
- 스토어: `web/components/features/ctp/store/use-ctp-store.ts`

## 3) Worker 계약

`skulpt.worker.js` 특징:
- `TRACE_PREAMBLE`로 Python `trace()` 함수 주입
- `Sk.configure({ debugging: true, breakpoints })`로 라인 단위 snapshot 축적
- 각 step: `{ line, variables, stdout, events }`
- 한 번에 `BATCH_STEPS` 전송

주의:
- `MAX_STEPS=10000`, `MAX_EVENTS=2000`
- 객체 직렬화 시 `__id` 기반으로 참조 안정성 유지(연결구조 시각화 필수)

## 4) Store 계약

`VisualStep` (`use-ctp-store.ts`):
- `activeLine`: 코드 하이라이트 라인
- `data`: visualizer payload (배열/2D배열/객체)
- `events`: trace 이벤트
- `variables`: raw globals snapshot

플레이백은 `currentStepIndex` 기반이며, UI는 step 배열을 재생한다.

## 5) Adapter 계약

`useSkulptEngine({ adapterType | dataMapper })`:
- `adapterType` 사용 시 `AdapterFactory` 경유
- `dataMapper`는 커스텀 파서(예: stack array/linked/monotonic)

어댑터 분포(코드형 모듈 기준 주요 사용):
- `graph`: 19
- `array`: 10
- `grid`: 4
- `heap`: 2
- `hash-table`: 2
- `queue`: 2
- `linked-list`: 2
- 기타: `deque`, `doubly-linked-list`, `circular-linked-list`, `merge-sort`, `heap-sort`

## 6) Visualizer 입력 계약 (중요)

| Visualizer | 기대 payload |
|---|---|
| `ArrayGraphVisualizer` | `VisualItem[]` 또는 `VisualItem[][]` |
| `StringGraphVisualizer` | `{id,value,type,address,label,targetAddress}[]` |
| `LinkedListGraphVisualizer` | `LinkedListNode[]` (`nextId`, optional `prevId`) |
| `StackGraphVisualizer` | `VisualItem[]` |
| `TreeGraphVisualizer` | `VisualItem[]` + `edges[]` |
| `GraphSvgVisualizer` | `nodes(data)` + `edges` (+ optional `events`, `layoutMode`) |
| `SortingBarVisualizer` | `VisualItem[]` |
| `MergeSortVisualizer` | `{array,left,right,merged,range,pointers}` |
| `HeapSortVisualizer` | `{array,heapSize,activeIndex,compareIndices,swapIndices}` |

## 7) Interactive Mode 계약

`useSim()` 반환에서 `interactive`를 제공하면 `CTPInteractiveModule` 사용:
- `visualData`
- `edges?`
- `logs?`
- `handlers: Record<string, () => void>`
- `selectedNodeId?` (선택된 노드 ID)
- `selectedSummary?` (우측 정보 카드 표시 텍스트)
- `onNodeSelect?` (노드 클릭 핸들러)

`CTPInteractiveModule` UI 동작(현재):
- 전체화면 토글 지원
- 좌/우 패널 리사이즈 지원
- 우측 내부(조작 패널/학습 노트) 상하 리사이즈 지원

`handlers` alias:
- 버튼 키가 `reset`인데 로직이 `clear`만 제공해도 `CTPInteractiveModule`에서 fallback 처리

특이 케이스:
- `stack/lifo-basics`는 `interactive` runtime을 직접 반환하지 않고, `CTPInteractivePlayground` fallback으로 처리됨

## 8) 디버깅 우선순위

1. step이 비어있다
- `logic.ts`에서 `runSimulation` 호출 경로 확인
- worker 로드 실패 여부 (`/workers/skulpt.worker.js`) 확인

2. 시각화가 안 뜬다
- adapter 출력 타입이 visualizer 계약과 맞는지 확인
- `CTPModuleLoader`에서 `data/edges/rootId` 추출 경로 확인

3. 에디터/라인 하이라이트 이슈
- `code-editor.tsx`의 `setHiddenAreas` runtime guard 확인
- `activeLine`이 `VisualStep.activeLine`으로 정상 세팅되는지 확인

## 9) Tree 세션 메모

- `tree-basics`:
  - interactive 모듈이며 `peek` 버튼이 학습 단계(차수/거리 -> 레벨/너비 -> 크기 -> 서브트리 -> 경로)를 순환한다.
  - 노드 수는 10개 예제로 확장되어 tree degree/width/subtree를 한 장면에서 관찰할 수 있다.
  - 노드 클릭 시 차수/레벨 정보가 우측 카드에 표시된다.
  - 로직 파일: `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-basics/logic.ts`
- `tree-properties`:
  - interactive 모듈이며 `peek` 버튼으로 학습 단계(구조 -> 거리 -> 크기)를 순환한다.
  - 노드를 직접 클릭하면 차수/레벨 정보가 우측 카드에 표시된다.
  - 코드 입력 없이 상태 강조(`active/comparing/visited/found/success`)로 지표를 시각적으로 고정한다.
  - 로직 파일: `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/tree-properties/logic.ts`
- `binary-traversal`:
  - `MODE` 값(`preorder`, `inorder`, `postorder`)을 바꿔 동일 템플릿에서 순회 차이를 비교하도록 설계됨.
  - config 파일: `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/binary-traversal/config.ts`
- `bst`:
  - `ACTION` 값(`search`, `insert`)으로 시나리오를 전환하며 path/compare/result를 함께 관찰하도록 설계됨.
  - config 파일: `web/components/features/ctp/contents/categories/non-linear/concepts/tree/sub-concepts/bst/config.ts`
