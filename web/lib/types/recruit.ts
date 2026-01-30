export interface RecruitJob {
  id: string; // rec_idx
  title: string;
  company: string;
  link: string;
  location: string;
  deadline: string;
  experience: string;
  education: string;
  work_type: string;
  tags: string[];
  image_url?: string;
  scraped_date: string;
  content?: string; // 상세 본문 (Deep Crawl 결과)
  summary?: string; // AI 요약
  responsibilities?: string[]; // 주요 업무
  qualifications?: string[]; // 자격 요건
  preferred?: string[]; // 우대 사항
  benefits?: string[]; // 복지 및 혜택
}
