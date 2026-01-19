"use client";

import { Badge } from "@/components/ui/badge";

interface CTPIntroProps {
  category: string;
  title: string;
  description: string;
  tags?: string[];
}

export function CTPIntro({ category, title, description, tags = [] }: CTPIntroProps) {
  return (
    <section id="intro" className="space-y-4 border-b border-border/40 pb-8">
      <div className="flex items-center gap-2 text-sm text-primary font-mono mb-2">
        <span className="opacity-50">MODULE</span>
        <span className="opacity-50">/</span>
        <span className="uppercase">{category}</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight">{title}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
      {tags.length > 0 && (
        <div className="flex gap-2 pt-2">
          {tags.map((tag, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </section>
  );
}
