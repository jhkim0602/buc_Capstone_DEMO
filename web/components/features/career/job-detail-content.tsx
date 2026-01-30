"use client";

import { RecruitJob } from "@/lib/types/recruit";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  CheckCircle2,
  ListTodo,
  Trophy,
  Sparkles,
  Gift,
  Layers,
} from "lucide-react";

interface JobDetailContentProps {
  job: RecruitJob;
}

export function JobDetailContent({ job }: JobDetailContentProps) {
  const hasStructuredData =
    (job.responsibilities && job.responsibilities.length > 0) ||
    (job.qualifications && job.qualifications.length > 0);

  return (
    <div className="container mx-auto px-4 max-w-5xl py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content (Left, 2 cols) */}
        <div className="lg:col-span-2 space-y-10">
          {/* 1. Summary Section */}
          {job.summary && (
            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900 mb-8">
              <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                포지션 요약
              </h3>
              <p className="text-blue-900 dark:text-blue-100 leading-relaxed">
                {job.summary}
              </p>
            </div>
          )}

          {/* 2. Structured Content or Fallback */}
          {hasStructuredData ? (
            <div className="space-y-12 animate-in fade-in duration-500">
              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <section>
                  <SectionHeader
                    icon={ListTodo}
                    title="주요 업무"
                    color="text-slate-700 dark:text-slate-200"
                  />
                  <ul className="space-y-4 mt-6">
                    {job.responsibilities.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-transparent hover:border-border transition-colors group"
                      >
                        <div className="mt-0.5 p-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-base text-foreground/90 leading-relaxed font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Qualifications */}
              {job.qualifications && job.qualifications.length > 0 && (
                <section>
                  <SectionHeader
                    icon={Trophy}
                    title="자격 요건"
                    color="text-amber-600 dark:text-amber-400"
                  />
                  <ul className="space-y-3 mt-6">
                    {job.qualifications.map((item, i) => (
                      <li key={i} className="flex gap-3 text-base items-start">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span className="text-foreground/80 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Preferred - Optional */}
              {job.preferred && job.preferred.length > 0 && (
                <section>
                  <SectionHeader
                    icon={Sparkles}
                    title="우대 사항"
                    color="text-purple-600 dark:text-purple-400"
                  />
                  <ul className="space-y-3 mt-6">
                    {job.preferred.map((item, i) => (
                      <li key={i} className="flex gap-3 text-base items-start">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                        <span className="text-foreground/80 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Benefits tag cloud style or grid */}
              {job.benefits && job.benefits.length > 0 && (
                <section>
                  <SectionHeader
                    icon={Gift}
                    title="혜택 및 복지"
                    color="text-pink-600 dark:text-pink-400"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                    {job.benefits.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg bg-pink-50/50 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/50"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                        <span className="text-sm font-medium text-foreground/90">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Tech Stack - Keep it but stylized */}
              <section>
                <SectionHeader
                  icon={Layers}
                  title="기술 스택"
                  color="text-blue-600 dark:text-blue-400"
                />
                <div className="flex flex-wrap gap-2 mt-6">
                  {job.tags.length > 0 ? (
                    job.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="px-3 py-1.5 text-sm border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300"
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
            </div>
          ) : (
            // FALLBACK: Legacy Markdown Content
            <section className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="destructive" className="animate-pulse">
                  AI 분석 대기중
                </Badge>
                <span className="text-sm text-muted-foreground">
                  상세 내용을 원문 그대로 표시합니다.
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-border/50 prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:border-b prose-h2:pb-2 prose-table:border-collapse prose-th:bg-slate-100 dark:prose-th:bg-slate-800 prose-td:p-3 prose-th:p-3 prose-blockquote:bg-white dark:prose-blockquote:bg-slate-900 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-lg prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:border-blue-500">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {job.content || "상세 내용이 수집되지 않았습니다."}
                </ReactMarkdown>
              </div>
            </section>
          )}
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

function SectionHeader({
  icon: Icon,
  title,
  color,
}: {
  icon: any;
  title: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-2 border-b pb-4 border-border/40">
      <div className={`p-2 rounded-lg bg-muted ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
    </div>
  );
}
