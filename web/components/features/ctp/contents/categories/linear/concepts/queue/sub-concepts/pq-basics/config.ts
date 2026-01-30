import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const QUEUE_PQ_BASICS_CONFIG: CTPModuleConfig = {
    title: "우선순위 큐 기초 (Priority Queue)",
    description: "들어온 순서와 상관없이 '중요한(우선순위가 높은)' 데이터가 먼저 나가는 자료구조입니다.",
    mode: 'code',
    tags: ["Priority", "Sorted Array", "Linear"],
    story: {
        problem: "💡 급한 환자가 늦게 오면?",
        definition: "📖 핵심 정의\n\n우선순위 큐(Priority Queue)는 FIFO(선착순)를 무시하고, 각 데이터가 가진 **'우선순위(Priority)'**에 따라 처리 순서가 결정됩니다. 보통 숫자가 작을수록(Min-Heap) 또는 클수록(Max-Heap) 우선순위가 높다고 정합니다.\n\n**불변식**\n- Pop은 항상 가장 높은 우선순위 원소를 반환한다.\n- 우선순위 규칙(작은 값 우선/큰 값 우선)은 항상 유지된다.",
        analogy: "응급실(Emergency Room)을 생각해보세요. 감기 환자가 먼저 왔더라도, 나중에 온 심장마비 환자가 먼저 치료를 받습니다. 이것이 바로 우선순위 큐의 원리입니다.",
        playgroundDescription: "## 🎮 시뮬레이션 가이드\n\n이 시뮬레이터는 **'작은 숫자가 우선순위가 높다'**고 가정합니다.\n\n1. **자동 정렬:** 숫자를 무작위로 계속 넣어보세요. 내부적으로 **오름차순 정렬**되어 저장되는 것을 볼 수 있습니다.\n2. **항상 1등 처리:** `Pop`을 누르면 언제나 가장 작은 숫자(맨 앞)부터 나갑니다.\n\n**실습 요약**\n- 들어온 순서가 아닌 우선순위로 나가는지 확인\n- 배열 기반 구현이 느려지는 이유 이해",
        playgroundLimit: "배열(Array)로 구현했기 때문에 데이터를 넣을 때마다 정렬하느라 **O(N)**의 시간이 걸립니다. 나중에 배울 '힙(Heap)'을 사용하면 이를 **O(log N)**으로 획기적으로 줄일 수 있습니다."
    },
    features: [
        {
            title: "우선순위 기반 처리",
            description: "도착 순서(Time)보다 중요도(Priority)가 의사결정의 기준이 됩니다."
        },
        {
            title: "배열 구현의 한계",
            description: "리스트를 정렬된 상태로 유지하려면 삽입할 때마다 뒤의 원소들을 밀어내야 하므로 데이터가 많아질수록 느려집니다. (그래서 Heap을 씁니다)"
        }
    ],
    complexity: {
        access: "O(1) (Peek)",
        search: "O(n)",
        insertion: "O(n) (Sorted Insert)",
        deletion: "O(1) (Pop Front)"
    },
    complexityNames: {
        insertion: "Enqueue (Sorted)",
        deletion: "Dequeue (Max Priority)"
    },
    implementation: [
        {
            language: 'python',
            description: "리스트를 정렬 상태로 유지하는 단순 구현 예시입니다.",
            code: `class PriorityQueue:
    def __init__(self):
        self.queue = []

    def enqueue(self, item):
        # 1. 삽입 후 정렬 (또는 적절한 위치에 삽입)
        self.queue.append(item)
        self.queue.sort() # O(N log N) - 비효율적!

    def dequeue(self):
        # 2. 맨 앞(가장 작은 수) 꺼내기
        if not self.queue: return None
        return self.queue.pop(0)

    # 💡 실제로는 heapq 모듈을 사용해야 함
    # import heapq
    # heapq.heappush(h, item)
    # heapq.heappop(h)`
        }
    ],
    initialCode: {
        python: `# === USER CODE START ===
# Priority Queue (정렬된 배열 기반)
capacity = 8
queue = [None] * capacity
count = 0
front = 0
rear = 0


def enqueue(value):
    global count, rear
    if count == capacity:
        print("Full")
        return
    # 삽입 위치 찾기 (오름차순 유지)
    idx = count
    for i in range(count):
        if queue[i] is not None and value < queue[i]:
            idx = i
            break
    # 뒤로 밀기
    for i in range(count, idx, -1):
        queue[i] = queue[i - 1]
    queue[idx] = value
    count += 1
    rear = count


def dequeue():
    global count, rear
    if count == 0:
        print("Empty")
        return None
    val = queue[0]
    for i in range(count - 1):
        queue[i] = queue[i + 1]
    queue[count - 1] = None
    count -= 1
    rear = count
    return val

# 시나리오
enqueue(30)
enqueue(10)
enqueue(20)
dequeue()

# === USER CODE END ===`
    },
    practiceProblems: [
        {
            id: 1927,
            title: "최소 힙",
            tier: "Silver II",
            description: "우선순위 큐의 기본 동작을 최소 힙으로 구현합니다."
        },
        {
            id: 11279,
            title: "최대 힙",
            tier: "Silver II",
            description: "우선순위가 큰 값을 먼저 처리하는 큐를 구현합니다."
        },
        {
            id: 11286,
            title: "절댓값 힙",
            tier: "Silver I",
            description: "우선순위 기준을 변형한 큐를 구현합니다."
        }
    ]
};
