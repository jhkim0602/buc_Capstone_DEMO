"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { AuthModal } from "@/components/auth/auth-modal";
import { isFlutterWebView } from "@/lib/webview-bridge";
import { BlogSelector } from "@/components/features/tech-blog/blog-selector";
import { useUrlFilters } from "@/hooks/use-url-filters";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
// 메뉴 구조 정의
const MENUS = {
  insights: {
    label: "인사이트",
    href: "/insights",
    submenus: [
      { href: "/insights/tech-blog", label: "기술 블로그" },
      { href: "/insights/roadmap", label: "개발자 로드맵" },
    ],
  },
  career: {
    label: "커리어",
    href: "/career",
    submenus: [
      { href: "/career/activities", label: "대외활동" },
      { href: "/career/jobs", label: "채용 공고" },
    ],
  },
  community: {
    label: "커뮤니티",
    href: "/community",
    submenus: [
      { href: "/community/board", label: "자유 게시판" },
      { href: "/community/group", label: "스터디 & 모임" },
      { href: "/community/squad", label: "팀원 모집" },
    ],
  },
  workspace: {
    label: "워크스페이스",
    href: "/workspace",
    submenus: [
      { href: "/workspace", label: "프로젝트 관리" },
      { href: "/workspace/tools", label: "협업 도구" },
    ],
  },
  interview: {
    label: "AI 면접",
    href: "/interview",
    submenus: [
      { href: "/interview", label: "AI 모의 면접" },
      { href: "/interview/analysis", label: "면접 분석" },
      { href: "/interview/room", label: "면접 대기실" },
    ],
  },
};

export function GlobalHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isTechBlog = pathname && pathname.startsWith("/insights/tech-blog");

  // Use URL filters hook for Tech Blog state (synced via URL)
  const {
    selectedBlog,
    handleBlogChange,
  } = useUrlFilters();

  // 현재 활성화된 메인 카테고리 찾기
  const currentCategory = Object.keys(MENUS).find((key) =>
    pathname.startsWith(MENUS[key as keyof typeof MENUS].href)
  );

  const submenus = currentCategory
    ? MENUS[currentCategory as keyof typeof MENUS].submenus
    : [];

  return (
    <>
      <header className="group fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-300">
        {/* Main Header Bar */}
        <div className="flex h-14 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <span className="font-black text-xl text-foreground bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                <span className="bg-foreground text-background px-1 rounded mr-1">
                  SL
                </span>
                StackLoad
              </span>
            </Link>

            {/* Desktop Main Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {Object.entries(MENUS).map(([key, menu]) => {
                const isActive = pathname.startsWith(menu.href);
                return (
                  <Link key={key} href={menu.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "text-base font-medium h-9 px-4 hover:bg-muted/50 transition-colors",
                        isActive
                          ? "text-primary font-bold bg-muted/30"
                          : "text-muted-foreground"
                      )}
                    >
                      {menu.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Tech Blog Specific Filters */}
            {/* Tech Blog Specific Filters */}
            {isTechBlog && (
              <div className="flex items-center gap-2 mr-2">
                <div className="hidden md:block">
                  <BlogSelector
                    selectedBlog={selectedBlog}
                    onBlogChange={handleBlogChange}
                  />
                </div>
              </div>
            )}

            <ThemeToggle />
            {!isFlutterWebView() && (
              <UserMenu onLoginClick={() => setIsAuthModalOpen(true)} />
            )}
          </div>
        </div>

        {/* Double Header Bar (Sub Navigation) - Conditionally Rendered */}
        {submenus.length > 0 && (
          <div className="w-full border-t border-border/30 bg-muted/20 md:hidden md:group-hover:block">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <nav className="flex items-center h-10 md:h-11 overflow-x-auto no-scrollbar gap-6">
                {submenus.map((submenu) => {
                  // 단순 startsWith 비교보다 정확한 활성화 로직
                  // 예: /community/board 가 /community/board-detail 도 포함하도록
                  const isSubActive = pathname === submenu.href || pathname.startsWith(submenu.href + '/');
                  return (
                    <Link
                      key={submenu.href}
                      href={submenu.href}
                      className={cn(
                        "text-sm font-medium whitespace-nowrap transition-colors relative py-1",
                        isSubActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {submenu.label}
                      {isSubActive && (
                        <span className="absolute -bottom-[9px] md:-bottom-[11px] left-0 w-full h-[2px] bg-primary rounded-t-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Mobile Filter View for Tech Blog */}
        {isTechBlog && (
          <div className="sm:hidden border-t border-border/50 p-2 bg-background/50 backdrop-blur-md">
            <div className="flex items-center gap-2 justify-between">
              <BlogSelector
                selectedBlog={selectedBlog}
                onBlogChange={handleBlogChange}
                className="w-full"
              />
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content overlap - Height depends on header state */}
      <div
        className={cn(
          "w-full transition-all duration-300",
          submenus.length > 0 ? "h-24 md:h-14" : "h-14"
        )}
      />

      <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </>
  );
}
