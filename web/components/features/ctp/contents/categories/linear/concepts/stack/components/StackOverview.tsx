"use client";

import { CTPCategoryOverview, OverviewItem } from "@/components/features/ctp/contents/shared/ctp-category-overview";
import { Layers, Box, RefreshCcw, TrendingUp } from "lucide-react";

export function StackOverview() {
    const CURRICULUM: OverviewItem[] = [
        {
            level: 1,
            id: "lifo-basics",
            title: "LIFO & 기초 연산",
            description: "스택의 핵심 원리인 '후입선출'을 직접 버튼을 누르며 체험합니다.",
            pc_desc: "Push/Pop 동작의 시각적 흐름을 이해합니다.",
            icon: Layers,
            color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
        },
        {
            level: 2,
            id: "array-stack",
            title: "배열 스택 (Array Stack)",
            description: "고정된 크기의 배열을 이용해 스택을 구현하는 방법을 배웁니다.",
            pc_desc: "인덱스 관리를 통한 Top 포인터 이동을 학습합니다.",
            icon: Box,
            color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
        },
        {
            level: 3,
            id: "linked-stack",
            title: "연결 리스트 스택 (LL Stack)",
            description: "동적으로 크기가 변하는 연결 리스트 기반 스택을 구현합니다.",
            pc_desc: "포인터(Next)를 이용한 무한 스택 확장을 다룹니다.",
            icon: RefreshCcw,
            color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
        },
        {
            level: 4,
            id: "monotonic",
            title: "모노토닉 스택 (Monotonic)",
            description: "스택 내부를 정렬 상태로 유지하는 고급 기법을 학습합니다.",
            pc_desc: "오큰수(Next Greater Element) 문제를 해결하는 핵심 알고리즘입니다.",
            icon: TrendingUp,
            color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
        }
    ];

    return (
        <CTPCategoryOverview
            title="Stack"
            subtitle="Stack Master Class"
            description={
                <span>
                    데이터를 차곡차곡 쌓아 올리는 LIFO(Last-In, First-Out) 자료구조입니다. <br />
                    함수 호출 스택부터 실행 취소(Undo)까지, 컴퓨팅의 근간을 이룹니다.
                </span>
            }
            guideItems={[
                "개념 잡기: LIFO 원리를 시각적으로 확인하며 기초를 다집니다.",
                "구현 비교: 배열 기반과 연결 리스트 기반 구현의 장단점을 비교해보세요."
            ]}
            items={CURRICULUM}
        />
    );
}
