import path from "path";
import fs from "fs";
import { DevEvent } from "@/lib/types/dev-event";

// 개발자 행사 목록 조회 (JSON 파일 기반)
// Server-Only: fs 사용
export async function fetchDevEvents({
  search,
  category,
  tags,
}: {
  search?: string;
  category?: string;
  tags?: string[];
} = {}) {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "dev-events.json"
    );

    if (!fs.existsSync(filePath)) {
      console.warn("dev-events.json not found");
      return { events: [], totalCount: 0 };
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const allEvents = JSON.parse(fileContents) as DevEvent[];

    let filteredEvents = allEvents;

    // Filter by search
    if (search && search.trim()) {
      const searchTerm = search.trim().toLowerCase();
      filteredEvents = filteredEvents.filter(
        (e) =>
          e.title.toLowerCase().includes(searchTerm) ||
          e.host?.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by category
    if (category && category !== "all") {
      filteredEvents = filteredEvents.filter((e) => e.category === category);
    }

    // Filter by tags (Case-insensitive)
    if (tags && tags.length > 0) {
      const lowerTags = tags.map((t) => t.toLowerCase());
      filteredEvents = filteredEvents.filter((e) =>
        e.tags.some((tag) => lowerTags.includes(tag.toLowerCase()))
      );
    }

    return {
      events: filteredEvents,
      totalCount: filteredEvents.length,
    };
  } catch (e) {
    console.error("Failed to load dev events:", e);
    return { events: [], totalCount: 0 };
  }
}

// 모든 태그 목록 조회 (Count 포함, 카테고리 필터링 지원)
export async function getAllEventTags(category?: string) {
  // Fetch events focusing on the category to get relevant tags
  const { events } = await fetchDevEvents({ category });
  const tagCounts: Record<string, number> = {};

  events.forEach((event) => {
    event.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // Sort by count desc
  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([tag, count]) => ({ tag, count }));
}

// 개발자 행사 상세 조회
export async function fetchDevEventById(id: string) {
  const { events } = await fetchDevEvents();
  return events.find((e) => e.id === id) || null;
}
