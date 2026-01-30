# CTP QA 수행 계획

## 0) 목적
- 런타임 검증과 시뮬레이터 학습 효과를 **일괄 점검**하여 오류/누락을 식별하고, 개선 항목을 정확히 기록한다.

## 1) 준비
- 개발 서버 실행: `npm --prefix web run dev`
- 대상 URL 예시: `http://localhost:3000/insights/ctp/...`
- 기준 문서: `ctp_docs/specs/quality/qa-checklist.md`

## 2) 범위
- Linear DS: Array / Linked List / Stack / Queue / Hash
- Non-Linear DS: Tree / Heap / Graph / Trie / Union-Find
- Algorithms: Sorting / Binary Search / DFS/BFS / DP / Shortest Path / Graph Advanced

## 3) 수행 절차 (Phase)
### Phase A: 공통 기능 점검
- Playground 실행/정지/다음/이전/스크러버 동작
- 코드 수정 → 실행 후 시각화 반영 확인
- 상태 패널 숨기기/보기 토글 동작
- 이벤트 로그 출력 확인

### Phase B: 카테고리별 점검
- Linear DS: 기본 동작(삽입/삭제/충돌/리해시)
- Non-Linear DS: 노드/간선 표시, 레이아웃, 강조 이벤트
- Algorithms: dist/parent/edge_relax, 정렬 애니메이션, 경로/순서 표시

### Phase C: 회귀/오류 점검
- 콘솔 에러 여부 확인 (Skulpt/렌더/훅 오류)
- 깜빡임/렌더 공백/잘못된 하이라이트 여부 확인

## 4) 기록 양식 (로그 템플릿)
- 페이지:
- 실행 단계:
- 기대 동작:
- 실제 동작:
- 오류/콘솔 로그:
- 재현 조건:
- 우선순위(P0/P1/P2):

## 5) 종료 기준
- QA 체크리스트 항목 100% 완료 표기
- P0/P1 이슈 0건
- 문서 업데이트 완료:
  - `ctp_docs/specs/quality/analysis.md`
  - `ctp_docs/specs/quality/simulator-scores.md`
  - `ctp_docs/specs/quality/runtime-visualization-report.md`

## 6) 산출물
- QA 체크리스트 완료 표시
- 이슈 리스트 (필요 시 별도 문서)
- 점수 재평가 리포트
