"use client";

import { RecruitJob } from "@/lib/types/recruit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, Calendar, Eye, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

interface JobDetailHeaderProps {
  job: RecruitJob;
}

// 1. Consistent Gradient Generator (Reused for consistency)
function getGradientClass(str: string) {
  const gradients = [
    "from-blue-500 to-cyan-400",
    "from-indigo-500 to-purple-500",
    "from-rose-500 to-orange-400",
    "from-emerald-500 to-teal-400",
    "from-violet-600 to-indigo-600",
    "from-amber-500 to-orange-500",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export function JobDetailHeader({ job }: JobDetailHeaderProps) {
  const gradient = useMemo(() => getGradientClass(job.company), [job.company]);

  return (
    <div className="relative w-full">
      {/* Background Cover */}
      <div
        className={cn(
          "relative w-full h-[400px] bg-gradient-to-br flex items-end",
          gradient
        )}
      >
        {/* Use Real Image if available as background */}
        {job.image_url ? (
          <>
            <img
              src={job.image_url}
              alt={job.company}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-white/10 dark:bg-black/10 mix-blend-overlay" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </>
        )}

        {/* Content Container */}
        <div className="container mx-auto px-4 max-w-5xl z-10 pb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between">
            <div className="space-y-4 flex-1">
              <Badge className="bg-white/20 hover:bg-white/30 text-foreground backdrop-blur-md border-transparent text-sm px-3 py-1">
                {job.company}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-foreground drop-shadow-sm">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground/90 font-medium">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-5 h-5" />
                  {job.experience}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-5 h-5" />
                  {job.location.split(" ")[0]}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-5 h-5" />
                  {job.deadline}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="w-full md:w-auto shrink-0">
              <div className="p-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl">
                <Button
                  asChild
                  size="lg"
                  className="w-full md:w-auto h-14 text-lg bg-background text-foreground hover:bg-background/90 border-0"
                >
                  <Link
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    지원하기
                    <ExternalLink className="w-5 h-5 ml-2 text-muted-foreground" />
                  </Link>
                </Button>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-2">
                원본 사이트(사람인)로 이동합니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
