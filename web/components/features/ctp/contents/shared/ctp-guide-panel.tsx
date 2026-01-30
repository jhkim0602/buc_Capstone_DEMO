"use client";

import { GuideSection, GuideItem } from "../../common/types";
import { Copy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface CTPGuidePanelProps {
    guide: GuideSection[];
}

export function CTPGuidePanel({ guide }: CTPGuidePanelProps) {
    if (!guide || guide.length === 0) return null;

    return (
        <div className="bg-card/30">
            <ScrollArea className="max-h-[500px]">
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {guide.map((section, idx) => (
                        <div key={idx} className="space-y-3">
                            {/* Section Title */}
                            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                                <div className="h-4 w-1 bg-primary rounded-full"></div>
                                <h4 className="font-semibold text-sm text-foreground/90">{section.title}</h4>
                            </div>

                            {/* Items Grid */}
                            <div className="grid gap-3">
                                {section.items.map((item, i) => (
                                    <GuideItemCard key={i} item={item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

function GuideItemCard({ item }: { item: GuideItem }) {
    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(item.code);
        toast.success("클립보드에 복사되었습니다.", { duration: 1000 });
    };

    return (
        <div className="group relative border border-border/60 rounded-lg p-3 bg-background hover:bg-muted/10 hover:border-primary/20 transition-all">
            {/* Header: Label & Tags */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-foreground/90 flex items-center gap-1.5">
                    {item.label}
                </span>

                <div className="flex gap-1">
                    {item.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded text-muted-foreground bg-muted border font-mono">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Description */}
            {item.description && (
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                    {item.description}
                </p>
            )}

            {/* Code Block (Read-only) */}
            <div className="relative bg-muted/30 rounded border border-border/50 px-3 py-2 font-mono text-[11px] text-muted-foreground group-hover:text-foreground/90 transition-colors group-hover:bg-muted/50">
                <code className="block whitespace-pre-wrap">{item.code}</code>

                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="absolute right-2 top-2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-background/80 transition-all text-muted-foreground hover:text-primary"
                    title="코드 복사"
                >
                    <Copy className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}
