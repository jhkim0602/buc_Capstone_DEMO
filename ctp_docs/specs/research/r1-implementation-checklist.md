# R1 Implementation Checklist

## 목표
- Tracer 런타임 구현 전 **필수 조건/검증 항목**을 고정한다.

---

## 사전 조건 (R0 완료 기준)
- [x] Tracer 스펙 v1 확정 (`tracer-spec.md`)
- [x] 전환 대상 챕터 확정 (Graph/Trie/Union-Find/DFS/BFS/Shortest Path/Advanced Graph)
- [x] 시각화 백엔드 결정 (GraphSvgVisualizer)

---

## 구현 체크리스트 (R1)
- [x] Skulpt Worker 이벤트 수집 레이어 추가
- [x] TraceFrame 생성 규칙 확정 (line/step/flush)
- [x] 이벤트 버퍼 제한(메모리/성능)
- [x] StepPlayer 동기화 (pause/step/rewind)
- [x] 오류/타임아웃 처리 규칙 정의

---

## 검증 항목
- [ ] 샘플 코드 3종 이상으로 이벤트 기록 확인
- [ ] 프레임/이벤트 수 누적 시 성능 유지
- [ ] 무한 루프/과도 이벤트 방지 가드 동작 확인
- [ ] 단계 이동 시 시각화 상태 역재생 확인

---

## 리스크
- 이벤트 과다로 인한 렌더 지연
- step/line 불일치로 인한 상태 꼬임
- 큰 그래프에서 레이아웃 계산 비용 증가
