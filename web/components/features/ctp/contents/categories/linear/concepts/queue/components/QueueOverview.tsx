"use client";

import { CTPCategoryOverview, OverviewItem } from "@/components/features/ctp/contents/shared/ctp-category-overview";
import { ListOrdered, Repeat, ArrowLeftRight, Crown } from "lucide-react";

export function QueueOverview() {
  const CURRICULUM: OverviewItem[] = [
    {
      level: 1,
      id: "linear-queue",
      title: "선형 큐 (Linear Queue)",
      description: "FIFO 원리를 버튼 기반 시뮬레이터로 체험합니다.",
      pc_desc: "Front/Rear 이동과 Dead Space를 직접 확인합니다.",
      icon: ListOrdered,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    },
    {
      level: 2,
      id: "circular-queue",
      title: "원형 큐 (Circular Queue)",
      description: "배열 공간을 재활용하는 원형 큐를 구현합니다.",
      pc_desc: "모듈로 연산과 wrap-around 동작을 이해합니다.",
      icon: Repeat,
      color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
    },
    {
      level: 3,
      id: "deque",
      title: "덱 (Deque)",
      description: "양쪽 삽입/삭제가 가능한 만능 구조를 다룹니다.",
      pc_desc: "Queue/Stack 역할을 동시에 수행하는 구조를 이해합니다.",
      icon: ArrowLeftRight,
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    },
    {
      level: 4,
      id: "pq-basics",
      title: "우선순위 큐 기초 (Priority Queue)",
      description: "FIFO가 아닌 우선순위 기반 처리 방식을 학습합니다.",
      pc_desc: "정렬 기반 PQ 동작과 사용 맥락을 연결합니다.",
      icon: Crown,
      color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <CTPCategoryOverview
      title="Queue & Deque"
      subtitle="Queue & Deque Master Class"
      description={
        <span>
          데이터가 들어온 순서대로 처리하는 FIFO 구조입니다. <br />
          운영체제의 스케줄링부터 BFS, 캐시 설계까지 핵심 기반이 됩니다.
        </span>
      }
      guideItems={[
        "개념 잡기: 선형 큐의 Dead Space 문제를 먼저 이해합니다.",
        "구현 비교: 원형 큐와 덱의 포인터 규칙을 비교합니다.",
        "응용 연결: 우선순위 큐로 스케줄링/최단경로 문제를 연결합니다.",
      ]}
      items={CURRICULUM}
    />
  );
}
