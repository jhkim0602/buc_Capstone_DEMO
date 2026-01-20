"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CTPModule } from "./types";
import { useCTPStore } from "../store/use-ctp-store";
import { CTPIntro } from "../contents/shared/ctp-intro";
import { CTPFeatures } from "../contents/shared/ctp-features";
import { CTPComplexity } from "../contents/shared/ctp-complexity";
import { CTPPractice } from "../contents/shared/ctp-practice";
import { CTPImplementation } from "../contents/shared/ctp-implementation";
import { CTPPlayground } from "../playground/ctp-playground";
import { CTPGuidePanel } from "../contents/shared/ctp-guide-panel";

interface CTPModuleLoaderProps {
  module: CTPModule;
  category?: string;
  activeKey: string;
}

export function CTPModuleLoader({ module, category, activeKey }: CTPModuleLoaderProps) {
  const { config, useSim, Visualizer } = module;
  const { runSimulation } = useSim();
  const { reset, steps, currentStepIndex, setCode } = useCTPStore();

  // Reset & Init Simulation when Module Changes
  useEffect(() => {
    reset();
    if (config.initialCode) {
      const code = config.initialCode.python || "";
      setCode(code);
      // Run simulation with a small delay to ensure state reset is processed if async (rare but safe)
      // or just call it directly.
      runSimulation(code);
    }

    // Cleanup: Reset store when module unmounts/switches to prevent stale data in next module
    return () => {
      reset();
    };
  }, [activeKey, config, reset, setCode, runSimulation]);

  const currentData = steps[currentStepIndex]?.data || [];

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Overview */}
      <CTPIntro
        category={category || ""}
        title={config.title || "Untitled"}
        description={config.description || ""}
        tags={config.tags || []}
        story={config.story}
      />

      {/* 2. Features */}
      {config.features && <CTPFeatures features={config.features} />}

      {/* 3. Visualizer */}
      <section id="visualization" className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">시각화 학습하기</h2>
        <p className="text-muted-foreground mb-4">
          아래 에디터에서 코드를 작성하고 실행하여 자료구조의 동작 원리를 확인해보세요!
        </p>

        {/* [NEW] Interactive Guide Layout */}
        <div className="flex flex-col gap-6">
          {/* Main Visualizer & Editor Area */}
          <div className="w-full">
            <CTPPlayground
              initialCode={config.initialCode?.python ?? ""}
              onRun={runSimulation}
              visualizer={
                <Visualizer
                  data={currentData}
                  emptyMessage="코드를 실행하여 시각화를 시작해보세요!"
                />
              }
            />
          </div>

          {/* Guide Panel (Bottom Toggle) */}
          {config.guide && (
            <div className="w-full">
              <GuideToggleSection guide={config.guide} />
            </div>
          )}
        </div>
      </section>

      {/* 4. Complexity */}
      {config.complexity && <CTPComplexity data={config.complexity} />}

      {/* 5. Implementation Code */}
      {config.implementation && <CTPImplementation examples={config.implementation} />}

      {/* 6. Practice Problems */}
      {config.practiceProblems && <CTPPractice problems={config.practiceProblems} />}
    </div>
  );
}

function GuideToggleSection({ guide }: { guide: import("./types").GuideSection[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg bg-card shadow-sm overflow-hidden">
      <Button
        variant="ghost"
        className="w-full flex items-center justify-between p-4 h-auto hover:bg-muted/40 rounded-none from-muted/10 to-transparent bg-gradient-to-r"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Lightbulb className="w-4 h-4 text-primary" />
          </div>
          <div className="text-left flex flex-col">
            <span className="font-bold text-sm text-foreground/90">Playground Guide & Patterns</span>
            <span className="text-xs text-muted-foreground font-normal">
              {isOpen ? "가이드 접기" : "자주 쓰는 코드 패턴과 설명 보기"}
            </span>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t"
          >
            <div className="p-1 bg-muted/5">
              <CTPGuidePanel guide={guide} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
