"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

// In a real implementation, we might parse headings from the content or accept them as props.
// For this layout demo, we'll use a hardcoded list of sections typical for a DS concept page.
const DEMO_SECTIONS = [
  { id: "intro", title: "개요 (Introduction)" },
  { id: "features", title: "주요 특징" },
  { id: "visualization", title: "시각화 (Visualizer)" },
  { id: "complexity", title: "시간 복잡도" },
  { id: "implementation", title: "구현 코드" },
  { id: "practice", title: "추천 문제" },
];

export function CTPRightSidebar() {
  const [activeSection, setActiveSection] = useState("intro");

  return (
    <aside className="hidden xl:block w-64 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto pl-6 pr-6 py-8 border-l border-border/40">
      <div className="space-y-4">
        <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">
          On This Page
        </h4>
        <nav className="flex flex-col space-y-2">
          {DEMO_SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "text-sm transition-colors border-l-2 pl-3 py-1 -ml-px",
                activeSection === section.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
              )}
            >
              {section.title}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
