"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";
import React from "react";

const LABELS: Record<string, string> = {
  push: "Push",
  pop: "Pop",
  peek: "Peek",
  reset: "Reset",
  pushFront: "Push Front",
  pushRear: "Push Rear",
  popFront: "Pop Front",
  popRear: "Pop Rear",
};

const VARIANTS: Record<string, "default" | "secondary" | "outline"> = {
  push: "default",
  pushFront: "default",
  pushRear: "default",
  pop: "secondary",
  popFront: "secondary",
  popRear: "secondary",
  peek: "outline",
  reset: "outline",
};

interface InteractiveRuntime {
  visualData: any;
  edges?: { source: string; target: string; label?: string }[];
  logs?: string[];
  handlers: Record<string, () => void>;
}

interface CTPInteractiveModuleProps {
  components: string[];
  runtime: InteractiveRuntime;
  Visualizer: React.ComponentType<any>;
  maxSize?: number;
  emptyMessage?: string;
}

export function CTPInteractiveModule({
  components,
  runtime,
  Visualizer,
  maxSize,
  emptyMessage = "데이터를 추가해보세요.",
}: CTPInteractiveModuleProps) {
  const logs = runtime.logs || [];

  const getHandler = (key: string) => {
    if (runtime.handlers[key]) return runtime.handlers[key];
    if (key === "reset" && runtime.handlers.clear) return runtime.handlers.clear;
    return undefined;
  };

  return (
    <div className="flex flex-col lg:flex-row h-[600px] border rounded-xl overflow-hidden shadow-sm bg-background">
      <div className="flex-1 bg-muted/10 relative border-r">
        <Visualizer
          data={runtime.visualData}
          edges={runtime.edges}
          maxSize={maxSize}
          emptyMessage={emptyMessage}
        />
      </div>

      <div className="w-full lg:w-[320px] bg-card p-6 flex flex-col gap-6">
        <div>
          <h3 className="font-bold text-lg mb-2">Operation Panel</h3>
          <p className="text-sm text-muted-foreground">버튼을 눌러 동작을 확인하세요.</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {components.map((key) => {
            const handler = getHandler(key);
            if (!handler) return null;

            return (
              <Button
                key={key}
                onClick={handler}
                variant={VARIANTS[key] || "default"}
                className="w-full justify-start text-base"
                size="lg"
              >
                {LABELS[key] || key}
              </Button>
            );
          })}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Console Log</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={runtime.handlers.clear || runtime.handlers.reset}
              className="h-6 text-xs text-muted-foreground hover:text-destructive"
            >
              <RotateCcw className="w-3 h-3 mr-1" /> Reset
            </Button>
          </div>
          <Card className="bg-slate-950 text-slate-300 font-mono text-xs p-3 h-40 overflow-hidden shadow-inner border-0">
            <div className="h-full pr-3 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {logs.length === 0 ? (
                <span className="text-slate-600 italic">Ready...</span>
              ) : (
                <div className="flex flex-col gap-1">
                  {logs.map((log, i) => (
                    <div key={i} className="break-all">
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
