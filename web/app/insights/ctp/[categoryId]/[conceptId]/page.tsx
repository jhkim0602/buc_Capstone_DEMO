"use client";

import { CTP_DATA } from "@/mocks/ctp-data";
import { CTPWikiLayout } from "@/components/features/ctp/layout/ctp-wiki-layout";
import { getCtpContent } from "@/lib/ctp-content-registry";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: {
    categoryId: string;
    conceptId: string;
  };
}

export default function CTPDetailPage({ params }: PageProps) {
  const { categoryId, conceptId } = params;

  // 1. Find Metadata
  const category = CTP_DATA.find((c) => c.id === categoryId);
  const concept = category?.concepts.find((c) => c.id === conceptId);

  if (!category || !concept) {
    // In real app, maybe show 404 or redirect
    // For now let's allow rendering the shell even if data is missing for dev
  }

  // 2. Get Content Component
  const ContentComponent = getCtpContent(categoryId, conceptId);

  return (
    <CTPWikiLayout>
      {/* Back Link (Mobile only mostly, or top nav) */}
      <div className="mb-6 lg:hidden">
        <Link href="/insights/ctp" className="text-sm text-muted-foreground flex items-center hover:text-primary">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Curriculum
        </Link>
      </div>

      {ContentComponent ? (
        <ContentComponent />
      ) : (
        // Fallback for "Coming Soon" pages
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
          <Badge variant="outline" className="text-muted-foreground">Coming Soon</Badge>
          <h1 className="text-2xl font-bold">{concept?.title || "Concept Not Found"}</h1>
          <p className="text-muted-foreground max-w-md">
            이 콘텐츠는 아직 준비 중입니다.<br/>
            빠른 시일 내에 업데이트될 예정입니다.
          </p>
        </div>
      )}
    </CTPWikiLayout>
  );
}
