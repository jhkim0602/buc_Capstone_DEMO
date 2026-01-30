import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DP_BASICS_CONFIG: CTPModuleConfig = {
  title: "DP 기본",
  description: "동적 계획법의 핵심 개념인 메모이제이션과 타뷸레이션을 학습합니다.",
  mode: "code",
  tags: ["Dynamic Programming", "Memoization", "Tabulation"],
  story: {
    problem: `피보나치 수를 계산하는 프로그램을 작성한다고 상상해보세요.
F(5) = F(4) + F(3)을 계산하려면 F(4)와 F(3)을 각각 구해야 합니다.
그런데 F(4) = F(3) + F(2)를 계산할 때도 F(3)이 다시 필요합니다.
순진한 재귀 방식으로 구현하면 F(3)을 중복해서 여러 번 계산하게 됩니다.

문제는 숫자가 커질수록 중복 계산이 기하급수적으로 늘어난다는 점입니다.
F(50)을 계산하려면 F(3)이 수백만 번 이상 반복 호출되어, 몇 분이 지나도 답이 나오지 않습니다.
컴퓨터는 같은 계산을 반복하느라 시간을 낭비하고, 결과적으로 지수 시간 복잡도 O(2^N)에 빠지게 됩니다.

동적 계획법(Dynamic Programming)은 이 문제를 해결합니다.
한 번 계산한 결과를 메모리에 저장(메모이제이션)해두고, 같은 값이 필요할 때 다시 계산하지 않고 저장된 값을 재사용합니다.
이렇게 하면 각 부분 문제를 정확히 한 번씩만 해결하므로, 지수 시간 문제를 다항 시간 O(N)으로 극적으로 단축할 수 있습니다.

동적 계획법은 코딩 테스트와 면접에서 가장 빈번하게 등장하는 알고리즘 중 하나입니다.
"재귀를 어떻게 최적화할 수 있나요?", "메모이제이션과 타뷸레이션의 차이는?", "어떤 문제가 DP로 풀 수 있나요?" 같은 질문들은
알고리즘 사고력과 최적화 능력을 평가하는 핵심 주제입니다.`,
    definition: `동적 계획법(Dynamic Programming, DP)은 큰 문제를 작은 부분 문제들로 나누어 해결하되,
각 부분 문제의 해를 저장하여 중복 계산을 피하는 알고리즘 설계 기법입니다.
"동적"이라는 이름은 실행 중(runtime)에 테이블을 동적으로 채워나간다는 의미이며, "계획법"은 최적해를 체계적으로 구하는 전략을 뜻합니다.

DP가 적용 가능한 문제는 두 가지 핵심 성질을 만족해야 합니다.
첫째, 최적 부분 구조(Optimal Substructure): 큰 문제의 최적해가 작은 부분 문제들의 최적해로부터 구성될 수 있어야 합니다.
둘째, 중복 부분 문제(Overlapping Subproblems): 동일한 부분 문제가 여러 번 반복적으로 계산되어야 합니다.
이 두 조건이 충족되면 DP를 사용하여 효율적으로 해결할 수 있습니다.

DP를 구현하는 방법은 크게 두 가지입니다.
Top-down 방식(메모이제이션)은 재귀 함수로 큰 문제부터 시작하여 필요한 작은 문제들을 호출하고, 계산 결과를 메모 배열에 저장합니다.
Bottom-up 방식(타뷸레이션)은 반복문으로 가장 작은 문제부터 차례로 계산하여 테이블을 채워나가며, 재귀 호출 없이 구현합니다.
일반적으로 타뷸레이션이 함수 호출 오버헤드가 없어 더 빠르지만, 메모이제이션이 직관적이고 필요한 부분만 계산할 수 있어 유리한 경우도 있습니다.

DP의 불변식(Invariant)은 다음과 같습니다.
dp[state]는 해당 상태에서의 최적값(또는 경우의 수, 최솟값 등)을 항상 올바르게 저장하고 있어야 합니다.
이 불변식이 유지되려면 상태 전이(state transition)가 정확해야 하며, 기저 사례(base case)가 올바르게 초기화되어야 합니다.
만약 상태 정의가 잘못되거나 점화식이 틀리면, dp 테이블 전체가 잘못된 값으로 채워져 오답이 나옵니다.`,
    analogy: `동적 계획법은 수학 시험을 볼 때 노트에 중간 계산 결과를 적어두는 것과 같습니다.
복잡한 문제를 풀다 보면 같은 계산식이 여러 곳에서 반복되는데, 한 번 계산한 결과를 노트 한쪽에 적어두면
나중에 똑같은 계산이 필요할 때 처음부터 다시 풀지 않고 노트를 보고 바로 답을 가져올 수 있습니다.

예를 들어, (3+5) × 2 + (3+5) × 4를 계산한다고 생각해보세요.
노트 없이 계산하면 (3+5)를 두 번 계산해야 하지만, "3+5=8"이라고 적어두면 두 번째부터는 8을 바로 사용할 수 있습니다.
DP의 메모이제이션은 이처럼 한 번 구한 답을 메모(memo) 배열에 적어두고 재사용하는 전략입니다.

실제 시스템에서 DP는 다양하게 활용됩니다.
GPS 네비게이션은 출발지에서 목적지까지 최단 경로를 찾을 때 DP 기반 최단 경로 알고리즘을 사용합니다.
텍스트 에디터의 자동 완성 기능은 문자열 편집 거리(Edit Distance) DP로 가장 비슷한 단어를 추천합니다.
컴파일러 최적화는 코드 블록들의 최적 실행 순서를 DP로 결정합니다.
게임 AI는 가능한 수들을 DP로 평가하여 최선의 전략을 선택합니다.
심지어 생물정보학에서는 DNA 서열 정렬(Sequence Alignment)에 DP를 사용하여 유전자 유사성을 분석합니다.`,
    playgroundDescription: `이번 플레이그라운드에서는 DP의 기본 원리인 메모이제이션과 타뷸레이션을 직접 확인할 수 있습니다.
다음 요소들을 집중해서 관찰해보세요.

첫째, dp 배열이 어떻게 앞에서 뒤로 순차적으로 채워지는지 주목하세요.
각 칸(dp[i])은 이전 칸들(dp[i-1], dp[i-2] 등)의 값을 참조하여 계산되므로, 반드시 작은 인덱스부터 차례로 채워야 합니다.
만약 순서를 거꾸로 하면 필요한 값이 아직 계산되지 않아 오류가 발생합니다.

둘째, active_index가 이동하는 속도를 관찰하세요.
재귀 방식이었다면 F(5)를 구하기 위해 F(3)을 여러 번 방문했겠지만, DP 방식은 각 인덱스를 정확히 한 번씩만 방문합니다.
이것이 지수 시간을 선형 시간으로 줄이는 핵심입니다.

셋째, 각 항이 어떤 이전 항들을 참조하는지 확인하세요.
Fibonacci의 경우 dp[i] = dp[i-1] + dp[i-2]라는 점화식(recurrence relation)을 사용합니다.
이 점화식이 상태 전이 규칙이며, DP 문제를 푸는 핵심은 올바른 점화식을 찾는 것입니다.

이 실습을 통해 "한 번 계산한 것은 저장하고 재사용한다"는 DP의 핵심 철학과,
"작은 문제부터 차례로 해결하여 큰 문제를 푼다"는 Bottom-up 전략을 체득할 수 있습니다.`
  },
  features: [
    {
      title: "중복 계산 제거",
      description: "메모이제이션(Top-down) 또는 타뷸레이션(Bottom-up)을 통해 같은 부분 문제를 여러 번 계산하지 않습니다. 재귀 트리에서 수천 번 반복되던 계산이 한 번씩만 수행되어 지수 시간이 다항 시간으로 단축됩니다."
    },
    {
      title: "점화식 설계",
      description: "dp[i]가 이전 상태들(dp[i-1], dp[i-2] 등)로부터 어떻게 계산되는지 정의하는 점화식이 DP의 핵심입니다. 올바른 점화식을 찾으면 복잡한 문제도 간단한 반복문으로 해결할 수 있습니다."
    },
    {
      title: "상태 정의",
      description: "문제를 어떤 단위로 쪼갤지(상태를 어떻게 정의할지) 결정하는 것이 DP 설계의 첫 단계입니다. 상태 공간이 너무 크면 메모리 초과가 나고, 너무 작으면 필요한 정보를 담을 수 없으므로 적절한 균형이 중요합니다."
    },
    {
      title: "메모리-시간 트레이드오프",
      description: "DP는 메모리(dp 배열)를 사용하여 시간을 절약하는 전략입니다. 때로는 공간을 더 줄이기 위해 슬라이딩 윈도우 기법을 사용할 수 있으며(예: Fibonacci는 O(N) 배열 대신 O(1) 변수 2개로 가능), 문제에 따라 최적의 균형점을 찾아야 합니다."
    },
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
      description: "Fibonacci - Bottom-up (Tabulation)",
      code: `# 타뷸레이션: 작은 문제부터 차례로 테이블 채우기
dp = [0] * (n + 1)
dp[1] = 1
for i in range(2, n + 1):
    dp[i] = dp[i-1] + dp[i-2]
return dp[n]`,
    },
    {
      language: "python",
      description: "Fibonacci - Top-down (Memoization)",
      code: `# 메모이제이션: 재귀 + 메모 배열
memo = {}
def fib(n):
    if n <= 1:
        return n
    if n in memo:
        return memo[n]
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# DP Basics: Fibonacci (Bottom-up)
# 작은 문제부터 차례로 해결하여 테이블을 채웁니다.

n = 7
# 1단계: dp 배열 초기화
# - dp[i]는 i번째 피보나치 수를 저장
dp = [0 for _ in range(n + 1)]
dp[1] = 1  # 기저 사례: F(0)=0, F(1)=1
active_index = -1

# 2단계: 점화식 적용
# - dp[i] = dp[i-1] + dp[i-2]
# - 작은 인덱스부터 차례로 채움 (Bottom-up)
for i in range(2, n + 1):
    active_index = i  # 시각화: 현재 계산 중인 위치
    dp[i] = dp[i - 1] + dp[i - 2]

# 3단계: 결과 확인
# - dp[n]이 최종 답
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
      id: 1463,
      title: "1로 만들기",
      tier: "Silver III",
      description: "정수 N을 1로 만드는 최소 연산 횟수를 구하는 문제입니다. dp[i]를 'i를 1로 만드는 최소 연산 수'로 정의하고, 3가지 연산(3으로 나누기, 2로 나누기, 1 빼기)을 모두 시도하여 최솟값을 찾습니다. DP의 상태 정의와 점화식 설계를 연습하기 좋은 기본 문제입니다."
    },
    {
      id: 9095,
      title: "1,2,3 더하기",
      tier: "Silver III",
      description: "정수 n을 1, 2, 3의 합으로 나타내는 경우의 수를 구하는 문제입니다. dp[i] = dp[i-1] + dp[i-2] + dp[i-3]이라는 간단한 점화식으로 해결할 수 있으며, DP의 '큰 문제 = 작은 문제들의 합' 철학을 명확히 보여줍니다."
    },
    {
      id: 11726,
      title: "2×n 타일링",
      tier: "Silver III",
      description: "2×n 직사각형을 1×2, 2×1 타일로 채우는 경우의 수를 구하는 문제입니다. 놀랍게도 피보나치 수열과 동일한 점화식이 나오며, 실제 문제를 DP로 모델링하는 사고 과정을 연습할 수 있습니다. 결과를 10007로 나눈 나머지를 출력하는 조건도 DP에서 자주 등장하는 패턴입니다."
    },
  ],
  guide: [
    {
      title: "1단계: 상태 정의 및 초기화",
      items: [
        {
          label: "dp 배열 선언",
          code: "dp = [0] * (n + 1)",
          description: "dp[i]가 무엇을 의미하는지 명확히 정의합니다. Fibonacci의 경우 'i번째 피보나치 수'입니다.",
          tags: ["Initialization"],
          isEditable: false
        },
        {
          label: "기저 사례 설정",
          code: "dp[0] = 0\ndp[1] = 1",
          description: "가장 작은 문제의 답을 직접 지정합니다. 이 값들이 틀리면 전체 테이블이 잘못됩니다.",
          tags: ["Base Case"],
          isEditable: false
        }
      ]
    },
    {
      title: "2단계: 점화식 적용 (Bottom-up)",
      items: [
        {
          label: "반복문 시작",
          code: "for i in range(2, n + 1):",
          description: "작은 인덱스부터 큰 인덱스로 순차적으로 채웁니다. 역순이면 필요한 값이 아직 계산 안 됐을 수 있습니다.",
          tags: ["Loop", "Order"],
          isEditable: true
        },
        {
          label: "상태 전이",
          code: "dp[i] = dp[i-1] + dp[i-2]",
          description: "현재 상태를 이전 상태들로부터 계산합니다. 이것이 점화식(recurrence relation)입니다.",
          tags: ["Transition", "O(1)"],
          isEditable: true
        },
        {
          label: "결과 확인",
          code: "print(dp[n])",
          description: "최종 답은 dp[n]에 저장되어 있습니다.",
          tags: ["Result"],
          isEditable: true
        }
      ]
    },
    {
      title: "3단계: 메모이제이션 방식 (Top-down)",
      items: [
        {
          label: "메모 딕셔너리",
          code: "memo = {}",
          description: "계산한 결과를 저장할 딕셔너리를 준비합니다. 배열 대신 딕셔너리를 쓰면 희소(sparse) 상태 공간에 유리합니다.",
          tags: ["Memoization"],
          isEditable: true
        },
        {
          label: "재귀 함수 + 메모",
          code: `def fib(n):
    if n <= 1: return n
    if n in memo: return memo[n]
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]`,
          description: "재귀 호출 전에 메모를 확인하고, 계산 후 메모에 저장합니다. 이미 계산한 값은 즉시 반환하여 중복 계산을 방지합니다.",
          tags: ["Recursion", "Memo"],
          isEditable: true
        }
      ]
    },
    {
      title: "4단계: 공간 최적화 (Advanced)",
      items: [
        {
          label: "슬라이딩 윈도우",
          code: `prev2, prev1 = 0, 1
for i in range(2, n + 1):
    curr = prev1 + prev2
    prev2, prev1 = prev1, curr`,
          description: "Fibonacci는 직전 2개 값만 필요하므로 O(N) 배열 대신 O(1) 변수 2개로 충분합니다. 공간 복잡도를 줄이는 고급 기법입니다.",
          tags: ["Space Optimization", "O(1)"],
          isEditable: true
        }
      ]
    }
  ]
};
