"use client";

import { useEffect } from "react";
import { useCTPStore } from "@/components/features/ctp/store/use-ctp-store";
import { CTPPlayground } from "@/components/features/ctp/playground/ctp-playground";
import { LinearVisualizer } from "@/components/features/ctp/playground/visualizers/linear-visualizer";

// Shared Components
import { CTPIntro } from "../../shared/ctp-intro";
import { CTPFeatures } from "../../shared/ctp-features";
import { CTPComplexity } from "../../shared/ctp-complexity";
import { CTPPractice } from "../../shared/ctp-practice";
import { CTPImplementation } from "../../shared/ctp-implementation";

// Logic & Config
import { ARRAY_CONFIG } from "./array.config";
import { useArraySimulation } from "./use-array-simulation";

export default function ArrayContent() {
  const { reset, steps, currentStepIndex, language, setCode } = useCTPStore();
  const { runSimulation } = useArraySimulation();

  const currentData = steps[currentStepIndex]?.data || [];

  // 1. Reset Store on Mount
  useEffect(() => {
    reset();
    runSimulation(ARRAY_CONFIG.initialCode.python); // Start with default code
    setCode(ARRAY_CONFIG.initialCode.python);
  }, [reset, setCode]); // Added runSimulation to deps if it's stable, otherwise exclude or memoize hook

  // 2. Handle Language Change
  useEffect(() => {
     // Use type assertion or check if language is key of initialCode
     const code = ARRAY_CONFIG.initialCode[language as keyof typeof ARRAY_CONFIG.initialCode] || ARRAY_CONFIG.initialCode.python;
     setCode(code);
  }, [language, setCode]);


  return (
    <div className="space-y-12 pb-20">
      {/* 1. Overview */}
      <CTPIntro
        category="Linear Data Structures"
        title={ARRAY_CONFIG.title}
        description={ARRAY_CONFIG.description}
        tags={ARRAY_CONFIG.tags}
      />

      {/* 2. Features */}
      <CTPFeatures features={ARRAY_CONFIG.features} />

      {/* 3. Visualizer */}
      <section id="visualization" className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">시각화 학습하기</h2>
        <p className="text-muted-foreground mb-4">
           아래 에디터에서 코드를 작성하고 실행하여 배열의 동작 원리를 직접 확인해보세요!
        </p>

        {/* Dynamic Command Reference Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
           {(ARRAY_CONFIG.commandReference[language as keyof typeof ARRAY_CONFIG.commandReference] || []).map((cmd, idx) => (
              <div key={idx} className="bg-muted/50 border border-border rounded px-3 py-2 flex flex-col justify-center">
                 <span className="text-[10px] text-muted-foreground font-semibold mb-0.5">{cmd.label}</span>
                 <code className="text-xs font-mono text-primary truncate" title={cmd.code}>{cmd.code}</code>
              </div>
           ))}
        </div>

        <CTPPlayground
          initialCode={ARRAY_CONFIG.initialCode.python}
          onRun={runSimulation}
          visualizer={
            <LinearVisualizer
              data={currentData}
              emptyMessage="코드를 실행하여 시각화를 시작해보세요!"
            />
          }
        />
      </section>

      {/* 4. Complexity */}
      <CTPComplexity data={ARRAY_CONFIG.complexity} />

      {/* 5. Implementation Code */}
      <CTPImplementation examples={ARRAY_CONFIG.implementation} />

      {/* 6. Practice Problems */}
      <CTPPractice problems={ARRAY_CONFIG.practiceProblems} />
    </div>
  );
}
