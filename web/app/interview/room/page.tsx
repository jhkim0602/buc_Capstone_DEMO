"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MOCK_CHAT_MESSAGES } from "@/mocks/interview-data";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, MessageSquare, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function InterviewRoomPage() {
  const router = useRouter();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [interviewState, setInterviewState] = useState<'intro' | 'ongoing' | 'ending'>('intro');
  const [question, setQuestion] = useState("자기소개를 부탁드립니다.");

  useEffect(() => {
    // Simulate interview flow
    const timer = setTimeout(() => {
      setInterviewState('ongoing');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEndCall = () => {
    if (confirm("면접을 종료하고 결과를 확인하시겠습니까?")) {
      router.push('/interview/result');
    }
  };

  return (
    <div className="h-screen bg-neutral-950 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-neutral-900/50 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-red-500/50 text-red-400 bg-red-500/10 animate-pulse">
            ● REC
          </Badge>
          <span className="font-medium text-neutral-200">실전 모의 면접 세션</span>
        </div>
        <div className="text-sm text-neutral-400">
           00:05:23
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden relative">

        {/* Main View (AI Interviewer) */}
        <div className="md:col-span-3 bg-neutral-900 rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl">
           {/* Abstract AI Avatar Visualization */}
           <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
              <div className="relative">
                 <div className="w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                 <Avatar className="w-32 h-32 border-4 border-white/10 shadow-xl">
                    <AvatarImage src="/ai-avatar-large.png" />
                    <AvatarFallback className="bg-neutral-800 text-3xl">AI</AvatarFallback>
                 </Avatar>
                 {interviewState === 'ongoing' && (
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-64 text-center">
                       <div className="flex gap-1 justify-center h-6 items-end">
                          {[...Array(5)].map((_, i) => (
                             <div key={i} className="w-1 bg-indigo-400 animate-music-bar" style={{ height: '50%', animationDelay: `${i * 0.1}s` }} />
                          ))}
                       </div>
                    </div>
                 )}
              </div>
           </div>

           {/* Question Overlay (Subtitles) */}
           <div className="absolute bottom-12 left-0 right-0 px-8 text-center">
              <div className="bg-black/60 backdrop-blur-md inline-block px-6 py-4 rounded-xl text-lg font-medium shadow-lg max-w-3xl">
                 "{question}"
              </div>
           </div>
        </div>

        {/* Sidebar (User Cam & Info) */}
        <div className="hidden md:flex flex-col gap-4">
           {/* User Camera */}
           <div className="aspect-video bg-neutral-800 rounded-xl overflow-hidden relative border border-white/10">
              {isVideoOn ? (
                 <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
                    <User className="w-12 h-12 text-neutral-500" />
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/50 text-[10px] rounded">나 (You)</div>
                 </div>
              ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500">
                    <VideoOff className="w-8 h-8 mb-2" />
                    <span className="text-xs">카메라 꺼짐</span>
                 </div>
              )}
              <div className="absolute bottom-2 left-2">
                 {!isMicOn && <MicOff className="w-4 h-4 text-red-400" />}
              </div>
           </div>

           {/* Chat / System Log */}
           <div className="flex-1 bg-neutral-900/50 rounded-xl border border-white/5 p-4 overflow-hidden flex flex-col">
              <h3 className="text-sm font-semibold text-neutral-400 mb-4 flex items-center gap-2">
                 <MessageSquare className="w-4 h-4" /> 실시간 분석 로그
              </h3>
              <div className="flex-1 overflow-y-auto space-y-3 text-xs text-neutral-300 scrollbar-hide">
                 <div className="p-2 rounded bg-white/5 border border-white/5">
                    <span className="text-indigo-400 font-bold">System:</span> 면접 세션이 시작되었습니다.
                 </div>
                 <div className="p-2 rounded bg-white/5 border border-white/5">
                    <span className="text-yellow-400 font-bold">Analysis:</span> 목소리 톤이 안정적입니다.
                 </div>
                 <div className="p-2 rounded bg-white/5 border border-white/5">
                    <span className="text-green-400 font-bold">Keyword:</span> 'React', 'Experience' 감지됨.
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* Control Bar */}
      <footer className="h-20 bg-neutral-900 border-t border-white/10 flex items-center justify-center gap-4 relative">
         <div className="flex items-center gap-4">
            <Button
               variant={isMicOn ? "secondary" : "destructive"}
               size="icon"
               className="rounded-full w-12 h-12"
               onClick={() => setIsMicOn(!isMicOn)}
            >
               {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
            <Button
               variant={isVideoOn ? "secondary" : "destructive"}
               size="icon"
               className="rounded-full w-12 h-12"
               onClick={() => setIsVideoOn(!isVideoOn)}
            >
               {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>

            <Button
               variant="destructive"
               className="rounded-full w-16 h-12 gap-2 px-8 bg-red-600 hover:bg-red-700 mx-4"
               onClick={handleEndCall}
            >
               <PhoneOff className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="rounded-full text-neutral-400 hover:text-white">
               <Settings className="w-5 h-5" />
            </Button>
         </div>
      </footer>
    </div>
  );
}
