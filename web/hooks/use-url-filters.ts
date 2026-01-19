import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useUrlFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedBlog, setSelectedBlog] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState<"gallery" | "list">("gallery");
  const [searchQuery, setSearchQuery] = useState("");
  const [tagCategory, setTagCategory] = useState("ALL");
  const [selectedSubTags, setSelectedSubTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Simple state management for now.
  // Ideally this should sync with URL search params.

  return {
    selectedBlog,
    sortBy,
    viewMode,
    searchQuery,
    tagCategory,
    selectedSubTags,
    currentPage,
    handleBlogChange: setSelectedBlog,
    handlePageChange: setCurrentPage,
    handleViewModeChange: setViewMode,
    handleSearchChange: setSearchQuery,
    handleTagCategoryChange: setTagCategory,
    handleSubTagChange: setSelectedSubTags,
  };
}
