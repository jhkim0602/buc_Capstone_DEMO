"use client";

import { BlogSelector } from "@/components/features/tech-blog/blog-selector";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { isFlutterWebView } from "@/lib/webview-bridge";

interface HeaderProps {
  selectedBlog: string;
  onBlogChange: (blog: string) => void;
  onLogoClick: () => void;
  onLoginClick: () => void;
}

export function Header({
  selectedBlog,
  onBlogChange,
  onLogoClick,
  onLoginClick,
}: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="container mx-auto px-4 py-3">
        {/* 데스크톱 레이아웃 */}
        <div className="hidden sm:flex sm:items-center justify-between gap-3">
          {/* 로고 */}
          <button
            onClick={onLogoClick}
            className="hover:opacity-80 transition-opacity"
          >
            <h1 className="text-2xl font-black text-blue-600 dark:text-blue-400">
              StackLoad
            </h1>
          </button>

          {/* 필터들 */}
          <div className="flex items-center gap-3">
            <BlogSelector
              selectedBlog={selectedBlog}
              onBlogChange={onBlogChange}
            />
            <ThemeToggle />
            {!isFlutterWebView() && <UserMenu onLoginClick={onLoginClick} />}
          </div>
        </div>

        {/* 모바일 레이아웃 */}
        <div className="sm:hidden">
          {/* 첫 번째 줄: 로고와 테마 */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onLogoClick}
              className="hover:opacity-80 transition-opacity"
            >
              <h1 className="text-xl font-black text-blue-600 dark:text-blue-400">
                StackLoadd
              </h1>
            </button>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {!isFlutterWebView() && <UserMenu onLoginClick={onLoginClick} />}
            </div>
          </div>

          {/* 두 번째 줄: 필터들 */}
          <div className="flex items-center justify-between gap-2">
            <BlogSelector
              selectedBlog={selectedBlog}
              onBlogChange={onBlogChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
