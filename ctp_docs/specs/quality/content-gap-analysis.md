# CTP 콘텐츠 구성 불일치 분석 보고서 (Content Gap Analysis)

## 1. 개요
사용자가 지적한 **"선형 자료구조(Linear)와 그 외(Non-Linear/Algo) 챕터 간의 내용 양과 흐름의 불일치"** 원인을 분석하였습니다.
결론적으로 **"Legacy(V1) 구성과 Standard(V2) 구성의 과도기적 혼재"**가 주 원인이며, 특히 렌더러(`CTPModuleLoader`)가 V1 스키마의 일부(`deepDive`, `comparison`)를 지원하지 않아 발생한 **데이터-UI 불일치**도 확인되었습니다.

---

## 2. 상세 비교 분석

| 비교 항목 | Linear (예: 1D Array) | Non-Linear/Algo (예: Graph, Sorting) | 비고 |
| :--- | :--- | :--- | :--- |
| **구성 버전** | **Legacy (V1)** | **Standard (V2)** | V2는 'Content Expansion Plan'에 따름 |
| **Story 섹션** | 문장형 서술 위주, Q&A 형식 포함 | 4대 요소(`problem`, `definition`, `analogy`, `playground`) 정형화 | V2가 더 직관적이고 통일됨 |
| **Features** | 3개 이상, 설명이 길고 상세함 | 2~4개, "키워드 + 한 줄 설명" 위주 | V1은 교과서, V2는 요약 노트 느낌 |
| **Guide 섹션** | **적극 활용** (Buffer Ops 등 구체적 패턴 코드 제공) | **대부분 없음** (미작성 상태) | **결정적 차이 (UI 노출 여부)** |
| **미지원 필드** | `deepDive`, `comparison` 존재 (인터뷰 확률, 장단점 등) | 없음 | **렌더러가 무시함 (Dead Data)** |
| **Implementation** | Python 리스트 설명 등 서술적 | 핵심 구현 코드 위주 | V1은 언어적 특성 설명이 포함됨 |

### 2.1. 결정적 차이: Guide 섹션
- **Linear**: `guide` 속성을 사용하여 "버퍼 연산", "패킷 접근" 등 **인터랙티브한 패턴 팁**을 하단 토글 패널(`Playground Guide & Patterns`)로 제공합니다. 이로 인해 학습 분량이 많고 풍성해 보입니다.
- **Others**: 대부분 `guide` 속성이 없어 하단 패널이 렌더링되지 않습니다.

### 2.2. 보이지 않는 데이터: DeepDive / Comparison
- `1d-array/config.ts`에는 `deepDive`(면접 출제율, 실사용 예), `comparison`(vs LinkedList) 정보가 들어있지만, 현재 **`CTPModuleLoader.tsx`에는 이를 렌더링하는 로직이 없습니다.**
- 즉, 작성자는 많은 내용을 넣었으나 실제 사용자에게는 보이지 않는 **Zombie Data** 상태입니다.

---

## 3. 원인 진단
1.  **표준화 작업의 비대칭**: 최근 2주간 진행된 '콘텐츠 확장(Content Expansion)' 작업이 **Non-Linear와 Algorithm 챕터 위주**로 진행되었습니다. 이 과정에서 정형화된 V2 템플릿(`story/features/implementation`)이 적용되었습니다.
2.  **Legacy 잔존**: Linear 챕터는 초기에 작성된 V1 형식을 유지하고 있으며, 당시에는 "교과서적 설명"을 지향하여 텍스트 분량이 많고 구조가 다릅니다.
3.  **렌더러 변경**: `CTPModuleLoader`가 리팩토링되면서 V1 전용 필드(`deepDive`, `comparison`) 지원이 중단되었으나, Config 파일은 수정되지 않았습니다.

---

## 4. 해결 제안 (Refactor Plan)

**"통일감 있는 학습 경험"을 위해 Linear 챕터를 V2 표준(Cheatsheet 스타일)으로 마이그레이션해야 합니다.**

### Action 1: Linear 챕터 경량화 (Migration)
- `story`: 문장형 서술을 4대 요소(`problem` 등)로 분리/요약
- `features`: 서술형 설명을 불렛 포인트로 축약
- `deepDive / comparison`: 중요한 내용은 `story.problem`이나 `features`로 흡수하고, 나머지는 삭제 (렌더러 지원 안 함)

### Action 2: Guide 섹션 표준화
- **Linear**: 과도하게 상세한 패턴(Buffer Ops)은 삭제하거나 `Features`로 통합.
- **Others**: 반대로 **공통 가이드(Trace, 시각화 조작법 등)**를 추가하여 하단 패널 활용도 제고.

### Action 3: Dead Code 정리
- `config.ts` 타입 정의(`CTPModuleConfig`)에서 `deepDive`, `comparison` 등 미사용 필드 제거 및 데이터 삭제.

## 5. 결론
현재의 이질감은 **"풍성했던 구버전(Linear)"**과 **"정제된 신버전(Others)"**이 공존하면서, 기능적(Guide 유무)으로나 시각적(텍스트 길이)으로 차이가 나기 때문입니다. **Linear 챕터를 신버전 템플릿에 맞춰 재작성(Code Trimming)**하는 것이 가장 빠른 해결책입니다.
