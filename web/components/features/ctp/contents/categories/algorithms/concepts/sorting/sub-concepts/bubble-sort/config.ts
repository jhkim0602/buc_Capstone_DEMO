import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const BUBBLE_SORT_CONFIG: CTPModuleConfig = {
  title: "버블 정렬 (Bubble Sort)",
  description: "인접한 원소를 비교하며 큰 값을 뒤로 보내는 단순 정렬입니다.",
  mode: "code",
  tags: ["Sorting"],
  story: {
    problem: "정렬이 필요하지만 복잡한 알고리즘을 이해하기 전, 가장 직관적인 방법을 먼저 배워야 합니다.",
    definition: "버블 정렬은 **인접한 두 값을 비교해 큰 값을 오른쪽으로 보내는 과정**을 반복합니다.\n한 번의 패스가 끝나면 가장 큰 값이 맨 뒤에 확정됩니다.\n\n**불변식**\n- i번째 패스가 끝나면 뒤쪽 i개는 정렬 완료 상태입니다.",
    analogy: "물속 기포가 위로 떠오르듯, 큰 값이 배열 끝으로 밀려납니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- 인접 비교가 어떻게 진행되는지\n- 스왑이 발생할 때 막대 색이 어떻게 바뀌는지\n- 패스가 끝나며 뒤쪽이 확정되는 순간",
  },
  features: [
    { title: "단순 구현", description: "가장 이해하기 쉬운 정렬 알고리즘입니다." },
    { title: "느린 성능", description: "평균/최악 시간 복잡도는 O(N^2)입니다." },
    { title: "조기 종료", description: "한 패스에서 스왑이 없으면 이미 정렬된 상태입니다." },
    { title: "안정성", description: "같은 값의 상대적 순서가 유지되는 안정 정렬입니다." },
  ],
  complexity: {
    access: "O(1)",
    search: "O(N^2)",
    insertion: "O(N^2)",
    deletion: "O(N^2)",
  },
  implementation: [
    {
      language: "python",
      description: "버블 정렬 (Bubble Sort) 구현",
      code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
`,
    },
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Bubble Sort
arr = [29, 10, 14, 37, 13, 5, 18, 2, 44, 1, 9, 33, 27, 16, 21, 7, 12, 40, 3, 25]
n = len(arr)
compare_indices = []
active_index = -1
highlight_indices = []

for i in range(n):
    active_index = i
    for j in range(0, n - 1 - i):
        compare_indices = [j, j + 1]
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]
    highlight_indices = list(range(n - 1 - i, n))

arr = arr

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["arr", "i", "j", "result"]:
    _dump(_k)
`
  },
  showStatePanel: false,
  practiceProblems: [
    { id: 1517, title: "버블 소트", tier: "Gold II", description: "inversion 계산." },
    { id: 2750, title: "수 정렬하기", tier: "Bronze II", description: "정렬 기본." },
    { id: 1377, title: "버블 소트", tier: "Gold II", description: "버블 정렬 특성." },
  ],
};
