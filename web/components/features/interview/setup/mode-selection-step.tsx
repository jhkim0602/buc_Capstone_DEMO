"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare, Video, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ModeSelectionStepProps {
  onBack: () => void;
}

export function ModeSelectionStep({ onBack }: ModeSelectionStepProps) {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<'chat' | 'video' | null>(null);

  const handleStart = () => {
    if (selectedMode === 'chat') {
       router.push('/interview/pre-qna');
    } else if (selectedMode === 'video') {
       router.push('/interview/room');
    }
  };

  return (
    <div className="h-full flex flex-col">
       <div className="p-8 pb-0">
          <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
             <ArrowLeft className="mr-2 w-4 h-4" /> 이전으로
          </Button>
          <h2 className="text-3xl font-bold tracking-tight mb-2">면접 모드 선택</h2>
          <p className="text-muted-foreground">
             준비가 완료되었습니다. 원하시는 면접 방식을 선택해주세요.
          </p>
       </div>

       <div className="flex-1 p-8 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto items-center w-full">
          {/* Chat Mode Card */}
          <Card
             className={cn(
                "cursor-pointer transition-all duration-300 border-2 hover:border-primary hover:shadow-lg relative overflow-hidden group h-[400px]",
                selectedMode === 'chat' ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "border-muted"
             )}
             onClick={() => setSelectedMode('chat')}
          >
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <CardHeader className="text-center pt-12 pb-2 relative z-10">
                <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                   <MessageSquare className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl">사전 QnA (채팅)</CardTitle>
                <CardDescription>텍스트 기반의 가벼운 탐색 면접</CardDescription>
             </CardHeader>
             <CardContent className="text-center relative z-10 space-y-4">
                <ul className="text-sm text-muted-foreground space-y-2 text-left bg-background/50 p-4 rounded-lg inline-block mx-auto">
                   <li className="flex gap-2 items-center"><Zap className="w-3 h-3 text-yellow-500" /> 핵심 키워드 중심 질문</li>
                   <li className="flex gap-2 items-center"><Zap className="w-3 h-3 text-yellow-500" /> 꼬리물기 질문 없음</li>
                   <li className="flex gap-2 items-center"><Zap className="w-3 h-3 text-yellow-500" /> 부담 없는 텍스트 입력</li>
                </ul>
             </CardContent>
             {selectedMode === 'chat' && (
                <div className="absolute bottom-6 left-0 right-0 text-center animate-in fade-in slide-in-from-bottom-2">
                   <Badge className="bg-blue-600">선택됨</Badge>
                </div>
             )}
          </Card>

          {/* Video Mode Card */}
          <Card
             className={cn(
                "cursor-pointer transition-all duration-300 border-2 hover:border-primary hover:shadow-lg relative overflow-hidden group h-[400px]",
                selectedMode === 'video' ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "border-muted"
             )}
             onClick={() => setSelectedMode('video')}
          >
             <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <CardHeader className="text-center pt-12 pb-2 relative z-10">
                <div className="w-20 h-20 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                   <Video className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-2xl">실전 모의 면접</CardTitle>
                <CardDescription>카메라와 마이크를 켜고 실제처럼</CardDescription>
             </CardHeader>
             <CardContent className="text-center relative z-10 space-y-4">
                 <ul className="text-sm text-muted-foreground space-y-2 text-left bg-background/50 p-4 rounded-lg inline-block mx-auto">
                   <li className="flex gap-2 items-center"><Zap className="w-3 h-3 text-yellow-500" /> 화상/음성 실시간 문답</li>
                   <li className="flex gap-2 items-center"><Zap className="w-3 h-3 text-yellow-500" /> 비언어적 요소(표정) 분석</li>
                   <li className="flex gap-2 items-center"><Zap className="w-3 h-3 text-yellow-500" /> 상세 피드백 리포트 제공</li>
                </ul>
             </CardContent>
             {selectedMode === 'video' && (
                <div className="absolute bottom-6 left-0 right-0 text-center animate-in fade-in slide-in-from-bottom-2">
                   <Badge className="bg-orange-600">선택됨</Badge>
                </div>
             )}
          </Card>
       </div>

       <div className="p-8 pt-0 flex justify-end">
          <Button
             size="lg"
             className="w-full md:w-auto px-12 text-lg h-14"
             disabled={!selectedMode}
             onClick={handleStart}
          >
             면접 시작하기
          </Button>
       </div>
    </div>
  );
}
