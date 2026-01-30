import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DP_2D_CONFIG: CTPModuleConfig = {
  title: "2차원 DP",
  description: "두 개의 축으로 상태를 표현하는 2차원 동적 계획법을 학습합니다.",
  mode: "code",
  tags: ["Dynamic Programming", "2D Table", "Grid DP"],
  story: {
    problem: `로봇이 격자의 왼쪽 위에서 오른쪽 아래로 이동하는 경로의 수를 세는 문제를 생각해보세요.
로봇은 오른쪽 또는 아래로만 한 칸씩 이동할 수 있습니다.
3x3 격자라면 손으로 세어볼 수 있지만, 10x10만 되어도 경우의 수가 수천 가지를 넘어 직접 세기 불가능합니다.
모든 경로를 탐색하는 재귀 방식은 지수 시간이 걸려 실용적이지 않습니다.

두 문자열의 최장 공통 부분 수열(Longest Common Subsequence, LCS)을 찾는 문제도 비슷합니다.
"ABCBD"와 "ABC"의 LCS는 "ABC"이고 길이는 3입니다.
완전 탐색으로 모든 부분 수열 조합을 비교하면 지수 시간이 걸리며, 문자열이 길어지면 계산이 불가능해집니다.
이런 문제들의 공통점은 상태를 두 개의 축으로 표현해야 한다는 것입니다.

2차원 DP는 이런 문제들을 해결합니다.
dp[i][j]를 "(i, j) 위치까지의 최적값"으로 정의하고, 이전 행과 열의 값들(dp[i-1][j], dp[i][j-1], dp[i-1][j-1] 등)로부터
현재 칸을 계산하는 점화식을 찾으면, 이중 반복문으로 테이블 전체를 O(N×M) 시간에 채울 수 있습니다.
행과 열을 순서대로 채워나가면서 2차원 정보를 누적하는 것이 핵심입니다.

2차원 DP는 문자열, 격자, 배낭 문제 등 다양한 영역에서 등장합니다.
"두 시퀀스의 비교", "격자 경로", "배낭 문제" 같은 키워드가 나오면 2차원 상태 공간을 떠올려야 합니다.
특히 LCS와 Edit Distance는 면접에서 매우 빈번하게 출제되므로 테이블 채우는 과정을 정확히 이해해야 합니다.`,
    definition: `2차원 DP는 상태 공간이 두 개의 축(보통 i와 j)으로 표현되는 동적 계획법 문제를 다룹니다.
dp[i][j]는 "행 i, 열 j 위치까지의 최적값" 또는 "첫 번째 시퀀스 i번째, 두 번째 시퀀스 j번째까지 고려한 결과" 같은 의미를 가지며,
이 값은 이전 행, 열, 대각선의 값들을 이용해 계산됩니다.

2차원 DP의 핵심 구조는 다음과 같습니다.
첫째, 상태 정의: dp[i][j]가 무엇을 의미하는지 명확히 정의합니다. 격자 경로 문제에서는 "(0,0)에서 (i,j)까지 가는 경로 수"입니다.
둘째, 기저 사례: 첫 행과 첫 열을 직접 초기화합니다. 격자 문제에서 첫 행은 모두 오른쪽으로만 가므로 1입니다.
셋째, 점화식: dp[i][j]를 주변 칸들로부터 계산하는 규칙을 찾습니다. 격자는 dp[i][j] = dp[i-1][j] + dp[i][j-1]입니다.
넷째, 계산 순서: 행을 위에서 아래로, 각 행 내에서는 왼쪽에서 오른쪽으로 채웁니다. 이 순서를 지켜야 필요한 값들이 이미 계산되어 있습니다.

2차원 DP의 불변식(Invariant)은 다음과 같습니다.
모든 (i, j)에 대해 dp[i][j]는 문제 정의에 따른 정확한 최적값을 유지해야 합니다.
예를 들어 LCS 문제라면 dp[i][j]는 항상 첫 i개 문자와 첫 j개 문자의 진짜 최장 공통 부분 수열 길이여야 하며,
만약 한 칸이라도 틀리면 그 이후 모든 칸이 연쇄적으로 잘못 계산됩니다.

2차원 DP는 종종 1차원으로 압축할 수 있습니다.
예를 들어 LCS는 dp[i][j]가 dp[i-1][j], dp[i][j-1], dp[i-1][j-1]만 참조하므로, 이전 행 하나만 유지하면 됩니다.
이렇게 하면 O(N×M) 공간을 O(M)으로 줄일 수 있지만, 역추적(backtracking)으로 실제 경로를 복원하기는 어려워집니다.
공간 최적화와 경로 복원 중 무엇이 더 중요한지 문제 요구사항에 따라 판단해야 합니다.`,
    analogy: `2차원 DP는 표를 채워가며 퍼즐을 푸는 것과 같습니다.
크로스워드 퍼즐에서 한 칸을 채우려면 위쪽과 왼쪽의 단어들을 참고해야 하듯이,
2차원 DP도 현재 칸을 채우려면 위쪽, 왼쪽, 대각선 왼쪽 위의 값들을 참고합니다.
표의 첫 행과 첫 열을 먼저 채우고, 그 다음부터는 이미 채워진 값들을 보면서 나머지 칸들을 차례로 채워나갑니다.

격자 경로 문제는 체스판 위에서 룩(Rook)이 움직이는 것에 비유할 수 있습니다.
왼쪽 위 코너에서 시작하여 오른쪽 아래 코너까지 가되, 오른쪽이나 아래로만 이동할 수 있습니다.
각 칸에 "여기까지 오는 경우의 수"를 적어두면, 현재 칸의 값은 바로 위 칸과 바로 왼쪽 칸의 값을 더한 것입니다.
왜냐하면 현재 칸에 도달하려면 위에서 내려오거나 왼쪽에서 오는 두 가지 방법밖에 없기 때문입니다.

LCS 문제는 두 사람이 각자 문자열을 읽어가면서 일치하는 부분을 표시하는 것과 같습니다.
한 사람이 "ABCBD"를, 다른 사람이 "ABC"를 읽습니다.
테이블의 (i, j) 칸은 "첫 사람이 i번째까지, 두 번째 사람이 j번째까지 읽었을 때의 최장 일치 길이"를 기록합니다.
만약 현재 문자가 같으면(A==A) 대각선 왼쪽 위의 값에 1을 더하고, 다르면 위쪽과 왼쪽 중 큰 값을 선택합니다.

실제 시스템에서 2차원 DP는 다양하게 활용됩니다.
Git의 diff 알고리즘은 Edit Distance(편집 거리) 2차원 DP로 두 파일의 차이를 계산하며 최소 변경 사항을 찾습니다.
생물정보학의 서열 정렬(Sequence Alignment)은 DNA/단백질 서열을 비교할 때 LCS 변형 알고리즘을 사용합니다.
이미지 처리의 Seam Carving은 2차원 DP로 최소 에너지 경로를 찾아 이미지를 리사이징합니다.
게임 개발에서 타일 기반 맵의 최단 경로는 2차원 DP 또는 Dijkstra로 계산됩니다.
텍스트 에디터의 스펠 체커는 편집 거리 DP로 오타와 가장 비슷한 단어를 추천합니다.`,
    playgroundDescription: `이번 플레이그라운드에서는 2차원 DP의 핵심인 "테이블을 행/열 순서로 채우며 최적값 갱신"을 직접 확인할 수 있습니다.
다음 요소들을 집중해서 관찰해보세요.

첫째, dp 테이블이 어떤 순서로 채워지는지 주목하세요.
보통 첫 행(i=0)을 먼저 채우고, 두 번째 행(i=1)을 왼쪽에서 오른쪽으로 채우는 식으로 진행됩니다.
active_cell이 (1,1) → (1,2) → (1,3) → (2,1) → (2,2)... 순서로 이동하는 것을 확인하세요.
이 순서를 지켜야 현재 칸을 계산할 때 필요한 이전 칸들이 이미 채워져 있습니다.

둘째, 현재 칸이 어떤 이전 칸들(위쪽, 왼쪽, 대각선)을 참조하는지 관찰하세요.
LCS 문제에서 문자가 일치하면 dp[i][j] = dp[i-1][j-1] + 1이고, 일치하지 않으면 dp[i][j] = max(dp[i-1][j], dp[i][j-1])입니다.
시각화에서 화살표나 하이라이트로 참조하는 칸들이 표시되는지 확인하세요.

셋째, 문자가 일치하는 순간과 일치하지 않는 순간의 계산 방식 차이를 관찰하세요.
예를 들어 "ABCBD"의 'C'와 "ABC"의 'C'를 비교할 때(i=3, j=3), 문자가 같으므로 대각선 왼쪽 위 값(dp[2][2])에 1을 더합니다.
반면 'B'와 'C'를 비교할 때는 위쪽과 왼쪽 중 큰 값을 선택합니다.

넷째, 최종 답이 테이블의 어느 위치에 저장되는지 확인하세요.
LCS는 dp[len(a)][len(b)], 즉 테이블의 오른쪽 아래 코너에 최종 답이 있습니다.
격자 경로 문제도 마찬가지로 목적지 칸에 답이 저장됩니다.

이 실습을 통해 2차원 DP의 "테이블을 체계적으로 채우며 복잡한 문제를 단순화"하는 전략과,
"각 칸의 값은 주변 칸들의 값으로부터 O(1)에 계산된다"는 효율성을 체득할 수 있습니다.`
  },
  features: [
    {
      title: "2차원 상태 공간",
      description: "상태를 두 개의 축(행과 열)으로 표현하여 복잡한 관계를 모델링합니다. 두 시퀀스의 비교(LCS, Edit Distance), 격자 경로, 배낭 문제 등에서 필수적이며, dp[i][j]의 의미를 정확히 정의하는 것이 성공의 열쇠입니다."
    },
    {
      title: "테이블 채우기 순서",
      description: "행을 위에서 아래로, 각 행 내에서는 왼쪽에서 오른쪽으로 순차적으로 채웁니다. 이 순서를 지키면 현재 칸을 계산할 때 필요한 이전 칸들(위, 왼쪽, 대각선)이 항상 이미 계산되어 있어 안전합니다."
    },
    {
      title: "다방향 참조 패턴",
      description: "2차원 DP는 위쪽(dp[i-1][j]), 왼쪽(dp[i][j-1]), 대각선(dp[i-1][j-1])을 참조하는 경우가 많습니다. 문제에 따라 참조 방향이 달라지며, LCS는 3방향, 격자 경로는 2방향(위+왼쪽)을 사용합니다."
    },
    {
      title: "공간 최적화 가능",
      description: "많은 2차원 DP는 현재 행이 이전 행만 참조하므로, 전체 테이블 대신 두 개의 행 배열만 유지하면 O(N×M) 공간을 O(M)으로 줄일 수 있습니다. 하지만 실제 경로 복원이 필요하면 전체 테이블을 유지해야 합니다."
    },
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
      description: "LCS (최장 공통 부분 수열)",
      code: `# 두 문자열 a, b의 LCS 길이 구하기
n, m = len(a), len(b)
dp = [[0] * (m + 1) for _ in range(n + 1)]

for i in range(1, n + 1):
    for j in range(1, m + 1):
        if a[i-1] == b[j-1]:
            dp[i][j] = dp[i-1][j-1] + 1  # 일치: 대각선 +1
        else:
            dp[i][j] = max(dp[i-1][j], dp[i][j-1])  # 불일치: 위/왼쪽 최댓값

return dp[n][m]`,
    },
    {
      language: "python",
      description: "격자 경로 (경로의 수)",
      code: `# (0,0)에서 (n-1, m-1)까지 가는 경로 수
dp = [[0] * m for _ in range(n)]
dp[0][0] = 1

# 첫 행과 첫 열 초기화
for i in range(n):
    dp[i][0] = 1
for j in range(m):
    dp[0][j] = 1

for i in range(1, n):
    for j in range(1, m):
        dp[i][j] = dp[i-1][j] + dp[i][j-1]

return dp[n-1][m-1]`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# 2D DP: LCS (최장 공통 부분 수열)
# dp[i][j] = a의 첫 i개 문자와 b의 첫 j개 문자의 LCS 길이

a = "ABCBD"
b = "ABC"

# 1단계: dp 테이블 초기화
# - dp[0][j] = 0 (빈 문자열과의 LCS는 0)
# - dp[i][0] = 0 (빈 문자열과의 LCS는 0)
active_cell = [0, 0]
dp = [[0 for _ in range(len(b) + 1)] for _ in range(len(a) + 1)]

# 2단계: 테이블 채우기
# - 행을 위에서 아래로, 열을 왼쪽에서 오른쪽으로
for i in range(1, len(a) + 1):
    for j in range(1, len(b) + 1):
        active_cell = [i, j]  # 시각화: 현재 계산 중인 칸

        if a[i - 1] == b[j - 1]:
            # 문자 일치: 대각선 왼쪽 위 값 + 1
            dp[i][j] = dp[i - 1][j - 1] + 1
        else:
            # 문자 불일치: 위쪽과 왼쪽 중 큰 값
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

# 3단계: 결과 확인
# - dp[len(a)][len(b)]가 최종 LCS 길이
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
    {
      id: 9251,
      title: "LCS",
      tier: "Gold V",
      description: "두 문자열의 최장 공통 부분 수열(LCS) 길이를 구하는 문제입니다. dp[i][j]를 '첫 i개 문자와 첫 j개 문자의 LCS 길이'로 정의하고, 문자가 일치하면 대각선+1, 불일치하면 위/왼쪽 최댓값을 선택합니다. 2차원 DP의 가장 대표적인 문제로, 면접에서도 자주 출제됩니다."
    },
    {
      id: 1149,
      title: "RGB거리",
      tier: "Silver I",
      description: "N개 집을 빨강/초록/파랑으로 칠하되 인접한 집은 다른 색이어야 할 때 최소 비용을 구하는 문제입니다. dp[i][c]를 'i번째 집을 색 c로 칠할 때의 최소 비용'으로 정의하면, dp[i][R] = cost[i][R] + min(dp[i-1][G], dp[i-1][B])처럼 이전 행의 다른 색 중 최솟값을 선택합니다. 상태 정의와 전이 규칙 설계를 연습하기 좋은 문제입니다."
    },
    {
      id: 1932,
      title: "정수 삼각형",
      tier: "Silver I",
      description: "삼각형 모양으로 배치된 수들을 꼭대기에서 바닥까지 내려가며 합을 최대화하는 문제입니다. dp[i][j]를 'i행 j번째 위치까지의 최댓값'으로 정의하고, dp[i][j] = triangle[i][j] + max(dp[i-1][j-1], dp[i-1][j])로 계산합니다. 격자 DP의 변형이며, 대각선 참조 패턴을 익히기 좋습니다."
    },
  ],
  guide: [
    {
      title: "1단계: 테이블 초기화",
      items: [
        {
          label: "2D 배열 생성",
          code: "dp = [[0] * (m + 1) for _ in range(n + 1)]",
          description: "행 n+1개, 열 m+1개의 2차원 테이블을 만듭니다. +1은 빈 문자열/0번째 상태를 표현하기 위함입니다.",
          tags: ["Initialization"],
          isEditable: false
        },
        {
          label: "첫 행/열 초기화",
          code: "dp[0][j] = 0  # 빈 문자열\ndp[i][0] = 0  # 빈 문자열",
          description: "LCS에서 첫 행과 첫 열은 모두 0입니다(빈 문자열과의 LCS는 0). 문제에 따라 초기값이 다를 수 있습니다.",
          tags: ["Base Case"],
          isEditable: false
        }
      ]
    },
    {
      title: "2단계: 이중 루프로 테이블 채우기",
      items: [
        {
          label: "행 순회",
          code: "for i in range(1, n + 1):",
          description: "행을 위에서 아래로 순회합니다. 1부터 시작하는 이유는 0번째 행은 이미 초기화되었기 때문입니다.",
          tags: ["Loop", "Row"],
          isEditable: true
        },
        {
          label: "열 순회",
          code: "for j in range(1, m + 1):",
          description: "각 행 내에서 열을 왼쪽에서 오른쪽으로 순회합니다. 이 순서를 지키면 왼쪽과 위쪽 칸이 항상 먼저 계산됩니다.",
          tags: ["Loop", "Column"],
          isEditable: true
        },
        {
          label: "문자 일치 시",
          code: "if a[i-1] == b[j-1]:\n    dp[i][j] = dp[i-1][j-1] + 1",
          description: "현재 문자가 같으면 대각선 왼쪽 위 값에 1을 더합니다. 공통 부분 수열이 1개 더 길어집니다.",
          tags: ["Match", "Diagonal"],
          isEditable: true
        },
        {
          label: "문자 불일치 시",
          code: "else:\n    dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
          description: "현재 문자가 다르면 위쪽(한 문자 건너뜀)과 왼쪽(다른 문자 건너뜀) 중 큰 값을 선택합니다.",
          tags: ["Mismatch", "Max"],
          isEditable: true
        }
      ]
    },
    {
      title: "3단계: 격자 경로 패턴",
      items: [
        {
          label: "기저 사례 (격자)",
          code: "dp[0][0] = 1\nfor i in range(n): dp[i][0] = 1\nfor j in range(m): dp[0][j] = 1",
          description: "첫 행과 첫 열은 모두 1입니다. 오른쪽 또는 아래로만 가므로 경로는 1가지뿐입니다.",
          tags: ["Grid", "Path"],
          isEditable: true
        },
        {
          label: "점화식 (격자)",
          code: `for i in range(1, n):
    for j in range(1, m):
        dp[i][j] = dp[i-1][j] + dp[i][j-1]`,
          description: "현재 칸에 도달하는 경로는 위에서 내려오거나 왼쪽에서 오는 두 가지입니다. 경우의 수를 더합니다.",
          tags: ["Grid", "Count"],
          isEditable: true
        }
      ]
    },
    {
      title: "4단계: 역추적 및 최적화 (Advanced)",
      items: [
        {
          label: "LCS 문자열 복원",
          code: `result = []
i, j = n, m
while i > 0 and j > 0:
    if a[i-1] == b[j-1]:
        result.append(a[i-1])
        i -= 1; j -= 1
    elif dp[i-1][j] > dp[i][j-1]:
        i -= 1
    else:
        j -= 1
return ''.join(reversed(result))`,
          description: "테이블을 역추적하여 실제 LCS 문자열을 복원합니다. 오른쪽 아래에서 시작하여 어느 방향에서 왔는지 추적합니다.",
          tags: ["Backtracking"],
          isEditable: true
        },
        {
          label: "공간 최적화 (Rolling Array)",
          code: `prev = [0] * (m + 1)
for i in range(1, n + 1):
    curr = [0] * (m + 1)
    for j in range(1, m + 1):
        if a[i-1] == b[j-1]:
            curr[j] = prev[j-1] + 1
        else:
            curr[j] = max(prev[j], curr[j-1])
    prev = curr`,
          description: "현재 행이 이전 행만 참조하므로 두 개의 1D 배열로 충분합니다. O(N×M) 공간을 O(M)으로 줄입니다.",
          tags: ["Space Optimization"],
          isEditable: true
        }
      ]
    }
  ]
};
