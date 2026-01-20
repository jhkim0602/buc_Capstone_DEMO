import {
  fetchDevEvents,
  getAllEventTags,
  fetchClosingSoonEvents,
} from "@/lib/server/dev-events";
import { EventCard } from "@/components/features/career/event-card";
import { ActivityFilter } from "@/components/features/career/activity-filter";
import { RecruitSearchSort } from "@/components/features/career/recruit-search-sort";
import { Sidebar } from "@/components/layout/sidebar";
import { RecruitingSquadsWidget } from "@/components/features/community/recruiting-squads-widget";
import { ClosingSoonWidget } from "@/components/features/career/closing-soon-widget";
import { fetchRecentSquads } from "@/lib/server/squads";
import { PaginationControl } from "@/components/ui/pagination-control";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ActivitiesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  const category = resolvedSearchParams.category as string | undefined;
  const subtagsParam = resolvedSearchParams.tags as string | undefined;

  let tags: string[] | undefined;
  if (subtagsParam) {
    tags = subtagsParam.split(",").filter((t) => t.trim() !== "");
  }

  const search =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search
      : undefined;

  const page =
    typeof resolvedSearchParams.page === "string"
      ? parseInt(resolvedSearchParams.page)
      : 1;

  const { events, totalPages, totalCount } = await fetchDevEvents({
    search,
    category,
    tags,
    page,
    limit: 12,
  });
  const allTags = await getAllEventTags(category);
  const recentSquads = await fetchRecentSquads(5);
  const closingEvents = await fetchClosingSoonEvents();

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 max-w-7xl py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                대외활동
              </h1>
              <p className="text-muted-foreground text-lg">
                해커톤, 컨퍼런스, 다양한 개발자 행사를 통해 커리어를
                성장시키세요.
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

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Sticky Filter Bar */}
        <div className="sticky top-[14px] z-30 mb-8 bg-background/80 backdrop-blur-md rounded-xl border border-border/50 shadow-sm">
          <ActivityFilter allTags={allTags} />
        </div>

        {/* Content Layout with Sidebar */}
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content (9 Cols) */}
          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="h-[320px]">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
            {/* Pagination */}
            {events.length > 0 && (
              <div className="mt-12">
                <PaginationControl
                  currentPage={page}
                  totalPages={totalPages || 0}
                />
              </div>
            )}

            {/* Empty State */}
            {events.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 text-center border rounded-2xl border-dashed">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-xl font-bold mb-2">
                  조건에 맞는 활동이 없습니다.
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
              <RecruitingSquadsWidget squads={recentSquads} />
              <ClosingSoonWidget events={closingEvents} />
            </Sidebar>
          </div>
        </div>
      </div>
    </div>
  );
}
