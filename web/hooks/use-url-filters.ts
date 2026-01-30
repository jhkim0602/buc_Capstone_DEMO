import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { TagCategory } from "@/lib/tag-filters";

export function useUrlFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read state from URL
  const selectedBlog = searchParams.get("blog") || "all";
  const sortBy = searchParams.get("sort") || "latest";
  const viewMode = (searchParams.get("view") as "gallery" | "list") || "gallery";
  const searchQuery = searchParams.get("q") || "";
  const tagCategory = (searchParams.get("category") as TagCategory) || "all";

  // Read tags (comma separated)
  const tagsParam = searchParams.get("tags");
  const selectedSubTags = tagsParam ? tagsParam.split(",").filter(Boolean) : [];

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Helper to update URL
  const updateUrl = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Reset page to 1 if not explicitly updating page
      if (!updates.hasOwnProperty("page")) {
        params.set("page", "1");
      }

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  return {
    selectedBlog,
    sortBy,
    viewMode,
    searchQuery,
    tagCategory,
    selectedSubTags,
    currentPage,

    handleBlogChange: (blog: string) => updateUrl({ blog: blog === "all" ? null : blog }),
    handlePageChange: (page: number) => updateUrl({ page: page.toString() }),
    handleViewModeChange: (mode: "gallery" | "list") => updateUrl({ view: mode }),
    handleSearchChange: (query: string) => updateUrl({ q: query || null }),
    handleTagCategoryChange: (category: TagCategory) =>
      updateUrl({
        category: category === "all" ? null : category,
        tags: null // Clear sub-tags when category changes
      }),
    handleSubTagChange: (tags: string[]) =>
      updateUrl({ tags: tags.length > 0 ? tags.join(",") : null }),
  };
}
