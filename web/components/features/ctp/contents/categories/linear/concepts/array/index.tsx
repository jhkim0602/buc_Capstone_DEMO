"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { ARRAY_MODULES } from "./array-registry";
import { ArrayOverview } from "./components/ArrayOverview";

export default function ArrayContent() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading content...</div>}>
      <CTPContentController
        category="Linear Data Structures"
        overview={<ArrayOverview />}
        modules={ARRAY_MODULES}
      />
    </Suspense>
  );
}
