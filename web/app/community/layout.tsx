"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MessageSquare, Users } from "lucide-react";
import { CommunitySidebar } from "@/components/features/community/community-sidebar";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Board",
      href: "/community/board",
      icon: MessageSquare,
      active: pathname?.startsWith("/community/board"),
    },
    {
      name: "Squad",
      href: "/community/squad",
      icon: Users,
      active: pathname?.startsWith("/community/squad"),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Community
            </h1>
            <p className="text-muted-foreground">
              개발자들의 소통, 성장, 그리고 실제 협업을 위한 공간입니다.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b">
          <nav className="flex gap-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  "flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors",
                  tab.active
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Content with Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content (3/4) */}
          <div className="lg:col-span-3 min-h-[500px]">{children}</div>

          {/* Sidebar (1/4) - Hidden on mobile if needed, or stacked */}
          <div className="hidden lg:block lg:col-span-1">
            <CommunitySidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
