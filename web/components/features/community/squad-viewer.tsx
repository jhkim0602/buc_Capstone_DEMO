"use client";

import dynamic from "next/dynamic";

const MarkdownEditor = dynamic(
  () => import("@/components/shared/markdown-editor"),
  { ssr: false }
);

export function Viewer({ content }: { content: string }) {
  // Use unique key to force re-render if content changes (though usually static)
  // Disable editable.
  return (
    <div className="squad-viewer">
      <MarkdownEditor
        initialContent={content}
        editable={false}
        className="border-none bg-transparent p-0 min-h-0"
      />
    </div>
  );
}
