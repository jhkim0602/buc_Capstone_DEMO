# Visualization Architecture Proposal

## 0) 목표
코드 실행과 시각화를 **동일한 타임라인**에서 동기화하여 학습 효과를 극대화한다.

## 1) Layer 구성
1. **Execution Layer**
   - Skulpt/Worker가 Python 코드를 단계별 실행
   - 라인 번호, 변수 스냅샷, stdout를 생성

2. **Trace Layer**
   - Tracer/DSL 이벤트 수집 (`tracer-spec.md`)
   - 단계별 시각화 이벤트를 병합

3. **Visualization Layer**
   - Array/Grid: 기존 ArrayGraphVisualizer
   - Graph/Trie/Union-Find: **GraphSvgVisualizer (커스텀 SVG)**
   - Mermaid: 정적 설명 보조

## 2) ReactFlow vs Cytoscape 비교 (요약)
- ReactFlow: UI 친화, 커스텀 노드 편리, 레이아웃 제한
- Cytoscape: 그래프 레이아웃/확장 풍부, 학습 구조 시각화에 유리
- **GraphSvgVisualizer**: 레이아웃 규칙을 고정할 수 있어 재실행 신뢰도 우수

## 3) 제안
- 단기: ReactFlow 유지 + GraphAdapter 개선
- 중기: **GraphSvgVisualizer로 Graph/Trie/UF 전용 시각화 전환**
- 장기: Tracer 기반 시각화 파이프라인 완성

## 4) 리스크
- Tracer 도입 시 기존 Adapter/Skulpt 단계와 충돌 가능
- Cytoscape 도입 시 스타일/렌더링 튜닝 필요

## 5) MVP 범위
- Graph/Trie/Union-Find에 Tracer 이벤트 최소 적용
- DFS, BFS, Union, Insert/Prefix 등 핵심 동작만 시각화
