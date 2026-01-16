import { fetchDevEvents, getAllEventTags } from "@/lib/server/dev-events";
import { EventCard } from "@/components/features/career/event-card";
import { ActivityFilter } from "@/components/features/career/activity-filter";
import { RecruitSearchSort } from "@/components/features/career/recruit-search-sort";

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

  const { events } = await fetchDevEvents({ search, category, tags });
  const allTags = await getAllEventTags(category);

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

        {/* Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <div key={event.id} className="h-[320px]">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
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
    </div>
  );
}
