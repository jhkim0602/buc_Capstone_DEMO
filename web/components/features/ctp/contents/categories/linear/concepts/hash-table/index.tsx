"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { HASH_TABLE_MODULES } from "./hash-table-registry";
import { HashTableOverview } from "./components/HashTableOverview";

export default function HashTableContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Linear Data Structures"
        overview={<HashTableOverview />}
        modules={HASH_TABLE_MODULES}
      />
    </Suspense>
  );
}
