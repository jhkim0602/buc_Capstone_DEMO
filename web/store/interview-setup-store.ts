import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type InterviewSetupStep =
  | 'target'     // Step 1: Target Position
  | 'jd-check'   // Step 2: JD Verification
  | 'resume'     // Step 3: Resume Input
  | 'resume-check' // Step 4: Resume Verification
  | 'final-check' // Step 5: Final Check
  | 'complete';  // Step 6: Completion

export interface JobData {
  role: string;
  company: string;
  originalText?: string; // For text-based input if implemented later

  // Enhanced Fields
  companyDescription: string; // 기업/서비스 소개
  teamCulture: string[];      // 인재상 & 조직문화

  techStack: string[];
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
}

export interface ResumeData {
  file?: File; // Note: Files are hard to persist in localStorage
  fileName?: string;
  parsedContent: {
    personalInfo: {
      name: string;
      email: string;
      phone: string;
      intro?: string; // 한 줄 소개 (Elevator Pitch)
      links?: {
        github?: string;
        blog?: string; // Notion/Blog
        other?: string;
      };
    };
    education: {
        school: string;
        major: string;
        period: string;
        degree?: string;
    }[];
    experience: {
        company: string;
        position: string;
        period: string;
        description: string;
    }[];
    skills: {
        name: string;
        category?: string; // e.g., 'Language', 'Frontend', 'Backend'
        level?: 'Basic' | 'Intermediate' | 'Advanced';
    }[];
    projects: {
        name: string;
        period: string;
        description: string; // Situation & Action
        techStack?: string[];
        achievements?: string[]; // Result (Numerical)
    }[];
  };
}

interface InterviewSetupState {
  currentStep: InterviewSetupStep;
  targetUrl: string;
  targetJobCategory: string; // Fallback if no URL

  // JD Data
  jobData: JobData | null;

  // Resume Data
  resumeData: ResumeData | null;

  // Actions
  setStep: (step: InterviewSetupStep) => void;
  setTarget: (url: string, category: string) => void;
  setJobData: (data: JobData) => void;
  updateJobData: (data: Partial<JobData>) => void;
  setResumeData: (data: ResumeData) => void;
  updateResumeData: (data: Partial<ResumeData>) => void;
  completeSetup: () => void;
  reset: () => void;
}

export const useInterviewSetupStore = create<InterviewSetupState>()(
  persist(
    (set) => ({
      currentStep: 'target',
      targetUrl: '',
      targetJobCategory: '',
      jobData: null,
      resumeData: null,

      setStep: (step) => set({ currentStep: step }),
      setTarget: (url, category) => set({ targetUrl: url, targetJobCategory: category }),
      setJobData: (data) => set({ jobData: data }),
      updateJobData: (updates) =>
        set((state) => ({
          jobData: state.jobData ? { ...state.jobData, ...updates } : null
        })),
      setResumeData: (data) => set({ resumeData: data }),
      updateResumeData: (updates) =>
        set((state) => ({
            resumeData: state.resumeData ? { ...state.resumeData, ...updates } : null
        })),
      completeSetup: () => set({ currentStep: 'complete' }),
      reset: () => set({
        currentStep: 'target',
        targetUrl: '',
        targetJobCategory: '',
        jobData: null,
        resumeData: null
      }),
    }),
    {
      name: 'interview-setup-storage',
      // Skip persisting non-serializable data if any (like File objects)
      partialize: (state) => ({
        currentStep: state.currentStep,
        targetUrl: state.targetUrl,
        targetJobCategory: state.targetJobCategory,
        jobData: state.jobData,
        resumeData: state.resumeData
          ? {
              ...state.resumeData,
              file: undefined // Cannot persist File object
            }
          : null
      }),
    }
  )
);
