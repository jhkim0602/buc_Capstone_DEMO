"use client";

import { Suspense } from "react";
import { CTPContentController } from "@/components/features/ctp/common/CTPContentController";
import { STACK_MODULES } from "./stack-registry";
import { StackOverview } from "./components/StackOverview";

export default function StackContent() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading content...</div>}>
            <CTPContentController
                category="Linear Data Structures"
                overview={<StackOverview />}
                modules={STACK_MODULES}
            />
        </Suspense>
    );
}
