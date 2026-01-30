"use client";

import { CTPCategoryOverview, OverviewItem } from "@/components/features/ctp/contents/shared/ctp-category-overview";
import { Layers } from "lucide-react";

export function DynamicProgrammingOverview() {
  const CURRICULUM: OverviewItem[] = [
    {
      level: 1,
      id: "dp-basics",
      title: "DP 기본",
      description: "Dynamic Programming 학습을 위한 핵심 챕터입니다.",
      pc_desc: "핵심 개념을 단계적으로 정리합니다.",
      icon: Layers,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      level: 2,
      id: "dp-1d",
      title: "1차원 DP",
      description: "Dynamic Programming 학습을 위한 핵심 챕터입니다.",
      pc_desc: "핵심 개념을 단계적으로 정리합니다.",
      icon: Layers,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      level: 3,
      id: "dp-2d",
      title: "2차원 DP",
      description: "Dynamic Programming 학습을 위한 핵심 챕터입니다.",
      pc_desc: "핵심 개념을 단계적으로 정리합니다.",
      icon: Layers,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      level: 4,
      id: "dp-patterns",
      title: "대표 패턴 (LIS/Knapsack)",
      description: "Dynamic Programming 학습을 위한 핵심 챕터입니다.",
      pc_desc: "핵심 개념을 단계적으로 정리합니다.",
      icon: Layers,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    }
  ];

  return (
    <CTPCategoryOverview
      categoryName="Algorithms"
      title="Dynamic Programming"
      subtitle="Dynamic Programming Master Class"
      description={
        <span>
          Dynamic Programming의 핵심 개념을 단계적으로 학습합니다. <br />
          각 챕터는 교과서형 흐름으로 구성됩니다.
        </span>
      }
      guideItems={[
        "개념 → 시각화 → 코드 → 문제 풀이 흐름을 따라가세요.",
        "챕터 순서를 지키면 난이도가 자연스럽게 올라갑니다.",
      ]}
      items={CURRICULUM}
    />
  );
}
