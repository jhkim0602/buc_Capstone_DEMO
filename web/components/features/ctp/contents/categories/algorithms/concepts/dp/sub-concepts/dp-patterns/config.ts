import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DP_PATTERNS_CONFIG: CTPModuleConfig = {
  title: "대표 패턴 (LIS/Knapsack)",
  description: "대표 패턴 (LIS/Knapsack)의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Dynamic Programming"],
  story: {
    problem: "DP는 문제마다 비슷한 패턴이 반복됩니다.",
    definition: "LIS/Knapsack은 대표적인 DP 패턴입니다.\nLIS는 “이전 원소를 참고해 길이를 갱신”하는 **순서 기반 패턴**, Knapsack은 “용량 축을 따라 최적값을 갱신”하는 **용량 기반 패턴**입니다.\n\n**불변식**\n- LIS: dp[i]는 i를 끝으로 하는 최장 증가 부분 수열 길이\n- Knapsack: dp[w]는 용량 w에서 가능한 최댓값",
    analogy: "자주 나오는 공식 문제를 템플릿으로 익히는 것과 같습니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- LIS에서 dp[i]가 갱신되는 조건\n- 이전 상태(dp[j])가 어떻게 영향을 주는지\n- 동일 패턴이 다른 문제에 재사용되는 방식",
  },
  features: [
    { title: "LIS 패턴", description: "앞쪽 상태를 이용해 현재 길이를 갱신합니다." },
    { title: "Knapsack 패턴", description: "용량 축을 기준으로 상태를 갱신합니다." },
  ],
  complexity: {
    access: "O(1)",
    search: "O(N^2) or O(N log N)",
    insertion: "O(N^2)",
    deletion: "N/A",
  },
  implementation: [
    {
      language: "python",
      description: "LIS (O(N^2))",
      code: `for i in range(n):
    for j in range(i):
        if nums[j] < nums[i]:
            dp[i] = max(dp[i], dp[j] + 1)
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# LIS DP Pattern (Lengths)
nums = [10, 20, 10, 30, 20, 50]
dp = [1 for _ in range(len(nums))]
active_index = -1
compare_indices = []

for i in range(len(nums)):
    active_index = i
    for j in range(i):
        compare_indices = [j]
        if nums[j] < nums[i]:
            dp[i] = max(dp[i], dp[j] + 1)

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
    { id: 12865, title: "평범한 배낭", tier: "Gold V", description: "0/1 Knapsack." },
    { id: 11053, title: "가장 긴 증가하는 부분 수열", tier: "Silver II", description: "LIS 기본." },
    { id: 14002, title: "가장 긴 증가하는 부분 수열 4", tier: "Gold IV", description: "LIS 복원." },
  ],
};
