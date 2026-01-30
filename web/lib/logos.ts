export const LOGO_MAP: Record<string, string> = {
  // 29CM
  "29cm": "/logos/29cm.ico",
  "29cm tech": "/logos/29cm.ico",
  "29cm engineering": "/logos/29cm.ico",

  // 8Percent
  "8percent": "/logos/8percent.ico",
  "8퍼센트": "/logos/8percent.ico",
  "에잇퍼센트": "/logos/8percent.ico",

  // AB180
  "ab180": "/logos/ab180.ico",
  "airbridge": "/logos/ab180.ico",
  "에이비일팔공": "/logos/ab180.ico",

  // Banksalad
  "banksalad": "/logos/banksalad.ico",
  "뱅크샐러드": "/logos/banksalad.ico",

  // Coupang
  "coupang": "/logos/coupang.ico",
  "coupang tech": "/logos/coupang.ico",
  "쿠팡": "/logos/coupang.ico",

  // Daangn
  "daangn": "/logos/daangn.ico",
  "karrot": "/logos/daangn.ico",
  "당근": "/logos/daangn.ico",
  "당근마켓": "/logos/daangn.ico",
  "당근 팀": "/logos/daangn.ico",

  // Dable
  "dable": "/logos/dable.ico",
  "데이블": "/logos/dable.ico",
  "dable team": "/logos/dable.ico",

  // Danawa
  "danawa": "/logos/danawa.ico",
  "다나와": "/logos/danawa.ico",
  "다나와 기술블로그": "/logos/danawa.ico",

  // Devsisters
  "devsisters": "/logos/devsisters.ico",
  "데브시스터즈": "/logos/devsisters.ico",

  // GC Company (Assuming Generic/Mapping)
  "gccompany": "/logos/gccompany.ico",
  "gc company": "/logos/gccompany.ico",

  // Hyperconnect
  "hyperconnect": "/logos/hyperconnect.ico",
  "하이퍼커넥트": "/logos/hyperconnect.ico",
  "hyperconnect tech": "/logos/hyperconnect.ico",

  // Kakao
  "kakao": "/logos/kakao.ico",
  "kakao tech": "/logos/kakao.ico",
  "카카오": "/logos/kakao.ico",
  "카카오 기술블로그": "/logos/kakao.ico",

  // KakaoPay
  "kakaopay": "/logos/kakaopay.ico",
  "kakao pay": "/logos/kakaopay.ico",
  "kakaopay tech": "/logos/kakaopay.ico",
  "카카오페이": "/logos/kakaopay.ico",
  "카카오페이 기술블로그": "/logos/kakaopay.ico",

  // Kurly
  "kurly": "/logos/kurly.ico",
  "market kurly": "/logos/kurly.ico",
  "kurly tech": "/logos/kurly.ico",
  "컬리": "/logos/kurly.ico",
  "마켓컬리": "/logos/kurly.ico",
  "컬리 기술블로그": "/logos/kurly.ico",

  // Levit
  "levit": "/logos/levit.ico",
  "레빗": "/logos/levit.ico",

  // LINE
  "line": "/logos/line.ico",
  "line engineering": "/logos/line.ico",
  "line developers": "/logos/line.ico",
  "라인": "/logos/line.ico",
  "라인 기술블로그": "/logos/line.ico",

  // Musinsa
  "musinsa": "/logos/musinsa.ico",
  "무신사": "/logos/musinsa.ico",
  "무신사 기술블로그": "/logos/musinsa.ico",

  // Naver
  "naver": "/logos/naver.ico",
  "naver d2": "/logos/naver.ico",
  "naver cloud": "/logos/naver.ico",
  "d2": "/logos/naver.ico",
  "네이버": "/logos/naver.ico",
  "네이버 d2": "/logos/naver.ico",

  // Oliveyoung
  "oliveyoung": "/logos/oliveyoung.ico",
  "cj oliveyoung": "/logos/oliveyoung.ico",
  "올리브영": "/logos/oliveyoung.ico",
  "올리브영 기술블로그": "/logos/oliveyoung.ico",

  // Qanda
  "qanda": "/logos/qanda.ico",
  "mathpresso": "/logos/qanda.ico",
  "콴다": "/logos/qanda.ico",
  "매스프레소": "/logos/qanda.ico",

  // Saramin
  "saramin": "/logos/saramin.ico",
  "saraminhr": "/logos/saramin.ico",
  "사람인": "/logos/saramin.ico",
  "사람인hr": "/logos/saramin.ico",

  // Socar
  "socar": "/logos/socar.ico",
  "쏘카": "/logos/socar.ico",
  "쏘카 기술블로그": "/logos/socar.ico",

  // Toss
  "toss": "/logos/toss.ico",
  "viva republica": "/logos/toss.ico",
  "toss feed": "/logos/toss.ico",
  "토스": "/logos/toss.ico",
  "비바리퍼블리카": "/logos/toss.ico",

  // Wanted
  "wanted": "/logos/wanted.ico",
  "wanted lab": "/logos/wanted.ico",
  "원티드": "/logos/wanted.ico",
  "원티드랩": "/logos/wanted.ico",

  // Watcha
  "watcha": "/logos/watcha.ico",
  "왓챠": "/logos/watcha.ico",
  "왓챠 팀": "/logos/watcha.ico",

  // Woowahan (Baemin)
  "woowahan": "/logos/woowahan.ico",
  "woowahan brothers": "/logos/woowahan.ico",
  "baemin": "/logos/woowahan.ico",
  "우아한형제들": "/logos/woowahan.ico",
  "배달의민족": "/logos/woowahan.ico",
  "우아한형제들 기술블로그": "/logos/woowahan.ico",

  // Yogiyo
  "yogiyo": "/logos/yogiyo.ico",
  "delivery hero korea": "/logos/yogiyo.ico",
  "요기요": "/logos/yogiyo.ico",
  "요기요 기술블로그": "/logos/yogiyo.ico",

  // Zigbang
  "zigbang": "/logos/zigbang.ico",
  "직방": "/logos/zigbang.ico",
  "직방 기술블로그": "/logos/zigbang.ico",
};

export const getLogoUrl = (author: string): string | null => {
  if (!author) return null;

  // 1. Check exact match (case-insensitive)
  const lowerAuthor = author.toLowerCase().trim();
  if (LOGO_MAP[lowerAuthor]) {
    return LOGO_MAP[lowerAuthor];
  }

  // 2. Check for partial matches (more aggressive)
  // e.g., "Kakao Tech Blog" -> check if contains "kakao"
  const knownKeys = Object.keys(LOGO_MAP);
  for (const key of knownKeys) {
    // Only check significant keys (length > 2) to avoid false positives
    if (key.length > 2 && lowerAuthor.includes(key)) {
      return LOGO_MAP[key];
    }
  }

  // 3. Fallback: Check if there's a file matching the author name directly (if needed in future)
  // Currently we only use the map

  return null;
};
