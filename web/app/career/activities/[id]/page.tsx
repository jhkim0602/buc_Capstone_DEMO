import { fetchDevEventById } from "@/lib/server/dev-events";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ActivityDetailHeader } from "@/components/features/career/activity-detail-header";

export const dynamic = "force-dynamic";

export default async function ActivityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const event = await fetchDevEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <ActivityDetailHeader event={event} />

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Content Body */}
        {/* Content Body */}
        {event.content ? (
          <article
            className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-4xl prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b
            prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300
            prose-strong:font-bold prose-strong:text-slate-900 dark:prose-strong:text-white
            prose-ul:my-6 prose-li:my-2
            prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-table:block md:prose-table:table prose-table:overflow-x-auto
            prose-th:bg-slate-100 dark:prose-th:bg-slate-800 prose-th:p-4 prose-th:text-left prose-th:border prose-th:border-slate-200 dark:prose-th:border-slate-700
            prose-td:p-4 prose-td:border prose-td:border-slate-200 dark:prose-td:border-slate-700
            prose-a:text-primary hover:prose-a:underline
          "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {event.content}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-xl font-medium text-slate-900 dark:text-slate-100 mb-2">
              상세 정보가 없습니다.
            </p>
            <p className="text-muted-foreground mb-6">
              공식 홈페이지에서 자세한 내용을 확인해 주세요.
            </p>
            <Link
              href={event.link}
              target="_blank"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              공식 홈페이지 바로가기 <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
