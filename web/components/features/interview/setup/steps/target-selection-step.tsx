"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Link as LinkIcon, Search, Sparkles } from "lucide-react";
import { useInterviewSetupStore } from "@/store/interview-setup-store";
import { MOCK_JD_RESULT } from "@/mocks/interview-setup-data";

const JOB_CATEGORIES = [
   "Frontend Developer", "Backend Developer", "Fullstack Engineer",
   "Product Manager", "UI/UX Designer", "Data Scientist",
   "DevOps Engineer", "Mobile App Developer"
];

export function TargetSelectionStep() {
   const { targetUrl, setTarget, setJobData, setStep } = useInterviewSetupStore();
   const [urlInput, setUrlInput] = useState(targetUrl);
   const [isLoading, setIsLoading] = useState(false);

   const handleNext = async () => {
      if (!urlInput.trim()) return;

      // Check if we already have data for this URL to prevent overwrite on back navigation
      const { targetUrl: storedUrl, jobData } = useInterviewSetupStore.getState();
      if (storedUrl === urlInput && jobData && jobData.role) {
         setTarget(urlInput, "Custom");
         setStep('jd-check');
         return;
      }

      setIsLoading(true);

      try {
         const response = await fetch('/api/interview/parse-job', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlInput })
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.error || 'Failed to parse');
         }

         const result = data.data;

         // Save to store
         setTarget(urlInput, "Custom");

         setJobData({
            role: result.title || "Unknown Position",
            company: result.company || "Unknown Company",

            companyDescription: result.description || "",
            teamCulture: result.culture || [],

            techStack: result.techStack || [],
            responsibilities: result.responsibilities || [],
            requirements: result.requirements || [],
            preferred: result.preferred || []
         });

         setStep('jd-check');
      } catch (error: any) {
         alert(`분석 실패: ${error.message}`);
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   const handleCategorySelect = (category: string) => {
      setUrlInput("");

      // Check if we already have data for this category to prevent overwrite on back navigation
      const { targetUrl: storedUrl, jobData } = useInterviewSetupStore.getState();
      // Assuming category selection clears targetUrl or sets it to empty?
      // In current logic: setTarget("", category). So storedUrl would be empty.
      // referencing jobData.role might be safer.
      if (!storedUrl && jobData && jobData.role === category) {
         setTarget("", category);
         setStep('jd-check');
         return;
      }

      setIsLoading(true);
      setTimeout(() => {
         setTarget("", category);
         setJobData({
            role: category,
            company: "Target Company",

            // New Fields with Default Fallbacks
            companyDescription: "",
            teamCulture: [],

            techStack: ["Relevant Tech 1", "Relevant Tech 2"],
            requirements: ["Experience in " + category],
            responsibilities: ["Develop " + category],
            preferred: []
         });
         setIsLoading(false);
         setStep('jd-check');
      }, 1000);
   };

   return (
      <div className="max-w-3xl mx-auto py-12 px-6">
         <div className="mb-10 text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">어떤 포지션에 지원하시나요?</h1>
            <p className="text-muted-foreground text-lg">
               채용 공고 URL을 입력하거나, 지원 직무를 선택해주세요.<br />
               AI가 JD를 분석하여 맞춤형 면접을 준비해드립니다.
            </p>
         </div>

         <Card className="mb-8 border-2 hover:border-primary/50 transition-colors shadow-lg">
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-primary" /> 채용 공고 URL
               </CardTitle>
               <CardDescription>
                  사람인, 원티드, 점핏 등 채용 플랫폼의 공고 링크를 입력하세요.
               </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex gap-3">
                  <div className="relative flex-1">
                     <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                     <Input
                        placeholder="https://..."
                        className="pl-9 h-12 text-base"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                     />
                  </div>
                  <Button size="lg" className="h-12 px-6" onClick={handleNext} disabled={isLoading || !urlInput}>
                     {isLoading ? (
                        <span className="flex items-center gap-2">
                           <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                           분석 중...
                        </span>
                     ) : (
                        <span className="flex items-center gap-2">
                           다음 <ArrowRight className="w-4 h-4" />
                        </span>
                     )}
                  </Button>
               </div>
            </CardContent>
         </Card>

         <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">또는 직무 선택</span></div>
         </div>

         <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground ml-1">주요 직무 카테고리</h3>
            <div className="flex flex-wrap gap-3">
               {JOB_CATEGORIES.map((category) => (
                  <Badge
                     key={category}
                     variant="outline"
                     className="px-4 py-2 text-base font-normal cursor-pointer hover:bg-primary/5 hover:border-primary transition-all active:scale-95"
                     onClick={() => handleCategorySelect(category)}
                  >
                     {category}
                  </Badge>
               ))}
            </div>
         </div>
      </div>
   );
}
