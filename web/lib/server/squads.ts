import { createClient } from "@/lib/supabase/server";

export async function fetchRecentSquads(limit = 9) {
  const supabase = await createClient();

  const { data: squads, error } = await supabase
    .from("squads")
    .select(
      `
      id,
      title,
      type,
      status,
      created_at,
      recruited_count,
      capacity
    `,
    )
    .eq("status", "recruiting")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to fetch recent squads:", error);
    return [];
  }

  return squads;
}
