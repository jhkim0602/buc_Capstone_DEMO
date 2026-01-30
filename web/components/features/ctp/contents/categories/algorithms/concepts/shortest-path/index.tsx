"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { SHORTEST_PATH_MODULES } from "./shortest-path-registry";
import { ShortestPathOverview } from "./components/ShortestPathOverview";

export default function ShortestPathContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Algorithms"
        overview={<ShortestPathOverview />}
        modules={SHORTEST_PATH_MODULES}
      />
    </Suspense>
  );
}
