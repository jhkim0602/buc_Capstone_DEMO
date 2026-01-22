"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, LucideIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export interface OverviewItem {
    level: number;
    id: string;
    title: string;
    description: string;
    pc_desc: string;
    icon: LucideIcon;
    color: string;
}

interface CTPCategoryOverviewProps {
    categoryName?: string;
    title: string;
    subtitle?: string; // e.g. "Array Master Class"
    description: ReactNode;
    guideItems: string[]; // List of strings for the guide section
    items: OverviewItem[];
}

export function CTPCategoryOverview({
    categoryName = "Linear Data Structures",
    title,
    subtitle,
    description,
    guideItems,
    items
}: CTPCategoryOverviewProps) {
    return (
        <div className="space-y-10 pb-20 animate-in fade-in duration-500">
            {/* 1. Hero Section */}
            <section className="text-center space-y-4 py-8">
                <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">{categoryName}</Badge>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                    {subtitle || title}
                </h1>
                <div className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    {description}
                </div>
            </section>

            {/* 2. Guide Section */}
            <section className="bg-muted/30 rounded-2xl p-6 border border-border/50 max-w-4xl mx-auto">
                <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    학습 가이드
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                    {guideItems.map((guide, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                            <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                {idx + 1}
                            </span>
                            <span>{guide}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* 3. Curriculum Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <Link key={item.id} href={`?view=${item.id}`} className="group block h-full">
                        <Card className="h-full border-2 border-border/40 hover:border-primary/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
                                <item.icon className="w-24 h-24" />
                            </div>

                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div className={`p-2.5 rounded-xl ${item.color}`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <Badge variant="outline" className="font-mono text-xs opacity-50">
                                        Lv.{item.level}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                    {item.title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {item.description}
                                </p>
                                <div className="bg-muted/50 p-3 rounded-lg text-xs font-medium text-foreground/80 flex items-start gap-2">
                                    <span className="text-primary">💡</span>
                                    {item.pc_desc}
                                </div>
                            </CardContent>

                            <CardFooter className="pt-2">
                                <div className="w-full text-right text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all flex items-center justify-end gap-1 translate-x-2 group-hover:translate-x-0">
                                    Start Learning <ArrowRight className="w-4 h-4" />
                                </div>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
