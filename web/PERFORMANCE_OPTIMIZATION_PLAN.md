# 웹 성능 최적화 및 UX 개선 기획서 (Performance Optimization Plan)

## 1. 현황 분석 (Current Status)

### 1.1 빌드 아웃풋 분석
현재 `npm run build` 결과, 대부분의 주요 페이지가 **Dynamic Rendering (`ƒ`)** 으로 설정되어 있습니다.

```text
Route (app)                                 Size  First Load JS
├ ƒ /career/jobs/[id]                    9.65 kB         166 kB
├ ƒ /community/board                     2.04 kB         121 kB
├ ƒ /community/squad                     3.01 kB         122 kB
└ ƒ /workspace/[id]                       512 kB         726 kB
```

*   **원인**:
    1.  **`force-dynamic` 사용**: `community/squad/page.tsx` 등에서 최신 데이터 보장을 위해 강제 동적 렌더링을 설정했습니다.
    2.  **Request Time Data 사용**: `searchParams`, `cookies()`, `headers()` (Supabase Auth Session 확인 등)를 사용하면 Next.js는 해당 페이지를 정적으로(Static) 만들 수 없어 요청 시마다 서버에서 다시 그립니다(SSR).
    3.  **Database 직접 호출**: Prisma를 통한 DB 호출이 페이지 컴포넌트 내부에서 `await`로 실행됩니다.

### 1.2 UX 문제점 (Pain Point)
*   **느린 화면 전환 (Blocking Navigation)**:
    *   사용자가 링크를 클릭하면 브라우저는 서버가 `await getSquads()` 등의 데이터 가져오기를 완료할 때까지 **아무것도 보여주지 않고 대기**합니다.
    *   이로 인해 개발 모드뿐만 아니라 프로덕션에서도 DB 응답 속도만큼 화면 전환 딜레이가 발생합니다.

---

## 2. 최적화 목표 (Objectives)

1.  **Instant Navigation (즉각적인 화면 전환)**: 링크 클릭 시 **0.1초 이내**에 다음 화면의 뼈대(Shell)로 이동해야 합니다.
2.  **Streaming UI**: 데이터가 로딩되는 동안 스켈레톤 UI를 보여주고, 데이터가 준비되면 자연스럽게 콘텐츠를 채웁니다.
3.  **Server Load Reduction**: 불필요한 DB 호출을 줄이고 캐싱을 활용합니다.

---

## 3. 개선 방안 (Implementation Plan)

### 3.1 [핵심] Streaming SSR & Suspense 도입 (Priority: High)
"페이지 전체가 준비될 때까지 대기"하는 기존 방식에서, **"일단 화면 이동 후 데이터 로딩"** 방식으로 변경합니다.

*   **Action**: 주요 페이지 폴더에 `loading.tsx` 파일 생성.
    *   `/community/squad/loading.tsx`
    *   `/community/board/loading.tsx`
    *   `/career/jobs/loading.tsx`
*   **Effect**: Next.js가 자동으로 해당 경로 진입 시 `loading.tsx`를 즉시 보여줍니다. 사용자는 "멈춘 느낌" 없이 바로 이동했음을 인지합니다.

### 3.2 페이지 별 Data Fetching 분리 (Component Streaming)
페이지 컴포넌트(`page.tsx`)에서 모든 데이터를 다 기다리지 않고, 데이터가 필요한 부분만 별도 컴포넌트로 분리하여 `Suspense`로 감쌉니다.

**변경 전 (Blocking)**:
```tsx
// page.tsx
export default async function Page() {
  const squads = await getSquads(); // 여기서 1초 걸리면 화면 전환도 1초 지연
  return <List data={squads} />
}
```

**변경 후 (Streaming)**:
```tsx
// page.tsx
import { Suspense } from 'react';
import SquadList from './squad-list';

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<SkeletonList />}>
         {/* SquadList 내부에서 await getSquads() 실행 */}
         <SquadList />
      </Suspense>
    </>
  )
}
```

### 3.3 정적/동적 렌더링 전략 최적화 (Review Strategy)
*   **Static (`○`) 가능한 페이지 발굴**:
    *   `/interview/analysis` 등 사용자의 입력에 따라 결과만 보여주는 페이지는 클라이언트 컴포넌트로 전환하거나 캐싱 전략을 수정.
*   **Partial Prerendering (PPR)** (Experimental):
    *   Next.js 15의 최신 기능인 PPR 도입 검토 (헤더/푸터는 정적, 콘텐츠는 동적).

---

## 4. 실행 로드맵 (Roadmap)

1.  **Step 1 (UI/UX)**: `community/squad`, `community/board` 등 주요 탭에 대한 **`loading.tsx` (스켈레톤 UI)** 제작 및 적용. (가장 효과 큼)
2.  **Step 2 (Refactoring)**: `page.tsx`의 거대한 `await` 로직을 하위 컴포넌트로 이관 및 `Suspense` 적용.
3.  **Step 3 (Caching)**: Prisma 호출(`getSquads` 등)에 `unstable_cache` 적용하여 잦은 DB 조회 방지.

위 **Step 1 (loading.tsx 적용)** 만 수행해도 체감 속도는 2배 이상 향상됩니다.
