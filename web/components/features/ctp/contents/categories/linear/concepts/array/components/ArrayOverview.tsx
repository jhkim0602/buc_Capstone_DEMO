"use client";

import { CTPCategoryOverview, OverviewItem } from "@/components/features/ctp/contents/shared/ctp-category-overview";
import { Box, Grid, Type } from "lucide-react";

export function ArrayOverview() {
  const CURRICULUM: OverviewItem[] = [
    {
      level: 1,
      id: "1d-array",
      title: "1D Array (배열 기초)",
      description: "데이터를 연속된 메모리에 나란히 저장하는 가장 기초적인 자료구조입니다.",
      pc_desc: "인덱스(Index)로 즉시 접근(O(1))하는 법을 배웁니다.",
      icon: Box,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      level: 2,
      id: "2d-array",
      title: "2D Array & Matrix",
      description: "행(Row)과 열(Col)로 이루어진 격자 형태의 데이터를 다룹니다.",
      pc_desc: "이미지 처리나 게임 맵 같은 2차원 데이터를 표현합니다.",
      icon: Grid,
      color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
    },
    {
      level: 3,
      id: "string",
      title: "문자열 (String)",
      description: "문자(Character)들의 배열입니다. 불변성(Immutable)이라는 독특한 특징이 있습니다.",
      pc_desc: "텍스트 데이터를 자르고(Slicing), 합치는 법을 익힙니다.",
      icon: Type,
      color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
    }
  ];

  return (
    <CTPCategoryOverview
      title="Array"
      subtitle="Array Master Class"
      description={
        <span>
          모든 자료구조의 어머니, 배열(Array)을 마스터하세요. <br />
          메모리 구조부터 캐시 최적화까지, 밑바닥 원리를 시각적으로 정복합니다.
        </span>
      }
      guideItems={[
        "순서대로 학습하세요: 난이도가 점차 올라가도록 설계되었습니다. 1단계부터 차근차근 밟아나가세요.",
        "Playground 실습: 눈으로만 보지 말고, 직접 코드를 치고 시각화 결과를 확인하세요."
      ]}
      items={CURRICULUM}
    />
  );
}
