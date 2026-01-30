"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { SORTING_MODULES } from "./sorting-registry";
import { SortingOverview } from "./components/SortingOverview";

export default function SortingContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Algorithms"
        overview={<SortingOverview />}
        modules={SORTING_MODULES}
      />
    </Suspense>
  );
}
