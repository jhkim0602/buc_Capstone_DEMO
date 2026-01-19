export * from "./client";
// export * from "./server"; // Removed to prevent server-side imports in client bundle

export async function incrementViews(blogId: string | number) {
  // Placeholder: call supabase rpc or update
  console.log("Increment views for", blogId);
  return { error: null };
}


// Common types or helpers can be exported here
export type { Database } from "@/lib/database.types";

export type Blog = Database["public"]["Tables"]["posts"]["Row"] & {
  author: {
    nickname: string | null;
    avatar_url: string | null;
  } | null;
  tags: string[] | null;
};

// Mock function for fetchWeeklyPopularBlogs used in tech-blog/page.tsx
// This should ideally be implemented with actual DB logic
export async function fetchWeeklyPopularBlogs(limit: number = 5) {
  // Mock data to prevent build hang during SSG
  console.log("Fetching weekly popular blogs (MOCK)");
  return [] as Blog[];
}

