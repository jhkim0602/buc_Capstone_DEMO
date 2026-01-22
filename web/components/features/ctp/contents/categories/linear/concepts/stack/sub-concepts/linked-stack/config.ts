import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const STACK_LINKED_CONFIG: CTPModuleConfig = {
    title: "Linked Stack (연결 리스트 스택)",
    description: "크기 제한이 없는 연결 리스트 기반 스택을 구현합니다.",
    tags: ["Linked List", "Dynamic Size", "Pointer"],
    mode: "code", // Code Editor Mode
    interactive: {
        // Code mode doesn't strictly need interactive config unless using specific buttons
        components: [],
    },
    initialCode: {
        python: `# Node 클래스 정의
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

# Linked Stack 클래스
class LinkedStack:
    def __init__(self):
        self.top = None  # 스택의 맨 위(Top) 노드
        self.size = 0

    def push(self, item):
        new_node = Node(item)
        if self.top is None:
            self.top = new_node
        else:
            new_node.next = self.top
            self.top = new_node
        self.size += 1

    def pop(self):
        if self.top is None:
            return None
        
        value = self.top.value
        self.top = self.top.next
        self.size -= 1
        return value

    def peek(self):
        if self.top is None:
            return None
        return self.top.value

    def is_empty(self):
        return self.top is None

    def __str__(self):
        curr = self.top
        items = []
        while curr:
            items.append(str(curr.value))
            curr = curr.next
        return "Top -> " + " -> ".join(items) if items else "Empty"

# 사용 예시
stack = LinkedStack()
stack.push(10)
stack.push(20)
stack.push(30)
top_val = stack.pop()
`
    },
    story: {
        problem: `### 왜 필요할까? (Problem)
**"스택이 꽉 찼습니다!"**

배열 스택은 구현이 쉽고 빠르지만, 치명적인 단점이 있습니다.
바로 **크기가 고정되어 있다**는 것입니다. (Fixed Capacity)

**다음 조건 중 2개 이상 만족한다면, Linked Stack이 더 적합합니다:**
1.  **크기 예측 불가**: 사용자 행동이나 스트림 입력처럼 얼마나 쌓일지 알 수 없을 때
2.  **거대한 스택**: 수백만 개의 데이터를 담아야 하는데, 연속된 메모리 공간(배열)을 확보하기 어려울 때
3.  **Overflow 불허**: 시스템/임베디드 환경에서 "꽉 찼습니다" 오류가 절대 나면 안 될 때
4.  **Resizing 비용 부담**: 배열 크기를 늘리는(이사가는) 순간적인 멈춤(Latency)이 허용되지 않을 때`,
        definition: `### 핵심 정의 (Definition)
**Linked Stack**은 데이터(노드)들이 서로 줄로 연결된 형태의 스택입니다.

*   **동적 크기 (Dynamic Size)**: 메모리가 허용하는 범위 내에서, 필요할 때마다 노드를 추가해 **동적으로 확장 가능**합니다.
*   **Top 포인터**: 스택의 가장 위(Top)에 있는 노드만 기억하면 됩니다.
*   **Push**: 새 노드를 만들고, 현재 Top 앞에 연결합니다.
*   **Pop**: 현재 Top 노드를 떼어내고, 그 다음 노드를 Top으로 만듭니다.`,
        analogy: `### 쉽게 이해하기 (Analogy)
**기차놀이**를 상상해 보세요.

1.  새로운 사람이 오면, 맨 앞에 있는 사람(Top)의 어깨를 잡습니다. (Push)
2.  이제 그 사람이 새로운 맨 앞(Top)이 됩니다.
3.  나가면, 맨 앞에 있는 사람이 손을 놓고 나갑니다. (Pop)
4.  그 뒤에 있던 사람이 다시 맨 앞이 됩니다.

방이 꽉 찰 걱정이 없습니다. 사람이 오면 그냥 줄을 이으면 되니까요!`,
        playgroundDescription: `
오른쪽 에디터에서 **Linked Stack**을 코드로 구현해 보세요.
**Undo/Redo 시스템**이나 **무한 스트리밍 파서**를 만든다고 상상하며, 크기 제한 없는 스택을 만들어 봅시다.
        `
    },
    features: [
        {
            title: "Undo / Redo 시스템",
            description: "IDE나 에디터에서 사용자가 얼마나 작업을 많이 할지 모릅니다. Linked Stack은 작업 기록을 메모리가 허용하는 한 무제한으로 저장할 수 있습니다."
        },
        {
            title: "함수 호출 스택 (Call Stack)",
            description: "재귀 깊이를 예측할 수 없는 DFS 탐색이나 인터프리터 언어 구현에서, Stack Overflow를 방지하기 위해 동적 연결 구조를 활용합니다."
        },
        {
            title: "스트리밍 파서 (Streaming Parser)",
            description: "네트워크로 들어오는 거대한 JSON/XML 데이터를 파싱할 때, 입력이 끝날 때까지 스택 깊이를 알 수 없으므로 유연한 Linked Stack이 필수적입니다."
        }
    ],
    complexity: {
        access: "O(1)",
        search: "O(n)",
        insertion: "O(1)",
        deletion: "O(1)"
    },
    complexityNames: {
        access: "Peek (Top)",
        search: "Search",
        insertion: "Push (Top)",
        deletion: "Pop (Top)"
    },
    practiceProblems: [
        {
            id: 10828,
            title: "스택 (Stack Implementation)",
            tier: "Silver IV",
            description: "스택의 기본 구조를 직접 구현해 봅니다. (배열 vs 연결리스트 차이 느껴보기)"
        },
        {
            id: 1918,
            title: "후위 표기식 (Postfix)",
            tier: "Gold II",
            description: "수식 파싱(Parser)은 Linked Stack이 활약하는 대표적인 분야입니다."
        }
    ],
    implementation: [
        {
            language: 'python',
            code: `# Python으로 구현한 Linked Stack 예제

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedStack:
    def __init__(self):
        self.top = None # Top 역할을 하는 노드

    def push(self, value):
        new_node = Node(value)
        new_node.next = self.top # 새 노드가 현재 Top을 가리킴
        self.top = new_node      # Top 갱신

    def pop(self):
        if self.is_empty():
            return None
        value = self.top.value
        self.top = self.top.next # Top을 다음 노드로 이동
        return value

    def peek(self):
        if self.is_empty():
            return None
        return self.top.value

    def is_empty(self):
        return self.top is None

    def __str__(self):
        curr = self.top
        items = []
        while curr:
            items.append(str(curr.value))
            curr = curr.next
        return "Top -> " + " -> ".join(items) if items else "Empty"`
        }
    ]
};
