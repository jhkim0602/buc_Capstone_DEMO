"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { DFS_BFS_MODULES } from "./dfs-bfs-registry";
import { DfsBfsOverview } from "./components/DfsBfsOverview";

export default function DfsBfsContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Algorithms"
        overview={<DfsBfsOverview />}
        modules={DFS_BFS_MODULES}
      />
    </Suspense>
  );
}
