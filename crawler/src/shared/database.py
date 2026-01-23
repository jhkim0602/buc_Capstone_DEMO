import re
import requests
from urllib.parse import urlparse, urljoin
from bs4 import BeautifulSoup
import time

def strip_html(html_content):
    if not html_content:
        return ""
    soup = BeautifulSoup(html_content, "lxml")
    return soup.get_text(separator=" ").strip()

def normalize_url(url):
    try:
        parsed = urlparse(url)
        # 제거할 파라미터
        params_to_remove = [
            "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
            "fbclid", "gclid", "fromRss", "trackingCode", "source", "rss"
        ]

        # 쿼리 파라미터 재구성
        query_params = []
        if parsed.query:
            pairs = parsed.query.split("&")
            for pair in pairs:
                key = pair.split("=")[0]
                if key not in params_to_remove:
                    query_params.append(pair)

        new_query = "&".join(query_params)

        # 루트가 아닌 경우 경로 끝의 슬래시 제거
        path = parsed.path
        if path.endswith("/") and path != "/":
            path = path[:-1]

        return f"{parsed.scheme}://{parsed.netloc}{path}{'?' + new_query if new_query else ''}"
    except Exception:
        return url

def normalize_title(title):
    if not title:
        return ""
    # 중복 공백은 정규화하지만 특수 문자는 유지
    return re.sub(r'\s+', ' ', title).strip().lower()

def create_summary(content, feed_config=None, entry=None):
    # 필요한 경우 Medium 로직 (JS에서 단순화됨)
    if feed_config and "medium.com" in feed_config.get("url", ""):
        # 콘텐츠에서 특정 설명 찾기 시도
        # 파이썬의 경우, 단순한 html 태그 제거 및 잘라내기 사용
        pass

    cleaned = strip_html(content)
    if len(cleaned) > 200:
        return cleaned[:200] + "..."
    return cleaned

def fetch_thumbnail_from_web(url, blog_name="Web"):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            # 일반적인 봇 방지 코드
            if response.status_code in [403, 401, 429]:
                 print(f"⚠️ [{blog_name} Thumbnail] Access Denied ({response.status_code}): {url}")
            else:
                 print(f"⚠️ [{blog_name} Thumbnail] Fetch failed ({response.status_code}): {url}")
            return None

        soup = BeautifulSoup(response.content, "lxml")

        # og:image 메타 태그
        og_image = soup.find("meta", attrs={"property": "og:image"})
        if og_image and og_image.get("content"):
            print(f"✅ [{blog_name} Thumbnail] Extracted from Web: {og_image['content']}")
            return og_image["content"]

        # twitter:image 메타 태그
        twitter_image = soup.find("meta", attrs={"name": "twitter:image"})
        if twitter_image and twitter_image.get("content"):
             print(f"✅ [{blog_name} Thumbnail] Extracted from Twitter Meta: {twitter_image['content']}")
             return twitter_image["content"]

        print(f"❌ [{blog_name} Thumbnail] No meta image found: {url}")
        return None
    except Exception as e:
        print(f"❌ [{blog_name} Thumbnail] Web fetch failed: {e}")
        return None

def extract_thumbnail(entry, feed_config=None):
    # 웹 스크래핑이 필요한 블로그 목록
    web_scraping_domains = [
        "toss.tech", "oliveyoung.tech", "tech.kakao.com", "tech.kakaopay.com",
        "techblog.woowahan.com", "blog.banksalad.com", "tech.devsisters.com",
        "d2.naver.com", "techblog.lycorp.co.jp"
    ]

    link = entry.get("link", "")

    # 스크래핑이 필요한지 확인
    for domain in web_scraping_domains:
        if domain in link:
            blog_name = feed_config.get("name", "Unknown") if feed_config else "Unknown"
            print(f"🔍 [{blog_name} Thumbnail] Attempting web scraping: {link}")
            thumb = fetch_thumbnail_from_web(link, blog_name)
            if thumb:
                return thumb
            break

    # 1. Enclosure (첨부 파일)
    if "enclosures" in entry:
        for enclosure in entry.enclosures:
            if enclosure.get("type", "").startswith("image/"):
                return enclosure.get("href")

    # 2. Media Content (미디어 콘텐츠)
    if "media_content" in entry:
        # feedparser는 media:content를 media_content 리스트에 넣습니다
        for media in entry.media_content:
             if "url" in media:
                 return media["url"]

    # 3. Media Thumbnail (미디어 썸네일)
    if "media_thumbnail" in entry:
        # feedparser는 media:thumbnail을 media_thumbnail 리스트에 넣습니다
        if len(entry.media_thumbnail) > 0:
            return entry.media_thumbnail[0].get("url")

    # 4. 본문 이미지 추출
    content = ""
    if "content" in entry and len(entry.content) > 0:
        content = entry.content[0].value
    elif "summary" in entry:
        content = entry.summary
    elif "description" in entry:
        content = entry.description

    soup = BeautifulSoup(content, "lxml")

    # 특수 로직 (네이버, 티스토리, 벨로그)
    if "blog.naver.com" in link:
        # 네이버 특화 패턴은 일반 이미지 검색으로 처리될 수 있지만, 꼭 필요한 경우 제공된 로직을 에뮬레이션합니다
        # 파이썬의 soup.find_all('img')가 더 쉽습니다
        pass

    imgs = soup.find_all("img")
    for img in imgs:
        src = img.get("src") or img.get("data-src")
        if not src:
            continue

        if src.startswith("data:"):
            continue

        # 상대 경로를 절대 경로로 변환
        if not src.startswith("http"):
             src = urljoin(link, src)

        # 네이버 특화 정리
        if "blog.naver.com" in link:
            src = src.split("?")[0]

        return src

    return None
