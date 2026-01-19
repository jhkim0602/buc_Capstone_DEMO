"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useInterviewSetupStore } from "@/store/interview-setup-store";
import { useRouter } from "next/navigation";
import { ResumeCheckForm } from "./resume-check-form";

export function ResumeCheckStep() {
  const router = useRouter();
  const { resumeData, updateResumeData, setStep } = useInterviewSetupStore();

  if (!resumeData) {
      return (
          <div className="p-8 text-center">
              <p>이력서 데이터가 없습니다. 다시 시도해주세요.</p>
              <Button onClick={() => setStep('resume')} className="mt-4">돌아가기</Button>
          </div>
      );
  }

  const handleComplete = () => {
      setStep('final-check');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 pb-20">
      <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">이력서 분석 결과</h1>
            <p className="text-muted-foreground">
                AI가 파악한 핵심 역량입니다. 면접 질문 생성에 활용됩니다.
            </p>
          </div>
      </div>

      <ResumeCheckForm resumeData={resumeData} updateResumeData={updateResumeData} />

       <div className="flex justify-between mt-10">
          <Button variant="outline" onClick={() => setStep('resume')} className="px-6 h-12">
             <ArrowLeft className="mr-2 w-4 h-4" /> 다시 입력
          </Button>

          <Button onClick={handleComplete} className="px-8 h-12 text-base shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
             내용 확인 (다음) <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
      </div>
    </div>
  );
}
