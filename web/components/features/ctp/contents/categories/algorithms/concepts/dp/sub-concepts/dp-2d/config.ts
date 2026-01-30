import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DP_2D_CONFIG: CTPModuleConfig = {
  title: "2차원 DP",
  description: "2차원 DP의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Dynamic Programming"],
  story: {
    problem: "두 문자열/격자처럼 2축 상태가 필요한 문제가 많습니다.",
    definition: "2차원 DP는 상태가 **두 축(i, j)**으로 정의되는 경우를 다룹니다.\n보통 행/열을 채우면서 이전 행·열의 값을 참조합니다.\n\n**불변식**\n- dp[i][j]는 (i, j) 상태의 최적값을 유지합니다.",
    analogy: "표를 채워가며 최적 값을 찾는 방식입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- dp 테이블이 행/열 순서대로 채워지는 과정\n- 대각선/위/왼쪽 값을 참조하는 규칙\n- active_cell이 이동하는 패턴",
  },
  features: [
    { title: "2차원 상태", description: "LCS/격자 경로 등에서 사용됩니다." },
    { title: "테이블 채우기", description: "행/열 순서를 지키며 채웁니다." },
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
      description: "LCS DP",
      code: `for i in range(1, n+1):
    for j in range(1, m+1):
        if a[i-1] == b[j-1]:
            dp[i][j] = dp[i-1][j-1] + 1
        else:
            dp[i][j] = max(dp[i-1][j], dp[i][j-1])
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# 2D DP: LCS Table
a = "ABCBD"
b = "ABC"

active_cell = [0, 0]
dp = [[0 for _ in range(len(b) + 1)] for _ in range(len(a) + 1)]

for i in range(1, len(a) + 1):
    for j in range(1, len(b) + 1):
        active_cell = [i, j]
        if a[i - 1] == b[j - 1]:
            dp[i][j] = dp[i - 1][j - 1] + 1
        else:
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

grid = dp

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
    { id: 9251, title: "LCS", tier: "Gold V", description: "2D DP 기본." },
    { id: 1149, title: "RGB거리", tier: "Silver I", description: "2D DP 응용." },
    { id: 1932, title: "정수 삼각형", tier: "Silver I", description: "2D DP 응용." },
  ],
};
