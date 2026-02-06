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

<<<<<<< HEAD
export interface CTPImplementationExample {
  language: 'python';
  description?: string;
  code: string;
}

export interface CTPPracticeProblem {
  id: number;
  title: string;
  tier: string;
  description: string;
  link?: string;
}

=======
>>>>>>> origin/feature/interview
export interface CTPModuleConfig {
  title: string;
  description: string;
  mode?: 'code' | 'interactive'; // Default: 'code'
  interactive?: {
<<<<<<< HEAD
    components: ('push' | 'pop' | 'peek' | 'reset' | 'pushFront' | 'pushRear' | 'popFront' | 'popRear')[];
=======
    components: ('push' | 'pop' | 'peek')[];
>>>>>>> origin/feature/interview
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
<<<<<<< HEAD
  practiceProblems?: CTPPracticeProblem[];
  implementation?: CTPImplementationExample[];
  initialCode?: {
    python: string;
  };
 
  showStatePanel?: boolean;
  statePanelMode?: "summary" | "full";
=======
  practiceProblems?: any[];
  implementation?: any[];
  initialCode?: Record<string, string>;

  // Legacy
  commandReference?: Record<string, { label: string; code: string }[]>;
>>>>>>> origin/feature/interview

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
  useSim: () => {
    runSimulation: (code: string) => void;
    interactive?: {
      visualData: any;
      edges?: { source: string; target: string; label?: string }[];
      logs?: string[];
      handlers: Record<string, () => void>;
    };
  };
  Visualizer: ComponentType<any>;
}

export type CTPModuleRegistry = Record<string, CTPModule>;

export interface VisualItem {
  id: string | number;
  value: string | number | null;
  isHighlighted?: boolean;
  label?: string; // Optional label (e.g., index or variable name)
  isGhost?: boolean; // For capacity visualization etc.
<<<<<<< HEAD
  status?: 'active' | 'comparing' | 'pop' | 'success' | 'visited' | 'found'; // [NEW] For detailed algorithm states
=======
  status?: 'active' | 'comparing' | 'pop' | 'success'; // [NEW] For detailed algorithm states
>>>>>>> origin/feature/interview
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
