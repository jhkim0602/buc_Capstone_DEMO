"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";

<<<<<<< HEAD
type TocItem = {
  id: string;
  title: string;
  level: number;
};
=======
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

import { useSearchParams, usePathname } from "next/navigation";
>>>>>>> origin/feature/interview

export function CTPRightSidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeView = searchParams.get("view");
  const tocDebug = searchParams.get("tocDebug") === "1";
  const [activeSection, setActiveSection] = useState("intro");
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  const resolveTitle = (element: HTMLElement) => {
    const explicit = element.dataset.tocTitle;
    if (explicit && explicit.trim().length > 0) return explicit.trim();

    const heading = element.querySelector("h1, h2, h3");
    const text = heading?.textContent?.trim();
    if (text) return text;

    return element.id;
  };

  const buildToc = () => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-toc][id]"));
    const items = elements
      .map((el) => ({
        id: el.id,
        title: resolveTitle(el),
        level: Number(el.dataset.tocLevel || 1),
      }))
      .filter((item) => item.id && item.title);

    setTocItems(items);
    return items;
  };

  useEffect(() => {
    // Small delay to ensure DOM is ready after route transition
    const timeoutId = setTimeout(() => {
<<<<<<< HEAD
      const items = buildToc();
      if (tocDebug) {
        // eslint-disable-next-line no-console
        console.log("[CTP TOC] Items:", items);
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          rootMargin: "-20% 0px -35% 0px",
          threshold: 0.1
        }
      );

      const sections = document.querySelectorAll("[data-toc][id]");
      sections.forEach((section) => observer.observe(section));

=======
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          rootMargin: "-20% 0px -35% 0px",
          threshold: 0.1
        }
      );

      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => observer.observe(section));

>>>>>>> origin/feature/interview
      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]); // Re-run when path OR query params change

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // If no 'view' param, we are on the Landing Page -> Hide TOC
  if (!activeView) {
    return null;
  }

  return (
    <aside className="hidden xl:block w-64 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto pl-6 pr-6 py-8 border-l border-border/40">
      <div className="space-y-4">
        <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">
          On This Page
        </h4>
        <nav className="flex flex-col space-y-2">
          {tocItems.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className={cn(
                "text-sm transition-colors border-l-2 pl-3 py-1 -ml-px block",
                section.level > 1 && "ml-3 text-xs",
                activeSection === section.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
              )}
            >
              {section.title}
            </Link>
          ))}
        </nav>

        {tocDebug && (
          <div className="mt-6 rounded-md border border-dashed border-muted-foreground/40 bg-muted/20 p-3 text-[11px] text-muted-foreground">
            <div className="mb-2 font-semibold text-foreground">TOC Debug</div>
            <div className="space-y-1 font-mono">
              {tocItems.length === 0 && <div>(empty)</div>}
              {tocItems.map((item) => (
                <div key={`dbg-${item.id}`}>
                  L{item.level} #{item.id} — {item.title}
                </div>
              ))}
            </div>
            <div className="mt-2 text-[10px]">
              Hint: URL에 <code>?tocDebug=1</code>을 붙이면 표시됩니다.
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
