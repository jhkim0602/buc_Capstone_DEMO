import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Blog } from "@/lib/supabase";

interface UseBlogDataParams {
  selectedBlog?: string;
  sortBy?: string;
  searchQuery?: string;
  tagCategory?: string;
  selectedSubTags?: string[];
  page?: number;
}

export function useBlogData(params: UseBlogDataParams) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        let query = supabase.from("blogs").select("*", { count: "exact" });

        // Apply filters here based on params
        // blogType filtering removed as we only support "company" now

        // Pagination
        const page = params.page || 1;
        const pageSize = 12;
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        query = query.range(from, to);

        const { data, count, error } = await query;

        if (error) {
          console.error(error);
        } else {
          setBlogs((data as any[]) || []);
          setTotalCount(count || 0);
          setTotalPages(Math.ceil((count || 0) / pageSize));
          setCurrentPage(page);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [
    params.selectedBlog,
    params.sortBy,
    params.searchQuery,
    params.tagCategory,
    JSON.stringify(params.selectedSubTags),
    params.page,
  ]);

  return { blogs, loading, totalCount, totalPages, currentPage };
}
