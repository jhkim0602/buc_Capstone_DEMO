import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DP_PATTERNS_CONFIG: CTPModuleConfig = {
  title: "대표 패턴 (LIS/Knapsack)",
  description: "코딩 테스트에서 자주 등장하는 DP 패턴들을 학습합니다.",
  mode: "code",
  tags: ["Dynamic Programming", "LIS", "Knapsack", "Patterns"],
  story: {
    problem: `배열에서 가장 긴 증가하는 부분 수열(Longest Increasing Subsequence, LIS)을 찾는 문제를 생각해보세요.
[10, 20, 10, 30, 20, 50]에서 증가하는 부분 수열을 찾으면 [10, 20, 30, 50]처럼 길이 4인 수열이 가능합니다.
모든 부분 수열을 나열하면 2^N개이므로 완전 탐색은 지수 시간이 걸립니다.
하지만 이 문제는 DP의 대표적인 패턴 중 하나로, 효율적인 해법이 잘 알려져 있습니다.

배낭 문제(Knapsack)도 비슷합니다.
무게 제한이 있는 배낭에 가치가 다른 물건들을 넣을 때, 최대 가치를 어떻게 구할까요?
각 물건을 넣을지 말지 결정하는 모든 조합은 2^N개이므로 완전 탐색은 비현실적입니다.
이 역시 DP의 고전적인 패턴으로, 2차원 테이블로 효율적으로 해결할 수 있습니다.

이런 문제들은 처음 보면 어렵게 느껴지지만, 핵심 패턴을 알면 다양한 변형 문제에 적용할 수 있습니다.
LIS 패턴은 "이전 원소들을 참고하여 현재 길이를 갱신"하는 구조이고,
Knapsack 패턴은 "용량 축을 따라 최적값을 갱신"하는 구조입니다.
이 두 패턴만 확실히 익히면 수십 가지 변형 문제를 풀 수 있습니다.

DP 패턴 인식은 코딩 테스트와 면접에서 매우 중요합니다.
"이 문제 본 적 있어요!"라고 말할 수 있으려면 대표 패턴들을 체화해야 합니다.
LIS, LCS, Edit Distance, Knapsack, Coin Change 같은 패턴들은 수없이 반복되므로,
한 번 제대로 이해하면 비슷한 문제를 만났을 때 즉시 "아, 이건 LIS 변형이구나!" 하고 접근법이 떠오릅니다.`,
    definition: `DP 패턴은 자주 등장하는 문제 유형을 분류하고, 각 유형의 상태 정의와 점화식을 템플릿으로 정리한 것입니다.
처음 보는 문제도 패턴을 인식하면 기존 템플릿을 약간 변형하여 빠르게 해결할 수 있습니다.

대표적인 DP 패턴은 다음과 같습니다.
첫째, LIS(최장 증가 부분 수열): dp[i]를 "i번째 원소를 끝으로 하는 LIS 길이"로 정의하고, 이전의 더 작은 원소들을 모두 확인하여 최댓값+1을 선택합니다. 점화식은 dp[i] = max(dp[j] + 1) for j < i where arr[j] < arr[i]입니다.
둘째, Knapsack(배낭 문제): dp[w]를 "용량 w에서의 최대 가치"로 정의하고, 각 아이템에 대해 넣을지 말지 결정하며 테이블을 갱신합니다. 0/1 Knapsack은 역방향 순회, Unbounded Knapsack은 정방향 순회를 사용합니다.
셋째, LCS(최장 공통 부분 수열): dp[i][j]를 "첫 i개와 첫 j개 문자의 LCS"로 정의하고, 문자가 같으면 대각선+1, 다르면 위/왼쪽 최댓값을 선택합니다.
넷째, Edit Distance(편집 거리): LCS와 비슷하지만, 삽입/삭제/치환 비용을 고려하여 최소 비용을 계산합니다.

패턴 인식의 핵심은 문제에서 키워드를 찾는 것입니다.
"최장", "최대", "최소", "경우의 수" 같은 최적화 키워드가 나오고, 상태 공간이 명확하게 정의되면 DP를 의심해야 합니다.
그 다음 "부분 수열", "배낭", "문자열 비교", "격자 경로" 같은 힌트로 구체적인 패턴을 특정합니다.
예를 들어 "배열에서 조건을 만족하는 가장 긴 부분 수열"이라는 문구가 나오면 LIS 패턴이고,
"제한된 용량에서 최대 가치"라고 하면 Knapsack 패턴입니다.

DP 패턴의 불변식은 각 패턴마다 다릅니다.
LIS는 "dp[i]는 i를 반드시 포함하는 LIS 길이"여야 하며, 이를 어기면 일부 증가 수열을 놓칠 수 있습니다.
Knapsack은 "dp[w]는 용량 w에서의 진짜 최댓값"이어야 하며, 갱신 순서가 틀리면 같은 아이템을 중복 선택하거나 놓치게 됩니다.
패턴마다 고유한 불변식과 주의사항을 정확히 알아야 실수 없이 구현할 수 있습니다.`,
    analogy: `DP 패턴은 요리 레시피와 같습니다.
파스타를 만드는 기본 레시피를 알면, 토마토 파스타, 크림 파스타, 오일 파스타 등 수십 가지 변형을 쉽게 만들 수 있습니다.
마찬가지로 LIS의 기본 패턴을 알면, 최장 감소 부분 수열, 최장 증가 부분 수열의 개수, 가중치가 있는 LIS 등 다양한 변형 문제를 풀 수 있습니다.
핵심 재료와 조리법은 같고, 약간의 양념만 바꾸면 되는 것입니다.

LIS 패턴은 계단을 오르는 것에 비유할 수 있습니다.
각 계단(원소)에서 "지금까지 올라온 가장 긴 경로"를 기록합니다.
새로운 계단에 도착하면, 자신보다 낮은 모든 이전 계단들을 둘러보고 가장 긴 경로에 자신을 추가합니다.
예를 들어 높이 [10, 20, 10, 30]의 계단이 있다면, 30에 도착했을 때 10과 20을 거쳐온 경로가 가장 길므로 길이 3이 됩니다.

Knapsack 패턴은 퍼즐 맞추기와 같습니다.
배낭 용량이라는 제한된 공간에 최대한 가치 있는 조각들을 끼워 넣습니다.
각 조각(아이템)에 대해 "이걸 넣으면 더 좋아질까?"를 판단하며, 넣기로 결정하면 그만큼 공간이 줄어듭니다.
0/1 Knapsack은 각 조각을 한 번만 사용할 수 있고, Unbounded Knapsack은 같은 조각을 여러 번 사용할 수 있습니다.

실제 시스템에서 DP 패턴은 다양하게 활용됩니다.
주식 거래 전략은 Knapsack 변형으로 최대 수익을 계산합니다(거래 횟수 제한 = 용량).
자연어 처리의 품사 태깅은 LIS 변형으로 가장 적합한 품사 시퀀스를 찾습니다.
컴파일러 최적화는 Edit Distance로 코드 변환 비용을 최소화합니다.
게임 AI는 상태 공간을 DP로 탐색하여 최적 전략을 찾습니다.
추천 시스템은 LCS 변형으로 사용자 행동 패턴의 유사도를 측정합니다.`,
    playgroundDescription: `이번 플레이그라운드에서는 LIS 패턴의 핵심인 "이전 원소들을 참고하여 현재 길이 갱신"을 직접 확인할 수 있습니다.
다음 요소들을 집중해서 관찰해보세요.

첫째, dp[i]가 갱신되는 조건을 주목하세요.
active_index가 i일 때, compare_indices는 0부터 i-1까지의 모든 이전 원소들입니다.
하지만 실제로 갱신에 영향을 주는 것은 nums[j] < nums[i]인 원소들뿐입니다.
조건을 만족하는 j들 중에서 dp[j]가 가장 큰 값을 찾아 +1하는 과정을 관찰하세요.

둘째, 왜 dp[i]가 "i를 반드시 끝으로 포함하는 LIS 길이"로 정의되는지 이해하세요.
만약 dp[i]를 "0부터 i까지 전체에서의 LIS 길이"로 정의하면, 점화식을 세우기 어렵습니다.
i번째 원소를 포함할지 말지 명확하지 않기 때문입니다.
반면 "i를 반드시 포함"으로 정의하면, 이전의 더 작은 원소들만 확인하면 되므로 점화식이 간단해집니다.

셋째, 최종 답은 dp 배열 전체의 최댓값임을 확인하세요.
dp[n-1]이 아니라 max(dp)입니다. 왜냐하면 LIS가 마지막 원소에서 끝난다는 보장이 없기 때문입니다.
예를 들어 [10, 20, 30, 5]라면 LIS는 [10, 20, 30]이고, 마지막 원소 5는 포함되지 않습니다.

넷째, 이중 루프의 시간 복잡도가 O(N^2)임을 인식하세요.
각 i에 대해 모든 j < i를 확인하므로 N^2입니다.
더 빠른 O(N log N) 알고리즘(이진 탐색 사용)도 존재하지만, O(N^2) 방식이 더 직관적이고 변형 문제에 적용하기 쉽습니다.

이 실습을 통해 LIS 패턴의 "조건을 만족하는 이전 상태들 중 최댓값 선택"이라는 핵심 전략과,
"상태 정의를 명확히 하면 점화식이 자연스럽게 도출된다"는 DP 설계 원칙을 체득할 수 있습니다.`
  },
  features: [
    {
      title: "LIS 패턴 (순서 기반)",
      description: "dp[i]를 'i를 끝으로 하는 최장 증가 부분 수열 길이'로 정의하고, 이전의 더 작은 원소들을 모두 확인하여 최댓값+1을 선택합니다. 최장 감소, 가중치 LIS, LIS 개수 등 다양한 변형이 가능하며, O(N^2) 또는 O(N log N)으로 해결합니다."
    },
    {
      title: "Knapsack 패턴 (용량 기반)",
      description: "dp[w]를 '용량 w에서의 최대 가치'로 정의하고, 각 아이템을 넣을지 결정하며 테이블을 갱신합니다. 0/1 Knapsack(각 아이템 1번)은 역방향 순회, Unbounded Knapsack(무제한)은 정방향 순회를 사용하며, 루프 순서가 핵심입니다."
    },
    {
      title: "문자열 비교 패턴 (LCS, Edit Distance)",
      description: "두 문자열을 비교하는 2차원 DP 패턴입니다. LCS는 공통 부분 수열, Edit Distance는 최소 편집 비용을 구하며, 문자 일치 여부에 따라 대각선/위/왼쪽을 참조합니다. Git diff, 스펠 체커, DNA 서열 정렬 등에 활용됩니다."
    },
    {
      title: "패턴 인식 능력",
      description: "문제를 보고 어떤 DP 패턴을 적용할지 빠르게 판단하는 능력이 중요합니다. '최장 부분 수열'은 LIS, '제한된 용량 최대 가치'는 Knapsack, '문자열 비교'는 LCS/Edit Distance입니다. 키워드 인식이 문제 해결 속도를 결정합니다."
    },
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
      description: "LIS - O(N^2) 방식",
      code: `# dp[i] = i를 끝으로 하는 LIS 길이
dp = [1] * n  # 최소 길이는 자기 자신 1개

for i in range(n):
    for j in range(i):
        if nums[j] < nums[i]:
            dp[i] = max(dp[i], dp[j] + 1)

return max(dp)  # 전체 최댓값이 답`,
    },
    {
      language: "python",
      description: "0/1 Knapsack - 1D 공간 최적화",
      code: `# dp[w] = 용량 w에서의 최대 가치
dp = [0] * (W + 1)

for weight, value in items:
    # 역방향 순회 (각 아이템 1번만)
    for w in range(W, weight - 1, -1):
        dp[w] = max(dp[w], dp[w - weight] + value)

return dp[W]`,
    },
    {
      language: "python",
      description: "Unbounded Knapsack (무제한)",
      code: `# 각 아이템을 여러 번 사용 가능
dp = [0] * (W + 1)

for weight, value in items:
    # 정방향 순회 (중복 사용 허용)
    for w in range(weight, W + 1):
        dp[w] = max(dp[w], dp[w - weight] + value)

return dp[W]`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# LIS DP Pattern: 최장 증가 부분 수열
# dp[i] = i를 끝으로 하는 LIS의 길이

nums = [10, 20, 10, 30, 20, 50]

# 1단계: dp 배열 초기화
# - 모든 원소는 최소한 자기 자신 1개로 LIS를 만들 수 있음
dp = [1 for _ in range(len(nums))]
active_index = -1
compare_indices = []

# 2단계: 이중 루프로 dp 갱신
# - i번째 원소에 대해, 이전의 모든 j < i를 확인
for i in range(len(nums)):
    active_index = i  # 시각화: 현재 계산 중인 인덱스

    for j in range(i):
        compare_indices = [j]  # 시각화: 비교 중인 이전 원소

        # 조건: nums[j] < nums[i] (증가해야 함)
        if nums[j] < nums[i]:
            # dp[i]를 dp[j] + 1과 비교하여 갱신
            dp[i] = max(dp[i], dp[j] + 1)

# 3단계: 결과 확인
# - 최종 답은 dp의 최댓값 (마지막 원소가 아님!)
arr = dp
result = max(dp)

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
      id: 12865,
      title: "평범한 배낭",
      tier: "Gold V",
      description: "0/1 Knapsack의 정석 문제입니다. dp[i][w]를 'i번째 아이템까지 고려하고 용량 w일 때의 최대 가치'로 정의하거나, 공간 최적화로 dp[w]만 사용할 수 있습니다. 역방향 순회를 사용하여 각 아이템을 한 번만 선택하도록 해야 하며, 이는 Knapsack 패턴의 핵심입니다."
    },
    {
      id: 11053,
      title: "가장 긴 증가하는 부분 수열",
      tier: "Silver II",
      description: "LIS의 가장 기본 문제입니다. dp[i]를 'i를 끝으로 하는 LIS 길이'로 정의하고, O(N^2) 이중 루프로 해결합니다. 이 패턴을 정확히 익히면 LIS의 수많은 변형 문제(최장 감소, LIS 개수, 가중치 LIS 등)를 쉽게 풀 수 있습니다."
    },
    {
      id: 14002,
      title: "가장 긴 증가하는 부분 수열 4",
      tier: "Gold IV",
      description: "LIS의 길이뿐만 아니라 실제 수열을 복원하는 문제입니다. dp 배열과 함께 parent 배열을 유지하여 역추적합니다. LIS 패턴의 고급 응용으로, 최적해의 경로를 복원하는 기법을 연습할 수 있습니다."
    },
  ],
  guide: [
    {
      title: "1단계: LIS 패턴 기본",
      items: [
        {
          label: "dp 배열 초기화",
          code: "dp = [1] * n",
          description: "모든 원소는 최소한 자기 자신 1개로 길이 1인 증가 수열을 만듭니다. 이것이 기저 사례입니다.",
          tags: ["LIS", "Initialization"],
          isEditable: false
        },
        {
          label: "이중 루프",
          code: `for i in range(n):
    for j in range(i):
        if nums[j] < nums[i]:
            dp[i] = max(dp[i], dp[j] + 1)`,
          description: "i번째 원소에 대해 이전의 더 작은 원소들을 모두 확인하고, 그 중 dp[j]가 가장 큰 것에 +1합니다.",
          tags: ["LIS", "O(N^2)"],
          isEditable: false
        },
        {
          label: "최종 답",
          code: "return max(dp)",
          description: "LIS가 마지막 원소에서 끝난다는 보장이 없으므로, dp 전체의 최댓값이 답입니다.",
          tags: ["LIS", "Result"],
          isEditable: false
        }
      ]
    },
    {
      title: "2단계: 0/1 Knapsack 패턴",
      items: [
        {
          label: "dp 배열 초기화",
          code: "dp = [0] * (W + 1)",
          description: "dp[w]는 용량 w에서의 최대 가치입니다. 초기값은 모두 0입니다(아무것도 안 넣음).",
          tags: ["Knapsack", "Init"],
          isEditable: true
        },
        {
          label: "역방향 순회 (중요!)",
          code: `for weight, value in items:
    for w in range(W, weight - 1, -1):
        dp[w] = max(dp[w], dp[w - weight] + value)`,
          description: "역방향으로 순회해야 같은 아이템을 중복 선택하지 않습니다. 정방향이면 dp[w-weight]가 이미 현재 아이템을 포함한 값일 수 있습니다.",
          tags: ["Knapsack", "0/1", "Reverse"],
          isEditable: true
        }
      ]
    },
    {
      title: "3단계: Unbounded Knapsack 패턴",
      items: [
        {
          label: "정방향 순회",
          code: `for weight, value in items:
    for w in range(weight, W + 1):
        dp[w] = max(dp[w], dp[w - weight] + value)`,
          description: "정방향 순회로 같은 아이템을 여러 번 선택할 수 있습니다. dp[w]를 갱신할 때 이미 현재 아이템이 포함된 dp[w-weight]를 참조합니다.",
          tags: ["Knapsack", "Unbounded", "Forward"],
          isEditable: true
        },
        {
          label: "Coin Change 연결",
          code: `# Coin Change는 Unbounded Knapsack의 특수 케이스
for coin in coins:
    for amount in range(coin, target + 1):
        dp[amount] = min(dp[amount], dp[amount - coin] + 1)`,
          description: "동전 거스름돈 문제는 Unbounded Knapsack과 동일한 패턴입니다. 동전을 여러 번 사용할 수 있고, 최솟값을 찾는 것이 차이점입니다.",
          tags: ["Pattern Recognition"],
          isEditable: true
        }
      ]
    },
    {
      title: "4단계: LIS 최적화 및 변형 (Advanced)",
      items: [
        {
          label: "LIS 수열 복원",
          code: `# parent 배열로 역추적
parent = [-1] * n
for i in range(n):
    for j in range(i):
        if nums[j] < nums[i] and dp[j] + 1 == dp[i]:
            parent[i] = j
            break

# 역추적
result = []
idx = dp.index(max(dp))
while idx != -1:
    result.append(nums[idx])
    idx = parent[idx]
return result[::-1]`,
          description: "dp 배열만으로는 LIS의 길이만 알 수 있습니다. parent 배열을 유지하면 실제 수열을 복원할 수 있습니다.",
          tags: ["LIS", "Backtracking"],
          isEditable: true
        },
        {
          label: "O(N log N) LIS (Binary Search)",
          code: `# lis 배열: 길이 k인 증가 수열의 마지막 원소 최솟값
lis = []
for num in nums:
    pos = bisect.bisect_left(lis, num)
    if pos == len(lis):
        lis.append(num)
    else:
        lis[pos] = num
return len(lis)`,
          description: "이진 탐색을 사용하면 O(N log N)으로 개선됩니다. 하지만 실제 수열 복원은 더 복잡하므로, 길이만 필요할 때 사용합니다.",
          tags: ["LIS", "Optimization", "O(N log N)"],
          isEditable: true
        },
        {
          label: "LIS 개수 세기",
          code: `dp = [1] * n  # 길이
count = [1] * n  # 개수

for i in range(n):
    for j in range(i):
        if nums[j] < nums[i]:
            if dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                count[i] = count[j]
            elif dp[j] + 1 == dp[i]:
                count[i] += count[j]`,
          description: "dp와 count를 동시에 관리하면 최장 길이뿐만 아니라 그러한 수열의 개수도 구할 수 있습니다.",
          tags: ["LIS", "Count"],
          isEditable: true
        }
      ]
    }
  ]
};
