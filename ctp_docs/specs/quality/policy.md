# 시각화 시뮬레이터 운영 정책

## 목적
- 학습 초기에는 **버튼/랜덤 기반**으로 동작 원리와 직관을 빠르게 이해
- 학습 심화 단계에서는 **코드 → 시각화** 방식으로 구현 감각과 문제 해결 능력 강화

## 단계별 정책
### 1) Intro/Beginner (직관 단계)
- 인터랙티브 버튼( push/pop/peek 등 )
- 랜덤 데이터로 빠른 피드백
- Front/Rear/Count/Load Factor 등 핵심 상태를 시각적으로 강조

### 2) Intermediate (개념-구현 연결)
- 입력값을 사용자가 직접 지정
- 연산 시나리오 버튼 제공 (wrap-around, overflow, collision 등)
- 로그에 불변식(Front/Rear 규칙, empty/full) 설명

### 3) Advanced (코드 기반 학습)
- Skulpt 기반 "코드 → 시각화" 흐름 적용
- Adapter 패턴으로 변수명 규칙 제공 (queue/front/rear/count 등)
- 단계별 실행과 시각화 연결
 - 상태 하이라이트 규약(알고리즘/격자) 제공

## 적용 기준
- 핵심 연산이 3개 이상이고 상태 변화가 중요한 구조(Queue/Deque/Hash)는 **Advanced 단계 우선 적용**
- Stack LIFO, Queue Basics는 Intro 단계 유지
- Hash는 충돌/리해시가 학습 핵심이므로 Advanced 시각화 필수

## 코드 하이라이트 규약(알고리즘/격자)
### ArrayAdapter(1D)
- `active_index`, `current_index`, `pivot_index`, `mid`: active 강조
- `compare_indices`, `active_indices`, `pivot_indices`: comparing 강조
- `found_index`, `target_index`: success 강조
- `visited_indices`, `highlight_indices`: 기본 강조
- `low`, `high`: comparing 강조

### GridAdapter(2D)
- `active_cell`, `active_cells`: active 강조
- `frontier_cell`, `frontier_cells`: active 강조
- `path_cells`: success 강조
- `visited_cells` 또는 `visited`(2D matrix): 기본 강조

## Graph/Trie/Union-Find Tracer 규약
### Graph (GraphSvgVisualizer)
- `node_active`: 현재 처리 노드(파랑)
- `node_visit`: 방문/확정 노드(회색)
- `node_finalize`: 최단거리 확정(초록)
- `node_compare`: 후보/큐 대기(노랑)
- `edge_consider`: 후보 간선(주황)
- `edge_relax`: 선택/갱신 간선(초록)
- `dist_update`: 노드 라벨에 `d=값` 표시

### Trie (GraphSvgVisualizer)
- `trie_step`, `trie_prefix`: 경로 노드 visited, 마지막 노드 active
- `trie_mark_end`: 단어 종료 노드 found(초록)

### Union-Find (GraphSvgVisualizer)
- `node_active`: 현재 find 진행 노드
- `node_visit`: 경로 노드 강조
- `node_compare`: union 대상 강조

## 모드 맵
- 상세 매핑은 `mode-map.md` 참고

## 코드 실행/출력 표준
- Skulpt 제한으로 `locals()` 사용 금지
- 출력은 **globals() 기반 헬퍼** 사용 권장
- 기본 코드에는 출력 섹션을 반드시 포함

## 코드 템플릿 구성 원칙
- 기본 코드는 **알고리즘 구현 코드 + 시각화 연결 변수**가 함께 포함됨
  - 예: `active_index`, `compare_indices`, `highlight_indices`, `heap_size`, `swap_indices` 등
- 목적: 코드 실행 시 **즉시 시각화가 반영**되도록 최소 상태 변수를 노출
- 향후 개선안: “알고리즘 순수 코드 보기” 토글 또는 시각화 코드 접기 지원

## 알고리즘 코드 전용 편집
- Playground에서는 **알고리즘 코드만 노출/편집 가능**
- 시각화/출력용 코드는 에디터에서 숨김 처리(내부 코드 유지)

## 편집 제한 모드 (Strategy A)
- 사용자는 **USER CODE 블록**만 편집 가능
- 나머지 코드는 시각화/출력용 래퍼로 내부 유지
- 목적: 시각화 연결 안정성 확보 + 실수 최소화
- USER CODE 종료 지점을 **출력 블록 이전**으로 이동하여 출력 헬퍼를 숨김
