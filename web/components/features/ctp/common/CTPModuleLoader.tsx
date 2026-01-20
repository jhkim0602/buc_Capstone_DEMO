"use client";

import { useEffect } from "react";
import { CTPModule } from "./types";
import { useCTPStore } from "../store/use-ctp-store";
import { CTPIntro } from "../contents/shared/ctp-intro";
import { CTPFeatures } from "../contents/shared/ctp-features";
import { CTPComplexity } from "../contents/shared/ctp-complexity";
import { CTPPractice } from "../contents/shared/ctp-practice";
import { CTPImplementation } from "../contents/shared/ctp-implementation";
import { CTPPlayground } from "../playground/ctp-playground";

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
        category={category}
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

        {/* Dynamic Command Reference Grid */}
        {config.commandReference && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {(config.commandReference.python || config.commandReference.global || []).map((cmd: any, idx: number) => (
              <div key={idx} className="bg-muted/50 border border-border rounded px-3 py-2 flex flex-col justify-center">
                <span className="text-[10px] text-muted-foreground font-semibold mb-0.5">{cmd.label}</span>
                <code className="text-xs font-mono text-primary truncate" title={cmd.code}>{cmd.code}</code>
              </div>
            ))}
          </div>
        )}

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
