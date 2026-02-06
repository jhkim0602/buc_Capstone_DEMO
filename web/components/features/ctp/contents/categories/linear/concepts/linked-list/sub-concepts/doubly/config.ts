import { CTPModuleConfig } from "@/components/features/ctp/common/types";
import { PracticeProblem } from "../../../../../../shared/ctp-practice";
import { ComplexityData } from "../../../../../../shared/ctp-complexity";

export const DOUBLY_LL_CONFIG: CTPModuleConfig = {
  title: "Doubly Linked List (이중 연결 리스트)",
  description: "앞으로만 갈 수 있던 단일 연결 리스트의 답답함을 해소합니다. `Prev` 포인터를 추가하여 양방향 이동이 가능해졌습니다.",
  tags: ["Prev Pointer", "Bidirectional", "Memory Overhead", "Browser History"],

  story: {
    problem: `보물찾기(Singly)를 하다가 갑자기 "아까 지나온 곳으로 다시 가봐!"라는 지시를 받았습니다.
하지만 우리에겐 '다음 장소' 쪽지만 있고 '이전 장소' 쪽지는 없습니다.
결국 처음부터 다시 찾아와야 합니다. 너무 비효율적이죠.

**면접 질문 빈출도**: 높음 (High)
LRU Cache 구현 문제에서 자주 등장합니다.`,
    definition: `노드가 '다음(Next)'뿐만 아니라 '이전(Prev)' 주소도 가지고 있는 구조입니다.

**불변식 (Invariants)**
- node.next.prev == node, node.prev.next == node 관계가 항상 유지되어야 합니다.

**Singly Linked List와 비교**
- 장점: 뒤로 가기(Back) 가능, 삭제 시 이전 노드 탐색 불필요(O(1)).
- 단점: 메모리 사용량 증가(Prev 포인터), 구현 복잡도 증가(링크 4개 조작).`,
    analogy: `기차 객실과 같습니다. 5호차에서 6호차(Next)로 갈 수도 있고, 다시 4호차(Prev)로 돌아갈 수도 있는 문이 양쪽에 다 있습니다.

**실생활 예시**
- **웹 브라우저**: 방문 기록(History)에서 '뒤로 가기'와 '앞으로 가기'를 지원합니다.
- **LRU Cache**: 가장 최근 데이터는 맨 앞으로, 오래된 데이터는 삭제할 때 O(1) 이동이 필요합니다.
- **텍스트 에디터**: 커서 이동이 자유로워야 하므로 이중 연결 리스트를 사용합니다.`,
    playgroundLimit: "노드를 삭제할 때, 앞뒤 연결을 모두 끊어줘야 합니다. 포인터 조작이 2배로 복잡해지니 주의하세요!",
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- next/prev가 양방향으로 연결되는 구조
- 중간 삽입/삭제 시 4개의 링크가 모두 업데이트되는지
- 앞/뒤로 자유롭게 이동하는 흐름

**실습 요약**
- 삭제는 O(1)이지만 링크 4개를 모두 갱신해야 함을 확인`
  },

  features: [
    { title: "양방향 탐색", description: "뒤로 가기(Back)가 가능해집니다. 탐색 유연성이 획기적으로 좋아집니다." },
    { title: "삭제 효율성", description: "단일 리스트에서 삭제하려면 '이전 노드'를 찾기 위해 또 순회해야 했지만, 여기선 `cur.prev`로 바로 알 수 있어 O(1) 삭제가 진짜 가능합니다." },
    { title: "메모리 오버헤드", description: "주소를 2개씩 저장해야 하므로 노드 하나당 메모리를 더 많이 먹습니다. (32bit 시스템 기준 +4byte)" },
    { title: "성능상 주의점 (Performance Trap)", description: "구현이 복잡해서 버그가 나기 쉽습니다. 특히 노드 삽입/삭제 시 `next`와 `prev` 링크 4개를 모두 정확히 연결해야 합니다." }
  ],

<<<<<<< HEAD
=======
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

>>>>>>> origin/feature/interview
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
<<<<<<< HEAD
    python: `# === USER CODE START ===
# Doubly Linked List: 양방향 이동 (Bidirectional)
=======
    python: `# Doubly Linked List: 양방향 이동 (Bidirectional)
>>>>>>> origin/feature/interview
# 앞뒤로 이동할 수 있는 리스트를 만듭니다.

class Node:
    def __init__(self, val=0, next=None, prev=None):
        self.val = val
        self.next = next
        self.prev = prev

# 노드 3개 생성 (1 <-> 2 <-> 3)
n1 = Node(1)
n2 = Node(2)
n3 = Node(3)

# 서로 연결해줍니다.
n1.next = n2
n2.prev = n1

n2.next = n3
n3.prev = n2

head = n1

# 1. 앞으로 가기 (Next)
curr = head
print("--- 정방향 ---")
while curr:
    print(curr.val)
    if not curr.next: break # 마지막 노드에서 멈춤
    curr = curr.next

# 2. 뒤로 돌아오기 (Prev)
print("--- 역방향 ---")
while curr:
    print(curr.val)
<<<<<<< HEAD
    curr = curr.prev
# === USER CODE END ===`,
=======
    curr = curr.prev`,
>>>>>>> origin/feature/interview
  },

  guide: [
    {
      title: "기본 조작 (Birectional)",
      items: [
        {
          label: "이전 노드 접근",
          code: "node.prev",
          description: "현재 노드의 바로 앞 노드로 이동합니다. 단일 연결 리스트에는 없는 강력한 기능입니다.",
          tags: ["Access", "O(1)"],
          isEditable: false
        },
        {
          label: "이중 연결 (Linking)",
          code: "A.next = B\nB.prev = A",
          description: "A와 B를 연결할 땐 반드시 '서로'를 가리켜야 합니다. 한쪽만 연결하면 외짝사랑(Broken Link)이 되어버립니다.",
          tags: ["Pattern", "Must-Do"],
          isEditable: false
        }
      ]
    },
    {
      title: "노드 삽입/삭제 패턴",
      items: [
        {
          label: "중간 삽입 (Insertion)",
          code: "new_node.next = cur\nnew_node.prev = cur.prev\ncur.prev.next = new_node\ncur.prev = new_node",
          description: "순서가 매우 중요합니다! 기존 연결(cur.prev)을 끊기 전에, 새 노드를 먼저 안전하게 연결해야 합니다.",
          tags: ["Critical", "Sequence"],
          isEditable: true
        },
        {
          label: "노드 삭제 (Deletion)",
          code: "cur.prev.next = cur.next\ncur.next.prev = cur.prev",
          description: "나(cur)를 건너뛰고, 내 앞 친구와 뒤 친구를 서로 손잡게 해주면 나는 리스트에서 빠지게 됩니다.",
          tags: ["O(1)", "Bypass"],
          isEditable: true
        }
      ]
    }
  ]
};
