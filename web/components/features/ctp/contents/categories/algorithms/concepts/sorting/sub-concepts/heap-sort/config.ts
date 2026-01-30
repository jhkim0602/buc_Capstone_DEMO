import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const HEAP_SORT_CONFIG: CTPModuleConfig = {
  title: "힙 정렬 (Heap Sort)",
  description: "힙 구조를 이용해 최대/최소를 반복적으로 꺼내 정렬합니다.",
  mode: "code",
  tags: ["Sorting"],
  story: {
    problem: "정렬과 동시에 우선순위 구조를 활용하고 싶습니다.",
    definition: "힙을 만든 뒤 **루트(최댓값)**를 배열 끝으로 보내고, 남은 구간을 다시 힙으로 복구합니다.\n이 과정을 반복하면 뒤쪽부터 정렬이 확정됩니다.\n\n**불변식**\n- 힙 구간은 항상 최대 힙 성질을 만족한다.\n- 배열의 뒤쪽은 확정된 정렬 구간이다.",
    analogy: "가장 큰 값을 계속 꺼내어 뒤쪽에 채우는 방식입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- 힙ify로 최대 힙이 만들어지는 과정\n- 루트와 끝을 교환하는 순간\n- heap_size가 줄어드는 흐름",
  },
  features: [
    { title: "일관된 성능", description: "최악/평균 모두 O(N log N)입니다." },
    { title: "추가 메모리 적음", description: "제자리 정렬로 구현 가능합니다." },
    { title: "안정성 없음", description: "같은 값의 상대적 순서가 보장되지 않습니다." },
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
      description: "힙 정렬 (Heap Sort) 구현",
      code: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)


def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
`,
    },
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Heap Sort
arr = [29, 10, 14, 37, 13, 5, 18, 2, 44, 1, 9, 33, 27, 16, 21, 7, 12, 40, 3, 25]
n = len(arr)
compare_indices = []
swap_indices = []
active_index = -1
heap_size = n


def heapify(size, i):
    global compare_indices, active_index, swap_indices, heap_size
    heap_size = size
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    active_index = i
    if left < size:
        compare_indices = [largest, left]
        if arr[left] > arr[largest]:
            largest = left
    if right < size:
        compare_indices = [largest, right]
        if arr[right] > arr[largest]:
            largest = right
    if largest != i:
        swap_indices = [i, largest]
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(size, largest)


for i in range(n // 2 - 1, -1, -1):
    heap_size = n
    heapify(n, i)

for end in range(n - 1, 0, -1):
    swap_indices = [0, end]
    arr[0], arr[end] = arr[end], arr[0]
    heap_size = end
    heapify(end, 0)

heap_size = 0
arr = arr

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["arr", "heap_size", "active_index", "compare_indices", "swap_indices"]:
    _dump(_k)
`
  },
  showStatePanel: false,
  practiceProblems: [
    { id: 11279, title: "최대 힙", tier: "Silver II", description: "힙 기본." },
    { id: 1927, title: "최소 힙", tier: "Silver II", description: "힙 기본." },
    { id: 11286, title: "절댓값 힙", tier: "Silver I", description: "커스텀 힙." },
  ],
};
