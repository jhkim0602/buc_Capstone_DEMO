# Frontend Wireframe & Development Guideline

이 문서는 AI(Gemini) 또는 개발자가 **완벽한 프론트엔드 와이어프레임**을 작업하기 위해 따라야 할 **절대적인 규칙(S.O.P)**입니다.
프로젝트의 폴더 구조, 명명 규칙, 브랜치 전략, 그리고 Mock 데이터 활용법을 상세히 기술합니다.

---

## 1. Branch Strategy & Workflow (브랜치 전략 및 워크플로우)

우리는 **`feat/frontend-wireframe`** 브랜치를 메인 통합 브랜치로 사용합니다.

### 1.1 Branch Naming Convention (브랜치 명명 규칙)
- **Format**: `feat/wireframe/<dash-case-feature-name>`
- **Examples**:
  - `feat/wireframe/login-page`
  - `feat/wireframe/dashboard-overview`
  - `feat/wireframe/settings-profile`

### 1.2 Development Workflow (작업 순서)
1. **Fetch & Checkout**:
   ```bash
   git fetch origin
   git checkout feat/frontend-wireframe
   git pull origin feat/frontend-wireframe
   ```
2. **Create Feature Branch**:
   ```bash
   git checkout -b feat/wireframe/<feature-name>
   ```
3. **Develop**: 코드 작성 (Mock 데이터 기반).
4. **Commit**: `git commit -m "feat: <기능명> UI 구현"`
5. **Push**: `git push origin feat/wireframe/<feature-name>`
6. **Pull Request**: GitHub에서 PR 생성 (Reviewers 지정).

---

## 2. Directory Structure & Naming Rules (폴더 및 파일 명명 규칙)

프로젝트 루트는 `web/` 디렉토리입니다. 모든 경로는 `web/`을 기준으로 합니다.

### 2.1 Standard Directory Structure
```
web/
├── app/                  # Next.js App Router Pages
│   ├── (auth)/           # Route Groups (URL에 포함 안 됨)
│   ├── dashboard/        # Feature Routes
│   └── layout.tsx        # Root Layout
├── components/           # Components
│   ├── ui/               # shadcn/ui (Generic Components)
│   ├── features/         # Feature-specific Components (Domain Driven)
│   │   ├── auth/         # Auth Feature Components
│   │   └── dashboard/    # Dashboard Feature Components
│   └── shared/           # Shared Components (Header, Footer, etc.)
├── mocks/                # Mock Data (JSON/TS)
├── lib/                  # Utilities (utils, constants)
└── types/                # TypeScript Interfaces/Types
```

### 2.2 Naming Conventions (절대 준수)

| Type | Convention | Example |
| :--- | :--- | :--- |
| **Folders** | `kebab-case` | `components/features/user-profile` |
| **Files (Component)** | `kebab-case` | `user-avatar.tsx`, `login-form.tsx` |
| **Files (Page)** | `page.tsx`, `layout.tsx` | `app/login/page.tsx` |
| **Files (Hooks/Utils)** | `kebab-case` | `use-auth.ts`, `format-date.ts`, `use-mobile.tsx` |
| **Component Name** | `PascalCase` | `export default function UserAvatar() {}` |
| **Interface/Type** | `PascalCase` | `interface UserProfile {}` |

> **[IMPORTANT]**
> - **모든 파일명은 `kebab-case`를 원칙으로 합니다.** (Hooks 포함: `useToast.ts` (X) -> `use-toast.ts` (O))
> - Next.js App Router에서는 파일명이 라우팅에 영향을 주므로 `page.tsx`, `layout.tsx` 등 예약어를 준수해야 합니다.
> - 컴포넌트 파일명은 `kebab-case`를 사용하지만, 내부 함수명은 `PascalCase`를 사용합니다.

---

## 3. Component Implementation Guide (컴포넌트 구현 가이드)

### 3.1 Component Location Rule
- **`components/ui/`**: 버튼, 인풋, 카드 등 재사용 가능한 기본 UI 컴포넌트 (shadcn/ui 기반). 비즈니스 로직 없음.
- **`components/features/<feature>/`**: 특정 기능에 종속된 컴포넌트. (예: `LoginCard`, `DashboardChart`). **대부분의 작업은 여기서 이루어짐.**
- **`components/shared/`**: 여러 페이지에서 공통으로 쓰이는 레이아웃 요소 (Header, Footer, Sidebar).

### 3.2 Code Style (Component Template)
```tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// 1. Props Interface Definition
interface ExampleCardProps {
  title: string;
  description?: string;
  className?: string; // Always allow className for overrides
}

// 2. Component Implementation
export default function ExampleCard({
  title,
  description,
  className
}: ExampleCardProps) {
  return (
    // 3. Root Element with 'cn' for merging classes
    <div className={cn("p-4 border rounded-lg bg-card", className)}>
      <h3 className="font-bold text-lg">{title}</h3>
      {description && <p className="text-muted-foreground">{description}</p>}
      <Button variant="default" className="mt-4">Action</Button>
    </div>
  );
}
```

---

## 4. Mock Data Strategy (Mock 데이터 전략)

와이어프레임 단계에서는 **완벽하게 백엔드 없이 동작**해야 합니다.

### 4.1 Mock Data Location
- **Path**: `web/mocks/`
- **Naming**: `web/mocks/<feature>.ts` (예: `auth.ts`, `dashboard.ts`)

### 4.2 Mock Data Code Pattern
```typescript
// web/mocks/dashboard.ts

// 1. Type Definition (Optional but recommended)
export interface DashboardStat {
  label: string;
  value: string;
  trend: number;
}

// 2. Export Constants
export const MOCK_DASHBOARD_STATS: DashboardStat[] = [
  { label: "Total Users", value: "1,200", trend: 12 },
  { label: "Active Revenue", value: "$45,231", trend: -5 },
];

export const MOCK_CHART_DATA = [ ... ];
```

### 4.3 Integration in Page
```tsx
import { MOCK_DASHBOARD_STATS } from "@/mocks/dashboard";
import StatCard from "@/components/features/dashboard/stat-card";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {MOCK_DASHBOARD_STATS.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
```

---

## 5. Development Checklist (작업 체크리스트)

AI 또는 개발자가 작업을 완료하기 전 확인할 사항입니다.

- [ ] **Naming:** 파일명이 `kebab-case`인가? 컴포넌트명이 `PascalCase`인가?
- [ ] **Location:** 컴포넌트가 올바른 `components/features/<feature>` 폴더에 있는가?
- [ ] **Mock Data:** 하드코딩된 텍스트 대신 `web/mocks/`의 데이터를 import해서 사용하는가?
- [ ] **Responsive:** Tailwind CSS (`md:`, `lg:`)를 사용하여 반응형이 고려되었는가?
- [ ] **Type Safe:** `any` 타입을 지양하고 인터페이스를 정의했는가?
- [ ] **Clean Code:** 불필요한 `console.log`나 주석이 제거되었는가?

---

> [!TIP]
> **To Gemini (AI Agent):**
> 이 가이드를 읽고 작업을 수행할 때는, 항상 **"어떤 파일을 생성/수정할지"** 먼저 계획(Plan)을 제시하고,
> 파일 생성 시 **Mock 데이터 파일 -> 컴포넌트 파일 -> 페이지 파일** 순서로 작업하는 것이 효율적입니다.
