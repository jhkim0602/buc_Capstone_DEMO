import { ComponentType } from "react";

export interface CTPModuleConfig {
  title: string;
  description: string;
  tags?: string[];
  features?: { title: string; description: string }[];
  complexity?: {
    access: string;
    search: string;
    insertion: string;
    deletion: string;
  };
  practiceProblems?: any[]; // Replace with specific type if available
  implementation?: any[];   // Replace with specific type if available
  initialCode?: Record<string, string>;
  commandReference?: Record<string, { label: string; code: string }[]>;
  story?: {
    problem: string;      // "왜 이것이 필요한가?" (배경/문제 제기)
    definition: string;   // "교과서적 핵심 정의" (형식적 정의)
    analogy: string;      // "이것은 마치..." (일상 생활 비유)
    playgroundLimit?: string; // "아래에서 무엇을 해볼까요?" (Playground 실습 가이드)
  };
}

export interface CTPModule {
  config: CTPModuleConfig;
  useSim: () => { runSimulation: (code: string) => void };
  Visualizer: ComponentType<any>;
}

export type CTPModuleRegistry = Record<string, CTPModule>;

export interface VisualItem {
  id: string | number;
  value: string | number;
  isHighlighted?: boolean;
  label?: string; // Optional label (e.g., index or variable name)
}
