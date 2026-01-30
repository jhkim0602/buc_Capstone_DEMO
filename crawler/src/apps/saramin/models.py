from dataclasses import dataclass, field
from typing import List, Optional

@dataclass
class RecruitJob:
    id: str  # rec_idx
    title: str
    company: str
    link: str
    location: str
    deadline: str
    experience: str = ""   # career
    education: str = ""
    work_type: str = ""    # 정규직 등
    
    # Deep Crawl fields
    # Deep Crawl fields
    content: str = ""      # 상세 본문 (Legacy support or full text)
    summary: str = ""      # AI 요약
    responsibilities: List[str] = field(default_factory=list) # 주요 업무
    qualifications: List[str] = field(default_factory=list)   # 자격 요건
    preferred: List[str] = field(default_factory=list)        # 우대 사항
    benefits: List[str] = field(default_factory=list)         # 복지 및 혜택
    
    tags: List[str] = field(default_factory=list)
    image_url: Optional[str] = None
    
    scraped_date: str = ""

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "company": self.company,
            "link": self.link,
            "location": self.location,
            "deadline": self.deadline,
            "experience": self.experience,
            "education": self.education,
            "work_type": self.work_type,
            "content": self.content,
            "summary": self.summary,
            "responsibilities": self.responsibilities,
            "qualifications": self.qualifications,
            "preferred": self.preferred,
            "benefits": self.benefits,
            "tags": self.tags,
            "image_url": self.image_url,
            "scraped_date": self.scraped_date
        }
