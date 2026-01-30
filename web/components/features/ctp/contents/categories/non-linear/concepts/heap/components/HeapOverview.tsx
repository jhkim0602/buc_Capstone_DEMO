"use client";

import { CTPCategoryOverview, OverviewItem } from "@/components/features/ctp/contents/shared/ctp-category-overview";
import { ArrowDown, ArrowUp, Layers } from "lucide-react";

export function HeapOverview() {
  const CURRICULUM: OverviewItem[] = [
    {
      level: 1,
      id: "heap-basics",
      title: "Heap Basics",
      description: "힙 구조의 기본 성질과 배열 기반 표현을 학습합니다.",
      pc_desc: "부모-자식 인덱스 규칙을 이해합니다.",
      icon: Layers,
      color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    },
    {
      level: 2,
      id: "min-heap",
      title: "Min Heap",
      description: "항상 최솟값이 루트에 위치하는 힙을 학습합니다.",
      pc_desc: "Up-Heap/Down-Heap 과정을 익힙니다.",
      icon: ArrowDown,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    },
    {
      level: 3,
      id: "max-heap",
      title: "Max Heap",
      description: "최댓값이 루트에 위치하는 힙을 학습합니다.",
      pc_desc: "Priority Queue의 기반 구조를 이해합니다.",
      icon: ArrowUp,
      color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <CTPCategoryOverview
      categoryName="Non-Linear Data Structures"
      title="Heap"
      subtitle="Heap Master Class"
      description={
        <span>
          우선순위 기반 처리를 위한 핵심 자료구조, 힙(Heap)을 학습합니다. <br />
          배열로 구현되는 트리 구조와 정렬 특성을 시각적으로 이해하세요.
        </span>
      }
      guideItems={[
        "힙의 완전 이진 트리 성질과 인덱스 규칙을 먼저 이해하세요.",
        "Min/Max Heap의 차이를 비교하며 연산 과정을 확인하세요.",
      ]}
      items={CURRICULUM}
    />
  );
}
