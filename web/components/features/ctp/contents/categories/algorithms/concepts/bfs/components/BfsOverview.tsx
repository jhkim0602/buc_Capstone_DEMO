"use client";

import { CTPCategoryOverview, OverviewItem } from "@/components/features/ctp/contents/shared/ctp-category-overview";
import { Repeat } from "lucide-react";

export function BfsOverview() {
  const CURRICULUM: OverviewItem[] = [
    {
      level: 1,
      id: "bfs-basics",
      title: "BFS 기본",
      description: "BFS 학습을 위한 핵심 챕터입니다.",
      pc_desc: "핵심 개념을 단계적으로 정리합니다.",
      icon: Repeat,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      level: 2,
      id: "grid-traversal",
      title: "격자 탐색 응용",
      description: "BFS 응용을 위한 핵심 챕터입니다.",
      pc_desc: "핵심 개념을 단계적으로 정리합니다.",
      icon: Repeat,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      level: 3,
      id: "bfs-multi-source",
      title: "멀티 소스 BFS",
      description: "여러 시작점에서 동시에 확장합니다.",
      pc_desc: "핵심 개념을 단계적으로 정리합니다.",
      icon: Repeat,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      level: 4,
      id: "bfs-zero-one",
      title: "0-1 BFS",
      description: "가중치 0/1 그래프의 최단 경로.",
      pc_desc: "핵심 개념을 단계적으로 정리합니다.",
      icon: Repeat,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      level: 5,
      id: "bfs-path-reconstruction",
      title: "BFS 경로 복원",
      description: "parent 배열로 최단 경로를 복원합니다.",
      pc_desc: "핵심 개념을 단계적으로 정리합니다.",
      icon: Repeat,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    }
  ];

  return (
    <CTPCategoryOverview
      categoryName="Algorithms"
      title="BFS"
      subtitle="BFS Master Class"
      description={
        <span>
          BFS의 핵심 개념을 단계적으로 학습합니다. <br />
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
