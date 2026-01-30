import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const INSERTION_SORT_CONFIG: CTPModuleConfig = {
  title: "삽입 정렬 (Insertion Sort)",
  description: "정렬된 구간에 원소를 삽입하며 정렬하는 방식입니다.",
  mode: "code",
  tags: ["Sorting"],
  story: {
    problem: "앞부분은 이미 정렬돼 있고, 새 값을 적절한 위치에 넣고 싶습니다.",
    definition: "현재 원소를 꺼내 **정렬된 왼쪽 구간**에 적절한 위치를 찾아 삽입합니다.\n왼쪽 구간은 매 단계마다 정렬 상태를 유지합니다.\n\n**불변식**\n- i번째 단계가 끝나면 0..i 구간은 항상 정렬되어 있습니다.",
    analogy: "손에 든 카드 중 하나를 정렬된 카드 사이에 끼워 넣는 방식입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- key가 왼쪽으로 이동하며 삽입되는 순간\n- 왼쪽 정렬 구간이 확장되는 흐름\n- 거의 정렬된 배열에서 빠르게 끝나는 모습",
  },
  features: [
    { title: "부분 정렬에 강함", description: "거의 정렬된 배열에서 효율적입니다." },
    { title: "안정 정렬", description: "같은 값의 순서를 유지합니다." },
    { title: "온라인 정렬", description: "데이터가 들어오는 즉시 위치를 잡을 수 있습니다." },
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
      description: "삽입 정렬 (Insertion Sort) 구현",
      code: `def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
`,
    },
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Insertion Sort
arr = [29, 10, 14, 37, 13, 5, 18, 2, 44, 1, 9, 33, 27, 16, 21, 7, 12, 40, 3, 25]
n = len(arr)
compare_indices = []
active_index = -1
highlight_indices = []

for i in range(1, n):
    key = arr[i]
    j = i - 1
    active_index = i
    while j >= 0 and arr[j] > key:
        compare_indices = [j, j + 1]
        arr[j + 1] = arr[j]
        j -= 1
    arr[j + 1] = key
    highlight_indices = list(range(0, i + 1))

arr = arr

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["arr", "i", "key", "result"]:
    _dump(_k)
`
  },
  showStatePanel: false,
  practiceProblems: [
    { id: 11399, title: "ATM", tier: "Silver IV", description: "삽입 정렬 감각." },
    { id: 11004, title: "K번째 수", tier: "Gold V", description: "부분 정렬 감각." },
    { id: 2750, title: "수 정렬하기", tier: "Bronze II", description: "정렬 기본." },
  ],
};
