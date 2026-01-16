"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";

export function RecruitSearchSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial States
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "latest");

  // Debounce search input
  const [debouncedSearch] = useDebounce(searchTerm, 300);

  // Update URL on change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    if (sort && sort !== "latest") {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    router.push(`?${params.toString()}`);
  }, [debouncedSearch, sort, router, searchParams]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-[72px] z-30 backdrop-blur-md">
      <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="제목, 기업명, 기술 스택으로 검색..."
          className="pl-9 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <span className="text-sm text-muted-foreground whitespace-nowrap pl-2 hidden sm:inline">
          정렬:
        </span>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full sm:w-[160px] bg-slate-50 dark:bg-slate-950">
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="deadline">마감임박순</SelectItem>
            <SelectItem value="view">인기순</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
