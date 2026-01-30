import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const SELECTION_SORT_CONFIG: CTPModuleConfig = {
  title: "선택 정렬 (Selection Sort)",
  description: "가장 작은 값을 선택해 앞쪽으로 보내는 정렬입니다.",
  mode: "code",
  tags: ["Sorting"],
  story: {
    problem: "정렬된 구간을 확정해 나가며 정렬을 구성하고 싶습니다.",
    definition: "매 단계에서 **가장 작은 값**을 찾아 현재 위치와 교환합니다.\n한 번 위치가 결정되면 그 자리는 더 이상 변하지 않습니다.\n\n**불변식**\n- i번째 단계가 끝나면 앞쪽 i+1개는 정렬 완료 상태입니다.",
    analogy: "카드 정렬을 할 때 가장 작은 카드를 앞으로 옮기는 방식입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- 최소값 후보(min_idx)가 이동하는 과정\n- 한 번에 딱 한 번만 스왑되는 특징\n- 앞쪽 구간이 확정되어 가는 흐름",
  },
  features: [
    { title: "안정성 없음", description: "동일 값의 상대적 순서가 유지되지 않습니다." },
    { title: "비교 중심", description: "비교는 많고 교환은 적은 정렬입니다." },
    { title: "메모리 효율", description: "추가 메모리 없이 제자리 정렬(in-place)입니다." },
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
      description: "선택 정렬 (Selection Sort) 구현",
      code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
`,
    },
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Selection Sort
arr = [29, 10, 14, 37, 13, 5, 18, 2, 44, 1, 9, 33, 27, 16, 21, 7, 12, 40, 3, 25]
n = len(arr)
compare_indices = []
active_index = -1
highlight_indices = []

for i in range(n):
    min_idx = i
    active_index = i
    for j in range(i + 1, n):
        compare_indices = [min_idx, j]
        if arr[j] < arr[min_idx]:
            min_idx = j
    arr[i], arr[min_idx] = arr[min_idx], arr[i]
    highlight_indices = list(range(0, i + 1))

arr = arr

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["arr", "i", "min_idx", "result"]:
    _dump(_k)
`
  },
  showStatePanel: false,
  practiceProblems: [
    { id: 2750, title: "수 정렬하기", tier: "Bronze II", description: "정렬 기본." },
    { id: 2751, title: "수 정렬하기 2", tier: "Silver V", description: "정렬 성능." },
    { id: 10989, title: "수 정렬하기 3", tier: "Bronze I", description: "계수 정렬 비교." },
  ],
};
