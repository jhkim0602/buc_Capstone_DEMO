import { fetchRecruitJobs, getAllTags } from "@/lib/server/recruit";
import { RecruitJobCard } from "@/components/features/career/recruit-job-card";
import { RecruitFilter } from "@/components/features/career/recruit-filter";
import { RecruitSearchSort } from "@/components/features/career/recruit-search-sort";
import { Sidebar } from "@/components/layout/sidebar";
import { SidebarBanner } from "@/components/features/career/sidebar-banner";
import { PaginationControl } from "@/components/ui/pagination-control";

export const metadata = {
  title: "채용 공고 | DIBUT",
  description: "최신 개발자 채용 정보를 기술 스택별로 탐색하세요.",
};

// Next.js 15 requires searchParams to be a Promise
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RecruitPage({ searchParams }: PageProps) {
  // Await searchParams in Next.js 15
  const resolvedSearchParams = await searchParams;

  // Parsing Tech Blog Style Filters
  const categoryParam = resolvedSearchParams.tag as string | undefined;
  const subTagsParam = resolvedSearchParams.subtags as string | undefined;

  let tags: string[] | undefined;

  if (subTagsParam) {
    tags = subTagsParam.split(",").filter(Boolean);
  } else if (categoryParam && categoryParam !== "all") {
    const { getTagsForCategory } = await import("@/lib/tag-filters");
    tags = getTagsForCategory(categoryParam as any);
  }

  const search =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search
      : undefined;

  const sort =
    typeof resolvedSearchParams.sort === "string"
      ? (resolvedSearchParams.sort as any)
      : undefined;

  const page =
    typeof resolvedSearchParams.page === "string"
      ? parseInt(resolvedSearchParams.page)
      : 1;

  const { jobs, totalPages, totalCount } = await fetchRecruitJobs({
    tags,
    search,
    sort,
    page,
    limit: 12,
  });
  const allTags = await getAllTags();

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* Tech Blog Style Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 max-w-7xl py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                채용 공고
              </h1>
              <p className="text-muted-foreground text-lg">
                Deep Crawl로 분석한 개발자 채용 공고를 만나보세요.
                <span className="ml-2 text-sm bg-muted px-2 py-1 rounded-full">
                  Total {totalCount}
                </span>
              </p>
            </div>

            {/* Integrated Search Overlay */}
            <div className="w-full md:w-auto">
              <RecruitSearchSort />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Sticky Filter Bar */}
        <div className="sticky top-[14px] z-30 mb-8 bg-background/80 backdrop-blur-md rounded-xl border border-border/50 shadow-sm">
          <RecruitFilter allTags={allTags} />
        </div>

        {/* Content Layout with Sidebar */}
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content (9 Cols) */}
          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="h-[380px]">
                  <RecruitJobCard job={job} />
                </div>
              ))}
            </div>

            {/* Pagination Implementation */}
            {jobs.length > 0 && (
              <div className="mt-12">
                <PaginationControl currentPage={page} totalPages={totalPages} />
              </div>
            )}

            {/* Empty State */}
            {jobs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 text-center border rounded-2xl border-dashed">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-xl font-bold mb-2">
                  조건에 맞는 공고가 없습니다.
                </h3>
                <p className="text-muted-foreground">
                  필터를 초기화하거나 다른 검색어로 시도해보세요.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar (3 Cols) */}
          <div className="col-span-12 lg:col-span-3">
            <Sidebar className="top-[130px] sticky">
              <SidebarBanner />
            </Sidebar>
          </div>
        </div>
      </div>
    </div>
  );
}
