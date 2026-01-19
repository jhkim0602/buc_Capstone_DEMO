"use client";

import { cn } from "@/lib/utils";
import { Check, Circle, Dot } from "lucide-react";
import { useInterviewSetupStore, InterviewSetupStep } from "@/store/interview-setup-store";
import { motion } from "framer-motion";

const STEPS: { id: InterviewSetupStep; label: string; description: string }[] = [
  { id: 'target', label: '목표 설정', description: '지원할 공고 및 직무 선택' },
  { id: 'jd-check', label: 'JD 확인', description: '채용 공고 분석 결과 검증' },
  { id: 'resume', label: '이력서 입력', description: '이력서 업로드 또는 작성' },
  { id: 'resume-check', label: '이력서 확인', description: '분석된 이력서 데이터 검토' },
  { id: 'final-check', label: '최종 점검', description: '입력된 정보 최종 확인 및 수정' },
];

export function SetupSidebar() {
  const { currentStep, setStep } = useInterviewSetupStore();

  const getStepStatus = (stepId: InterviewSetupStep) => {
    if (currentStep === 'complete') return 'completed';
    const stepOrder = STEPS.findIndex(s => s.id === stepId);
    const currentOrder = STEPS.findIndex(s => s.id === currentStep);

    if (stepOrder < currentOrder) return 'completed';
    if (stepOrder === currentOrder) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-[300px] border-r h-full bg-muted/10 flex flex-col p-6 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-xl font-bold tracking-tight mb-1">면접 준비</h2>
        <p className="text-sm text-muted-foreground">성공적인 면접을 위한 4단계</p>
      </div>

      <div className="space-y-6 relative">
        {/* Vertical Line */}
        <div className="absolute left-[15px] top-2 bottom-4 w-[2px] bg-muted z-0" />

        {STEPS.map((step) => {
            const status = getStepStatus(step.id);
            const isClickable = status === 'completed' || status === 'current';

            return (
                <div
                    key={step.id}
                    className={cn(
                        "relative z-10 flex gap-4 transition-all duration-200",
                        isClickable ? "opacity-100 cursor-pointer group" : "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => isClickable && setStep(step.id)}
                >
                    {/* Icon Indicator */}
                    <div
                        className={cn(
                            "w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-300",
                            status === 'completed' ? "bg-primary border-primary text-primary-foreground" :
                            status === 'current' ? "bg-background border-primary text-primary shadow-sm ring-2 ring-primary/20" :
                            "bg-background border-muted text-muted-foreground"
                        )}
                    >
                        {status === 'completed' ? <Check className="w-4 h-4" /> :
                         status === 'current' ? <Dot className="w-8 h-8" /> :
                         <Circle className="w-4 h-4" />}
                    </div>

                    <div className="pt-0.5">
                        <div className={cn(
                            "font-semibold text-sm transition-colors",
                            status === 'current' ? "text-primary" : "text-foreground",
                            isClickable && status !== 'current' && "group-hover:text-primary/80"
                        )}>
                            {step.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 leading-snug">
                            {step.description}
                        </div>
                    </div>

                    {/* Active Background Indicators (Optional Polish) */}
                    {status === 'current' && (
                        <motion.div
                            layoutId="activeStep"
                            className="absolute -left-3 -right-3 -top-3 -bottom-3 bg-primary/5 rounded-xl -z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                    )}
                </div>
            )
        })}
      </div>
    </div>
  );
}
