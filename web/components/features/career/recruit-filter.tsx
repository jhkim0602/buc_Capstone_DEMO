"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { TagFilterBar } from "@/components/features/tech-blog/tag-filter-bar";
import { TAG_FILTER_OPTIONS, TagCategory } from "@/lib/tag-filters";

interface RecruitFilterProps {
  allTags: { tag: string; count: number }[];
}

export function RecruitFilter({ allTags }: RecruitFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // URL Params State
  const tagCategory = (searchParams.get("tag") as string) || "all";
  const selectedSubTags = searchParams.get("subtags")
    ? searchParams
        .get("subtags")!
        .split(",")
        .filter((tag) => tag.trim() !== "")
    : [];

  // Handlers
  const handleTagCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Reset subtags when category changes (except 'all')
    params.delete("subtags");

    if (category === "all") {
      params.delete("tag");
    } else {
      params.set("tag", category);
    }

    // Reset page
    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSubTagChange = (subTags: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (subTags.length > 0) {
      params.set("subtags", subTags.join(","));
    } else {
      params.delete("subtags");
    }

    // Reset page
    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-[0px] z-30 pt-2">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <TagFilterBar
          value={tagCategory}
          options={TAG_FILTER_OPTIONS}
          selectedSubTags={selectedSubTags}
          availableTags={allTags}
          onChange={handleTagCategoryChange}
          onSubTagChange={handleSubTagChange}
        />
      </div>
    </div>
  );
}
