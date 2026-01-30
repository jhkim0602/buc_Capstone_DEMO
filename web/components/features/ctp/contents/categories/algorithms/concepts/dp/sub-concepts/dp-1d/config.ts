import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DP_1D_CONFIG: CTPModuleConfig = {
  title: "1차원 DP",
  description: "하나의 인덱스로 상태를 표현하는 1차원 동적 계획법을 학습합니다.",
  mode: "code",
  tags: ["Dynamic Programming", "1D Array", "State Transition"],
  story: {
    problem: `계단을 오르는 방법의 수를 세는 문제를 생각해보세요.
한 번에 1칸 또는 2칸씩 오를 수 있다면, N번째 계단까지 가는 경우의 수는 몇 가지일까요?
처음에는 모든 경우를 직접 세려고 시도하지만, 계단이 10개만 넘어가도 경우의 수가 급격히 늘어나 손으로 세기 어려워집니다.
완전 탐색으로 모든 가능한 경로를 탐색하면 지수 시간이 걸려 실용적이지 않습니다.

동전 거스름돈 문제도 비슷합니다.
1원, 3원, 4원 동전으로 6원을 만드는 최소 동전 개수를 구하려면 어떻게 해야 할까요?
모든 조합을 시도하는 것은 비효율적이며, 동전 종류와 금액이 커지면 계산이 불가능해집니다.
이런 문제들은 공통점이 있습니다. 상태를 "몇 번째 위치" 또는 "얼마의 금액"처럼 하나의 숫자로 표현할 수 있다는 것입니다.

1차원 DP는 이런 문제들을 해결합니다.
dp[i]를 "i번째 상태의 최적값"으로 정의하고, 이전 상태들(dp[i-1], dp[i-2] 등)로부터 현재 상태를 계산하는 점화식을 찾으면
단순한 반복문으로 모든 답을 O(N) 시간에 구할 수 있습니다.
앞에서부터 차례로 테이블을 채워나가면서 누적된 정보를 활용하는 것이 핵심입니다.

1차원 DP는 코딩 테스트에서 가장 자주 등장하는 패턴 중 하나입니다.
"최소 비용", "경우의 수", "최댓값" 같은 키워드가 나오고 상태가 한 축으로 표현되면 1차원 DP를 떠올려야 합니다.
특히 "앞에서부터 누적"되는 개념을 이해하면 다양한 변형 문제에도 적용할 수 있습니다.`,
    definition: `1차원 DP는 상태 공간이 하나의 축(보통 인덱스 i)으로 표현되는 동적 계획법 문제를 다룹니다.
dp[i]는 "i번째 위치까지 왔을 때의 최적값" 또는 "금액 i를 만드는 최소 비용" 같은 의미를 가지며,
이 값은 이전 상태들의 값을 이용해 계산됩니다.

1차원 DP의 핵심 구조는 다음과 같습니다.
첫째, 상태 정의: dp[i]가 무엇을 의미하는지 명확히 정의합니다. 예를 들어 계단 문제에서는 "i번째 계단까지 오르는 경우의 수"입니다.
둘째, 기저 사례: 가장 작은 문제의 답을 직접 설정합니다. 계단 0개는 1가지(아무것도 안 오름), 계단 1개는 1가지(1칸 오름) 식입니다.
셋째, 점화식: dp[i]를 이전 상태들로부터 계산하는 규칙을 찾습니다. 계단은 dp[i] = dp[i-1] + dp[i-2]입니다.
넷째, 계산 순서: 작은 인덱스부터 큰 인덱스로 순차적으로 채웁니다. 역순이면 필요한 값이 아직 계산되지 않았을 수 있습니다.

1차원 DP의 불변식(Invariant)은 다음과 같습니다.
모든 i에 대해 dp[i]는 문제 정의에 따른 i 상태의 정확한 최적값을 유지해야 합니다.
예를 들어 "최소 동전 개수" 문제라면 dp[i]는 항상 금액 i를 만드는 진짜 최소 개수여야 하며,
만약 한 번이라도 더 작은 값이 가능한데 갱신하지 못했다면 최종 답도 틀립니다.

1차원 DP는 종종 2차원 DP를 압축한 형태로도 나타납니다.
예를 들어 배낭 문제(Knapsack)는 본래 dp[i][w] (i번째 아이템까지 고려, 무게 w)라는 2차원 테이블이지만,
i축을 제거하고 dp[w]만 사용하는 공간 최적화 기법을 쓸 수 있습니다.
이 경우 루프 방향(정방향 vs 역방향)이 결과에 큰 영향을 미치므로 주의가 필요합니다.`,
    analogy: `1차원 DP는 계단을 한 칸씩 올라가며 각 층마다 "여기까지 오는 최선의 방법"을 기록하는 것과 같습니다.
1층에 도착했을 때 최선의 방법을 적어두고, 2층에 도착했을 때는 1층의 기록을 참고하여 최선의 방법을 다시 적습니다.
3층에 도착하면 2층과 1층의 기록을 모두 보고 가장 좋은 선택을 합니다.
이렇게 올라가면 꼭대기에 도착했을 때 전체 최선의 방법이 자동으로 계산되어 있습니다.

동전 거스름돈 문제는 돼지저금통을 채우는 것에 비유할 수 있습니다.
0원부터 시작하여 1원, 2원, 3원... 순서대로 "이 금액을 만드는 최소 동전 개수"를 적어나갑니다.
6원을 만들 때는 이미 계산된 3원(6-3), 5원(6-1), 2원(6-4)의 기록을 보고
"어느 쪽에 동전 하나를 추가하는 게 가장 적을까?"를 판단합니다.
모든 금액에 대해 이 과정을 반복하면 목표 금액의 최적해가 자연스럽게 구해집니다.

실제 시스템에서 1차원 DP는 다양하게 활용됩니다.
주식 거래 알고리즘은 각 날짜까지의 최대 이익을 dp[day]에 저장하며 최적 매매 시점을 찾습니다.
문자열 압축 알고리즘은 각 위치까지의 최소 비트 수를 dp[pos]에 기록하며 최적 압축 방식을 선택합니다.
게임 레벨 디자인에서는 각 스테이지까지 도달 가능한 최고 점수를 dp[level]로 관리합니다.
메모리 할당 최적화는 각 메모리 크기별 최소 단편화를 dp[size]로 계산합니다.
심지어 음악 추천 시스템은 각 곡까지 듣는 누적 만족도를 dp[song]으로 평가하여 최적 재생목록을 구성합니다.`,
    playgroundDescription: `이번 플레이그라운드에서는 1차원 DP의 핵심인 "앞에서 뒤로 누적하며 최적값 갱신"을 직접 확인할 수 있습니다.
다음 요소들을 집중해서 관찰해보세요.

첫째, dp[x]가 어떤 이전 상태들(dp[x-c] 등)을 참조하는지 주목하세요.
동전 거스름돈 문제에서 dp[6]을 계산할 때 dp[5], dp[3], dp[2]를 모두 확인하고 최솟값을 선택합니다.
이전 상태들의 값이 현재 상태의 선택지를 제공하는 구조를 이해하는 것이 중요합니다.

둘째, 루프 방향이 결과에 어떻게 영향을 주는지 관찰하세요.
동전을 먼저 순회하는지(for c in coins: for x in range(...)), 금액을 먼저 순회하는지(for x in range(...): for c in coins)에 따라
결과가 달라질 수 있습니다. 특히 중복 조합 vs 순열 문제에서 루프 순서는 치명적입니다.

셋째, compare_indices를 통해 현재 위치에서 어떤 이전 위치들과 비교하는지 확인하세요.
active_index가 6일 때 compare_indices가 [5, 3, 2]를 가리키면, dp[6]은 이 세 값 중 최솟값에 1을 더한 값이 됩니다.
이 비교 과정이 바로 "최적 부분 구조"를 활용하는 순간입니다.

이 실습을 통해 1차원 DP의 "앞에서부터 차례로 누적하며 최적해를 구축"하는 Bottom-up 전략과,
"현재 상태의 답은 이전 상태들의 답으로부터 O(1)에 계산된다"는 효율성을 체득할 수 있습니다.`
  },
  features: [
    {
      title: "1차원 상태 정의",
      description: "상태를 하나의 축(인덱스, 금액, 위치 등)으로 표현합니다. dp[i]의 의미가 명확해야 점화식을 올바르게 세울 수 있으며, '무엇을 저장하는가'를 정확히 정의하는 것이 첫 단계입니다."
    },
    {
      title: "누적 전이 패턴",
      description: "앞에서부터 순차적으로 dp 배열을 채우며, 각 위치에서 이전 위치들의 값을 참조합니다. 이 누적 방식 덕분에 모든 부분 문제를 정확히 한 번씩만 해결하여 O(N) 시간에 전체 답을 구할 수 있습니다."
    },
    {
      title: "공간 최적화 가능",
      description: "많은 1차원 DP는 전체 배열이 아닌 최근 몇 개 값만 유지하면 되므로 O(N) 공간을 O(1) 또는 O(K)로 줄일 수 있습니다. 슬라이딩 윈도우 기법을 사용하면 메모리 효율이 크게 향상됩니다."
    },
    {
      title: "루프 방향 주의",
      description: "동전 문제처럼 for 루프의 순서(동전 먼저 vs 금액 먼저)가 결과에 영향을 줄 수 있습니다. 중복 조합을 허용하는지, 순서를 고려하는지에 따라 루프 방향을 달리해야 하며, 잘못 짜면 오답이 나옵니다."
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
      description: "Coin Change (최소 동전 개수)",
      code: `# 금액 0부터 target까지 차례로 채우기
INF = float('inf')
dp = [INF] * (target + 1)
dp[0] = 0

for c in coins:
    for x in range(c, target + 1):
        dp[x] = min(dp[x], dp[x - c] + 1)

return dp[target] if dp[target] != INF else -1`,
    },
    {
      language: "python",
      description: "계단 오르기 (경우의 수)",
      code: `# dp[i] = i번째 계단까지 오르는 경우의 수
dp = [0] * (n + 1)
dp[0] = 1  # 시작점
dp[1] = 1  # 1칸만 오르기

for i in range(2, n + 1):
    dp[i] = dp[i-1] + dp[i-2]

return dp[n]`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# 1D DP: Coin Change (최소 동전 개수)
# 각 금액을 만드는 최소 동전 개수를 dp[x]에 저장합니다.

coins = [1, 3, 4]
target = 6

# 1단계: dp 배열 초기화
# - dp[x]: 금액 x를 만드는 최소 동전 개수
# - 불가능한 경우를 표현하기 위해 INF로 초기화
INF = 10**9
dp = [INF for _ in range(target + 1)]
dp[0] = 0  # 기저 사례: 0원은 동전 0개
active_index = -1
compare_indices = []

# 2단계: 점화식 적용
# - 각 동전 c에 대해, x-c원을 만들 수 있다면
#   dp[x] = min(dp[x], dp[x-c] + 1)
for c in coins:
    for x in range(c, target + 1):
        active_index = x  # 시각화: 현재 계산 중인 금액
        compare_indices = [x - c]  # 시각화: 참조하는 이전 상태
        dp[x] = min(dp[x], dp[x - c] + 1)

# 3단계: 결과 확인
# - dp[target]이 최종 답
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
    {
      id: 1912,
      title: "연속합",
      tier: "Silver II",
      description: "배열에서 연속된 구간의 최대 합을 구하는 문제입니다. dp[i]를 'i번째 원소를 반드시 포함하는 최대 연속합'으로 정의하면 dp[i] = max(arr[i], dp[i-1] + arr[i])라는 간단한 점화식으로 해결됩니다. Kadane's Algorithm으로도 알려진 유명한 1차원 DP 패턴입니다."
    },
    {
      id: 11057,
      title: "오르막 수",
      tier: "Silver I",
      description: "인접한 수가 같거나 증가하는 N자리 수의 개수를 구하는 문제입니다. dp[i][d]를 'i자리 수이고 마지막 자리가 d인 오르막 수의 개수'로 정의하여 2차원 DP로 풀 수도 있지만, 공간 최적화로 1차원으로 압축할 수 있습니다. 루프 방향과 갱신 순서를 신중하게 설계해야 합니다."
    },
    {
      id: 9461,
      title: "파도반 수열",
      tier: "Silver III",
      description: "피보나치와 유사하지만 dp[i] = dp[i-2] + dp[i-3]이라는 점화식을 사용하는 문제입니다. 기저 사례를 올바르게 설정하고(dp[1]=dp[2]=dp[3]=1) 점화식을 적용하는 1차원 DP의 기본 패턴을 연습하기 좋습니다. 숫자가 커지므로 Python의 큰 정수 지원이 유용합니다."
    },
  ],
  guide: [
    {
      title: "1단계: 상태 정의 및 초기화",
      items: [
        {
          label: "dp 배열 선언",
          code: "dp = [INF] * (target + 1)",
          description: "dp[x]의 의미를 명확히 합니다. 동전 문제에서는 '금액 x를 만드는 최소 동전 개수'입니다. 불가능한 경우를 표현하기 위해 INF로 초기화합니다.",
          tags: ["Initialization"],
          isEditable: false
        },
        {
          label: "기저 사례 설정",
          code: "dp[0] = 0",
          description: "0원을 만드는 데는 동전이 0개 필요합니다. 이 값이 모든 계산의 출발점이 됩니다.",
          tags: ["Base Case"],
          isEditable: false
        }
      ]
    },
    {
      title: "2단계: 점화식 적용 (이중 루프)",
      items: [
        {
          label: "동전 순회",
          code: "for c in coins:",
          description: "각 동전 종류에 대해 모든 금액을 갱신합니다. 이 순서는 중복 조합을 허용하는 문제에 적합합니다.",
          tags: ["Loop", "Order"],
          isEditable: true
        },
        {
          label: "금액 순회",
          code: "for x in range(c, target + 1):",
          description: "동전 c를 사용할 수 있는 최소 금액 c부터 target까지 순회합니다. 작은 금액부터 큰 금액으로 채웁니다.",
          tags: ["Loop", "Range"],
          isEditable: true
        },
        {
          label: "상태 전이",
          code: "dp[x] = min(dp[x], dp[x - c] + 1)",
          description: "x-c원을 만든 상태에 동전 c를 하나 추가하는 경우와 기존 dp[x]를 비교하여 더 작은 값을 선택합니다.",
          tags: ["Transition", "Min"],
          isEditable: true
        }
      ]
    },
    {
      title: "3단계: 계단 오르기 패턴",
      items: [
        {
          label: "기저 사례 (계단)",
          code: "dp[0] = 1\ndp[1] = 1",
          description: "0칸(안 오름)은 1가지, 1칸(1칸 오름)은 1가지입니다. 문제에 따라 기저 사례가 다르므로 주의하세요.",
          tags: ["Stairs", "Base"],
          isEditable: true
        },
        {
          label: "점화식 (계단)",
          code: `for i in range(2, n + 1):
    dp[i] = dp[i-1] + dp[i-2]`,
          description: "i번째 계단에 오는 방법은 (i-1)칸에서 1칸 오르거나 (i-2)칸에서 2칸 오르는 두 가지입니다. 경우의 수를 더합니다.",
          tags: ["Stairs", "Count"],
          isEditable: true
        }
      ]
    },
    {
      title: "4단계: 공간 최적화 (Advanced)",
      items: [
        {
          label: "슬라이딩 윈도우",
          code: `prev = [INF] * K
for x in range(target + 1):
    curr = ...  # 이전 K개 값만 참조
    prev = ...  # 윈도우 갱신`,
          description: "전체 dp 배열 대신 최근 K개 값만 유지하면 O(N) 공간을 O(K)로 줄일 수 있습니다. Fibonacci는 K=2입니다.",
          tags: ["Space Optimization"],
          isEditable: true
        },
        {
          label: "역방향 순회 (0/1 Knapsack)",
          code: `for item in items:
    for w in range(W, item.weight - 1, -1):
        dp[w] = max(dp[w], dp[w - item.weight] + item.value)`,
          description: "2D→1D 압축 시 각 아이템을 한 번만 사용하려면 역방향 순회가 필수입니다. 정방향이면 같은 아이템을 여러 번 선택하게 됩니다.",
          tags: ["Knapsack", "Reverse"],
          isEditable: true
        }
      ]
    }
  ]
};
