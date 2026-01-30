# 커스텀 코드 → 시각화 반영 전략 (Custom Code Compatibility)

## 1) 현재 상태 요약
- 기본 코드는 **시각화 상태 변수**(예: `active_index`, `compare_indices`)를 포함하여
  실행 즉시 시각화가 반영되도록 설계되어 있음.
- 사용자가 코드를 임의로 변경하면 **Adapter/Tracer 규약**을 지키지 않는 한
  시각화가 비거나 제한적으로만 반영될 수 있음.

## 2) 문제/제약
1) Adapter 의존성  
   - Linear 구조는 변수명 규약(`arr`, `queue`, `front` 등)에 강하게 의존
2) Tracer 이벤트 의존성  
   - Graph/Trie/Union-Find/Algorithms는 `trace()` 이벤트 중심
3) 사용자 커스텀의 다양성  
   - 클래스/함수/변수명 변경 시 시각화 연결이 끊김

## 3) 커스텀 코드 호환성 단계 (레벨링)
- **L0 (Drop-in)**: 기본 템플릿 사용 → 즉시 시각화 가능
- **L1 (변수명 기반)**: 핵심 변수명만 유지 → 대부분 시각화 반영
- **L2 (명시적 상태 제공)**: `visual_state` 딕셔너리 제공 → 강력 호환
- **L3 (Trace 기반)**: `trace()`로 이벤트 전송 → 고난도 구조 시각화

## 4) 전략 설계 (권장)

### A. 명시적 `visual_state` 채널 도입 (우선순위 높음)
- 사용자가 커스텀 코드를 작성해도, 마지막에
  ```py
  visual_state = {
      "array": arr,
      "active_index": i,
      "compare_indices": [i, j]
  }
  ```
  를 제공하면 어댑터가 이를 **우선 사용**하도록 설계.
- 장점: 변수명 자유도 증가, 호환성 급상승.

### B. 최소 변수명 체크리스트 제공
- Playground 상단 또는 Help에 “이 변수만 지키면 시각화가 유지됨” 제공
- 예:
  - Array: `arr`, `active_index`, `compare_indices`
  - Queue: `queue`, `front`, `rear`
  - Hash: `buckets`, `last_index`

### C. 커스텀 코드 디버그 도구 제공
- “시각화가 안 보일 때 체크리스트”
  1) `arr` 또는 `visual_state["array"]`가 존재하는가
  2) `trace()` 이벤트가 호출되는가
  3) Skulpt 에러가 없는가

### D. UI 단일 코드 + 숨김 라인
- 하나의 코드 뷰만 제공하되, **시각화/출력 라인은 숨김 처리**
- 사용자는 알고리즘 코드만 보고 수정 가능

### E. 편집 제한 모드 (Strategy A 실행)
- 사용자에게는 **USER CODE 블록만 편집** 허용
- 시각화/출력용 코드는 내부 래퍼에 고정
- 실행 시 USER CODE만 교체하여 **시각화 안정성 확보**
- 출력 헬퍼 블록은 USER CODE 밖으로 이동하여 완전 숨김

## 5) 향후 구현 순서
1) Adapter가 `visual_state`를 우선 사용하도록 확장
2) Playground 상단에 **변수명 가이드**와 체크리스트 노출
3) “자동 진단” (시각화 데이터가 비면 안내 메시지 표시)

## 6) 성공 기준
- 사용자 커스텀 코드의 **70% 이상**이 시각화에 반영됨
- “시각화 없음” 케이스의 원인이 가시적으로 안내됨
