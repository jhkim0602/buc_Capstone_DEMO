"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Box, Grid, Type, BookOpen } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function ArrayOverview() {
  const CURRICULUM = [
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
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      {/* 1. Hero Section */}
      <section className="text-center space-y-4 py-8">
        <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">Linear Data Structures</Badge>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Array Master Class
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          모든 자료구조의 어머니, 배열(Array)을 마스터하세요. <br />
          메모리 구조부터 캐시 최적화까지, 밑바닥 원리를 시각적으로 정복합니다.
        </p>
      </section>

      {/* 2. Guide Section */}
      <section className="bg-muted/30 rounded-2xl p-6 border border-border/50 max-w-4xl mx-auto">
        <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
          <BookOpen className="w-5 h-5 text-primary" />
          학습 가이드
        </h3>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
            <span><strong>순서대로 학습하세요:</strong> 난이도가 점차 올라가도록 설계되었습니다. 1단계부터 차근차근 밟아나가세요.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
            <span><strong>Playground 실습:</strong> 눈으로만 보지 말고, 직접 코드를 치고 시각화 결과를 확인하세요.</span>
          </li>
        </ul>
      </section>

      {/* 3. Curriculum Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURRICULUM.map((item) => (
          <Link key={item.id} href={`?view=${item.id}`} className="group block h-full">
            <Card className="h-full border-2 border-border/40 hover:border-primary/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
                <item.icon className="w-24 h-24" />
              </div>

              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2.5 rounded-xl ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="font-mono text-xs opacity-50">
                    Lv.{item.level}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="bg-muted/50 p-3 rounded-lg text-xs font-medium text-foreground/80 flex items-start gap-2">
                  <span className="text-primary">💡</span>
                  {item.pc_desc}
                </div>
              </CardContent>

              <CardFooter className="pt-2">
                <div className="w-full text-right text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all flex items-center justify-end gap-1 translate-x-2 group-hover:translate-x-0">
                  Start Learning <ArrowRight className="w-4 h-4" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
