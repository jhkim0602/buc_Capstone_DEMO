"use client";

import { CTPRightSidebar } from "./ctp-right-sidebar";
import { CTPSidebar } from "./ctp-sidebar";
import { CTPSubSidebar } from "./ctp-sub-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PanelLeftOpen } from "lucide-react";

interface CTPWikiLayoutProps {
  children: React.ReactNode;
}

export function CTPWikiLayout({ children }: CTPWikiLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* 1. Global Navigation (Curriculum Tree) */}
      <CTPSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* 2. Local Navigation (Concept Sub-topics) */}
      <CTPSubSidebar
        isMainSidebarOpen={isSidebarOpen}
        onOpenMainSidebar={() => setIsSidebarOpen(true)}
      />

      {/* 3. Main Content Area */}
      <div className="flex-1 min-w-0 relative">
        <main className="w-full max-w-7xl mx-auto px-4 py-8 md:px-8 md:py-10">
          {children}
        </main>
      </div>

      {/* 4. On This Page (TOC) */}
      <CTPRightSidebar />
    </div>
  );
}
