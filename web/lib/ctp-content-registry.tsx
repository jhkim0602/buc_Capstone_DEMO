import ArrayContent from "@/components/features/ctp/contents/categories/linear/concepts/array";
import LinkedListContent from "@/components/features/ctp/contents/categories/linear/concepts/linked-list";
import StackContent from "@/components/features/ctp/contents/categories/linear/concepts/stack";
import { ReactNode } from "react";

// Component Type
type ContentComponent = () => ReactNode;

export const CTP_CONTENT_REGISTRY: Record<string, ContentComponent | undefined> = {
  // Linear Data Structures
  "linear-ds/array": ArrayContent,
  "linear-ds/linked-list": LinkedListContent,
  "linear-ds/stack": StackContent,
};

export function getCtpContent(categoryId: string, conceptId: string) {
  const key = `${categoryId}/${conceptId}`;
  return CTP_CONTENT_REGISTRY[key];
}
