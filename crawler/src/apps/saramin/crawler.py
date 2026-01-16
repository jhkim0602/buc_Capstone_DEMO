import requests
from bs4 import BeautifulSoup
import time
import random
from datetime import datetime
from loguru import logger

from .models import RecruitJob

class SaraminCrawler:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://www.saramin.co.kr/'
        }
        self.api_url = "https://www.saramin.co.kr/zf_user/search/get-recruit-list"

    def fetch_jobs_by_keyword(self, keyword: str, limit_pages: int = 2) -> list[RecruitJob]:
        """
        키워드로 공고 리스트를 수집합니다. (Deep Crawl 전 단계)
        """
        jobs = []
        
        # API 파라미터 구성
        params = {
            'searchType': 'search',
            'recruitPage': 1,
            'recruitSort': 'relation',
            'recruitPageCount': 40,
            'search_optional_item': 'y',
            'search_done': 'y',
            'panel_count': 'y',
            'preview': 'y',
            'mainSearch': 'n'
        }
        
        if keyword:
            params['searchword'] = keyword

        # 카테고리 필터 (IT/인터넷: 2)
        params['cat_mcls'] = '2' 

        logger.info(f"🔎 Scanning Saramin for keyword: '{keyword}' (Max {limit_pages} pages)")

        for page in range(1, limit_pages + 1):
            params['recruitPage'] = page
            
            try:
                # Random Delay between pages
                time.sleep(random.uniform(1.0, 2.5))
                
                resp = requests.get(self.api_url, params=params, headers=self.headers)
                resp.raise_for_status()
                data = resp.json()
                
                if not data.get('innerHTML'):
                    break
                    
                soup = BeautifulSoup(data['innerHTML'], 'html.parser')
                items = soup.find_all('div', class_='item_recruit')
                
                if not items:
                    break
                    
                logger.info(f"   📄 Page {page}: Found {len(items)} items")
                
                for item in items:
                    job = self._parse_list_item(item)
                    if job:
                        jobs.append(job)
                        
            except Exception as e:
                logger.error(f"❌ Error fetching page {page}: {e}")
                break
        
        return jobs

    def _parse_list_item(self, item) -> RecruitJob:
        try:
            # 1. ID
            rec_idx = item.get('value', '')
            if not rec_idx:
                return None

            # 2. Title & Link
            title_elem = item.select_one('div.area_job > h2.job_tit > a')
            if not title_elem:
                return None
            
            title = title_elem.get_text(strip=True)
            href = title_elem.get('href')
            link = f"https://www.saramin.co.kr{href}" if href else ""

            # 3. Company
            company_elem = item.select_one('div.area_corp > strong.corp_name > a')
            company = company_elem.get_text(strip=True) if company_elem else "Unknown"

            # 4. Conditions (Location, Career, etc)
            conditions = item.select('div.area_job > div.job_condition > span')
            location = conditions[0].get_text(strip=True) if len(conditions) > 0 else ""
            career = conditions[1].get_text(strip=True) if len(conditions) > 1 else ""
            education = conditions[2].get_text(strip=True) if len(conditions) > 2 else ""
            work_type = conditions[3].get_text(strip=True) if len(conditions) > 3 else ""

            # 5. Deadline
            deadline_elem = item.select_one('div.area_job > div.job_date > span.date')
            deadline = deadline_elem.get_text(strip=True) if deadline_elem else ""

            return RecruitJob(
                id=rec_idx,
                title=title,
                company=company,
                link=link,
                location=location,
                deadline=deadline,
                experience=career,
                education=education,
                work_type=work_type,
                scraped_date=datetime.now().strftime('%Y-%m-%d')
            )
        except Exception:
            return None

    def scrape_job_detail(self, job: RecruitJob) -> RecruitJob:
        """
        Deep Crawl: 상세 페이지(view-detail)에 직접 접속하여 본문 내용을 가져옵니다.
        """
        if not job.id:
            return job

        # Direct iframe URL which contains the real content
        detail_url = f"https://www.saramin.co.kr/zf_user/jobs/relay/view-detail?rec_idx={job.id}"

        try:
            # Polite delay
            time.sleep(random.uniform(0.5, 1.5))
            
            resp = requests.get(detail_url, headers=self.headers, timeout=20)
            resp.raise_for_status()
            
            soup = BeautifulSoup(resp.text, 'html.parser')
            
            # Extract Text
            content_text = soup.get_text(separator=' ', strip=True)
            
            # Extract Image URL
            # 1. Look for images in the content
            imgs = soup.find_all('img')
            valid_img_url = None
            
            for img in imgs:
                src = img.get('src', '')
                # Filter out small icons or common tracking pixels if possible
                # (Simple heuristic: skip very short URLs or known bad patterns)
                if src and src.startswith('http') and 'icon' not in src and 'blank' not in src:
                    valid_img_url = src
                    break
            
            if valid_img_url:
                job.image_url = valid_img_url

            # Fallback: Image Alt Text (common in Saramin image-only postings)
            if len(content_text) < 100:
                # Collect alt text from all images, as job description might be split into multiple images
                alt_texts = [img.get('alt', '').strip() for img in imgs if img.get('alt')]
                if alt_texts:
                     # Join them
                     content_text += " " + " ".join(alt_texts)

            job.content = content_text
            
            if len(content_text) > 50:
                 logger.info(f"   ✅ Scraped content for '{job.title[:10]}...' (Length: {len(content_text)})")
            else:
                 logger.warning(f"   ⚠️ Low content length for '{job.title[:10]}...'")
            
        except Exception as e:
            logger.warning(f"   ⚠️ Failed to scrape detail for {job.id}: {e}")
        
        return job
