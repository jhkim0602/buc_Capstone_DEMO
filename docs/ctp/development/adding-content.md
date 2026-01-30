# 컨텐츠 추가하기

새로운 카테고리, 개념, 서브개념을 추가하는 상세 가이드입니다.

## 컨텐츠 계층

```
Category (카테고리)
  └── Concept (개념)
      └── SubConcept (서브개념) ← 실제 학습 페이지
```

---

## 1. 새 서브개념 추가 (일반적인 케이스)

### Step 1: CTP_DATA 업데이트

파일: `web/lib/ctp-curriculum.ts`

기존 Concept의 `subConcepts` 배열에 추가:

```typescript
{
  id: "stack",
  title: "스택 (Stack)",
  subConcepts: [
    { id: "lifo-basics", title: "LIFO & 기초 연산" },
    { id: "array-stack", title: "배열 스택 (Array Stack)" },
    { id: "linked-stack", title: "연결 리스트 스택 (LL Stack)" },
    { id: "monotonic", title: "모노토닉 스택 (Monotonic)" },
    { id: "min-stack", title: "최소값 스택 (Min Stack)" }  // ← NEW
  ]
}
```

### Step 2: 파일 구조 생성

```bash
cd web/components/features/ctp/contents/categories/linear/concepts/stack/sub-concepts
mkdir min-stack
touch min-stack/config.ts
touch min-stack/logic.ts
```

### Step 3: config.ts 작성

`min-stack/config.ts`:

```typescript
import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const MIN_STACK_CONFIG: CTPModuleConfig = {
  title: "최소값 스택 (Min Stack)",
  description: "스택의 최소값을 O(1)에 조회하는 자료구조",
  tags: ["스택", "최적화", "보조 스택"],

  story: {
    problem: `일반 스택은 최소값을 찾으려면 O(N) 순회가 필요합니다.
매번 최소값을 추적하면서도 push/pop을 O(1)에 수행할 수 있을까요?`,

    definition: `보조 스택을 사용하여 각 단계의 최소값을 함께 저장합니다.
push 시 현재 최소값과 비교하여 보조 스택에 추가하고,
pop 시 보조 스택도 함께 제거합니다.`,

    analogy: `메인 스택은 '접시 쌓기', 보조 스택은 '지금까지 가장 가벼운 접시 기록'입니다.`,

    playgroundDescription: `push/pop 시 min_stack이 어떻게 유지되는지 확인하세요.`
  },

  features: [
    { title: "O(1) 최소값 조회", description: "보조 스택의 top이 항상 최소값입니다." },
    { title: "공간 복잡도 O(N)", description: "최악의 경우 모든 원소를 보조 스택에 저장합니다." }
  ],

  complexity: {
    access: "O(1)",
    search: "O(N)",
    insertion: "O(1)",
    deletion: "O(1)"
  },

  implementation: [{
    language: 'python',
    description: "최소값 스택 구현",
    code: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self):
        if self.stack:
            val = self.stack.pop()
            if val == self.min_stack[-1]:
                self.min_stack.pop()
            return val

    def get_min(self):
        return self.min_stack[-1] if self.min_stack else None
`
  }],

  practiceProblems: [
    { id: 10828, title: "스택", tier: "Silver IV", description: "기본 스택 연산" },
    { id: 17298, title: "오큰수", tier: "Gold IV", description: "모노토닉 스택 응용" }
  ],

  initialCode: {
    python: `# === USER CODE START ===
# Min Stack Implementation
stack = []
min_stack = []

def push(val):
    stack.append(val)
    if not min_stack or val <= min_stack[-1]:
        min_stack.append(val)

def pop():
    if stack:
        val = stack.pop()
        if val == min_stack[-1]:
            min_stack.pop()
        return val

def get_min():
    return min_stack[-1] if min_stack else None

# 테스트
push(3)
push(5)
push(2)
push(1)

min_val = get_min()
pop()
min_val_after = get_min()
# === USER CODE END ===

# --- 출력 확인 ---
def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["stack", "min_stack", "min_val", "min_val_after"]:
    _dump(_k)
`
  }
};
```

### Step 4: logic.ts 작성

`min-stack/logic.ts`:

```typescript
import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export function useMinStackSimulation() {
  const { run } = useSkulptEngine({ adapterType: 'array' });

  return { runSimulation: run };
}
```

### Step 5: Registry 업데이트

파일: `web/components/features/ctp/contents/categories/linear/concepts/stack/stack-registry.ts`

```typescript
import { MIN_STACK_CONFIG } from "./sub-concepts/min-stack/config";
import { useMinStackSimulation } from "./sub-concepts/min-stack/logic";
import { ArrayGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/array-graph-visualizer";

export const STACK_MODULES: Record<string, CTPModule> = {
  'lifo-basics': { ... },
  'array-stack': { ... },
  'linked-stack': { ... },
  'monotonic': { ... },
  'min-stack': {  // ← 추가
    config: MIN_STACK_CONFIG,
    useSim: useMinStackSimulation,
    Visualizer: ArrayGraphVisualizer
  }
};
```

### Step 6: 테스트

```
http://localhost:3000/insights/ctp/linear-ds/stack?view=min-stack
```

---

## 2. 새 Concept 추가

### Step 1: CTP_DATA에 Concept 추가

```typescript
{
  id: "linear-ds",
  concepts: [
    { id: "array", ... },
    { id: "linked-list", ... },
    {  // ← NEW
      id: "segment-tree",
      title: "세그먼트 트리 (Segment Tree)",
      description: "구간 쿼리를 효율적으로 처리",
      difficulty: "Hard",
      subConcepts: [
        { id: "basics", title: "세그먼트 트리 기본" },
        { id: "lazy", title: "Lazy Propagation" }
      ]
    }
  ]
}
```

### Step 2: 디렉토리 구조 생성

```bash
mkdir -p web/components/features/ctp/contents/categories/linear/concepts/segment-tree/{components,sub-concepts/{basics,lazy}}
```

### Step 3: Overview 컴포넌트

`segment-tree/components/SegmentTreeOverview.tsx`:

```typescript
import { CTPCategoryOverview } from "@/components/features/ctp/contents/shared/ctp-category-overview";

export default function SegmentTreeOverview() {
  return (
    <CTPCategoryOverview
      title="세그먼트 트리 (Segment Tree)"
      description="구간 합/최소/최대를 O(log N)에 처리하는 트리 구조입니다."
      keyFeatures={[
        "구간 쿼리 O(log N)",
        "구간 업데이트 O(log N)",
        "완전 이진 트리 구조"
      ]}
      useCases={[
        "구간 합 쿼리 (Range Sum Query)",
        "구간 최솟값 쿼리 (RMQ)",
        "Lazy Propagation"
      ]}
      prerequisites={["배열", "트리", "재귀"]}
    />
  );
}
```

### Step 4: Registry 생성

`segment-tree/segment-tree-registry.ts`:

```typescript
import { CTPModuleRegistry } from "@/components/features/ctp/common/types";
import { SEGMENT_TREE_BASICS_CONFIG } from "./sub-concepts/basics/config";
import { useSegmentTreeBasicsSimulation } from "./sub-concepts/basics/logic";
import { TreeGraphVisualizer } from "@/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer";

export const SEGMENT_TREE_MODULES: CTPModuleRegistry = {
  'basics': {
    config: SEGMENT_TREE_BASICS_CONFIG,
    useSim: useSegmentTreeBasicsSimulation,
    Visualizer: TreeGraphVisualizer
  },
  'lazy': { ... }
};
```

### Step 5: Content 컴포넌트

`segment-tree/index.tsx`:

```typescript
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { SEGMENT_TREE_MODULES } from "./segment-tree-registry";
import SegmentTreeOverview from "./components/SegmentTreeOverview";

export default function SegmentTreeContent() {
  return (
    <CTPContentController
      category="Linear Data Structures"
      modules={SEGMENT_TREE_MODULES}
      overview={<SegmentTreeOverview />}
    />
  );
}
```

### Step 6: Content Registry 등록

파일: `web/lib/ctp-content-registry.tsx`

```typescript
import SegmentTreeContent from "@/components/features/ctp/contents/categories/linear/concepts/segment-tree";

export const CTP_CONTENT_REGISTRY: Record<string, ContentComponent> = {
  "linear-ds/array": ArrayContent,
  "linear-ds/linked-list": LinkedListContent,
  "linear-ds/segment-tree": SegmentTreeContent,  // ← 추가
  // ...
};
```

---

## 3. 새 Category 추가

### Step 1: CTP_DATA에 Category 추가

```typescript
export const CTP_DATA: CTPCategory[] = [
  { id: "linear-ds", ... },
  { id: "non-linear-ds", ... },
  { id: "algorithms", ... },
  {  // ← NEW
    id: "advanced",
    title: "고급 자료구조 (Advanced)",
    description: "특수한 문제를 위한 고급 자료구조",
    color: "from-red-500 to-rose-400",
    concepts: [
      {
        id: "fenwick-tree",
        title: "펜윅 트리 (Fenwick Tree)",
        description: "구간 합을 효율적으로 계산",
        difficulty: "Hard",
        subConcepts: [
          { id: "basics", title: "펜윅 트리 기본" }
        ]
      }
    ]
  }
];
```

### Step 2: 디렉토리 생성

```bash
mkdir -p web/components/features/ctp/contents/categories/advanced/concepts/fenwick-tree
```

### Step 3: 나머지 과정은 "새 Concept 추가"와 동일

---

## 4. 고급: 새 Adapter 추가

파일: `web/components/features/ctp/adapters/advanced/fenwick-adapter.ts`

```typescript
import { BaseAdapter } from '../base-adapter';
import { VisualItem } from '@/components/features/ctp/common/types';

export class FenwickAdapter extends BaseAdapter {
  parse(globals: any): VisualItem[] {
    const tree = globals['tree'] || globals['fenwick'] || [];

    if (!Array.isArray(tree)) return [];

    return tree.map((val, idx) => ({
      id: `node-${idx}`,
      value: this.cleanValue(val),
      label: `BIT[${idx}]`,
      status: undefined
    }));
  }
}
```

AdapterFactory 등록:

```typescript
// web/components/features/ctp/adapters/index.ts
import { FenwickAdapter } from './advanced/fenwick-adapter';

export type AdapterType =
  | 'array' | 'grid' | 'queue' | 'deque'
  | 'fenwick-tree';  // ← 추가

export class AdapterFactory {
  static getAdapter(type: AdapterType): DataAdapter {
    switch (type) {
      case 'array': return new ArrayAdapter();
      // ...
      case 'fenwick-tree': return new FenwickAdapter();  // ← 추가
      default: return new ArrayAdapter();
    }
  }
}
```

---

## 5. 고급: 새 Visualizer 추가

파일: `web/components/features/ctp/playground/visualizers/advanced/fenwick-visualizer.tsx`

```typescript
"use client";

import { VisualItem } from "@/components/features/ctp/common/types";

interface FenwickVisualizerProps {
  data?: VisualItem[];
  emptyMessage?: string;
}

export function FenwickVisualizer({ data = [], emptyMessage }: FenwickVisualizerProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-card">
      {/* 트리 구조 렌더링 로직 */}
      <div className="flex gap-2">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 flex items-center justify-center border rounded bg-background">
              {item.value}
            </div>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

Registry 사용:

```typescript
import { FenwickVisualizer } from "@/components/features/ctp/playground/visualizers/advanced/fenwick-visualizer";

export const FENWICK_MODULES: Record<string, CTPModule> = {
  'basics': {
    config: FENWICK_BASICS_CONFIG,
    useSim: useFenwickBasicsSimulation,
    Visualizer: FenwickVisualizer  // ← 커스텀 Visualizer
  }
};
```

---

## 6. Content Expansion (공통 확장 레이어)

위치: `web/components/features/ctp/contents/shared/ctp-content-expansion.ts`

### 역할
- 모든 config에 공통 확장 로직 적용
- 예: Story가 없으면 기본 템플릿 제공

### 사용
```typescript
// CTPModuleLoader 내부
const mergedConfig = useMemo(
  () => applyContentExpansion(config, activeKey),
  [config, activeKey]
);
```

### 확장 예시
```typescript
export function applyContentExpansion(
  config: CTPModuleConfig,
  activeKey: string
): CTPModuleConfig {
  return {
    ...config,
    story: config.story || {
      problem: "기본 문제 설명",
      definition: "기본 정의",
      analogy: "기본 비유"
    }
  };
}
```

---

## 7. 정합성 검증

### 7.1 TOC 검증
```
http://localhost:3000/insights/ctp/linear-ds/stack?view=min-stack&tocDebug=1
```

콘솔에서 수집된 TOC 항목 확인:
- Intro (Problem, Definition, Analogy)
- Features
- Visualization (Guide)
- Complexity
- Implementation
- Practice

### 7.2 Registry 정합성
```bash
# 모든 SubConcept이 Registry에 있는지 확인
grep -r "id:" web/lib/ctp-curriculum.ts | grep subConcepts
# vs
ls web/components/features/ctp/contents/categories/*/concepts/*/sub-concepts/
```

### 7.3 Content Registry 정합성
```bash
# 모든 Concept이 Content Registry에 있는지 확인
grep "CTP_CONTENT_REGISTRY" web/lib/ctp-content-registry.tsx
```

---

## 8. 베스트 프랙티스

### 8.1 Config 작성
- `story.problem`은 학습 동기 부여 (왜 필요한가?)
- `story.definition`은 정확한 정의 + 불변식 + 비교
- `story.analogy`는 실생활 비유 (이해를 돕는)
- `features`는 2-4개 (너무 많으면 산만)
- `initialCode`는 실행 가능한 완전한 코드 (주석 포함)

### 8.2 변수명 규약
- Adapter가 인식할 수 있는 변수명 사용
- 하이라이트 변수 추가 (`active_index`, `compare_indices` 등)
- 출력 헬퍼는 `USER CODE END` 이후에 배치

### 8.3 Practice Problems
- Baekjoon 문제만 사용
- 난이도(tier) 정확히 표기
- 2-3개 권장 (너무 많으면 부담)

### 8.4 Visualizer 선택
- 배열 기반 → `ArrayGraphVisualizer`
- 2D 배열 → GridVisualizer
- 연결 리스트 → LinkedListVisualizer
- 그래프/트리 → `GraphSvgVisualizer`
- 정렬 → `SortingBarVisualizer`

---

## 9. 체크리스트

### 서브개념 추가
- [ ] CTP_DATA에 subConcept 추가
- [ ] 디렉토리 생성
- [ ] config.ts 작성 (story, features, complexity, implementation, initialCode)
- [ ] logic.ts 작성 (useSkulptEngine + adapterType)
- [ ] Registry에 모듈 등록
- [ ] 브라우저 테스트
- [ ] TOC 디버그 (`?tocDebug=1`)

### Concept 추가
- [ ] CTP_DATA에 concept 추가
- [ ] 디렉토리 구조 생성
- [ ] Overview 컴포넌트 작성
- [ ] Registry 생성
- [ ] index.tsx (CTPContentController)
- [ ] CTP_CONTENT_REGISTRY에 등록
- [ ] 모든 서브개념 작성

### Category 추가
- [ ] CTP_DATA에 category 추가
- [ ] 디렉토리 구조 생성
- [ ] 모든 Concept 작성
- [ ] 랜딩 페이지 (`/insights/ctp/page.tsx`) 확인

---

## 참고

- [변수명 규약](../reference/naming-conventions.md)
- [Tracer 이벤트](./tracer-events.md)
- [어댑터 시스템](./adapters.md)
