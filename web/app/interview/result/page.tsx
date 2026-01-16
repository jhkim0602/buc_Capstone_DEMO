"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle2, Download, Share2, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const scoreData = [
  { name: '기술적합성', score: 90, fill: '#8884d8' },
  { name: '의사소통', score: 85, fill: '#83a6ed' },
  { name: '문제해결', score: 75, fill: '#8dd1e1' },
  { name: '적극성', score: 80, fill: '#82ca9d' },
];

const keywordData = [
   { name: 'React', count: 12 },
   { name: 'Next.js', count: 8 },
   { name: 'SSR', count: 5 },
   { name: 'Performance', count: 4 },
];

export default function InterviewResultPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="h-16 border-b flex items-center px-6 justify-between bg-card sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/interview')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-lg">면접 결과 리포트</h1>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm"><Share2 className="w-4 h-4 mr-2" /> 공유</Button>
           <Button variant="default" size="sm"><Download className="w-4 h-4 mr-2" /> PDF 저장</Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-8">
         {/* Summary Section */}
         <div className="text-center py-8 space-y-4">
            <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ type: "spring", duration: 0.8 }}
            >
               <Badge className="mb-4 text-base px-4 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 border-green-200">
                  <Sparkles className="w-4 h-4 mr-2" /> Top 10% 지원자 수준
               </Badge>
               <h2 className="text-4xl font-extrabold tracking-tight">종합 점수 <span className="text-primary">85점</span></h2>
               <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                  전반적으로 직무에 대한 이해도가 높으며, 특히 기술적 질문에 대한 답변이 논리적입니다. 다만 경험을 설명할 때 구체적인 수치를 곁들이면 더 좋을 것입니다.
               </p>
            </motion.div>
         </div>

         <div className="grid md:grid-cols-2 gap-6">
            {/* Chart 1 */}
            <Card>
               <CardHeader>
                  <CardTitle>역량별 상세 분석</CardTitle>
                  <CardDescription>4가지 핵심 지표에 따른 점수입니다.</CardDescription>
               </CardHeader>
               <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" barSize={20} data={scoreData}>
                        <RadialBar
                           background
                           dataKey="score"
                           cornerRadius={10}
                           label={{ position: 'insideStart', fill: '#fff' }}
                        />
                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0 }} />
                     </RadialBarChart>
                  </ResponsiveContainer>
               </CardContent>
            </Card>

            {/* Chart 2 */}
            <Card>
               <CardHeader>
                  <CardTitle>주요 언급 키워드</CardTitle>
                  <CardDescription>답변 중 가장 많이 언급된 단어입니다.</CardDescription>
               </CardHeader>
               <CardContent className="h-[300px]">
                   <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={keywordData} layout="vertical" margin={{ left: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                     </BarChart>
                   </ResponsiveContainer>
               </CardContent>
            </Card>
         </div>

         <div className="space-y-4">
            <h3 className="text-xl font-bold">상세 피드백</h3>

            <Card className="border-l-4 border-l-green-500">
               <CardContent className="pt-6">
                  <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                     </div>
                     <div className="space-y-1">
                        <h4 className="font-semibold text-lg">잘한 점 (Strengths)</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                           <li>React 생태계에 대한 이해도가 매우 높습니다.</li>
                           <li>'리팩토링' 경험을 구체적인 사례를 들어 설명했습니다.</li>
                        </ul>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
               <CardContent className="pt-6">
                  <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                     </div>
                     <div className="space-y-1">
                        <h4 className="font-semibold text-lg">보완할 점 (Improvements)</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                           <li>답변 초반에 결론을 먼저 말하는(두괄식) 연습이 필요합니다.</li>
                           <li>협업 상황에서의 갈등 해결 경험이 부족해 보입니다.</li>
                        </ul>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </main>
    </div>
  );
}
