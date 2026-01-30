"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { TRIE_MODULES } from "./trie-registry";
import { TrieOverview } from "./components/TrieOverview";

export default function TrieContent() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CTPContentController
        category="Non-Linear Data Structures"
        overview={<TrieOverview />}
        modules={TRIE_MODULES}
      />
    </Suspense>
  );
}
