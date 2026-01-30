import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const HEAP_MIN_CONFIG: CTPModuleConfig = {
    title: "Min Heap (최소 힙)",
    description: "최솟값을 O(1)에 찾을 수 있는 완전 이진 트리 기반의 자료구조입니다.",
    mode: 'code',
    story: {
        problem: "응급실에서 환자를 치료할 때, 단순히 먼저 온 순서(Queue)가 아니라 위급한 순서대로 치료해야 합니다. 가장 위급한(우선순위가 높은) 환자를 어떻게 빠르게 찾을까요?",
        definition: "최소 힙(Min Heap)은 부모 노드가 항상 자식 노드보다 작거나 같은 값을 가지는 완전 이진 트리입니다. 루트에는 항상 최솟값이 위치합니다.\n\n**불변식**\n- 모든 노드에 대해 parent ≤ child 관계가 유지됩니다.\n- 루트는 항상 전체 최솟값입니다.",
        analogy: "군대나 회사의 계급도와 비슷합니다. 사장님(최솟값)이 가장 위에 있고, 아래로 갈수록 직급이 낮아지는(값이 커지는) 구조입니다.",
        playgroundDescription: "이번 단계에서 무엇을 볼까?\n- 삽입 시 Up-Heap으로 위로 이동하는 과정\n- 삭제 시 Down-Heap으로 아래로 내려가는 과정\n- 비교/교환이 발생하는 인덱스"
    },
    features: [
        {
            title: "완전 이진 트리 (Complete Binary Tree)",
            description: "마지막 레벨을 제외하고 모든 레벨이 완전히 채워져 있으며, 노드는 왼쪽부터 채워집니다."
        },
        {
            title: "힙 속성 (Heap Property)",
            description: "모든 노드는 자식 노드보다 작거나 같아야 합니다(Min Heap 기준)."
        },
        {
            title: "배열 구현 (Array Implementation)",
            description: "트리 구조지만 실제로는 배열을 사용하여 인덱스 연산(2*i+1)으로 부모-자식 관계를 관리합니다."
        }
    ],
    complexity: {
        access: "O(1) (Min)",
        search: "O(N)",
        insertion: "O(log N)",
        deletion: "O(log N)"
    },
    implementation: [
        {
            language: "python",
            code: `import heapq

# Python의 heapq는 기본적으로 Min Heap입니다.
heap = []

# 삽입 (Push)
heapq.heappush(heap, 10)
heapq.heappush(heap, 5)
heapq.heappush(heap, 30)

# 최솟값 확인 (Peek)
print(heap[0]) # 5

# 삭제 (Pop)
print(heapq.heappop(heap)) # 5
print(heapq.heappop(heap)) # 10`
        }
    ],
    initialCode: {
        python: `# === USER CODE START ===
# Min Heap (array-based)
heap = [5, 7, 9, 1, 3]
compare_indices = []
active_index = -1
highlight_indices = []


def heapify_up(idx):
    global active_index, compare_indices
    while idx > 0:
        parent = (idx - 1) // 2
        compare_indices = [idx, parent]
        active_index = idx
        if heap[idx] < heap[parent]:
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
        smallest = idx
        if left < size and heap[left] < heap[smallest]:
            smallest = left
        if right < size and heap[right] < heap[smallest]:
            smallest = right
        compare_indices = [idx, smallest]
        active_index = idx
        if smallest != idx:
            heap[idx], heap[smallest] = heap[smallest], heap[idx]
            idx = smallest
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


push(2)
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
    { id: 1927, title: "최소 힙", tier: "Silver II", description: "최소 힙 기본." },
    { id: 11286, title: "절댓값 힙", tier: "Silver I", description: "우선순위 응용." },
    { id: 1715, title: "카드 정렬하기", tier: "Gold IV", description: "힙 응용." },
  ],
};
