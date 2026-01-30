import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const MERGE_SORT_CONFIG: CTPModuleConfig = {
  title: "병합 정렬 (Merge Sort)",
  description: "분할 정복으로 배열을 나눈 뒤 정렬하며 병합하는 정렬입니다.",
  mode: "code",
  tags: ["Sorting"],
  story: {
    problem: "큰 배열을 효율적으로 정렬하고 싶습니다.",
    definition: "배열을 **반으로 계속 분할**해 작게 만든 뒤, 정렬된 부분 배열을 병합하여 전체 정렬을 완성합니다.\n각 단계의 병합은 두 정렬된 배열을 선형으로 합칩니다.\n\n**불변식**\n- 병합 단계에서는 항상 정렬된 두 부분 배열만 합쳐진다.",
    analogy: "정렬된 카드 묶음을 합쳐 더 큰 정렬 묶음을 만드는 방식입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- 분할된 구간이 다시 병합되는 순서\n- left/right 배열이 만들어지고 합쳐지는 과정\n- 병합 결과가 원래 배열에 덮어써지는 순간",
  },
  features: [
    { title: "안정 정렬", description: "동일 값의 순서가 유지됩니다." },
    { title: "추가 메모리", description: "병합을 위해 보조 배열이 필요합니다." },
    { title: "일관된 성능", description: "항상 O(N log N) 성능을 보장합니다." },
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
      description: "병합 정렬 (Merge Sort) 구현",
      code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)


def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
`,
    },
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Merge Sort (Top-Down)
arr = [29, 10, 14, 37, 13, 5, 18, 2, 44, 1, 9, 33, 27, 16, 21, 7, 12, 40, 3, 25]
compare_indices = []
active_index = -1

# 시각화용 상태
left = []
right = []
merged = []
active_range = []
l = m = r = -1
i = j = k = -1
k_index = -1


def merge(start, mid, end):
    global left, right, merged, i, j, k, k_index
    global l, m, r, active_range, compare_indices, active_index

    l, m, r = start, mid, end
    active_range = [l, r]
    left = arr[l:m + 1]
    right = arr[m + 1:r + 1]
    merged = []
    i = 0
    j = 0
    k = l

    while i < len(left) and j < len(right):
        compare_indices = [l + i, m + 1 + j]
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
        k_index = len(merged) - 1
        active_index = k
        arr[k] = merged[-1]
        k += 1

    while i < len(left):
        merged.append(left[i])
        i += 1
        k_index = len(merged) - 1
        active_index = k
        arr[k] = merged[-1]
        k += 1

    while j < len(right):
        merged.append(right[j])
        j += 1
        k_index = len(merged) - 1
        active_index = k
        arr[k] = merged[-1]
        k += 1


def merge_sort(start, end):
    if start >= end:
        return
    mid = (start + end) // 2
    merge_sort(start, mid)
    merge_sort(mid + 1, end)
    merge(start, mid, end)


merge_sort(0, len(arr) - 1)
arr = arr

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["arr", "left", "right", "merged", "l", "m", "r", "i", "j", "k"]:
    _dump(_k)
`
  },
  showStatePanel: false,
  practiceProblems: [
    { id: 2751, title: "수 정렬하기 2", tier: "Silver V", description: "병합 정렬 응용." },
    { id: 10814, title: "나이순 정렬", tier: "Silver V", description: "안정 정렬." },
    { id: 1517, title: "버블 소트", tier: "Gold II", description: "병합 정렬로 inversion 계산." },
  ],
};
