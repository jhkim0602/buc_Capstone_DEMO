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
    story: {
        problem: "배열 스택은 용량이 고정되어 있어 Overflow가 발생할 수 있습니다. 데이터 개수를 예측할 수 없다면 더 유연한 구조가 필요합니다.",
        definition: "연결 리스트 스택은 **노드와 포인터로 Top을 관리**하는 스택입니다. 필요할 때마다 노드를 추가하므로 크기 제한이 없습니다.\n\n**불변식**\n- Top은 항상 가장 최근에 삽입된 노드를 가리킨다.\n- Pop은 Top에서만 일어난다.",
        analogy: "접시를 쌓는 대신, 접시마다 연결 고리가 있는 사슬을 맨 위에 하나씩 추가하는 것과 같습니다.",
        playgroundDescription: "이번 단계에서 무엇을 볼까?\n- push 시 top이 새 노드로 바뀌는 순간\n- pop 시 top이 다음 노드로 이동하는 과정\n- 연결 구조를 따라가며 출력되는 순서\n\n**실습 요약**\n- Overflow 없이 계속 push 가능한지 확인\n- pop 후 top이 정확히 갱신되는지 확인",
    },
    features: [
        { title: "동적 크기", description: "필요할 때마다 노드를 추가하므로 크기 제한이 없습니다." },
        { title: "O(1) Push/Pop", description: "Top에서만 삽입/삭제하므로 항상 O(1)입니다." },
        { title: "메모리 오버헤드", description: "노드마다 포인터를 저장해야 하므로 배열보다 메모리 사용이 큽니다." },
    ],
    complexity: {
        access: "O(1) (Top)",
        search: "O(N)",
        insertion: "O(1)",
        deletion: "O(1)",
    },
    implementation: [
        {
            language: "python",
            description: "연결 리스트 기반 스택의 핵심 아이디어입니다.",
            code: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

class LinkedStack:
    def __init__(self):
        self.top = None

    def push(self, val):
        self.top = Node(val, self.top)

    def pop(self):
        if not self.top:
            return None
        val = self.top.val
        self.top = self.top.next
        return val`
        }
    ],
    initialCode: {
        python: `# === USER CODE START ===
# Node 클래스 정의
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

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["stack", "top", "result"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 10828, title: "스택", tier: "Silver IV", description: "스택 기본 연산을 구현합니다." },
    { id: 10773, title: "제로", tier: "Silver IV", description: "스택으로 입력을 처리합니다." },
    { id: 1874, title: "스택 수열", tier: "Silver II", description: "스택 시뮬레이션을 연습합니다." },
  ],
};
