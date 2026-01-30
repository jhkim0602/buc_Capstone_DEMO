"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { HEAP_MODULES } from "./heap-registry";
import { HeapOverview } from "./components/HeapOverview";

export default function HeapContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Non-Linear Data Structures"
        overview={<HeapOverview />}
        modules={HEAP_MODULES}
      />
    </Suspense>
  );
}
