import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const COLLISION_CONFIG: CTPModuleConfig = {
  title: "충돌 처리 (Collision Handling)",
  description: "서로 다른 키가 같은 버킷으로 매핑될 때의 해결 전략을 학습합니다.",
  mode: "code",
  tags: ["Hash Table"],
  story: {
    problem: "좋은 해시 함수가 있어도 완벽하게 충돌을 피할 수는 없습니다. 해시 테이블의 성능은 결국 **충돌을 어떻게 처리하느냐**에 달려 있습니다.",
    definition: "충돌(Collision)은 서로 다른 키가 같은 인덱스로 매핑되는 현상입니다. 대표적인 해결 방식은 **체이닝(Chaining)**과 **오픈 어드레싱(Open Addressing)**입니다.\n\n**불변식**\n- 충돌이 발생해도 키는 반드시 동일한 규칙으로 같은 버킷에서만 찾는다.\n- 오픈 어드레싱은 빈 버킷을 찾되, 탐사 규칙(선형/이차/이중 해싱)을 반드시 따른다.",
    analogy: "사물함 번호가 겹쳤다면? 체이닝은 같은 번호의 사물함 옆에 줄을 서는 방식이고, 오픈 어드레싱은 다른 빈 사물함을 찾아 이동하는 방식입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- 같은 버킷으로 몰리는 충돌 상황\n- 체이닝: 같은 버킷 안에 줄이 늘어나는 모습\n- 오픈 어드레싱: probe_path가 이동하는 경로\n\n**실습 요약**\n- 체이닝/오픈 어드레싱의 차이를 비교\n- probe_path가 길어질수록 성능이 떨어짐을 이해",
  },
  features: [
    { title: "체이닝 (Chaining)", description: "각 버킷에 리스트를 두고 충돌된 키를 연결합니다. 구현이 단순하고 삭제가 쉽습니다." },
    { title: "오픈 어드레싱", description: "충돌 시 다른 빈 칸을 탐색합니다. 대표적으로 선형 탐사(Linear Probing)가 있습니다." },
    { title: "로드 팩터(Load Factor)", description: "저장된 요소 수 / 버킷 수. 높아질수록 충돌 확률이 커집니다." },
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
      description: "선형 탐사(Linear Probing) 방식의 단순 구현 예시입니다.",
      code: `class LinearProbingHash:
    def __init__(self, capacity=8):
        self.capacity = capacity
        self.keys = [None] * capacity
        self.values = [None] * capacity
        self.deleted = object()

    def _hash(self, key):
        return hash(key) % self.capacity

    def put(self, key, value):
        idx = self._hash(key)
        for _ in range(self.capacity):
            if self.keys[idx] is None or self.keys[idx] is self.deleted or self.keys[idx] == key:
                self.keys[idx] = key
                self.values[idx] = value
                return True
            idx = (idx + 1) % self.capacity
        return False

    def get(self, key):
        idx = self._hash(key)
        for _ in range(self.capacity):
            if self.keys[idx] is None:
                return None
            if self.keys[idx] == key:
                return self.values[idx]
            idx = (idx + 1) % self.capacity
        return None

    def delete(self, key):
        idx = self._hash(key)
        for _ in range(self.capacity):
            if self.keys[idx] is None:
                return False
            if self.keys[idx] == key:
                self.keys[idx] = self.deleted
                self.values[idx] = None
                return True
            idx = (idx + 1) % self.capacity
        return False`
    },
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Collision Handling (Chaining)
capacity = 5
buckets = [[] for _ in range(capacity)]
probe_path = []


def hash_key(key):
    return sum(ord(c) for c in key) % capacity


def put(key, value):
    global last_index, active_bucket
    idx = hash_key(key)
    active_bucket = idx
    last_index = idx
    buckets[idx].append([key, value])


def probe_insert(start_idx, occupied):
    # 선형 탐사 경로를 기록 (open addressing 데모)
    idx = start_idx
    while occupied[idx]:
        probe_path.append(idx)
        idx = (idx + 1) % capacity
    probe_path.append(idx)
    return idx

# 충돌 유도 (동일 버킷)
put("ab", 1)
put("ba", 2)
put("abc", 3)
put("cab", 4)

# 선형 탐사 경로 데모
occupied = [True, True, False, True, False]
probe_insert(hash_key("collision"), occupied)

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["buckets", "probe_path", "last_index"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 10816, title: "숫자 카드 2", tier: "Silver IV", description: "해시/카운팅으로 빈도 관리." },
    { id: 1764, title: "듣보잡", tier: "Silver IV", description: "해시로 교집합을 구합니다." },
    { id: 7785, title: "회사에 있는 사람", tier: "Silver V", description: "해시로 출입 기록 관리." },
  ],
};
