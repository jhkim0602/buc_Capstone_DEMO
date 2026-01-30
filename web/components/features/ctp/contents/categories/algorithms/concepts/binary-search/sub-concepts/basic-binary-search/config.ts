import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const BASIC_BINARY_SEARCH_CONFIG: CTPModuleConfig = {
  title: "기본 이분 탐색",
  description: "기본 이분 탐색의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Binary Search"],
  story: {
    problem: "정렬된 데이터에서 선형 탐색은 너무 느립니다.",
    definition: "이분 탐색은 **정렬된 배열**에서 탐색 구간을 절반씩 줄여 O(log N)으로 찾습니다.\n매 단계에서 mid를 기준으로 탐색 범위를 버리기 때문에 빠릅니다.\n\n**불변식**\n- target은 항상 [low, high] 구간 안에 존재할 수 있다.",
    analogy: "사전에서 중간부터 찾는 방식과 같습니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- low/high가 어떻게 좁혀지는지\n- mid가 이동하며 기준점을 바꾸는 순간\n- 찾았을 때 found_index가 확정되는 지점",
  },
  features: [
    { title: "조건: 정렬", description: "이분 탐색은 반드시 정렬된 배열에 적용합니다." },
    { title: "로그 시간", description: "매 단계마다 탐색 범위를 절반으로 줄입니다." },
    { title: "경계 처리", description: "low/high 업데이트가 잘못되면 무한 루프가 발생합니다." },
  ],
  complexity: {
    access: "O(1)",
    search: "O(log N)",
    insertion: "N/A",
    deletion: "N/A",
  },
  implementation: [
    {
      language: "python",
      description: "Iterative Binary Search",
      code: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Basic Binary Search
arr = [1, 3, 4, 6, 8, 9, 11]
target = 8

low, high = 0, len(arr) - 1
found_index = -1
active_index = -1

while low <= high:
    mid = (low + high) // 2
    active_index = mid
    if arr[mid] == target:
        found_index = mid
        break
    if arr[mid] < target:
        low = mid + 1
    else:
        high = mid - 1

arr = arr

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["arr", "target", "low", "high", "mid", "found_index"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 1920, title: "수 찾기", tier: "Silver IV", description: "이분 탐색 기본." },
    { id: 1764, title: "듣보잡", tier: "Silver IV", description: "정렬 후 이분 탐색." },
    { id: 10816, title: "숫자 카드 2", tier: "Silver IV", description: "이분 탐색/카운팅." },
  ],
};
