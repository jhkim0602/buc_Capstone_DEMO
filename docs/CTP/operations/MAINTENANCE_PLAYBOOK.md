# Maintenance Playbook

## A. 서브컨셉 1개 추가

1. 디렉토리 생성
- `web/components/features/ctp/contents/categories/<cat>/concepts/<concept>/sub-concepts/<new-id>/`
- `config.ts`, `logic.ts` 생성

2. 레지스트리 연결
- 해당 concept의 `*-registry.ts`에 key 추가
  - `'<new-id>': { config, useSim, Visualizer }`

3. 사이드바/목차 노출
- `web/lib/ctp-curriculum.ts`의 해당 concept `subConcepts[]`에 같은 `id` 추가

4. (선택) 콘텐츠 확장 규칙 연결
- `web/components/features/ctp/contents/shared/ctp-content-expansion.ts`
  - `groupByKey`, `expansions`, `deepDiveByKey` 등 필요 시 추가

5. 검증
- URL: `/insights/ctp/<categoryId>/<conceptId>?view=<new-id>`
- 사이드바 클릭 -> 해당 모듈 로드 -> 실행/시각화 정상 확인

## B. 기존 서브컨셉 내용만 수정

수정 포인트:
- 설명/학습 목표: `config.ts`
- 시뮬레이션 로직: `logic.ts`
- 시각화 표현: visualizer 파일

검증 포인트:
- `CTPIntro`/`CTPFeatures`/`CTPComplexity`/`CTPPractice` 섹션 렌더 여부
- 플레이백(실행/일시정지/스텝/스크러버) 정상 여부

## C. Code -> Interactive 모드 전환

1. `config.ts`
- `mode: "interactive"`
- `interactive.components` 설정

2. `logic.ts`
- `runSimulation` 유지
- `interactive` 객체 반환 (visualData/logs/handlers)

3. 핸들러 키 확인
- `components`의 버튼 키와 `handlers` 키 일치
- `reset` 대신 `clear` 사용해도 alias 처리되지만, 가능하면 명시 일치 권장

## D. Interactive -> Code 모드 전환

1. `config.ts`
- `mode` 제거 또는 `"code"`
- `initialCode.python` 제공

2. `logic.ts`
- `useSkulptEngine({ adapterType | dataMapper })` 방식으로 `runSimulation` 구현

3. visualizer 계약 확인
- adapter 출력 타입과 visualizer 입력 타입 일치 여부 확인

## E. ID 변경 (가장 위험)

동기화 대상 최소 4곳:
1. `web/lib/ctp-curriculum.ts` (`subConcepts[].id`)
2. concept `*-registry.ts` (모듈 key)
3. 디렉토리명 (`sub-concepts/<id>`) 및 import 경로
4. `ctp-content-expansion.ts` 키 (사용 중인 경우)

추가 확인:
- 기존 URL bookmark 호환이 필요하면 redirect 또는 alias key 유지

## F. Concept/Category 추가

Concept 추가:
1. `contents/categories/.../concepts/<concept>/index.tsx` + registry + overview + sub-concepts 구성
2. `web/lib/ctp-content-registry.tsx`에 `"<category>/<concept>": <ContentComponent>` 추가
3. `web/lib/ctp-curriculum.ts`에 concept 메타 추가

Category 추가:
1. `ctp-curriculum.ts` 카테고리 추가
2. 페이지 아이콘/스타일 의존 코드 점검 (`web/app/insights/ctp/page.tsx`)
3. 필요한 경우 레이아웃/색상 시스템 확장

## G. 시뮬레이션 오류 트러블슈팅

증상별 우선 조사:

1. 실행해도 step 0개
- `logic.ts`가 실제로 `run` 호출하는지
- worker 경로(`/workers/skulpt.worker.js`) 로드 가능한지

2. step은 있는데 시각화 없음
- adapter 출력 shape가 visualizer 계약과 맞는지
- `CTPModuleLoader`에서 payload 추출(`data/edges/rootId`) 확인

3. interactive 버튼 무반응
- `config.interactive.components`와 `handlers` 키 매칭 확인
- `CTPModuleLoader`가 interactive 분기로 들어가는지 확인

## H. 최소 검증 체크리스트 (PR 전)

- 라우트 진입: `/insights/ctp` -> 컨셉 -> `?view=<subConcept>`
- 사이드바 선택/URL 쿼리 동기화
- 실행 버튼 후 step 생성
- 코드 라인 하이라이트 동작
- 시각화/상태패널/터미널 동시 동작
- 브라우저 콘솔 에러 없음

