import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const PARAMETRIC_SEARCH_CONFIG: CTPModuleConfig = {
  title: "파라메트릭 서치",
  description: "파라메트릭 서치의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Binary Search"],
  story: {
    problem: "정답을 직접 찾기 어렵지만, '가능 여부'는 빠르게 판별할 수 있습니다.",
    definition: "파라메트릭 서치는 **최적화 문제를 결정 문제(Yes/No)**로 바꿔 답의 범위를 이분 탐색으로 좁힙니다.\n핵심은 check 함수가 **단조성**을 만족해야 한다는 점입니다.\n\n**불변식**\n- check(mid)가 True이면 답은 [mid, high] 또는 [low, mid] 중 한 쪽에만 있다.",
    analogy: "적정 가격을 찾아가는 경매처럼 범위를 절반씩 좁힙니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- check 결과에 따른 low/high 이동\n- best(현재 가능한 답)의 갱신 시점\n- 단조성이 깨지면 왜 실패하는지",
  },
  features: [
    { title: "결정 문제 변환", description: "최적화 문제를 Yes/No 문제로 변환합니다." },
    { title: "범위 이분 탐색", description: "정답 범위가 단조성을 가진다고 가정합니다." },
    { title: "정답 보관", description: "True인 값을 기록해 최댓값/최솟값을 구합니다." },
  ],
  complexity: {
    access: "O(1)",
    search: "O(log R * check)",
    insertion: "N/A",
    deletion: "N/A",
  },
  implementation: [
    {
      language: "python",
      description: "Parametric Search Template",
      code: `def parametric(low, high, check):
    ans = None
    while low <= high:
        mid = (low + high) // 2
        if check(mid):
            ans = mid
            low = mid + 1
        else:
            high = mid - 1
    return ans
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Parametric Search (Cable Cutting)
lengths = [802, 743, 457, 539]
need = 11

low, high = 1, max(lengths)
best = 0
arr = [low, high, best, 0]
active_index = 1
compare_indices = [0, 2]

while low <= high:
    mid = (low + high) // 2
    count = sum(x // mid for x in lengths)
    if count >= need:
        best = mid
        low = mid + 1
    else:
        high = mid - 1
    arr = [low, mid, high, best]

arr = arr

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["low", "high", "mid", "result"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 1654, title: "랜선 자르기", tier: "Silver II", description: "파라메트릭 서치." },
    { id: 2805, title: "나무 자르기", tier: "Silver II", description: "파라메트릭 서치." },
    { id: 2110, title: "공유기 설치", tier: "Gold V", description: "파라메트릭 서치." },
  ],
};
