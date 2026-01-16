export interface JobPostingInput {
  /** URL 입력이면 url만 사용합니다 */
  url?: string;
  /** 파일 입력이면 file만 사용합니다 */
  file?: File;
}

export interface JobPostingAnalysis {
  company: string;
  position: string;
  responsibilities: string[];
  qualifications: string[];
  preferences: string[];
  techStack: string[];
  process: string;
}

export interface PreQnaQuestion {
  id: string;
  category: 'hard' | 'soft';
  question: string;
}

export interface PreQnaAnswer {
  questionId: string;
  answerText: string;
  feedback: string;
  followUpQuestion?: string;
}

export interface LiveSessionState {
  phase: 'intro' | 'question' | 'answering' | 'closing';
  currentQuestion: string;
  isMicEnabled: boolean;
  isCameraEnabled: boolean;
}

export interface InterviewReport {
  candidateUid: string;
  style: string;
  totalQuestions: number;
  overallSummary: string;
  details: {
    question: string;
    answer: string;
    feedback: string;
    followUpQuestion?: string;
  }[];
  nonverbalMetrics: {
    timestamp: number;
    gazeScore: number;
    voiceScore: number;
  }[];
}

export interface HistoryItem {
  id: string;
  type: 'pre-qna' | 'video';
  title: string;
  date: string;
  status: 'done' | 'in-progress';
  reportReady: boolean;
}

export interface ResumeInput {
  text?: string;
  file?: File;
}

export interface ResumeAnalysis {
  name: string;
  email: string;
  careerYears: number;
  skills: string[];
  experienceSummary: string;
  projects: {
    name: string;
    role: string;
    description: string;
  }[];
}

export interface InterviewSetupState {
  step: 'jd' | 'resume' | 'check';
  jdUrl?: string;
  jdAnalysis?: JobPostingAnalysis;
  resumeInput?: ResumeInput;
  resumeAnalysis?: ResumeAnalysis;
}
