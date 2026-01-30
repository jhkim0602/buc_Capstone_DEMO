import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const QUICK_SORT_CONFIG: CTPModuleConfig = {
  title: "퀵 정렬 (Quick Sort)",
  description: "피벗을 기준으로 분할하며 정렬하는 분할 정복 알고리즘입니다.",
  mode: "code",
  tags: ["Sorting"],
  story: {
    problem: "평균적으로 매우 빠른 정렬을 원하지만, 최악의 경우도 고려해야 합니다.",
    definition: "피벗을 기준으로 작은 값과 큰 값으로 분할하고, 각 구간을 재귀적으로 정렬합니다.\n분할 단계에서 **피벗의 최종 위치가 확정**됩니다.\n\n**불변식**\n- 분할이 끝나면 피벗 왼쪽은 pivot 이하, 오른쪽은 pivot 이상입니다.",
    analogy: "기준 값을 정하고 왼쪽과 오른쪽으로 구역을 나누는 방식입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- 피벗이 선택되는 순간\n- 비교/스왑으로 분할이 진행되는 흐름\n- 피벗 위치가 확정되는 지점",
  },
  features: [
    { title: "평균 빠름", description: "평균 시간 복잡도는 O(N log N)입니다." },
    { title: "최악 존재", description: "피벗 선택이 나쁘면 O(N^2)까지 떨어집니다." },
    { title: "제자리 정렬", description: "추가 메모리 없이 in-place로 동작합니다." },
  ],
  complexity: {
    access: "O(1)",
    search: "O(N log N)",
    insertion: "O(N log N)",
    deletion: "O(N log N)",
  },
  implementation: [
    {
      language: "python",
      description: "퀵 정렬 (Quick Sort) 구현",
      code: `def quick_sort(arr, low, high):
    if low < high:
        pivot = partition(arr, low, high)
        quick_sort(arr, low, pivot - 1)
        quick_sort(arr, pivot + 1, high)


def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
`,
    },
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Quick Sort (Lomuto)
arr = [29, 10, 14, 37, 13, 5, 18, 2, 44, 1, 9, 33, 27, 16, 21, 7, 12, 40, 3, 25]
compare_indices = []
active_index = -1
pivot_index = -1


def partition(low, high):
    global compare_indices, active_index, pivot_index
    pivot = arr[high]
    pivot_index = high
    i = low - 1
    for j in range(low, high):
        compare_indices = [j, pivot_index]
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
            active_index = i
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


def quick_sort(low, high):
    if low < high:
        pi = partition(low, high)
        quick_sort(low, pi - 1)
        quick_sort(pi + 1, high)


quick_sort(0, len(arr) - 1)
arr = arr

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["arr", "pivot", "i", "j", "result"]:
    _dump(_k)
`
  },
  showStatePanel: false,
  practiceProblems: [
    { id: 11004, title: "K번째 수", tier: "Gold V", description: "Quickselect 응용." },
    { id: 2750, title: "수 정렬하기", tier: "Bronze II", description: "정렬 기본." },
    { id: 11728, title: "배열 합치기", tier: "Silver V", description: "분할/병합 비교." },
  ],
};
