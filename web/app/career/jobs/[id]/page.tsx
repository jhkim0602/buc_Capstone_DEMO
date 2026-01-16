import { fetchRecruitJobById } from "@/lib/server/recruit";
import { notFound } from "next/navigation";
import { JobDetailHeader } from "@/components/features/career/job-detail-header";
import { JobDetailContent } from "@/components/features/career/job-detail-content";

// Next.js 15 requires params to be a Promise (Reverted for Next.js 14)
interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  // Await params in Next.js 15 (Reverted)
  const { id } = params;
  const job = await fetchRecruitJobById(id);

  if (!job) {
    return {
      title: "공고를 찾을 수 없습니다",
    };
  }

  return {
    title: `${job.title} | StackLoad`,
    description: `${job.company}의 채용 공고를 확인하세요.`,
    openGraph: {
      images: job.image_url ? [job.image_url] : [],
    },
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  // Await params in Next.js 15 (Reverted)
  const { id } = params;
  const job = await fetchRecruitJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <JobDetailHeader job={job} />
      <JobDetailContent job={job} />
    </div>
  );
}
