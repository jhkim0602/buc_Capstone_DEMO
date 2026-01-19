import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SquadCard } from "@/components/features/community/squad-card";
import { fetchDevEvents } from "@/lib/server/dev-events";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function SquadListPage() {
  const supabase = await createClient();

  // Fetch Squads
  const { data: squads, error } = await supabase
    .from("squads")
    .select(
      `
      *,
      leader:leader_id (
        id, nickname, avatar_url, tier
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch squads:", error);
  }

  // Fetch Events to map Titles
  // Optimization: In real app, might fetch only relevant IDs or use a map
  const { events } = await fetchDevEvents();
  const eventMap = new Map(events.map((e) => [e.id, e.title]));

  // Enhance Squads with Activity Title
  const enhancedSquads =
    squads?.map((s) => ({
      ...s,
      // @ts-ignore: join result
      leader: s.leader,
      activity: s.activity_id
        ? {
            id: s.activity_id,
            title: eventMap.get(s.activity_id) || "알 수 없는 활동",
          }
        : null,
    })) || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">팀원 모집</h1>
          <p className="text-muted-foreground">
            사이드 프로젝트, 스터디, 공모전 팀원을 찾아보세요.
            <br />
            원하는 동료와 함께 성장할 수 있는 기회입니다.
          </p>
        </div>

        <Link href="/community/squad/write">
          <Button className="w-full md:w-auto gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            모집글 작성하기
          </Button>
        </Link>
      </div>

      {/* Grid */}
      {enhancedSquads.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enhancedSquads.map((squad) => (
            // @ts-ignore
            <SquadCard key={squad.id} squad={squad} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center border rounded-2xl border-dashed bg-muted/20">
          <div className="text-6xl mb-6">👥</div>
          <h3 className="text-xl font-bold mb-2">
            아직 모집 중인 팀이 없습니다.
          </h3>
          <p className="text-muted-foreground mb-6">
            가장 먼저 팀원을 모집해보세요!
          </p>
          <Link href="/community/squad/write">
            <Button variant="outline">첫 번째 팀 만들기</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
