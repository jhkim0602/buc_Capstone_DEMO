"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { DP_MODULES } from "./dp-registry";
import { DynamicProgrammingOverview } from "./components/DynamicProgrammingOverview";

export default function DynamicProgrammingContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Algorithms"
        overview={<DynamicProgrammingOverview />}
        modules={DP_MODULES}
      />
    </Suspense>
  );
}
