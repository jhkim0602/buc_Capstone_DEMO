// 개발자 행사(Dev Event) 타입 정의
export interface DevEvent {
  id: string; // UUID
  title: string;
  link: string;
  host: string | null;
  date: string;
  start_date: string | null;
  end_date: string | null;
  tags: string[];
  category: string | null;
  status: "recruiting" | "upcoming" | "closed";
  source: string;
  created_at?: string;
  description?: string;
  thumbnail?: string;
  content?: string;

  // AI Structured Fields
  summary?: string;
  target_audience?: string[];
  fee?: string;
  schedule?: string[];
  benefits?: string[];
}
