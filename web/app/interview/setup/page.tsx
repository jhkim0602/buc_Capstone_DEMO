"use client";

import { useInterviewSetupStore } from "@/store/interview-setup-store";
import { TargetSelectionStep } from "@/components/features/interview/setup/steps/target-selection-step";
import { JdCheckStep } from "@/components/features/interview/setup/steps/jd-check-step";
import { ResumeInputStep } from "@/components/features/interview/setup/steps/resume-input-step";
import { ResumeCheckStep } from "@/components/features/interview/setup/steps/resume-check-step";
import { FinalCheckStep } from "@/components/features/interview/setup/steps/final-check-step";
import { AnimatePresence, motion } from "framer-motion";

export default function InterviewSetupPage() {
  const { currentStep } = useInterviewSetupStore();

  const renderStep = () => {
    switch (currentStep) {
      case 'target':
        return <TargetSelectionStep />;
      case 'jd-check':
        return <JdCheckStep />;
      case 'resume':
        return <ResumeInputStep />;
      case 'resume-check':
        return <ResumeCheckStep />;
      case 'final-check':
        return <FinalCheckStep />;

      case 'complete':
        return <div>Setup Complete! Redirecting...</div>;
      default:
        return <TargetSelectionStep />;
    }
  };

  return (
    <div className="h-full w-full">
        <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
            >
                {renderStep()}
            </motion.div>
        </AnimatePresence>
    </div>
  );
}
