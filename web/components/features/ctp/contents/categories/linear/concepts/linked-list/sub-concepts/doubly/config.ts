import { PracticeProblem } from "../../../../../../shared/ctp-practice";
import { ComplexityData } from "../../../../../../shared/ctp-complexity";

export const DOUBLY_LL_CONFIG = {
  title: "Doubly Linked List (이중 연결 리스트)",
  description: "앞으로만 갈 수 있던 단일 연결 리스트의 답답함을 해소합니다. `Prev` 포인터를 추가하여 양방향 이동이 가능해졌습니다.",
  tags: ["Prev Pointer", "Bidirectional", "Memory Overhead", "Browser History"],

  story: {
    problem: `보물찾기(Singly)를 하다가 갑자기 "아까 지나온 곳으로 다시 가봐!"라는 지시를 받았습니다.\n하지만 우리에겐 '다음 장소' 쪽지만 있고 '이전 장소' 쪽지는 없습니다.\n결국 처음부터 다시 찾아와야 합니다. 너무 비효율적이죠.`,
    definition: "노드가 '다음(Next)'뿐만 아니라 '이전(Prev)' 주소도 가지고 있는 구조.",
    analogy: "기차 객실과 같습니다. 5호차에서 6호차(Next)로 갈 수도 있고, 다시 4호차(Prev)로 돌아갈 수도 있는 문이 양쪽에 다 있습니다.",
    playgroundLimit: "노드를 삭제할 때, 앞뒤 연결을 모두 끊어줘야 합니다. 포인터 조작이 2배로 복잡해지니 주의하세요!"
  },

  features: [
    { title: "양방향 탐색", description: "뒤로 가기(Back)가 가능해집니다. 탐색 유연성이 획기적으로 좋아집니다." },
    { title: "삭제 효율성", description: "단일 리스트에서 삭제하려면 '이전 노드'를 찾기 위해 또 순회해야 했지만, 여기선 `cur.prev`로 바로 알 수 있어 O(1) 삭제가 진짜 가능합니다." },
    { title: "메모리 오버헤드", description: "주소를 2개씩 저장해야 하므로 노드 하나당 메모리를 더 많이 먹습니다. (32bit 시스템 기준 +4byte)" },
  ],

  deepDive: {
    interviewProbablity: "High",
    realWorldUseCases: [
      "웹 브라우저 방문 기록: 뒤로 가기 / 앞으로 가기",
      "LRU Cache: 가장 최근에 쓴 데이터를 맨 앞으로, 오래된 걸 맨 뒤로 옮길 때 양방향 이동이 필수입니다.",
      "텍스트 에디터: 커서 이동이 자유로워야 하므로 이중 연결 리스트를 많이 씁니다."
    ],
    performanceTrap: "구현이 복잡해서 버그가 나기 쉽습니다. 특히 노드 삽입/삭제 시 `next`와 `prev` 링크 4개를 모두 정확히 연결해야 합니다."
  },

  comparison: {
    vs: "Singly Linked List",
    pros: ["뒤로 가기 가능", "삭제 시 이전 노드 탐색 불필요"],
    cons: ["메모리 사용량 증가", "구현 복잡도 증가"]
  },

  complexity: {
    access: "O(N)",
    search: "O(N)",
    insertion: "O(1)",
    deletion: "O(1)",
  } as ComplexityData,

  practiceProblems: [
    {
      id: 2346,
      title: "풍선 터뜨리기",
      tier: "Silver III",
      description: "풍선 안에 든 종이만큼 오른쪽/왼쪽으로 이동합니다. 양방향 이동이 필요한 대표적 문제입니다. (Deque 활용 가능)"
    }
  ] as PracticeProblem[],

  implementation: [
    {
      language: 'python' as const,
      description: "이전 노드(prev)를 저장할 변수가 하나 더 추가됩니다.",
      code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None  # New!

# 노드 연결
n1 = Node(10)
n2 = Node(20)

n1.next = n2
n2.prev = n1  # 서로 연결`
    }
  ],

  initialCode: {
    python: `# Python Doubly Linked List
class Node:
    def __init__(self, val=0):
        self.val = val
        self.next = None
        self.prev = None

head = Node(1)
tail = Node(2)

# 연결하기
head.next = tail
tail.prev = head

# 뒤로 가기 확인
print(tail.prev.val) # 1

# 중간에 삽입 (1 <-> 1.5 <-> 2)
new_node = Node(1.5)
# 1. 새 노드 연결
new_node.next = tail
new_node.prev = head
# 2. 기존 노드 연결 수정
head.next = new_node
tail.prev = new_node

curr = head
while curr:
    print(curr.val, end=" -> ")
    curr = curr.next`,
  },

  guide: [
    {
      title: "기본 조작 (Birectional)",
      items: [
        {
          label: "이전 노드 (Prev)",
          code: "curr.prev",
          description: "현재 노드의 바로 앞 노드를 가리킵니다. (Head는 prev가 None입니다)",
          tags: ["Back", "O(1)"],
          isEditable: false
        },
        {
          label: "양방향 연결",
          code: "n1.next = n2\nn2.prev = n1",
          description: "두 노드를 서로 연결해야 합니다. 하나라도 빠뜨리면 끊어진 다리가 됩니다.",
          tags: ["Linking", "Pattern"],
          isEditable: false
        }
      ]
    },
    {
      title: "삽입/삭제 패턴",
      items: [
        {
          label: "중간 삽입",
          code: "new_node.prev = prev\nnew_node.next = next\nprev.next = new_node\nnext.prev = new_node",
          description: "총 4개의 포인터를 수정해야 합니다. 순서에 주의하세요!",
          tags: ["Complexity"],
          isEditable: true
        }
      ]
    }
  ]
};
