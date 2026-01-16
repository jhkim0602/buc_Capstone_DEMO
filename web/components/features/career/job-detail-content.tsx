"use client";

import { RecruitJob } from "@/lib/types/recruit";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface JobDetailContentProps {
  job: RecruitJob;
}

export function JobDetailContent({ job }: JobDetailContentProps) {
  return (
    <div className="container mx-auto px-4 max-w-5xl py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content (Left, 2 cols) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Tech Stack Section */}
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-600 rounded-full mr-3" />
              기술 스택
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.tags.length > 0 ? (
                job.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    {tag}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground">
                  기술 스택 정보가 없습니다.
                </p>
              )}
            </div>
          </section>

          <Separator />

          {/* Description Section */}
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="w-1 h-6 bg-purple-600 rounded-full mr-3" />
              상세 내용
            </h3>
            {/* Enhanced Prose Styling for Tables & Readability */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-border/50 prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:border-b prose-h2:pb-2 prose-table:border-collapse prose-th:bg-slate-100 dark:prose-th:bg-slate-800 prose-td:p-3 prose-th:p-3 prose-blockquote:bg-white dark:prose-blockquote:bg-slate-900 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-lg prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:border-blue-500">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {job.content || "상세 내용이 수집되지 않았습니다."}
              </ReactMarkdown>
            </div>
          </section>
        </div>

        {/* Sidebar (Right, 1 col) */}
        <div className="lg:col-span-1 space-y-8">
          <div className="p-6 rounded-2xl border border-border bg-background shadow-sm sticky top-24">
            <h4 className="font-bold text-lg mb-4">공고 요약</h4>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-border/50">
                <dt className="text-muted-foreground">경력</dt>
                <dd className="font-medium text-right">{job.experience}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <dt className="text-muted-foreground">학력</dt>
                <dd className="font-medium text-right">{job.education}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <dt className="text-muted-foreground">근무형태</dt>
                <dd className="font-medium text-right">{job.work_type}</dd>
              </div>
              <div className=" pt-2">
                <dt className="text-muted-foreground mb-1">근무지역</dt>
                <dd className="font-medium">{job.location}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
