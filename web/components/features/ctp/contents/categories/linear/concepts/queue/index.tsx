"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { QueueOverview } from "./components/QueueOverview";
import { QUEUE_MODULES } from "./queue-registry";

export default function QueueContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Linear Data Structures"
        overview={<QueueOverview />}
        modules={QUEUE_MODULES}
      />
    </Suspense>
  );
}
