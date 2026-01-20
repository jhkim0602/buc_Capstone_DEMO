"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Link as LinkIcon, ArrowLeftRight, Repeat, MousePointer2, Cpu, BookOpen } from "lucide-react";
import Link from "next/link";

export function LinkedListOverview() {
  const CURRICULUM = [
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
    },
    {
      level: 5,
      id: "memory",
      title: "Memory & Sentinel",
      description: "구현을 10배 쉽게 만드는 더미(Dummy) 노드 패턴과 메모리 구조를 파헤칩니다.",
      pc_desc: "왜 연결 리스트가 배열보다 캐시 효율이 떨어지는지 하드웨어 관점에서 봅니다.",
      icon: Cpu,
      color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
    }
  ];

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      {/* 1. Hero Section */}
      <section className="text-center space-y-4 py-8">
        <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">Linear Data Structures</Badge>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Linked List Master Class
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            흩어진 데이터들을 하나로 잇습니다. <br/>
            포인터(Pointer)의 흐름을 자유자재로 다루는 메모리 마술사가 되어보세요.
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
            <span><strong>순서대로 학습하세요:</strong> 단일(Singly) 연결 리스트부터 시작해 점차 복잡한 구조로 나아갑니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
            <span><strong>직접 그려보세요:</strong> 연결 리스트는 종이에 화살표를 그려가며 이해하는 것이 가장 빠릅니다.</span>
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
