"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamic import to disable SSR for the editor
const MarkdownEditor = dynamic(
  () => import("@/components/shared/markdown-editor"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[300px] flex items-center justify-center bg-muted/20 text-muted-foreground animate-pulse rounded-lg">
        컨텐츠 로딩 중...
      </div>
    ),
  }
);

interface PostViewerProps {
  content: string;
}

export default function PostViewer({ content }: PostViewerProps) {
  return (
    <div className="rounded-lg">
      <MarkdownEditor initialContent={content} editable={false} />
    </div>
  );
}
