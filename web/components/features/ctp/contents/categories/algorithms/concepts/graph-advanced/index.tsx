"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { GRAPH_ADVANCED_MODULES } from "./graph-advanced-registry";
import { AdvancedGraphOverview } from "./components/AdvancedGraphOverview";

export default function AdvancedGraphContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Algorithms"
        overview={<AdvancedGraphOverview />}
        modules={GRAPH_ADVANCED_MODULES}
      />
    </Suspense>
  );
}
