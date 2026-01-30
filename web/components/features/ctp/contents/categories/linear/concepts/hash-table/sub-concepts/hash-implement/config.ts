import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const HASH_IMPLEMENT_CONFIG: CTPModuleConfig = {
  title: "해시 구현",
  description: "해시 함수/버킷/리사이징까지 포함한 간단한 해시 테이블을 구현합니다.",
  mode: "code",
  tags: ["Hash Table"],
  story: {
    problem: "해시 테이블은 평균 O(1)이지만, 요소가 많아지면 충돌이 늘어나 속도가 급격히 떨어집니다. 이를 막기 위한 **리사이징(Resize)** 규칙이 필요합니다.",
    definition: "해시 테이블 구현은 **해시 함수, 버킷 배열, 충돌 처리, 로드 팩터 기준 리사이징**으로 구성됩니다.\n리사이징은 비싸지만, 전체 평균 성능을 안정적으로 유지하는 핵심 장치입니다.\n\n**불변식**\n- resize 이후에도 모든 키는 새로운 capacity 기준으로 재배치된다.\n- load factor 임계치를 넘기지 않도록 관리한다.",
    analogy: "사물함이 꽉 차면 더 큰 사물함 건물로 이사(리해시)합니다. 주소(인덱스)가 바뀌므로 모든 짐을 다시 배치해야 합니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- load_factor 임계치를 넘는 순간 rehash가 시작되는지\n- 버킷 수가 두 배로 늘어나며 모든 키가 재배치되는 흐름\n- rehash 중에 active_bucket/rehash_bucket이 어떻게 움직이는지\n\n**실습 요약**\n- rehash는 느리지만 전체 평균 성능을 지키는 장치임을 이해\n- 버킷 수가 바뀌면 모든 키의 위치가 바뀐다는 점 확인",
  },
  features: [
    { title: "로드 팩터 기반 리사이징", description: "저장된 요소 수 / 버킷 수가 임계치(예: 0.75)를 넘으면 확장합니다." },
    { title: "리해시(Rehash)", description: "버킷 수가 바뀌면 모든 키의 인덱스를 다시 계산해야 합니다." },
    { title: "평균 O(1) 유지", description: "리사이징 덕분에 평균 성능이 안정적으로 유지됩니다." },
    { title: "Amortized 분석", description: "리사이즈는 비싸지만 전체 삽입 비용은 평균적으로 O(1)입니다." },
  ],
  complexity: {
    access: "O(1) avg / O(N) worst",
    search: "O(1) avg / O(N) worst",
    insertion: "O(1) avg (resize 포함 시 amortized)",
    deletion: "O(1) avg / O(N) worst",
  },
  implementation: [
    {
      language: "python",
      description: "체이닝 + 리사이징을 포함한 최소 구현입니다.",
      code: `class HashTable:
    def __init__(self, capacity=8, load_factor=0.75):
        self.capacity = capacity
        self.load_factor = load_factor
        self.size = 0
        self.buckets = [[] for _ in range(capacity)]

    def _hash(self, key):
        return hash(key) % self.capacity

    def _rehash(self):
        old = self.buckets
        self.capacity *= 2
        self.buckets = [[] for _ in range(self.capacity)]
        self.size = 0
        for bucket in old:
            for k, v in bucket:
                self.put(k, v)

    def put(self, key, value):
        if (self.size + 1) / self.capacity > self.load_factor:
            self._rehash()
        idx = self._hash(key)
        bucket = self.buckets[idx]
        for i, (k, _) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))
        self.size += 1

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
                self.size -= 1
                return True
        return False`
    },
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Hash Table with Resize (Chaining)
load_factor = 0.75
size = 0
capacity = 4
buckets = [[] for _ in range(capacity)]
rehashing = False
rehash_bucket = -1
rehash_key = None
rehash_value = None
active_bucket = -1
last_index = -1


def hash_key(key):
    return hash(key) % capacity


def rehash():
    global buckets, capacity, size, rehashing, rehash_bucket, rehash_key, rehash_value
    rehashing = True
    old = buckets
    capacity *= 2
    buckets = [[] for _ in range(capacity)]
    size = 0
    for i, bucket in enumerate(old):
        rehash_bucket = i
        for k, v in bucket:
            rehash_key = k
            rehash_value = v
            put(k, v)
    rehash_bucket = -1
    rehash_key = None
    rehash_value = None
    rehashing = False


def put(key, value):
    global size, last_index, active_bucket
    if not rehashing and (size + 1) / capacity > load_factor:
        rehash()
    idx = hash_key(key)
    last_index = idx
    active_bucket = idx
    buckets[idx].append([key, value])
    size += 1

# 시나리오: 리사이즈 유도
put("a", 1)
put("b", 2)
put("c", 3)
put("d", 4)
put("e", 5)

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["table", "size", "capacity", "rehash_bucket"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 14425, title: "문자열 집합", tier: "Silver III", description: "해시/집합 기본." },
    { id: 1620, title: "나는야 포켓몬 마스터 이다솜", tier: "Silver IV", description: "양방향 해시 사용." },
    { id: 13414, title: "수강신청", tier: "Silver II", description: "삽입/갱신 동작을 구현." },
  ],
};
