"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { GRAPH_MODULES } from "./graph-registry";
import { GraphOverview } from "./components/GraphOverview";

export default function GraphContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Non-Linear Data Structures"
        overview={<GraphOverview />}
        modules={GRAPH_MODULES}
      />
    </Suspense>
  );
}
