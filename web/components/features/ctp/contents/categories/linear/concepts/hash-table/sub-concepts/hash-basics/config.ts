import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const HASH_BASICS_CONFIG: CTPModuleConfig = {
  title: "해시 기본 (Hash Basics)",
  description: "키(Key)를 해시 함수로 인덱스화해 평균 O(1)로 빠르게 찾는 구조를 학습합니다.",
  mode: "interactive",
  interactive: {
    components: ["peek", "reset"],
    maxSize: 8,
  },
  tags: ["Hash Table"],
  story: {
    problem: "학생 이름으로 성적을 찾고 싶다면 어떻게 해야 할까요? 배열은 인덱스가 숫자일 때만 O(1)이지만, 이름은 숫자가 아닙니다. 이름을 숫자로 바꾸는 규칙이 필요하고, 그 규칙이 바로 해시 함수입니다.",
    definition: "해시 테이블은 **키를 해시 함수로 변환해 버킷(배열 인덱스)에 저장하는 자료구조**입니다. 평균적으로 검색/삽입/삭제가 O(1)입니다.\n\n**불변식**\n- 같은 키는 항상 같은 버킷으로 매핑된다.\n- 충돌이 발생하면 반드시 동일 버킷 내에서 해결한다(체이닝/오픈 어드레싱).",
    analogy: "사물함에 이름표가 붙어 있고, 이름을 규칙적으로 숫자로 바꿔 해당 사물함을 찾는다고 생각해보세요. 규칙(해시 함수)을 알면 바로 사물함(버킷)으로 이동할 수 있습니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- 키가 어떤 버킷으로 매핑되는지\n- 같은 버킷으로 몰릴 때 충돌이 발생하는 순간\n- 버킷 분포가 고르게 유지될수록 탐색이 빨라지는 이유\n\n**실습 요약**\n- 좋은 해시 함수가 왜 필요한지 체감\n- 충돌이 성능에 미치는 영향을 이해",
  },
  features: [
    { title: "해시 함수", description: "키를 고정 범위의 인덱스로 변환합니다. 동일 키는 항상 동일 인덱스를 생성해야 합니다." },
    { title: "평균 O(1) 접근", description: "버킷 위치만 알면 바로 접근하므로 평균적으로 매우 빠릅니다." },
    { title: "충돌 가능성", description: "서로 다른 키가 같은 인덱스로 매핑될 수 있습니다. 충돌 처리는 필수입니다." },
    { title: "로드 팩터", description: "저장된 요소 수 / 버킷 수. 높을수록 충돌 확률이 증가합니다." },
  ],
  complexity: {
    access: "O(1) avg / O(N) worst",
    search: "O(1) avg / O(N) worst",
    insertion: "O(1) avg / O(N) worst",
    deletion: "O(1) avg / O(N) worst",
  },
  implementation: [
    {
      language: "python",
      description: "체이닝(Chaining) 방식의 간단한 해시 테이블 구현입니다.",
      code: `class HashTable:
    def __init__(self, capacity=8):
        self.capacity = capacity
        self.buckets = [[] for _ in range(capacity)]

    def _hash(self, key):
        # 간단한 문자열 해시 (polynomial rolling)
        h = 0
        for ch in key:
            h = (h * 31 + ord(ch)) % self.capacity
        return h

    def put(self, key, value):
        idx = self._hash(key)
        bucket = self.buckets[idx]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))

    def get(self, key):
        idx = self._hash(key)
        for k, v in self.buckets[idx]:
            if k == key:
                return v
        return None

    def delete(self, key):
        idx = self._hash(key)
        bucket = self.buckets[idx]
        for i, (k, _) in enumerate(bucket):
            if k == key:
                bucket.pop(i)
                return True
        return False`
    },
  ],
  practiceProblems: [
    { id: 10816, title: "숫자 카드 2", tier: "Silver IV", description: "해시/카운팅으로 빈도를 관리합니다." },
    { id: 1764, title: "듣보잡", tier: "Silver IV", description: "해시를 이용해 교집합을 찾습니다." },
    { id: 9375, title: "패션왕 신해빈", tier: "Silver III", description: "조합 계산을 해시로 보조합니다." },
  ],
};
