"use client";

import { CTPCategoryOverview, OverviewItem } from "@/components/features/ctp/contents/shared/ctp-category-overview";
import { ArrowLeftRight } from "lucide-react";

export function ShortestPathOverview() {
  const CURRICULUM: OverviewItem[] = [
    {
      level: 1,
      id: "dijkstra",
      title: "다익스트라 (Dijkstra)",
      description: "Shortest Path 학습을 위한 핵심 챕터입니다.",
      pc_desc: "핵심 개념을 단계적으로 정리합니다.",
      icon: ArrowLeftRight,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      level: 2,
      id: "floyd-warshall",
      title: "플로이드-워셜",
      description: "Shortest Path 학습을 위한 핵심 챕터입니다.",
      pc_desc: "핵심 개념을 단계적으로 정리합니다.",
      icon: ArrowLeftRight,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    }
  ];

  return (
    <CTPCategoryOverview
      categoryName="Algorithms"
      title="Shortest Path"
      subtitle="Shortest Path Master Class"
      description={
        <span>
          Shortest Path의 핵심 개념을 단계적으로 학습합니다. <br />
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
