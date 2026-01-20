import { ComponentType } from "react";

// [NEW] Guidebook Interfaces
export interface GuideItem {
  label: string;
  code: string;
  description?: string;
  tags?: string[]; // e.g. ["Read-Only", "Pattern"]
  isEditable?: boolean;
}

export interface GuideSection {
  title: string;
  items: GuideItem[];
}

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
  practiceProblems?: any[];
  implementation?: any[];
  initialCode?: Record<string, string>;

  // Legacy
  commandReference?: Record<string, { label: string; code: string }[]>;

  // [NEW] Interactive Guide
  guide?: GuideSection[];

  story?: {
    problem: string;
    definition: string;
    analogy: string;
    playgroundLimit?: string;
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
