"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/features/tech-blog/header";
import { TechBlogListLayout } from "@/components/layout/tech-blog-list-layout";
import { LogoMarquee } from "@/components/features/tech-blog/logo-marquee";
import { TagArchive } from "@/components/features/tech-blog/tag-archive";
import { WeeklyPopular } from "@/components/features/tech-blog/weekly-popular";
import { Footer } from "@/components/layout/footer";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { useUrlFilters } from "@/hooks/use-url-filters";
import { useBlogData } from "@/hooks/use-blog-data";
import { Blog, fetchWeeklyPopularBlogs } from "@/lib/supabase";
import { AuthModal } from "@/components/auth/auth-modal";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function HomePage() {
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
  const [isWeeklyExpanded, setIsWeeklyExpanded] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const router = useRouter();
  const scrollToTop = useScrollToTop();

  // URL 필터 상태 관리
  const {
    selectedBlog,
    sortBy,
    viewMode,
    searchQuery,
    tagCategory,
    selectedSubTags,
    handleBlogChange,
    handlePageChange,
    handleViewModeChange,
    handleSearchChange,
    handleTagCategoryChange,
    handleSubTagChange,
    currentPage: urlPage,
  } = useUrlFilters();

  // 블로그 데이터 관리 (페이지네이션)
  const { blogs, loading, totalCount, totalPages, currentPage } =
    useBlogData({
      selectedBlog,
      sortBy,
      searchQuery,
      tagCategory,
      selectedSubTags,
      page: urlPage,
    });

  // 주간 인기글 로드
  useEffect(() => {
    const loadPopularBlogs = async () => {
      try {
        const blogs = await fetchWeeklyPopularBlogs(5);
        setPopularBlogs(blogs);
      } catch (error) {
        console.error("주간 인기글 로드 실패:", error);
      }
    };

    loadPopularBlogs();
  }, []);

  // 로고 클릭 시 초기화
  const handleLogoClick = () => {
    router.push("/");
  };

  // 블로그 필터 변경 (다른 블로그로 변경될 때만 스크롤)
  const handleBlogChangeWithScroll = (blog: string) => {
    const shouldScroll = blog !== selectedBlog; // 블로그가 변경되는 경우에만 스크롤
    handleBlogChange(blog);
    if (shouldScroll) {
      scrollToTop();
    }
  };

  const handleTagCategoryChangeWithScroll = (category: typeof tagCategory) => {
    const shouldScroll = category !== tagCategory;
    handleTagCategoryChange(category);
    if (shouldScroll) {
      scrollToTop();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header is handled globally in layout/global-header.tsx */}

      <div className="container mx-auto px-4 flex gap-8 pt-0 flex-col">
        <LogoMarquee />
        <div className="flex gap-8">
          <TechBlogListLayout
            blogs={blogs}
            loading={loading}
            totalCount={totalCount}
            totalPages={totalPages}
            currentPage={currentPage}
            viewMode={viewMode}
            searchQuery={searchQuery}
            tagCategory={tagCategory as any}
            selectedSubTags={selectedSubTags}
            onPageChange={(page) => {
              handlePageChange(page);
              scrollToTop();
            }}
            onViewModeChange={handleViewModeChange}
            onSearchChange={handleSearchChange}
            onTagCategoryChange={handleTagCategoryChangeWithScroll}
            onSubTagChange={handleSubTagChange}
            isWeeklyExpanded={isWeeklyExpanded}
            onWeeklyToggle={() => setIsWeeklyExpanded(!isWeeklyExpanded)}
            onLoginClick={() => setAuthModalOpen(true)}
          />
          {isWeeklyExpanded ? (
            <div className="hidden xl:block w-[320px] shrink-0 relative border-l border-slate-200 dark:border-slate-700 pl-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsWeeklyExpanded(false)}
                className="absolute top-20 -left-10 h-8 w-8 rounded-full bg-background hover:bg-muted border shadow-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* 태그 아카이브 (사이드바 상단 배치) */}
              <div className="mt-0 mb-8">
                <TagArchive
                  category={tagCategory}
                  selectedTags={selectedSubTags}
                  onToggleTag={(tag) => {
                    const newTags = selectedSubTags.includes(tag)
                      ? selectedSubTags.filter((t) => t !== tag)
                      : [...selectedSubTags, tag];
                    handleSubTagChange(newTags);
                  }}
                />
              </div>

              <WeeklyPopular blogs={popularBlogs} />
            </div>
          ) : null}
        </div>
      </div>

      {/* 모든 데이터를 로드했을 때만 푸터 표시 */}
      {!loading && blogs.length > 0 && <Footer />}

      {/* 인증 모달 */}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}
