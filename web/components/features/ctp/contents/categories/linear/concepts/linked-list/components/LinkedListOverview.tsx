"use client";

import { CTPCategoryOverview, OverviewItem } from "@/components/features/ctp/contents/shared/ctp-category-overview";
import { Link as LinkIcon, ArrowLeftRight, Repeat, MousePointer2 } from "lucide-react";

export function LinkedListOverview() {
  const CURRICULUM: OverviewItem[] = [
    {
      level: 1,
      id: "singly",
      title: "Singly Linked List",
      description: "데이터가 메모리 곳곳에 흩어져 있어도, '다음 위치'만 알면 찾아갈 수 있습니다.",
      pc_desc: "보물찾기 쪽지처럼 꼬리에 꼬리를 무는 연결 구조를 배웁니다.",
      icon: LinkIcon,
      color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
    },
    {
      level: 2,
      id: "doubly",
      title: "Doubly Linked List",
      description: "앞뒤로 자유롭게 오갈 수 있는 '양방향' 유연함을 가집니다.",
      pc_desc: "이전(Prev) 포인터를 추가하여 뒤로 가기 기능을 구현합니다.",
      icon: ArrowLeftRight,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      level: 3,
      id: "circular",
      title: "Circular Linked List",
      description: "끝나는 곳에서 다시 시작하는, 멈추지 않는 고리(Cycle) 형태입니다.",
      pc_desc: "무한 루프와 라운드 로빈 스케줄링의 원리를 이해합니다.",
      icon: Repeat,
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
    },
    {
      level: 4,
      id: "two-pointers",
      title: "Two Pointers (심화)",
      description: "두 개의 포인터(Fast & Slow)로 알고리즘의 차원을 높입니다.",
      pc_desc: "토끼와 거북이 알고리즘으로 사이클과 중간값을 한 번에 찾습니다.",
      icon: MousePointer2,
      color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
    }
  ];

  return (
    <CTPCategoryOverview
      title="Linked List"
      subtitle="Linked List Master Class"
      description={
        <span>
          흩어진 데이터들을 하나로 잇습니다. <br />
          포인터(Pointer)의 흐름을 자유자재로 다루는 메모리 마술사가 되어보세요.
        </span>
      }
      guideItems={[
        "순서대로 학습하세요: 단일(Singly) 연결 리스트부터 시작해 점차 복잡한 구조로 나아갑니다.",
        "직접 그려보세요: 연결 리스트는 종이에 화살표를 그려가며 이해하는 것이 가장 빠릅니다."
      ]}
      items={CURRICULUM}
    />
  );
}
