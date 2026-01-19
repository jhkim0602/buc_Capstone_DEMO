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
      "python",
      "go",
      "php",
      "django",
      "express",
      "nest",
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
      "vue",
      "nextjs",
      "css",
      "html",
      "angular",
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
    "python",
    "go",
    "php",
    "django",
    "express",
    "nest",
  ],
  Frontend: [
    "frontend",
    "javascript",
    "typescript",
    "react",
    "vue",
    "nextjs",
    "css",
    "html",
    "angular",
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
