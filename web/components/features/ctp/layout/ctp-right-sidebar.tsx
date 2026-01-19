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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -35% 0px", // Adjust trigger zone
        threshold: 0.1
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
              onClick={(e) => handleClick(e, section.id)}
              className={cn(
                "text-sm transition-colors border-l-2 pl-3 py-1 -ml-px block",
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
