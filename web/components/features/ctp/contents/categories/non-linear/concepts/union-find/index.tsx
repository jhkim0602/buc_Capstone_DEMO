"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { UNION_FIND_MODULES } from "./union-find-registry";
import { UnionFindOverview } from "./components/UnionFindOverview";

export default function UnionFindContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Non-Linear Data Structures"
        overview={<UnionFindOverview />}
        modules={UNION_FIND_MODULES}
      />
    </Suspense>
  );
}
