import ArrayContent from "@/components/features/ctp/contents/categories/linear/concepts/array";
import LinkedListContent from "@/components/features/ctp/contents/categories/linear/concepts/linked-list";
import StackContent from "@/components/features/ctp/contents/categories/linear/concepts/stack";
import QueueContent from "@/components/features/ctp/contents/categories/linear/concepts/queue";
import HashTableContent from "@/components/features/ctp/contents/categories/linear/concepts/hash-table";
import TreeContent from "@/components/features/ctp/contents/categories/non-linear/concepts/tree";
import HeapContent from "@/components/features/ctp/contents/categories/non-linear/concepts/heap";
import GraphContent from "@/components/features/ctp/contents/categories/non-linear/concepts/graph";
import SortingContent from "@/components/features/ctp/contents/categories/algorithms/concepts/sorting";
import BinarySearchContent from "@/components/features/ctp/contents/categories/algorithms/concepts/binary-search";
import DfsContent from "@/components/features/ctp/contents/categories/algorithms/concepts/dfs";
import BfsContent from "@/components/features/ctp/contents/categories/algorithms/concepts/bfs";
import ShortestPathContent from "@/components/features/ctp/contents/categories/algorithms/concepts/shortest-path";
import GraphAdvancedContent from "@/components/features/ctp/contents/categories/algorithms/concepts/graph-advanced";
import DpContent from "@/components/features/ctp/contents/categories/algorithms/concepts/dp";
import { ReactNode } from "react";

// Component Type
type ContentComponent = () => ReactNode;

export const CTP_CONTENT_REGISTRY: Record<string, ContentComponent | undefined> = {
  // Linear Data Structures
  "linear-ds/array": ArrayContent,
  "linear-ds/linked-list": LinkedListContent,
  "linear-ds/stack": StackContent,
  "linear-ds/queue": QueueContent,
  "linear-ds/hash-table": HashTableContent,

  // Non-Linear Data Structures
  "non-linear-ds/tree": TreeContent,
  "non-linear-ds/heap": HeapContent,
  "non-linear-ds/graph": GraphContent,

  // Algorithms
  "algorithms/sorting": SortingContent,
  "algorithms/binary-search": BinarySearchContent,
  "algorithms/dfs": DfsContent,
  "algorithms/bfs": BfsContent,
  "algorithms/shortest-path": ShortestPathContent,
  "algorithms/graph-advanced": GraphAdvancedContent,
  "algorithms/dp": DpContent,

};

export function getCtpContent(categoryId: string, conceptId: string) {
  const key = `${categoryId}/${conceptId}`;
  return CTP_CONTENT_REGISTRY[key];
}
