"use client";

import type { CTPImplementationExample } from "../../common/types";

interface CTPImplementationProps {
  examples: CTPImplementationExample[];
}

export function CTPImplementation({ examples }: CTPImplementationProps) {
  const pythonExamples = examples.filter((example) => example.language === "python");
  const renderExamples = pythonExamples.length > 0 ? pythonExamples : examples.slice(0, 1);

  return (
    <section id="implementation" data-toc="main" data-toc-level="1" className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">구현 코드</h2>
      <div className="rounded-lg border border-border bg-muted/30 p-4 font-mono text-sm overflow-x-auto space-y-4">
        {renderExamples.map((ex, idx) => (
          <div key={`${ex.language}-${idx}`} className="space-y-2">
            <div className="text-xs font-semibold tracking-wide text-muted-foreground">Python</div>
            {ex.description && (
              <div
                className="text-xs text-muted-foreground mb-2 font-sans"
                dangerouslySetInnerHTML={{ __html: ex.description }}
              />
            )}
            <pre className="text-foreground">{ex.code}</pre>
          </div>
        ))}
      </div>
    </section>
  );
}
