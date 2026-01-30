"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { TreeOverview } from "./components/TreeOverview";
import { TREE_MODULES } from "./tree-registry";

export default function TreeContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Non-Linear Data Structures"
        overview={<TreeOverview />}
        modules={TREE_MODULES}
      />
    </Suspense>
  );
}
