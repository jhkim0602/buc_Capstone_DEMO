"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { DFS_MODULES } from "./dfs-registry";
import { DfsOverview } from "./components/DfsOverview";

export default function DfsContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Algorithms"
        overview={<DfsOverview />}
        modules={DFS_MODULES}
      />
    </Suspense>
  );
}
