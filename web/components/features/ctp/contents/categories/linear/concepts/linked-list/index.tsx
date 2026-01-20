"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { LINKED_LIST_MODULES } from "./linked-list-registry";
import { LinkedListOverview } from "./components/LinkedListOverview";

export default function LinkedListContent() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading Loop...</div>}>
      <CTPContentController
        category="Linear Data Structures"
        overview={<LinkedListOverview />}
        modules={LINKED_LIST_MODULES}
      />
    </Suspense>
  );
}
