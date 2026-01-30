"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { BINARY_SEARCH_MODULES } from "./binary-search-registry";
import { BinarySearchOverview } from "./components/BinarySearchOverview";

export default function BinarySearchContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Algorithms"
        overview={<BinarySearchOverview />}
        modules={BINARY_SEARCH_MODULES}
      />
    </Suspense>
  );
}
