# 시각화 학습 효과 연구 자료

## 0) 목적
CTP의 코드→시각화 학습 효과를 극대화하기 위해 **현 구조의 한계**와 **대체 오픈소스/전략**을 조사하고, 리팩토링 방향을 도출한다.

## 1) 핵심 요구사항
- 코드 실행 흐름과 시각화 상태가 **라인 단위로 연결**되어야 한다.
- 난이도 높은 구조(Graph/Trie/Union-Find)는 **구조적 시각화**가 필요하다.
- 학습자는 **입력 커스텀 + 단계별 재생/정지/되감기**가 가능해야 한다.

## 2) 리서치 요약 (핵심 도구)
### A. 코드→시각화 플랫폼
- **Algorithm Visualizer**: 코드 실행을 시각화로 연결하는 플랫폼. 별도 tracer 라이브러리를 통해 코드에서 시각화 명령을 발생시키는 구조. (tracers.js 존재) [Sources: algorithm-visualizer, tracers.js]
- **AlgoVis.io**: 단계별 설명, 코드 라인 강조, 사용자 입력 기반 시각화에 집중. 학습용 UX 강점 [Source: AlgoVis.io]
- **OpenAlgoViz**: Union-Find/Hashing 등 **구조 + 배열 동시 시각화** 사례 보유 [Source: OpenAlgoViz]

### B. 그래프/트리 시각화 라이브러리
- **Cytoscape.js**: 다양한 레이아웃 알고리즘(예: breadthfirst, cose 등)과 확장(dagre/elk/d3-force 포함)을 지원 [Source: Cytoscape.js]
- **Sigma.js**: WebGL 기반 대규모 그래프 렌더링에 특화 [Source: Sigma.js]

### C. 코드 기반 다이어그램
- **Mermaid.js**: 텍스트 기반 다이어그램 렌더링. 정적 설명/구조 소개에 적합 [Source: Mermaid.js]

## 3) 현재 구조의 한계(추론)
- Skulpt 단계별 실행은 가능하지만, **구조적 의미(노드/간선/경로)**가 직접 표현되지는 않음.
- React Flow는 범용 그래프 UI로는 충분하나, 알고리즘 학습을 위한 **전용 레이아웃/상태 하이라이트**는 별도 설계 필요.

## 4) 개선 방향 (권장 아키텍처)
### 4-1. Tracer/DSL 계층 도입
- Algorithm Visualizer 방식처럼 코드에서 **명령 기반 시각화 이벤트**를 발생.
- 예: `visit(node)`, `relax(u,v)`, `union(a,b)`, `push(x)` 같은 표준 명령 세트 정의.
- Skulpt 실행 로그에 tracer 이벤트를 병합하여 시각화/라인 하이라이트 동기화.

### 4-2. 시각화 백엔드 분리
- **구조 시각화(그래프/트라이/UF)**: Cytoscape.js(레이아웃 다양) 우선 고려.
- **대규모 그래프**: Sigma.js(WebGL) 옵션으로 확장.
- **정적 설명**: Mermaid.js로 개념 구조/다이어그램 보완.
> 2026-01-28 기준: Cytoscape 실험 후 재실행 공백 이슈가 확인되어, **커스텀 SVG(GraphSvgVisualizer)**로 안정성 우선 전환.

## 5) 제안 로드맵
### Phase A (단기)
- Tracer 이벤트 스펙 정의 + 기존 Skulpt step 구조에 병합
- Array/Queue/Hash 등 선형 구조부터 이벤트 기반으로 전환

### Phase B (중기)
- **GraphSvgVisualizer 기반 Graph/Trie/Union-Find 시각화 전환**
- 트리 레이아웃 규칙(계층/레벨/UF) 고정

### Phase C (장기)
- Sigma.js로 대규모 그래프 모드 추가
- 코드 라인/상태/시각화 동기화 완성

## 6) 판단 기준
- 학습 효과(이해도, 조작성)
- 구현 난이도/유지보수 비용
- 성능(렌더링/레이아웃 안정성)

## 7) 참고 링크
- Algorithm Visualizer: https://github.com/algorithm-visualizer/algorithm-visualizer
- tracers.js: https://algorithm-visualizer.github.io/tracers.js/
- AlgoVis.io: https://tobinatore.github.io/algovis/
- OpenAlgoViz: https://openalgoviz.sourceforge.net/
- Cytoscape.js: https://js.cytoscape.org/
- Sigma.js: https://www.sigmajs.org/docs/
- Mermaid.js: https://mermaid.js.org/intro/getting-started.html
