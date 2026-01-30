import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DP_1D_CONFIG: CTPModuleConfig = {
  title: "1차원 DP",
  description: "1차원 DP의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Dynamic Programming"],
  story: {
    problem: "한 줄 배열로 상태를 축소할 수 있는 문제가 많습니다.",
    definition: "1차원 DP는 상태가 **하나의 인덱스**로 표현되는 경우를 다룹니다.\n대표적으로 합/최대값/최소값처럼 ‘앞에서부터 누적되는 상태’가 많습니다.\n\n**불변식**\n- dp[x]는 문제에서 정의한 x 상태의 최적값을 유지합니다.",
    analogy: "계단을 한 칸씩 올라가며 기록하는 것과 같습니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- dp[x]가 어떤 이전 상태를 참조하는지\n- 루프 방향이 결과에 영향을 주는 순간\n- 비교/갱신이 반복되는 흐름",
  },
  features: [
    { title: "공간 최적화", description: "2D를 1D로 압축할 수 있습니다." },
    { title: "반복 전이", description: "for 루프 방향이 결과에 영향을 줍니다." },
  ],
  complexity: {
    access: "O(1)",
    search: "O(N*M)",
    insertion: "O(N*M)",
    deletion: "N/A",
  },
  implementation: [
    {
      language: "python",
      description: "Coin Change (Min Coins)",
      code: `for c in coins:
    for x in range(c, target+1):
        dp[x] = min(dp[x], dp[x-c] + 1)
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# 1D DP: Coin Change (Min Coins)
coins = [1, 3, 4]
target = 6

INF = 10**9
dp = [INF for _ in range(target + 1)]
dp[0] = 0
active_index = -1
compare_indices = []

for c in coins:
    for x in range(c, target + 1):
        active_index = x
        compare_indices = [x - c]
        dp[x] = min(dp[x], dp[x - c] + 1)

arr = dp

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["dp", "result"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 1912, title: "연속합", tier: "Silver II", description: "1D DP 기본." },
    { id: 11057, title: "오르막 수", tier: "Silver I", description: "1D DP 응용." },
    { id: 9461, title: "파도반 수열", tier: "Silver III", description: "1D DP 응용." },
  ],
};
