import { motion } from "framer-motion";
import { CheckCircle2, Circle, FileText, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = 'dashboard' | 'jd-analysis' | 'resume-input' | 'mode-selection';

interface SetupSidebarProps {
  currentStep: Step;
}

export function SetupSidebar({ currentStep }: SetupSidebarProps) {
  const steps = [
    { id: 'jd-analysis', label: '채용 공고 분석', icon: FileText },
    { id: 'resume-input', label: '이력서 검토', icon: User },
    { id: 'mode-selection', label: '면접 설정', icon: Settings },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(s => s.id === currentStep);
  };

  const currentIndex = getCurrentStepIndex();

  return (
    <div className="h-full flex flex-col p-6 bg-muted/10">
      <div className="mb-8">
        <h2 className="text-xl font-bold tracking-tight">AI 면접 준비</h2>
        <p className="text-sm text-muted-foreground mt-1">
          3단계 프로세스로<br />완벽한 면접을 준비하세요.
        </p>
      </div>

      <div className="space-y-0 relative">
        {/* Vertical Line */}
        <div className="absolute left-[15px] top-3 bottom-10 w-[2px] bg-muted z-0" />

        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = index < currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex gap-4 pb-10 last:pb-0 group">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-background shrink-0",
                  isActive && "border-primary text-primary shadow-lg shadow-primary/20 scale-110",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  !isActive && !isCompleted && "border-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
              </div>
              <div className={cn("pt-1 transition-colors duration-300", isActive ? "text-foreground font-semibold" : "text-muted-foreground")}>
                <div className="text-sm">{step.label}</div>
                {isActive && (
                  <motion.div
                    layoutId="active-step-indicator"
                    className="text-xs text-primary mt-0.5 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    진행 중
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto p-4 bg-muted/30 rounded-lg border border-dashed">
        <div className="text-xs font-medium mb-1">Tip</div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          JD와 이력서를 꼼꼼히 입력할수록 AI가 더 정교한 예상 질문을 생성합니다.
        </p>
      </div>
    </div>
  );
}
