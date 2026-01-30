import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export interface TagCount {
  tag: string;
  count: number;
}

export function useTagCounts(category: string) {
  const [tagCounts, setTagCounts] = useState<TagCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      setLoading(true);
      try {
        let query = supabase.from("blogs").select("tags");

        if (category && category !== "all") {
          query = query.eq("category", category);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching tags:", error);
          return;
        }

        if (!data) return;

        // Calculate counts
        const counts: Record<string, number> = {};
        data.forEach((row: { tags: string[] | null }) => {
          if (row.tags && Array.isArray(row.tags)) {
            row.tags.forEach((tag) => {
              // Normalize tag
              const normalizedTag = tag.trim().toLowerCase();
              counts[normalizedTag] = (counts[normalizedTag] || 0) + 1;
            });
          }
        });

        // Convert to array and sort
        const sortedCounts = Object.entries(counts)
          .map(([tag, count]) => ({ tag, count }))
          .sort((a, b) => b.count - a.count); // Sort by count desc

        setTagCounts(sortedCounts);
      } catch (error) {
        console.error("Failed to fetch tag counts", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
  }, [category]);

  return { tagCounts, loading };
}
