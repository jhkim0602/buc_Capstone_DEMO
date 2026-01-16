"use client";

import { RecruitJob } from "@/lib/types/recruit";
import Link from "next/link";
import { Briefcase, MapPin, Eye, Bookmark, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface RecruitJobRowProps {
  job: RecruitJob;
}

// Helper: Generate consistent color index from string
function getColorIndex(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 6;
}

// Background colors for logos (Softer, pastel tones)
const LOGO_BG_COLORS = [
  "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300",
  "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300",
  "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-300",
  "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300",
  "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300",
  "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300",
];

// Helper: Parse D-Day
function getDDay(deadline: string) {
  if (deadline.includes("상시"))
    return {
      text: "상시",
      color: "text-slate-500 bg-slate-100 dark:bg-slate-800",
    };
  if (deadline.includes("채용시"))
    return {
      text: "채용시",
      color: "text-slate-500 bg-slate-100 dark:bg-slate-800",
    };

  try {
    const matches = deadline.match(/(\d+)\/(\d+)/);
    if (!matches) return null;

    const month = parseInt(matches[1]);
    const day = parseInt(matches[2]);
    const now = new Date();
    const currentYear = now.getFullYear();

    // Assume deadline is this year, or next year if month is earlier than current month
    let targetYear = currentYear;
    if (month < now.getMonth() + 1) {
      targetYear += 1; // Next year
    }

    const targetDate = new Date(targetYear, month - 1, day);
    targetDate.setHours(23, 59, 59); // End of day

    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0)
      return {
        text: "마감",
        color: "text-zinc-400 bg-zinc-100 dark:bg-zinc-800",
      };
    if (diffDays === 0)
      return {
        text: "Today",
        color:
          "text-rose-600 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 font-bold",
      };
    if (diffDays <= 7)
      return {
        text: `D-${diffDays}`,
        color: "text-rose-600 bg-rose-50 dark:bg-rose-900/30 font-semibold",
      };
    return {
      text: `D-${diffDays}`,
      color: "text-slate-600 bg-slate-100 dark:bg-slate-800",
    };
  } catch {
    return null;
  }
}

export function RecruitJobRow({ job }: RecruitJobRowProps) {
  // 1. D-Day Badge
  const dDay = getDDay(job.deadline);

  // 2. Logo Color
  const colorIndex = useMemo(() => getColorIndex(job.company), [job.company]);
  const logoColorClass = LOGO_BG_COLORS[colorIndex];
  const initial = job.company.charAt(0);

  // 3. Mock Stats (based on ID)
  const stats = useMemo(() => {
    const seed = parseInt(job.id.slice(-4));
    return {
      views: 100 + (seed % 900),
      scraps: 10 + (seed % 50),
    };
  }, [job.id]);

  return (
    <Link
      href={job.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 p-5 sm:p-6"
    >
      <div className="flex items-start sm:items-center gap-5">
        {/* Logo Area */}
        <div
          className={cn(
            "w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex shrink-0 items-center justify-center font-black text-xl sm:text-2xl shadow-inner",
            logoColorClass
          )}
        >
          {initial}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Info */}
          <div className="space-y-1.5 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 font-medium">
              <span className="text-slate-700 dark:text-slate-300 hover:underline">
                {job.company}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {job.location.split(" ")[0]}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" />
                {job.experience.slice(0, 4)}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {job.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 font-medium tracking-wide"
                >
                  {tag}
                </span>
              ))}
              {job.tags.length > 5 && (
                <span className="px-1.5 py-0.5 text-[11px] text-slate-400">
                  + {job.tags.length - 5}
                </span>
              )}
            </div>
          </div>

          {/* Meta / Action */}
          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
            {/* D-Day & Stats */}
            <div className="flex items-center gap-3">
              {dDay && (
                <span
                  className={cn("text-xs px-2 py-0.5 rounded-full", dDay.color)}
                >
                  {dDay.text}
                </span>
              )}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-0.5">
                  <Eye className="w-3 h-3" /> {stats.views}
                </span>
              </div>
            </div>

            {/* CTA (Mobile: Hidden, Desktop: Visible on Hover or Always) */}
            <div className="ml-auto sm:mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300 hidden sm:flex">
              View Detail <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
