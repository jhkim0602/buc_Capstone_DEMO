export type TagCategory =
  | "all"
  | "AI"
  | "Backend"
  | "Frontend"
  | "DevOps"
  | "Mobile"
  | "Data"
  | "Security";

// TagFilterOption interface defined here for clarity and export
export interface TagFilterOption {
  value: string;
  label: string;
  id: string; // Used by TagFilterBar
  tags: string[]; // Used by TagFilterBar
}

export const TAG_FILTER_OPTIONS: TagFilterOption[] = [
  { value: "all", label: "전체", id: "all", tags: [] },
  {
    value: "AI",
    label: "AI",
    id: "AI",
    tags: [
      "ai",
      "ai-ml",
      "llm",
      "genai",
      "gpt",
      "mlops",
      "nlp",
      "cv",
      "python",
      "tensorflow",
      "pytorch",
      "deep-learning",
      "machine-learning",
    ],
  },
  {
    value: "Backend",
    label: "Backend",
    id: "Backend",
    tags: [
      "backend",
      "java",
      "spring",
      "node",
      "nodejs",
      "nestjs",
      "python",
      "django",
      "go",
      "golang",
      "rust",
      "php",
      "laravel",
      "api",
      "database",
      "architecture",
      "system design",
      "scalability",
      "monorepo",
      "kafka",
      "elastic",
    ],
  },
  {
    value: "Frontend",
    label: "Frontend",
    id: "Frontend",
    tags: [
      "frontend",
      "javascript",
      "typescript",
      "react",
      "nextjs",
      "vue",
      "angular",
      "css",
      "html",
      "web",
      "ui/ux",
      "design",
      "micro frontend",
      "module federation",
    ],
  },
  {
    value: "DevOps",
    label: "DevOps",
    id: "DevOps",
    tags: [
      "devops",
      "cloud",
      "docker",
      "kubernetes",
      "aws",
      "gcp",
      "azure",
      "linux",
    ],
  },
  {
    value: "Mobile",
    label: "Mobile",
    id: "Mobile",
    tags: [
      "mobile",
      "ios",
      "android",
      "flutter",
      "react-native",
      "swift",
      "kotlin",
    ],
  },
  {
    value: "Data",
    label: "Data",
    id: "Data",
    tags: ["data", "sql", "mysql", "postgresql", "mongodb", "hadoop", "spark"],
  },
  {
    value: "Security",
    label: "Security",
    id: "Security",
    tags: ["security", "network", "blockchain"],
  },
];

export const CATEGORY_TAGS: Record<TagCategory, string[]> = {
  all: [],
  AI: [
    "ai",
    "ai-ml",
    "llm",
    "genai",
    "gpt",
    "mlops",
    "nlp",
    "cv",
    "python",
    "tensorflow",
    "pytorch",
    "deep-learning",
    "machine-learning",
  ],
  Backend: [
    "backend",
    "java",
    "spring",
    "node",
    "nodejs",
    "nestjs",
    "python",
    "django",
    "go",
    "golang",
    "rust",
    "php",
    "laravel",
    "api",
    "database",
    "architecture",
    "system design",
    "scalability",
    "monorepo",
    "kafka",
    "elastic",
  ],
  Frontend: [
    "frontend",
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "vue",
    "angular",
    "css",
    "html",
    "web",
    "ui/ux",
    "design",
    "micro frontend",
    "module federation",
  ],
  DevOps: [
    "devops",
    "cloud",
    "docker",
    "kubernetes",
    "aws",
    "gcp",
    "azure",
    "linux",
  ],
  Mobile: [
    "mobile",
    "ios",
    "android",
    "flutter",
    "react-native",
    "swift",
    "kotlin",
  ],
  Data: ["data", "sql", "mysql", "postgresql", "mongodb", "hadoop", "spark"],
  Security: ["security", "network", "blockchain"],
};

export function getTagsForCategory(category: TagCategory): string[] {
  if (category === "all") return [];
  return CATEGORY_TAGS[category] || [];
}
