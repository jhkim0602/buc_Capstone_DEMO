# 컴포넌트 계층 구조

CTP의 React 컴포넌트 구조와 렌더링 흐름을 설명합니다.

## 전체 계층 구조

```
app/insights/ctp/[categoryId]/[conceptId]/page.tsx
    ↓
CTPWikiLayout
├── CTPSidebar (왼쪽 사이드바 - 카테고리/개념 네비게이션)
├── CTPSubSidebar (중앙 사이드바 - 서브개념 목록)
├── CTPRightSidebar (오른쪽 사이드바 - TOC)
└── Main Content
    ↓
    Content Component (from CTP_CONTENT_REGISTRY)
    ↓
    CTPContentController
    ├── Overview (activeKey가 없을 때)
    └── CTPModuleLoader (activeKey가 있을 때)
```

---

## 1. Page Component

위치: `web/app/insights/ctp/[categoryId]/[conceptId]/page.tsx`

### 역할
- URL 파라미터 파싱 (`categoryId`, `conceptId`)
- CTP_DATA에서 메타데이터 조회
- CTP_CONTENT_REGISTRY에서 콘텐츠 컴포넌트 조회
- CTPWikiLayout으로 렌더링

### 코드 예시
```typescript
export default function CTPDetailPage({ params }: PageProps) {
  const { categoryId, conceptId } = params;
  const category = CTP_DATA.find((c) => c.id === categoryId);
  const concept = category?.concepts.find((c) => c.id === conceptId);
  const ContentComponent = getCtpContent(categoryId, conceptId);

  return (
    <CTPWikiLayout>
      {ContentComponent ? <ContentComponent /> : <ComingSoon />}
    </CTPWikiLayout>
  );
}
```

---

## 2. Content Component

위치: `web/components/features/ctp/contents/categories/[category]/concepts/[concept]/index.tsx`

### 역할
- Concept별 Overview 정의
- Module Registry 연결
- CTPContentController에 전달

### 구조 예시
```typescript
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { ARRAY_MODULES } from "./array-registry";
import ArrayOverview from "./components/ArrayOverview";

export default function ArrayContent() {
  return (
    <CTPContentController
      category="Linear Data Structures"
      modules={ARRAY_MODULES}
      overview={<ArrayOverview />}
    />
  );
}
```

---

## 3. CTPContentController

위치: `web/components/features/ctp/common/CTPContentController.tsx`

### 역할
- Query Param `view`를 읽어서 activeModule 결정
- activeModule이 없으면 Overview 표시
- activeModule이 있으면 CTPModuleLoader 렌더링
- 모듈 전환 시 Store 초기화 (Clean Slate Policy)

### 핵심 로직
```typescript
const activeKey = searchParams.get("view");
const activeModule = activeKey ? modules[activeKey] : null;

useEffect(() => {
  resetStore(); // 모듈 전환 시 상태 초기화
  return () => resetStore();
}, [activeKey]);

if (!activeModule) return <>{overview}</>;
return <CTPModuleLoader module={activeModule} />;
```

---

## 4. CTPModuleLoader

위치: `web/components/features/ctp/common/CTPModuleLoader.tsx`

### 역할
- CTPModule (config + useSim + Visualizer)을 받아서 전체 학습 페이지 렌더링
- Content Expansion 적용 (공통 확장 레이어)
- 모드별 Playground 선택 (일반/Sorting/MergeSort/HeapSort)

### 렌더링 구조
```typescript
<div>
  <CTPIntro {...config.story} />
  <CTPFeatures features={config.features} />
  <section id="visualization">
    {mode === 'interactive' ? (
      <CTPInteractiveModule />
    ) : isMergeSortModule ? (
      <CTPMergeSortPlayground />
    ) : isSortingModule ? (
      <CTPSortingPlayground />
    ) : (
      <CTPPlayground
        visualizer={<Visualizer data={currentData} events={currentEvents} />}
      />
    )}
    {config.guide && <GuideToggleSection />}
  </section>
  <CTPComplexity data={config.complexity} />
  <CTPImplementation examples={config.implementation} />
  <CTPPractice problems={config.practiceProblems} />
</div>
```

---

## 5. Playground 컴포넌트

### 5.1 CTPPlayground (일반)

위치: `web/components/features/ctp/playground/ctp-playground.tsx`

구성:
- **CodeEditor**: Monaco Editor (Python)
- **StepPlayer**: 재생/일시정지/단계 이동 컨트롤
- **Visualizer**: 동적 시각화 (Prop으로 전달받음)
- **StatePanel** (선택): 변수 상태 요약 (방문 순서, 큐, 스택, 거리)

### 5.2 CTPSortingPlayground

위치: `web/components/features/ctp/playground/ctp-sorting-playground.tsx`

특징:
- **Legend**: 색상 규칙 (active/comparing/sorted)
- **인덱스 표시**: active/comparing 인덱스 실시간 표시
- SortingBarVisualizer 사용

### 5.3 CTPMergeSortPlayground

위치: `web/components/features/ctp/playground/ctp-merge-sort-playground.tsx`

특징:
- 3열 뷰: Left Array, Right Array, Merged Array
- 하단: 전체 배열 상태
- MergeSortBarVisualizer 사용

### 5.4 CTPHeapSortPlayground

위치: `web/components/features/ctp/playground/ctp-heap-sort-playground.tsx`

특징:
- 수직 분할: 상단 Heap Tree, 하단 Array
- HeapSortBarVisualizer 사용

---

## 6. 공유 컴포넌트

위치: `web/components/features/ctp/contents/shared/`

- **CTPIntro**: 문제/정의/비유 섹션 (TOC: Problem/Definition/Analogy)
- **CTPFeatures**: 핵심 특징 카드 그리드
- **CTPComplexity**: 시간복잡도 테이블
- **CTPImplementation**: Python 구현 예제 (코드 블록)
- **CTPPractice**: Baekjoon 문제 카드
- **CTPGuidePanel**: 실습 가이드 (접기/펼치기)
- **CTPCategoryOverview**: 카테고리 개요 (플레이스홀더 대체)

---

## 7. 상태 관리 (Zustand)

위치: `web/components/features/ctp/store/use-ctp-store.ts`

### 상태 구조
```typescript
interface CTPState {
  // 코드
  code: string;
  setCode: (code: string) => void;

  // 실행 단계
  steps: VisualStep[];
  currentStepIndex: number;
  playState: 'idle' | 'playing' | 'paused' | 'completed';
  playbackSpeed: number;

  // 액션
  setSteps, setCurrentStep, setPlayState
  reset, nextStep, prevStep, addStep
}
```

### VisualStep 구조
```typescript
interface VisualStep {
  id: string;
  description: string;
  data: any;                  // Adapter 변환 결과
  highlightedIndices?: number[];
  activeLine?: number;
  stdout?: string[];
  events?: any[];             // Tracer 이벤트
  variables?: any;            // Raw globals
}
```

---

## 8. 컴포넌트 간 데이터 흐름

```
User Interaction (코드 작성)
    ↓
CTPPlayground → useSkulptEngine.run(code)
    ↓
Skulpt Worker → 코드 실행 → globals 스냅샷
    ↓
AdapterFactory.getAdapter(type).parse(globals)
    ↓
VisualStep[] → useCTPStore.setSteps()
    ↓
CTPPlayground → Visualizer
    ↓
GraphSvgVisualizer / ArrayGraphVisualizer 렌더링
```

---

## 9. TOC (목차) 시스템

### 자동 수집 규칙
- `data-toc="main"` → 주요 섹션 (Intro, Features, Visualization, etc.)
- `data-toc="sub"` → 서브 섹션 (Problem, Definition, Analogy, Guide)
- `data-toc-level="1"` or `"2"` → 계층 레벨
- `data-toc-title="커스텀 제목"` → 제목 오버라이드

### 예시
```tsx
<section id="visualization" data-toc="main" data-toc-level="1">
  <h2>시각화 학습하기</h2>

  <div id="guide" data-toc="sub" data-toc-level="2" data-toc-title="실습 가이드">
    <GuideToggleSection />
  </div>
</section>
```

### TOC 디버그
- URL에 `?tocDebug=1` 추가하면 수집된 TOC 항목을 콘솔에 출력

---

## 참고

- 타입 정의: `web/components/features/ctp/common/types.ts`
- Content Expansion: `web/components/features/ctp/contents/shared/ctp-content-expansion.ts`
- 레이아웃 컴포넌트: `web/components/features/ctp/layout/`
