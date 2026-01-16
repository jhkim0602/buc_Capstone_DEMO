import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, MessageSquare, Plus, Sparkles, User, Video, Zap } from "lucide-react";
import { MOCK_COMMUNITY_POSTS } from "@/mocks/interview-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PostCard } from "@/components/features/community/post-card";

interface InterviewDashboardProps {
  onStartNew: () => void;
}

export function InterviewDashboard({ onStartNew }: InterviewDashboardProps) {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      {/* 1. Hero Section */}
      <section className="text-center space-y-6 py-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="space-y-4"
        >
           <Badge variant="secondary" className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <Sparkles className="w-3.5 h-3.5 mr-2 inline-block" />
              AI-Powered Interview Coach
           </Badge>
           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent pb-2">
              면접의 A to Z,<br className="hidden md:block" /> AI와 완벽하게 준비하세요.
           </h1>
           <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              채용 공고 분석부터 이력서 매칭, 그리고 실전 모의 면접까지.<br/>
              당신의 합격 확률을 높여줄 맞춤형 코칭을 경험해 보세요.
           </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2, duration: 0.4 }}
        >
           <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all" onClick={onStartNew}>
              <Plus className="mr-2 w-5 h-5" /> 새 면접 시작하기
           </Button>
        </motion.div>
      </section>

      {/* 2. Process Introduction (How it works) */}
      <section className="grid md:grid-cols-3 gap-6">
         <Card className="border-none shadow-md bg-gradient-to-br from-background to-muted/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
               <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
               </div>
               <CardTitle>JD 분석 & 매칭</CardTitle>
               <CardDescription>
                  지원하려는 공고의 핵심 요구사항을 분석하고 내 이력서와의 매칭률을 확인합니다.
               </CardDescription>
            </CardHeader>
         </Card>

         <Card className="border-none shadow-md bg-gradient-to-br from-background to-muted/50 hover:shadow-lg transition-all duration-300">
            <CardHeader>
               <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                  <User className="w-6 h-6" />
               </div>
               <CardTitle>맞춤형 질문 생성</CardTitle>
               <CardDescription>
                  내 경험과 직무 스킬셋을 기반으로 면접관이 물어볼 만한 예상 질문을 뽑아냅니다.
               </CardDescription>
            </CardHeader>
         </Card>

         <Card className="border-none shadow-md bg-gradient-to-br from-background to-muted/50 hover:shadow-lg transition-all duration-300">
             <CardHeader>
               <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4">
                  <Video className="w-6 h-6" />
               </div>
               <CardTitle>실전 모의 면접</CardTitle>
               <CardDescription>
                  실제 면접장과 같은 환경에서 답변을 연습하고, AI의 정밀한 피드백을 받아보세요.
               </CardDescription>
            </CardHeader>
         </Card>
      </section>

      {/* 3. Community / Tips Section */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
               <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" /> 오늘의 면접 꿀팁
               </h2>
               <p className="text-muted-foreground">먼저 취업한 선배들의 노하우와 합격 후기를 확인해 보세요.</p>
            </div>
            <Button variant="ghost" className="text-muted-foreground">더보기</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_COMMUNITY_POSTS.map((post) => (
             // @ts-ignore - MockPost type compatibility with Database Post type
            <PostCard key={post.id} post={post as any} href={`/community/post/${post.id}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
