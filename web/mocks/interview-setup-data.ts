
export interface MockJDAnalysisResult {
  role: string;
  company?: string;
  companyDescription?: string;
  teamCulture?: string[];

  // recruitmentProcess removed
  techStack: string[];
  requirements: string[];
  responsibilities: string[];
  preferred?: string[];
}

export interface MockResumeAnalysisResult {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    intro?: string;
    links?: {
      github?: string;
      blog?: string;
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
      category?: string;
      level?: 'Basic' | 'Intermediate' | 'Advanced';
  }[];
  projects: {
    name: string;
    period: string;
    description: string;
    techStack?: string[];
    achievements?: string[];
  }[];
}

export const MOCK_JD_RESULT: MockJDAnalysisResult = {
  role: "Backend Developer (Node.js)",
  company: "Team Ultra (Tesso)",

  // Enhanced Fields
  companyDescription: "글로벌 웹빌더/커머스 시장을 혁신하는 팀울트라입니다. Tesso는 누구나 손쉽게 자신만의 브랜드 공간을 만들고 상품 판매부터 고객 관리까지 해결하는 서비스입니다. 맥킨지, BCG 출신의 소수 정예 전문가들로 구성되어 있으며, 빠르게 실행하고 단순하게 생각하는 문화를 지향합니다.",
  teamCulture: [
    "빠르게 실행하고, 단순하게 생각하며, 끝까지 개선하는 것",
    "사용자 가치와 경험 최우선",
    "가슴 뛰는 속도로 성장하고 싶은 분"
  ],
  // recruitmentProcess removed

  techStack: ["Node.js", "Nest.js", "TypeScript", "TypeORM", "MongoDB", "Redis", "AWS"],
  requirements: [
    "Javascript 기반 서버 개발 경험자 (0~5년차)",
    "API 개발, 운영, 유지보수 경험",
    "DBMS 설계 및 운영 경험"
  ],
  responsibilities: [
    "커머스 및 코어 서버 API 개발/운영",
    "AWS 인프라 세팅 및 운영",
    "기술적 도전 해결"
  ],
  preferred: [
    "웹빌더, 커머스 도메인 경험",
    "AI 툴(Cursor, Claude 등) 활용 경험",
    "주도적인 문제 해결 능력"
  ]
};

export const MOCK_RESUME_RESULT: MockResumeAnalysisResult = {
  personalInfo: {
    name: "Kim Chul-soo",
    email: "cs.kim@example.com",
    phone: "010-1234-5678",
    intro: "사용자 경험을 최우선으로 생각하는 3년차 프론트엔드 개발자입니다. 효율적인 컴포넌트 설계와 성능 최적화에 강점이 있습니다.",
    links: {
        github: "https://github.com/kimchulsoo",
        blog: "https://notion.so/kimchulsoo-portfolio"
    }
  },
  education: [
    {
      school: "Seoul National University",
      major: "Computer Science",
      period: "2018 - 2022",
      degree: "Bachelor"
    }
  ],
  experience: [
    {
      company: "Previous Tech Inc.",
      position: "Frontend Engineer",
      period: "2022.03 - Present",
      description: "메인 대시보드 개발 및 유지보수 담당."
    }
  ],
  skills: [
      { name: "JavaScript", category: "Language", level: "Advanced" },
      { name: "TypeScript", category: "Language", level: "Intermediate" },
      { name: "React", category: "Framework", level: "Advanced" },
      { name: "Node.js", category: "Framework", level: "Basic" }
  ],
  projects: [
    {
      name: "E-commerce Platform Refactoring",
      period: "2023.01 - 2023.06",
      description: "레거시 코드를 Next.js App Router로 마이그레이션하여 유지보수성을 높였습니다.",
      techStack: ["Next.js", "TypeScript", "TailwindCSS"],
      achievements: [
          "페이지 로딩 속도 1.2초 → 0.7초로 40% 단축",
          "컴포넌트 재사용성 30% 증가"
      ]
    }
  ]
};
