import ArrayContent from "@/components/features/ctp/contents/linear-ds/array-content";
import { ReactNode } from "react";

// Component Type
type ContentComponent = () => ReactNode;

export const CTP_CONTENT_REGISTRY: Record<string, ContentComponent | undefined> = {
  // Linear Data Structures
  "linear-ds/array": ArrayContent,
  // Future mappings...
  // "linear-ds/stack": StackContent,
};

export function getCtpContent(categoryId: string, conceptId: string) {
  const key = `${categoryId}/${conceptId}`;
  return CTP_CONTENT_REGISTRY[key];
}
