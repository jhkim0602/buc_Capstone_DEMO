"use client";

import { useTagCounts } from "@/hooks/use-tag-counts";
import { cn } from "@/lib/utils";

interface TagArchiveProps {
  category: string;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

export function TagArchive({
  category,
  selectedTags,
  onToggleTag,
}: TagArchiveProps) {
  const { tagCounts, loading } = useTagCounts(category);

  if (loading) {
    return (
      <div className="w-full py-6 animate-pulse space-y-2">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-4"></div>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (tagCounts.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        🏷️ {category === "all" ? "전체" : category} 태그 아카이브
        <span className="text-sm font-normal text-muted-foreground ml-2">
          (Top {tagCounts.length})
        </span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {tagCounts.map(({ tag, count }) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onToggleTag(tag)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm transition-all duration-200 border flex items-center gap-1.5",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                  : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
              )}
            >
              <span>{tag}</span>
              <span
                className={cn(
                  "text-xs opacity-70",
                  isSelected ? "text-primary-foreground" : "text-muted-foreground"
                )}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
