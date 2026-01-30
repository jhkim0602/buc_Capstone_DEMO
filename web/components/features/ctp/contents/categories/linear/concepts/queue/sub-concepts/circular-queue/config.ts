import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const QUEUE_CIRCULAR_CONFIG: CTPModuleConfig = {
    title: "원형 큐 (Circular Queue)",
    description: "배열의 끝과 시작을 연결하여 공간을 재활용하는 구조입니다. 선형 큐의 공간 낭비 문제를 해결합니다.",
    mode: 'code',
    tags: ["Ring Buffer", "Memory Efficiency", "Modulo"],
    story: {
        problem: "💡 왜 원형 큐가 필요할까요?\n\n선형 큐(Linear Queue)에서는 데이터를 꺼내고 나면 앞쪽에 빈 공간이 생깁니다. 하지만 `Rear` 포인터는 계속 뒤로만 이동하기 때문에, 앞쪽이 비어있음에도 불구하고 '큐가 꽉 찼다'고 오해하는 **가짜 포화 상태(False Overflow)**가 발생합니다.\n\n이를 해결하려면 데이터를 꺼낼 때마다 남은 데이터를 앞으로 한 칸씩 당겨야 하는데, 이는 **O(N)**이라는 막대한 비용이 듭니다. '데이터 이동 없이 빈 공간을 재활용할 방법은 없을까?'라는 고민에서 원형 큐가 탄생했습니다.",

        definition: "📖 핵심 정의\n\n원형 큐는 고정된 크기의 배열을 마치 **양 끝이 연결된 띠(Ring)**처럼 사용합니다. 배열의 마지막 인덱스(N-1) 다음이 다시 0번 인덱스가 되도록 논리적으로 연결한 구조입니다.\n\n이렇게 하면 `Dequeue`로 인해 생긴 앞쪽의 빈 공간을 `Enqueue`가 다시 활용할 수 있게 되어, 메모리 낭비가 완전히 사라집니다.\n\n**불변식**\n- front는 항상 다음에 나갈 위치를 가리킨다.\n- rear는 다음에 들어갈 위치를 가리킨다.\n- count는 현재 저장된 원소 수를 정확히 나타낸다.",

        analogy: "🎡 쉽게 이해하기: 회전 초밥과 CPU 스케줄러\n\n1. **회전 초밥(Sushi Train):** 접시(데이터)가 레일을 따라 돌고 있습니다. 셰프(Enqueue)는 빈자리가 보이면 어디든 초밥을 올릴 수 있고, 손님(Dequeue)은 앞에서부터 가져갑니다. 레일은 끝없이 회전하므로 공간이 낭비되지 않습니다.\n\n2. **CPU 스케줄링(Round Robin):** 여러 프로그램이 CPU를 사용하려고 원형으로 줄을 섭니다. 할당된 시간 동안 처리를 다 못 끝낸 프로그램은 다시 줄의 '맨 뒤'로 보내지는데, 이 '맨 뒤'는 사실 배열의 '앞쪽 빈 공간'일 수 있습니다.",

        playgroundDescription: "## 🎮 시뮬레이션 가이드\n\n1. **Wrap-around (회전) 관찰하기:**\n   - `Push`를 계속 눌러 배열의 끝(7번)까지 채워보세요.\n   - `Pop`을 몇 번 눌러 앞쪽(0번, 1번)을 비워보세요.\n   - 다시 `Push`를 누르면 `Rear` 포인터가 **8번이 아닌 0번으로 돌아와** 데이터를 채우는 것을 확인할 수 있습니다.\n\n2. **Full vs Empty:**\n   - `Front`와 `Rear`가 같은 위치에 있으면 비어있는 것일까요, 꽉 찬 것일까요?\n   - 원형 큐에서는 이 모호함을 해결하기 위해 '한 칸을 비워두거나(Dummy)', '개수(Count) 변수'를 사용합니다. 이 시뮬레이터는 **Count 변수**를 사용하여 8칸을 꽉 채울 수 있게 구현되었습니다.\n\n**실습 요약**\n- rear가 배열 끝에서 0으로 돌아오는지 확인\n- count가 증가/감소하며 Full/Empty 판정을 보장하는지 확인",

        playgroundLimit: "Front가 Rear를 따라잡으면 '텅 빈 상태(Empty)', Rear가 한 바퀴 돌아 Front 바로 뒤까지 오면 '꽉 찬 상태(Full)'입니다."
    },
    features: [
        {
            title: "Modulo 연산 (나머지 연산)",
            description: "핵심 마법 공식: `(index + 1) % size`. 인덱스가 배열 크기를 넘어가려고 할 때, 나머지 연산을 통해 강제로 0부터 다시 시작하게 만듭니다. (예: 8 % 8 = 0)"
        },
        {
            title: "공간 효율성 (100% 활용)",
            description: "선형 큐와 달리 데이터를 이동시키는(Shift) 연산 없이도 모든 메모리 공간을 순환하며 알뜰하게 사용합니다."
        },
        {
            title: "무한 스트림 처리",
            description: "네트워크 패킷 버퍼나 키보드 입력 버퍼처럼, 데이터가 끊임없이 들어오고 나가는 환경(Stream)에서 가장 이상적인 자료구조입니다."
        }
    ],
    complexity: {
        access: "O(n)",
        search: "O(n)",
        insertion: "O(1)",
        deletion: "O(1)"
    },
    complexityNames: {
        insertion: "Enqueue (삽입)",
        deletion: "Dequeue (삭제)"
    },
    implementation: [
        {
            language: 'python',
            description: "원형 큐를 배열과 포인터로 구현한 예시입니다.",
            code: `class CircularQueue:
    def __init__(self, k: int):
        self.size = k
        self.queue = [None] * k
        self.front = 0
        self.rear = 0
        self.count = 0  # 현재 데이터 개수

    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False

        self.queue[self.rear] = value
        # 핵심: 나머지 연산으로 인덱스 순환
        self.rear = (self.rear + 1) % self.size
        self.count += 1
        return True

    def deQueue(self) -> bool:
        if self.isEmpty():
            return False

        self.queue[self.front] = None
        self.front = (self.front + 1) % self.size
        self.count -= 1
        return True

    def Front(self) -> int:
        if self.isEmpty(): return -1
        return self.queue[self.front]

    def Rear(self) -> int:
        if self.isEmpty(): return -1
        # rear는 '다음' 빈 칸을 가리키므로, 실제 데이터는 rear-1에 있음
        # (rear - 1 + size) % size 처리 필요
        return self.queue[(self.rear - 1 + self.size) % self.size]

    def isEmpty(self) -> bool:
        return self.count == 0

    def isFull(self) -> bool:
        return self.count == self.size`
        }
    ],
    initialCode: {
        python: `# === USER CODE START ===
# Circular Queue (원형 큐) 기본 구현
capacity = 8
queue = [None] * capacity
front = 0
rear = 0
count = 0

# 해시 대신, 단순 예시용 숫자 삽입

def enqueue(value):
    global rear, count
    if count == capacity:
        print("Full")
        return
    queue[rear] = value
    rear = (rear + 1) % capacity
    count += 1


def dequeue():
    global front, count
    if count == 0:
        print("Empty")
        return None
    val = queue[front]
    queue[front] = None
    front = (front + 1) % capacity
    count -= 1
    return val

# 시나리오
enqueue(10)
enqueue(20)
enqueue(30)
dequeue()
enqueue(40)
enqueue(50)

# === USER CODE END ===`
    },
    practiceProblems: [
        {
            id: 1021,
            title: "회전하는 큐",
            tier: "Silver III",
            description: "원형 큐의 회전 연산을 구현하는 대표 문제입니다."
        },
        {
            id: 1966,
            title: "프린터 큐",
            tier: "Silver III",
            description: "우선순위와 큐의 결합을 연습하는 문제입니다."
        },
        {
            id: 1158,
            title: "요세푸스 문제",
            tier: "Silver IV",
            description: "원형 구조에서 순서대로 제거되는 과정을 구현합니다."
        }
    ]
};
