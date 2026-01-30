"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { BFS_MODULES } from "./bfs-registry";
import { BfsOverview } from "./components/BfsOverview";

export default function BfsContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Algorithms"
        overview={<BfsOverview />}
        modules={BFS_MODULES}
      />
    </Suspense>
  );
}
