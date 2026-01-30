"use client";

import { CTPCategoryOverview, OverviewItem } from "@/components/features/ctp/contents/shared/ctp-category-overview";
import { GitBranch, Shuffle, Binary, ArrowRightLeft } from "lucide-react";

export function TreeOverview() {
  const CURRICULUM: OverviewItem[] = [
    {
      level: 1,
      id: "tree-basics",
      title: "트리 기본 (Tree Basics)",
      description: "계층 구조의 핵심 개념과 용어를 정리합니다.",
      pc_desc: "루트/부모/자식/리프 개념을 정확히 이해합니다.",
      icon: GitBranch,
      color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    },
    {
      level: 2,
      id: "binary-traversal",
      title: "이진 트리 순회 (Traversal)",
      description: "전위/중위/후위 순회 흐름을 학습합니다.",
      pc_desc: "재귀/스택 기반 순회 패턴을 비교합니다.",
      icon: Shuffle,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    },
    {
      level: 3,
      id: "bst",
      title: "이진 탐색 트리 (BST)",
      description: "정렬 특성을 가진 트리 구조를 다룹니다.",
      pc_desc: "삽입/탐색/삭제 규칙을 체득합니다.",
      icon: Binary,
      color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <CTPCategoryOverview
      categoryName="Non-Linear Data Structures"
      title="Tree"
      subtitle="Tree Master Class"
      description={
        <span>
          계층형 데이터를 표현하는 가장 기본적인 구조입니다. <br />
          파일 시스템, 조직도, 탐색 구조 등 다양한 문제의 기반이 됩니다.
        </span>
      }
      guideItems={[
        "트리 기본 용어를 먼저 정리하고 구조적 관점을 익힙니다.",
        "순회 방식을 통해 트리 데이터를 나열하는 패턴을 이해합니다.",
        "BST의 정렬 성질을 통해 탐색/삽입의 규칙을 연결합니다.",
      ]}
      items={CURRICULUM}
    />
  );
}
