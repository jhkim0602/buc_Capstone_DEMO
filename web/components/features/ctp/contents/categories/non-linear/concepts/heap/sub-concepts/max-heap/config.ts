import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const HEAP_MAX_CONFIG: CTPModuleConfig = {
  title: "Max Heap (최대 힙)",
  description: "루트에 항상 최댓값이 위치하는 힙 구조입니다.",
  mode: "code",
  tags: ["Max Priority", "Heap"],
  story: {
    problem: "가장 큰 값(우선순위가 높은 값)을 빠르게 꺼내야 하는 상황이 많습니다.",
    definition: "최대 힙은 부모 노드가 항상 자식 노드보다 크거나 같은 값을 가지는 힙입니다.\n루트에 항상 최댓값이 위치하므로 즉시 꺼낼 수 있습니다.\n\n**불변식**\n- 모든 노드에 대해 parent ≥ child 관계가 유지됩니다.",
    analogy: "가장 높은 점수를 가진 사람이 언제나 맨 위에 서 있는 구조입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- 삽입 시 위로 올라가는(heapify_up) 과정\n- 삭제 시 아래로 내려가는(heapify_down) 과정\n- 비교/교환이 일어나는 인덱스",
  },
  features: [
    {
      title: "O(1) 최댓값 접근",
      description: "루트에 최댓값이 위치하므로 즉시 접근할 수 있습니다.",
    },
    {
      title: "로그 시간 연산",
      description: "삽입/삭제는 트리 높이에 비례하여 O(log N)입니다.",
    },
  ],
  complexity: {
    access: "O(1) (Max)",
    search: "O(N)",
    insertion: "O(log N)",
    deletion: "O(log N)",
  },
  implementation: [
    {
      language: "python",
      description: "heapq를 최대 힙처럼 쓰는 방법입니다.",
      code: `import heapq

max_heap = []

# 음수로 저장하면 최대 힙처럼 동작
heapq.heappush(max_heap, -10)
heapq.heappush(max_heap, -5)
heapq.heappush(max_heap, -30)

print(-max_heap[0])  # 30`,
    },
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Max Heap (array-based)
heap = [9, 7, 5, 3, 1, 2]
compare_indices = []
active_index = -1
highlight_indices = []


def heapify_up(idx):
    global active_index, compare_indices
    while idx > 0:
        parent = (idx - 1) // 2
        compare_indices = [idx, parent]
        active_index = idx
        if heap[idx] > heap[parent]:
            heap[idx], heap[parent] = heap[parent], heap[idx]
            idx = parent
        else:
            break


def heapify_down(idx):
    global active_index, compare_indices
    size = len(heap)
    while True:
        left = 2 * idx + 1
        right = 2 * idx + 2
        largest = idx
        if left < size and heap[left] > heap[largest]:
            largest = left
        if right < size and heap[right] > heap[largest]:
            largest = right
        compare_indices = [idx, largest]
        active_index = idx
        if largest != idx:
            heap[idx], heap[largest] = heap[largest], heap[idx]
            idx = largest
        else:
            break


def push(val):
    heap.append(val)
    heapify_up(len(heap) - 1)


def pop():
    if not heap:
        return None
    root = heap[0]
    last = heap.pop()
    if heap:
        heap[0] = last
        heapify_down(0)
    return root


push(11)
pop()
highlight_indices = [0]
heap = heap

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["heap", "result"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 11279, title: "최대 힙", tier: "Silver II", description: "최대 힙 기본." },
    { id: 13975, title: "파일 합치기 3", tier: "Gold IV", description: "힙 응용." },
    { id: 2014, title: "소수의 곱", tier: "Gold I", description: "우선순위 큐." },
  ],
};
