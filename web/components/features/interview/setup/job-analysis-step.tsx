"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_JD_ANALYSIS } from "@/mocks/interview-data";
import { ArrowRight, FileText, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface JobAnalysisStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function JobAnalysisStep({ onNext, onBack }: JobAnalysisStepProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [jdText, setJdText] = useState("");

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 1500);
  };

  return (
    <div className="flex h-full">
      {/* Left: Input Area */}
      <div className="flex-1 p-8 overflow-y-auto border-r">
        <div className="max-w-xl mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">채용 공고(JD) 입력</h2>
            <p className="text-muted-foreground">
              지원하고자 하는 포지션의 JD를 입력해주세요.<br />
              AI가 주요 요구사항과 필요 역량을 분석합니다.
            </p>
          </div>

          <div className="space-y-4">
             <Card className="border-dashed shadow-sm">
                <CardContent className="p-4 space-y-4">
                   <Textarea
                     placeholder="채용 공고 내용을 여기에 붙여넣으세요..."
                     className="min-h-[300px] resize-none border-none focus-visible:ring-0 text-base"
                     value={jdText}
                     onChange={(e) => setJdText(e.target.value)}
                   />
                </CardContent>
             </Card>

             <Button
               className="w-full h-12 text-base"
               onClick={handleAnalyze}
               disabled={!jdText.trim() || isAnalyzing}
             >
               {isAnalyzing ? (
                 <>
                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> JD 분석 중...
                 </>
               ) : (
                 <>
                   <Sparkles className="mr-2 h-4 w-4" /> 분석 시작하기
                 </>
               )}
             </Button>
          </div>
        </div>
      </div>

      {/* Right: Analysis Result Area */}
      <div className="flex-1 bg-muted/5 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          {!hasAnalyzed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8"
            >
              <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="font-semibold mb-1">아직 분석 결과가 없습니다</h3>
              <p className="text-sm">왼쪽에서 JD 내용을 입력하고<br />분석 버튼을 눌러주세요.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-xl mx-auto space-y-6"
            >
              <div className="flex items-center justify-between">
                 <h3 className="text-lg font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" /> 분석 결과
                 </h3>
                 <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                    {MOCK_JD_ANALYSIS.companyName}
                 </Badge>
              </div>

              <Card>
                 <CardHeader>
                    <CardTitle className="text-base">주요 기술 스택</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="flex flex-wrap gap-2">
                       {MOCK_JD_ANALYSIS.techStack.map(tech => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                       ))}
                    </div>
                 </CardContent>
              </Card>

              <Card>
                 <CardHeader>
                    <CardTitle className="text-base">핵심 요구사항</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <ul className="space-y-2 text-sm text-foreground/80 list-disc list-inside">
                       {MOCK_JD_ANALYSIS.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                       ))}
                    </ul>
                 </CardContent>
              </Card>

               <div className="pt-8 flex justify-end">
                  <Button onClick={onNext} size="lg" className="w-full sm:w-auto">
                     이력서 입력 단계로 <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
