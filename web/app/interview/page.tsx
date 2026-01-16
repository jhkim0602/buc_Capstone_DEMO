"use client";

import { useEffect, useState } from "react";
import { InterviewDashboard } from "@/components/features/interview/interview-dashboard";
import { SetupSidebar } from "@/components/features/interview/setup/setup-sidebar";
import { JobAnalysisStep } from "@/components/features/interview/setup/job-analysis-step";
import { ResumeInputStep } from "@/components/features/interview/setup/resume-input-step";
import { ModeSelectionStep } from "@/components/features/interview/setup/mode-selection-step";
import { GlobalHeader } from "@/components/layout/global-header";
import { motion, AnimatePresence } from "framer-motion";

type ViewState = 'dashboard' | 'jd-analysis' | 'resume-input' | 'mode-selection';

export default function InterviewPage() {
  const [viewState, setViewState] = useState<ViewState>('dashboard');

  // Load state from sessionStorage on mount
  useEffect(() => {
    const savedState = sessionStorage.getItem('interview_view_state') as ViewState;
    if (savedState) setViewState(savedState);
  }, []);

  // Save state to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem('interview_view_state', viewState);
  }, [viewState]);

  const handleBackToDashboard = () => setViewState('dashboard');

  const renderContent = () => {
    switch (viewState) {
      case 'dashboard':
        return <InterviewDashboard onStartNew={() => setViewState('jd-analysis')} />;
      case 'jd-analysis':
        return (
          <JobAnalysisStep
            onNext={() => setViewState('resume-input')}
            onBack={handleBackToDashboard}
          />
        );
      case 'resume-input':
        return (
          <ResumeInputStep
            onNext={() => setViewState('mode-selection')}
            onBack={() => setViewState('jd-analysis')}
          />
        );
      case 'mode-selection':
        return (
          <ModeSelectionStep
            onBack={() => setViewState('resume-input')}
          />
        );
      default:
        return <InterviewDashboard onStartNew={() => setViewState('jd-analysis')} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden font-sans">
      <GlobalHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Only visible setup modes */}
        <AnimatePresence mode="wait">
          {viewState !== 'dashboard' && (
             <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="border-r hidden md:block overflow-hidden"
             >
                <div className="w-[280px] h-full">
                  <SetupSidebar currentStep={viewState} />
                </div>
             </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative bg-background">
          <motion.div
            key={viewState}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
