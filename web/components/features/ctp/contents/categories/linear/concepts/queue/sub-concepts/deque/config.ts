import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const QUEUE_DEQUE_CONFIG: CTPModuleConfig = {
    title: "덱 (Deque)",
    description: "양쪽 끝에서 자유롭게 데이터를 넣고 뺄 수 있는 만능 자료구조입니다. Stack과 Queue의 기능을 모두 합친 형태입니다.",
    mode: 'code',
    tags: ["Double-Ended", "Flexible", "Palindrome"],
    story: {
        problem: "💡 스택도 필요하고 큐도 필요하다면?",
        definition: "📖 핵심 정의\n\nDeque(Double-Ended Queue)는 이름 그대로 '양쪽 끝(Front & Rear)이 모두 뚫려 있는 큐'입니다. 앞에서도 넣을 수 있고 뒤에서도 넣을 수 있어, 스택처럼 쓸 수도 있고 큐처럼 쓸 수도 있습니다.\n\n**불변식**\n- front는 첫 원소 위치를 가리킨다.\n- size만큼의 원소만 유효하다(원형 배열 기준).",
        analogy: "🃏 쉽게 이해하기: 카드 덱(Deck of Cards)\n\n바닥에 놓인 카드 더미를 생각해보세요. 맨 위에서 카드를 가져올 수도 있고(Pop Front), 맨 위에 다시 놓을 수도 있습니다(Push Front). 동시에 맨 아래에서 카드를 빼거나(Pop Rear) 넣을 수도(Push Rear) 있습니다.",
        playgroundDescription: "## 🎮 시뮬레이션 가이드\n\n1. **스택처럼 써보기:** `Push Front`와 `Pop Front`만 사용하면 스택(LIFO)이 됩니다.\n2. **큐처럼 써보기:** `Push Rear`와 `Pop Front`만 사용하면 큐(FIFO)가 됩니다.\n3. **양방향 조작:** 앞뒤로 마구 데이터를 넣어보며 원형 덱(Circular Deque)이 어떻게 인덱스를 관리하는지 관찰해보세요.\n\n**실습 요약**\n- 앞/뒤 삽입이 모두 O(1)인지 확인\n- front 위치가 어떻게 움직이는지 확인",
    },
    features: [
        {
            title: "양방향 입출력",
            description: "Front와 Rear 모두에서 삽입(Push)/삭제(Pop)가 가능합니다. 총 4가지 연산(PushF, PushR, PopF, PopR)을 지원합니다."
        },
        {
            title: "만능 자료구조",
            description: "Deque 하나만 있으면 Stack과 Queue를 모두 구현할 수 있습니다. Python의 `collections.deque`가 대표적인 예입니다."
        }
    ],
    complexity: {
        access: "O(n)",
        search: "O(n)",
        insertion: "O(1)",
        deletion: "O(1)"
    },
    complexityNames: {
        insertion: "Push (Front/Rear)",
        deletion: "Pop (Front/Rear)"
    },
    implementation: [
        {
            language: 'python',
            description: "배열을 원형으로 쓰는 Deque 구현입니다. import 없이 핵심 로직을 직접 확인할 수 있습니다.",
            code: `class CircularDeque:
    def __init__(self, capacity):
        self.capacity = capacity
        self.data = [None] * capacity
        self.front = 0        # 첫 원소 위치
        self.size = 0

    def is_empty(self):
        return self.size == 0

    def is_full(self):
        return self.size == self.capacity

    def _rear_index(self):
        return (self.front + self.size - 1) % self.capacity

    def push_front(self, value):
        if self.is_full():
            return False
        self.front = (self.front - 1 + self.capacity) % self.capacity
        self.data[self.front] = value
        self.size += 1
        return True

    def push_rear(self, value):
        if self.is_full():
            return False
        rear = (self.front + self.size) % self.capacity
        self.data[rear] = value
        self.size += 1
        return True

    def pop_front(self):
        if self.is_empty():
            return None
        value = self.data[self.front]
        self.data[self.front] = None
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return value

    def pop_rear(self):
        if self.is_empty():
            return None
        rear = self._rear_index()
        value = self.data[rear]
        self.data[rear] = None
        self.size -= 1
        return value

    def peek_front(self):
        return None if self.is_empty() else self.data[self.front]

    def peek_rear(self):
        return None if self.is_empty() else self.data[self._rear_index()]

# 사용 예시
dq = CircularDeque(5)
dq.push_rear(10)   # [10]
dq.push_front(5)   # [5, 10]
dq.push_rear(20)   # [5, 10, 20]
dq.pop_front()     # 5
dq.pop_rear()      # 20`
        }
    ],
    initialCode: {
        python: `# === USER CODE START ===
# Deque (원형 배열 기반)
capacity = 8
data = [None] * capacity
front = 0
size = 0


def push_front(value):
    global front, size
    if size == capacity:
        print("Full")
        return
    front = (front - 1 + capacity) % capacity
    data[front] = value
    size += 1


def push_rear(value):
    global size
    if size == capacity:
        print("Full")
        return
    rear = (front + size) % capacity
    data[rear] = value
    size += 1


def pop_front():
    global front, size
    if size == 0:
        print("Empty")
        return None
    val = data[front]
    data[front] = None
    front = (front + 1) % capacity
    size -= 1
    return val


def pop_rear():
    global size
    if size == 0:
        print("Empty")
        return None
    rear = (front + size - 1) % capacity
    val = data[rear]
    data[rear] = None
    size -= 1
    return val

# 시나리오
push_rear(10)
push_front(5)
push_rear(20)
pop_front()
pop_rear()

# === USER CODE END ===`
    },
    practiceProblems: [
        {
            id: 10866,
            title: "덱",
            tier: "Silver IV",
            description: "덱의 기본 연산을 구현하는 문제입니다."
        },
        {
            id: 5430,
            title: "AC",
            tier: "Gold V",
            description: "덱을 이용해 배열 뒤집기/삭제를 효율적으로 처리합니다."
        },
        {
            id: 11003,
            title: "최솟값 찾기",
            tier: "Gold I",
            description: "슬라이딩 윈도우의 최소값을 덱으로 관리합니다."
        }
    ]
};
