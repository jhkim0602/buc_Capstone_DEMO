"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MOCK_RESUME_ANALYSIS } from "@/mocks/interview-data";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Loader2, Sparkles, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeInputStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function ResumeInputStep({ onNext, onBack }: ResumeInputStepProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [activeTab, setActiveTab] = useState("file");

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 2000);
  };

  return (
    <div className="flex h-full">
      {/* Input Section */}
      <div className="flex-1 p-8 overflow-y-auto border-r">
        <div className="max-w-xl mx-auto space-y-8">
           <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                 <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="space-y-1">
                 <h2 className="text-2xl font-bold tracking-tight">이력서 입력</h2>
                 <p className="text-muted-foreground text-sm">
                    사용자의 이력서를 분석하여 JD와의 매칭률을 확인합니다.
                 </p>
              </div>
           </div>

           <Tabs defaultValue="file" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                 <TabsTrigger value="file">파일 업로드</TabsTrigger>
                 <TabsTrigger value="text">직접 입력</TabsTrigger>
              </TabsList>

              <TabsContent value="file" className="space-y-4">
                 <div className="border-2 border-dashed rounded-lg h-60 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                       <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium">이력서 파일(PDF)을 드래그하세요</p>
                    <p className="text-sm text-muted-foreground mt-1">또는 클릭하여 업로드</p>
                 </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                 <Textarea
                    placeholder="이력서 내용을 텍스트로 입력하세요..."
                    className="min-h-[300px] resize-none"
                 />
              </TabsContent>
           </Tabs>

           <Button
              className="w-full h-12"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
           >
              {isAnalyzing ? <><Loader2 className="mr-2 animate-spin" /> 이력서 분석 중...</> : <><Sparkles className="mr-2" /> 분석 및 다음 단계</>}
           </Button>
        </div>
      </div>

      {/* Analysis Result Section */}
      <div className="flex-1 bg-muted/5 p-8 overflow-y-auto">
         <AnimatePresence mode="wait">
            {!hasAnalyzed ? (
               <motion.div
                 key="empty"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="h-full flex flex-col items-center justify-center text-center text-muted-foreground"
               >
                  <FileText className="w-12 h-12 opacity-20 mb-4" />
                  <p>이력서를 입력하면<br/>핵심 역량을 추출해 보여드립니다.</p>
               </motion.div>
            ) : (
               <motion.div
                 key="result"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="max-w-xl mx-auto space-y-6"
               >
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="font-bold text-lg">분석 리포트</h3>
                     <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-200">매칭률 88%</Badge>
                  </div>

                  <Card>
                     <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">감지된 핵심 역량</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="flex flex-wrap gap-2">
                           {MOCK_RESUME_ANALYSIS.skills.map(skill => (
                              <Badge key={skill} variant="outline" className="px-3 py-1 bg-background">
                                 {skill}
                              </Badge>
                           ))}
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">주요 경험 요약</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        {MOCK_RESUME_ANALYSIS.experiences.map((exp, i) => (
                           <div key={i} className="flex gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                              <div>
                                 <div className="font-medium text-sm">{exp.title}</div>
                                 <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{exp.description}</p>
                              </div>
                           </div>
                        ))}
                     </CardContent>
                  </Card>

                  <div className="pt-8">
                     <Button onClick={onNext} className="w-full" size="lg">
                        면접 모드 설정으로 <ArrowRight className="ml-2 w-4 h-4" />
                     </Button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}
