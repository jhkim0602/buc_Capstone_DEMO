import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DP_BASICS_CONFIG: CTPModuleConfig = {
  title: "DP 기본",
  description: "DP 기본의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Dynamic Programming"],
  story: {
    problem: "같은 부분 문제가 반복될 때 재귀는 비효율적입니다.",
    definition: "DP는 **부분 문제의 최적해를 저장**해 전체 문제를 해결합니다.\n같은 계산을 반복하지 않기 때문에 지수 시간 문제를 다항 시간으로 줄일 수 있습니다.\n\n**불변식**\n- dp[state]는 정의한 상태의 최적값을 항상 보존한다.",
    analogy: "이미 계산한 값을 노트에 적어두고 재사용합니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- dp 배열이 앞에서 뒤로 채워지는 흐름\n- 어떤 항이 어떤 이전 항을 참조하는지\n- active_index가 이동하는 속도",
  },
  features: [
    { title: "중복 제거", description: "Memoization/Tabulation으로 중복 계산을 제거합니다." },
    { title: "점화식 설계", description: "상태 정의와 전이 규칙이 핵심입니다." },
    { title: "상태 설계", description: "문제를 가장 작은 의미 단위로 쪼개는 능력이 중요합니다." },
  ],
  complexity: {
    access: "O(1)",
    search: "O(N)",
    insertion: "O(N)",
    deletion: "N/A",
  },
  implementation: [
    {
      language: "python",
      description: "Fibonacci DP",
      code: `dp = [0]*(n+1)
dp[1] = 1
for i in range(2, n+1):
    dp[i] = dp[i-1] + dp[i-2]
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# DP Basics: Fibonacci
n = 7
dp = [0 for _ in range(n + 1)]
dp[1] = 1
active_index = -1

for i in range(2, n + 1):
    active_index = i
    dp[i] = dp[i - 1] + dp[i - 2]

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
    { id: 1463, title: "1로 만들기", tier: "Silver III", description: "DP 기초." },
    { id: 9095, title: "1,2,3 더하기", tier: "Silver III", description: "DP 기초." },
    { id: 11726, title: "2×n 타일링", tier: "Silver III", description: "기초 DP." },
  ],
};
