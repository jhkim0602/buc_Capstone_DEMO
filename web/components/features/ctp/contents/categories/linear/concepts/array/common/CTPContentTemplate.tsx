"use client";

import { useEffect } from "react";
import { useCTPStore } from "@/components/features/ctp/store/use-ctp-store";
import { CTPPlayground } from "@/components/features/ctp/playground/ctp-playground";

// Shared Components
import { CTPIntro } from "../../../../shared/ctp-intro";
import { CTPFeatures } from "../../../../shared/ctp-features";
import { CTPComplexity } from "../../../../shared/ctp-complexity";
import { CTPPractice } from "../../../../shared/ctp-practice";
import { CTPImplementation } from "../../../../shared/ctp-implementation";

export interface CTPConfig {
  title: string;
  description: string;
  tags: string[];
  features: { title: string; description: string }[];
  complexity: any;
  practiceProblems: any[];
  implementation: any[];
  initialCode: {
    python: string;
    javascript?: string;
    cpp?: string;
    java?: string;
  };
  commandReference: Record<string, { label: string; code: string }[]>;
}

interface CTPContentTemplateProps {
  config: CTPConfig;
  useSimulation: () => { runSimulation: (code: string) => void };
  Visualizer: React.ComponentType<any>;
}

export function CTPContentTemplate({ config, useSimulation, Visualizer }: CTPContentTemplateProps) {
  const { reset, steps, currentStepIndex, setCode } = useCTPStore();
  const { runSimulation } = useSimulation();

  const currentData = steps[currentStepIndex]?.data || [];

  // 1. Reset Store on Mount & Language Change
  useEffect(() => {
    reset();
    const code = config.initialCode.python; // Default to Python as store doesn't support language switch yet

    // Ensure runSimulation is stable or use it directly
    runSimulation(code);
    setCode(code);

    // Dependency Note: We use config.title (primitive) instead of config (object) to avoid infinite loops if config is re-created on render.
  }, [reset, setCode, runSimulation, config.title, config.initialCode]);

  return (
    <div className="space-y-12 pb-20 fade-in slide-in-from-bottom-4 duration-500 animate-in">
      {/* 1. Overview */}
      <CTPIntro
        category="Linear Data Structures"
        title={config.title}
        description={config.description}
        tags={config.tags}
      />

      {/* 2. Features */}
      <CTPFeatures features={config.features} />

      {/* 3. Visualizer */}
      <section id="visualization" className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">시각화 학습하기</h2>
        <p className="text-muted-foreground mb-4">
           아래 에디터에서 코드를 작성하고 실행하여 동작 원리를 직접 확인해보세요!
        </p>

        {/* Dynamic Command Reference Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
           {(config.commandReference[language as keyof typeof config.commandReference] || []).map((cmd, idx) => (
              <div key={idx} className="bg-muted/50 border border-border rounded px-3 py-2 flex flex-col justify-center">
                 <span className="text-[10px] text-muted-foreground font-semibold mb-0.5">{cmd.label}</span>
                 <code className="text-xs font-mono text-primary truncate" title={cmd.code}>{cmd.code}</code>
              </div>
           ))}
        </div>

        <CTPPlayground
          initialCode={config.initialCode.python}
          onRun={runSimulation}
          visualizer={
            <Visualizer
              data={currentData}
              emptyMessage="코드를 실행하여 시각화를 시작해보세요!"
              className="min-h-[300px]"
            />
          }
        />
      </section>

      {/* 4. Complexity */}
      <CTPComplexity data={config.complexity} />

      {/* 5. Implementation Code */}
      <CTPImplementation examples={config.implementation} />

      {/* 6. Practice Problems */}
      <CTPPractice problems={config.practiceProblems} />
    </div>
  );
}
