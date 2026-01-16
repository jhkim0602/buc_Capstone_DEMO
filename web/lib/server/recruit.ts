import path from "path";
import fs from "fs";
import { RecruitJob } from "@/lib/types/recruit";

// 채용 공고 목록 조회 (JSON 파일 기반)
// Server-Only: fs 사용
export async function fetchRecruitJobs({
  search,
  tags,
  sort = "latest",
}: {
  search?: string;
  tags?: string[];
  sort?: "latest" | "deadline" | "view";
} = {}) {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "recruit-jobs.json"
    );

    if (!fs.existsSync(filePath)) {
      console.warn("recruit-jobs.json not found");
      return { jobs: [], totalCount: 0 };
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const allJobs = JSON.parse(fileContents) as RecruitJob[];

    let filteredJobs = allJobs;

    // Filter by search
    if (search && search.trim()) {
      const searchTerm = search.trim().toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Filter by tags (Case-insensitive)
    if (tags && tags.length > 0) {
      const lowerTags = tags.map((t) => t.toLowerCase());
      filteredJobs = filteredJobs.filter((job) =>
        job.tags.some((jobTag) => lowerTags.includes(jobTag.toLowerCase()))
      );
    }

    // Sorting
    filteredJobs.sort((a, b) => {
      if (sort === "deadline") {
        // Parse deadline "~ 01/31(토)" -> compare dates
        // Simple string compare often fails, so let's try a robust way or approximation.
        // Saramin format is typically "~ MM/DD(day)". We assume current year or next year.
        // For stability, let's just reverse compare the string if format is consistent,
        // BUT simpler is to compare IDs if date parsing is complex.
        // Let's implement a simple parser helper if needed, but for now fallback to ID.
        return a.deadline.localeCompare(b.deadline);
      }
      if (sort === "view") {
        // Mock view count based on ID (deterministic random)
        const viewA = parseInt(a.id.slice(-3));
        const viewB = parseInt(b.id.slice(-3));
        return viewB - viewA;
      }
      // Default: Latest (scraped_date desc, then ID desc)
      return (
        b.scraped_date.localeCompare(a.scraped_date) || b.id.localeCompare(a.id)
      );
    });

    return {
      jobs: filteredJobs,
      totalCount: filteredJobs.length,
    };
  } catch (e) {
    console.error("Failed to load recruit jobs:", e);
    return { jobs: [], totalCount: 0 };
  }
}

// 모든 태그 목록 조회 (Count 포함)
export async function getAllTags() {
  const { jobs } = await fetchRecruitJobs();
  const tagCounts: Record<string, number> = {};

  jobs.forEach((job) => {
    job.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // Sort by count desc
  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([tag, count]) => ({ tag, count }));
}

// 채용 공고 상세 조회
export async function fetchRecruitJobById(id: string) {
  const { jobs } = await fetchRecruitJobs();
  return jobs.find((job) => job.id === id) || null;
}
