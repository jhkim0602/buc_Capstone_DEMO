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
        <main className="max-w-4xl mx-auto px-6 py-12 md:px-10 md:py-12">
          {children}
        </main>
      </div>

      {/* 4. On This Page (TOC) */}
      <CTPRightSidebar />
    </div>
  );
}
