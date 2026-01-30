# 데이터 모델

CTP의 데이터 계층 구조를 설명합니다.

## 1. CTP_DATA (Curriculum)

위치: `web/lib/ctp-curriculum.ts`

### 구조
```typescript
interface CTPCategory {
  id: string;              // "linear-ds", "non-linear-ds", "algorithms"
  title: string;           // "선형 자료구조 (Linear)"
  description: string;
  color: string;          // Tailwind gradient class
  concepts: CTPConcept[];
}

interface CTPConcept {
  id: string;              // "array", "linked-list", "graph"
  title: string;           // "배열 (Array)"
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  isImportant?: boolean;
  subConcepts: TCPSubConcept[];
}

interface TCPSubConcept {
  id: string;              // "1d-array", "singly", "dfs-basics"
  title: string;           // "1차원 배열 기초"
}
```

### 계층 구조
```
Category (카테고리)
  ├── Concept (개념)
  │   ├── SubConcept 1 (서브개념)
  │   ├── SubConcept 2
  │   └── SubConcept 3
  └── ...
```

### URL 매핑
- 카테고리: `/insights/ctp/[categoryId]/[conceptId]`
- 서브개념: `/insights/ctp/[categoryId]/[conceptId]?view=[subConceptId]`
- 예: `/insights/ctp/linear-ds/array?view=1d-array`

---

## 2. CTP_CONTENT_REGISTRY

위치: `web/lib/ctp-content-registry.tsx`

### 역할
- Category + Concept을 React 컴포넌트와 매핑
- URL 파라미터를 기반으로 올바른 컨텐츠 컴포넌트 로드

### 구조
```typescript
const CTP_CONTENT_REGISTRY: Record<string, ContentComponent> = {
  "linear-ds/array": ArrayContent,
  "linear-ds/linked-list": LinkedListContent,
  "non-linear-ds/graph": GraphContent,
  "algorithms/sorting": SortingContent,
  // ...
};
```

### 사용 예
```typescript
const ContentComponent = getCtpContent(categoryId, conceptId);
// → ArrayContent 컴포넌트 반환
```

---

## 3. Module Registry

위치: `web/components/features/ctp/contents/categories/[category]/concepts/[concept]/*-registry.ts`

예: `array-registry.ts`, `linked-list-registry.ts`

### 구조
```typescript
export const ARRAY_MODULES: Record<string, CTPModule> = {
  '1d-array': {
    config: ARRAY_1D_CONFIG,
    useSim: useArray1DSimulation,
    Visualizer: ArrayGraphVisualizer
  },
  '2d-array': {
    config: ARRAY_2D_CONFIG,
    useSim: useArray2DSimulation,
    Visualizer: ArrayGraphVisualizer
  },
  // ...
};
```

### CTPModule 타입
```typescript
interface CTPModule {
  config: CTPModuleConfig;      // 콘텐츠 정의
  useSim: () => SimulationHook; // 시뮬레이션 로직
  Visualizer: ComponentType;    // 시각화 컴포넌트
}
```

---

## 4. CTPModuleConfig

위치: 각 서브개념 디렉토리의 `config.ts`

예: `web/components/features/ctp/contents/categories/linear/concepts/array/sub-concepts/1d-array/config.ts`

### 필수 필드
```typescript
export const ARRAY_1D_CONFIG: CTPModuleConfig = {
  title: "1D Array (배열)",
  description: "데이터를 순서대로 나란히 저장하는 가장 기초적인 자료구조입니다.",
  tags: ["기초", "순차 저장", "인덱스"],

  // Story Mode (교재형 구조)
  story: {
    problem: "학습 동기/문제 상황",
    definition: "정의, 불변식, 비교",
    analogy: "실생활 비유",
    playgroundLimit: "플레이그라운드 실습 포인트",
    playgroundDescription: "이번 단계에서 무엇을 볼까?"
  },

  features: [
    { title: "특징1", description: "설명" },
    { title: "특징2", description: "설명" }
  ],

  complexity: {
    access: "O(1)",
    search: "O(N)",
    insertion: "O(N)",
    deletion: "O(N)"
  },

  implementation: [{
    language: 'python',
    description: "설명",
    code: "# 구현 코드"
  }],

  practiceProblems: [
    { id: 10818, title: "최소, 최대", tier: "Bronze III", description: "..." }
  ],

  initialCode: {
    python: `# === USER CODE START ===
# 실습용 초기 코드
# === USER CODE END ===`
  }
};
```

### 선택 필드
- `mode`: 'code' | 'interactive' (기본: 'code')
- `interactive`: 버튼 기반 시뮬레이터 설정
- `guide`: 플레이그라운드 가이드 패널
- `showStatePanel`: 상태 패널 표시 여부
- `statePanelMode`: 'summary' | 'full'
- `complexityNames`: 복잡도 항목 이름 커스텀

---

## 5. 데이터 흐름

```
User Request
    ↓
URL: /insights/ctp/[categoryId]/[conceptId]?view=[subConceptId]
    ↓
CTP_CONTENT_REGISTRY → ContentComponent
    ↓
CTPContentController → modules (from Registry)
    ↓
CTPModuleLoader
    ├── config (CTPModuleConfig)
    ├── useSim (Simulation Hook)
    └── Visualizer (React Component)
    ↓
Render: Intro → Features → Playground → Complexity → Implementation → Practice
```

---

## 6. 정합성 규칙

### 6.1 CTP_DATA ↔ Registry ↔ Content
- `CTP_DATA`의 모든 Concept은 `CTP_CONTENT_REGISTRY`에 등록되어야 함
- `CTP_DATA`의 모든 SubConcept은 각 Concept의 Registry에 모듈로 존재해야 함

### 6.2 파일 위치 규약
```
web/components/features/ctp/contents/categories/[category]/concepts/[concept]/
├── index.tsx                    # Concept 컴포넌트 (CTPContentController 사용)
├── [concept]-registry.ts        # Module Registry
├── components/                  # Overview 등 공통 컴포넌트
│   └── [Concept]Overview.tsx
└── sub-concepts/
    └── [sub-concept-id]/
        ├── config.ts            # CTPModuleConfig
        └── logic.ts             # Simulation Hook
```

---

## 7. 예제: Array 개념

### CTP_DATA
```typescript
{
  id: "array",
  title: "배열 (Array)",
  description: "메모리 연속 할당, 인덱스 접근",
  difficulty: "Easy",
  isImportant: true,
  subConcepts: [
    { id: "1d-array", title: "1차원 배열 기초" },
    { id: "2d-array", title: "2차원 배열 & 행렬" },
    { id: "string", title: "문자열 (Char Array)" }
  ]
}
```

### Registry
```typescript
// web/components/features/ctp/contents/categories/linear/concepts/array/array-registry.ts
export const ARRAY_MODULES: Record<string, CTPModule> = {
  '1d-array': {
    config: ARRAY_1D_CONFIG,
    useSim: useArray1DSimulation,
    Visualizer: ArrayGraphVisualizer
  },
  // ...
};
```

### Content Registry
```typescript
// web/lib/ctp-content-registry.tsx
"linear-ds/array": ArrayContent
```

---

## 참고

- 전체 타입 정의: `web/components/features/ctp/common/types.ts`
- Adapter 팩토리: `web/components/features/ctp/adapters/index.ts`
- 상태 관리: `web/components/features/ctp/store/use-ctp-store.ts`
