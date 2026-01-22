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
  mode?: 'code' | 'interactive'; // Default: 'code'
  interactive?: {
    components: ('push' | 'pop' | 'peek')[];
    maxSize?: number;
  };
  tags?: string[];
  features?: { title: string; description: string }[];
  complexity?: {
    access: string;
    search: string;
    insertion: string;
    deletion: string;
  };
  complexityNames?: {
    access?: string;
    search?: string;
    insertion?: string;
    deletion?: string;
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
    playgroundDescription?: string;
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
  value: string | number | null;
  isHighlighted?: boolean;
  label?: string; // Optional label (e.g., index or variable name)
  isGhost?: boolean; // For capacity visualization etc.
  status?: 'active' | 'comparing' | 'pop' | 'success'; // [NEW] For detailed algorithm states
}


export type LinearItem = VisualItem;
export type GridItem = VisualItem;

export interface LinkedListNode {
  id: string | number;
  value: any;
  nextId?: string | number | null;
  prevId?: string | number | null;
  label?: string; // e.g. "Head", "Curr"
  isHighlighted?: boolean;
  isNull?: boolean;
}
