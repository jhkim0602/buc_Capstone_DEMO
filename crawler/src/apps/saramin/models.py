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
    content: str = ""      # 상세 본문
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
            "tags": self.tags,
            "image_url": self.image_url,
            "scraped_date": self.scraped_date
        }
