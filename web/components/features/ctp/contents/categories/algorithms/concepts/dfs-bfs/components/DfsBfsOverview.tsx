"use client";

import { CTPCategoryOverview, OverviewItem } from "@/components/features/ctp/contents/shared/ctp-category-overview";
import { Repeat } from "lucide-react";

export function DfsBfsOverview() {
  const CURRICULUM: OverviewItem[] = [
    {
      level: 1,
      id: "dfs-basics",
      title: "DFS 기본",
      description: "DFS / BFS 학습을 위한 핵심 챕터입니다.",
      pc_desc: "핵심 개념을 단계적으로 정리합니다.",
      icon: Repeat,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      level: 2,
      id: "bfs-basics",
      title: "BFS 기본",
      description: "DFS / BFS 학습을 위한 핵심 챕터입니다.",
      pc_desc: "핵심 개념을 단계적으로 정리합니다.",
      icon: Repeat,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      level: 3,
      id: "grid-traversal",
      title: "격자 탐색 응용",
      description: "DFS / BFS 학습을 위한 핵심 챕터입니다.",
      pc_desc: "핵심 개념을 단계적으로 정리합니다.",
      icon: Repeat,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    }
  ];

  return (
    <CTPCategoryOverview
      categoryName="Algorithms"
      title="DFS / BFS"
      subtitle="DFS / BFS Master Class"
      description={
        <span>
          DFS / BFS의 핵심 개념을 단계적으로 학습합니다. <br />
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
