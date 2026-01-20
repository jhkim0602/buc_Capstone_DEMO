import { PracticeProblem } from "../../../../../../shared/ctp-practice";
import { ComplexityData } from "../../../../../../shared/ctp-complexity";

export const TWO_POINTERS_LL_CONFIG = {
  title: "Two Pointers & Runner (심화 기법)",
  description: "연결 리스트 알고리즘의 꽃입니다. 두 개의 포인터를 서로 다른 속도나 위치로 움직여서, 단 한 번의 순회(Pass)로 문제를 해결합니다.",
  tags: ["Tortoise and Hare", "Cycle Detection", "Middle Node", "Floyd's Algorithm"],

  story: {
    problem: `끝이 안 보이는 긴 터널(리스트)이 있습니다. 이 터널의 '딱 중간' 지점을 찾고 싶습니다.\n길이를 모르니까 끝까지 갔다가(L), 다시 L/2만큼 돌아와야 할까요? (2번 이동)\n\n만약 친구와 함께 달린다면 어떨까요? 내가 1칸 갈 때 친구가 2칸씩 간다면, 친구가 끝에 도착했을 때 나는 정확히 '중간'에 있을 겁니다!`,
    definition: "두 개의 포인터(Slow, Fast)를 사용하여, 리스트를 특별한 방식으로 순회하는 알고리즘 패턴.",
    analogy: "토끼와 거북이 경주. 토끼(Fast)가 거북이(Slow)보다 2배 빠릅니다. 트랙이 원형이라면 토끼가 거북이를 언젠가 뒤에서 따라잡들(Cycle Detection) 것입니다.",
    playgroundLimit: "Slow 포인터와 Fast 포인터를 직접 조작해보세요. Fast가 NULL에 닿으면 Slow는 어디에 있을까요?"
  },

  features: [
    { title: "Cycle Detection", description: "리스트에 루프가 있는지 확인하는 'Floyd's Cycle Finding' 알고리즘입니다. Fast가 Slow를 따라잡으면 루프가 있는 것입니다." },
    { title: "중간 지점 찾기", description: "전체 길이를 몰라도, Fast가 끝에 닿는 순간 Slow는 정확히 중간에 위치합니다. 리스트를 두 번 읽을 필요가 없습니다." },
    { title: "뒤에서 K번째 찾기", description: "Fast를 먼저 K칸 보내놓고, 그 뒤에 Slow와 Fast를 같이 출발시키면 됩니다. Fast가 끝에 닿으면 Slow가 뒤에서 K번째입니다." },
  ],

  deepDive: {
    interviewProbablity: "High",
    realWorldUseCases: [
      "무한 루프 방지: 시스템 프로세스가 교착 상태나 루프에 빠졌는지 감지할 때 유용합니다.",
      "네트워크 패킷 분석: 순환되는 경로가 있는지 탐지합니다.",
      "중간값 찾기: 데이터 스트림에서 빠르게 중간 위치를 찾아야 할 때 사용합니다."
    ],
    performanceTrap: "Fast 포인터가 `next.next`로 이동하므로, `NULL` 체크를 꼼꼼히 안 하면 런타임 에러(NPE)가 터지기 쉽습니다."
  },

  comparison: {
    vs: "Naive Iteration",
    pros: ["한 번의 순회(One Pass)로 해결 가능", "추가 메모리(O(N)) 불필요 (공간복잡도 O(1))"],
    cons: ["직관적이지 않음 (Why it works?)"]
  },

  complexity: {
    access: "N/A",
    search: "O(N)",
    insertion: "N/A",
    deletion: "N/A",
  } as ComplexityData,

  practiceProblems: [
    {
      id: 141,
      title: "Linked List Cycle",
      tier: "Easy (LeetCode)",
      description: "리스트에 사이클이 있는지 true/false로 반환하세요. (Floyd's 알고리즘)"
    },
    {
      id: 876,
      title: "Middle of the Linked List",
      tier: "Easy (LeetCode)",
      description: "리스트의 중간 노드를 반환하세요. 노드 개수가 짝수일 때 주의하세요."
    },
    {
      id: 19,
      title: "Remove Nth Node From End",
      tier: "Medium (LeetCode)",
      description: "뒤에서 N번째 노드를 삭제하세요. (Two Pointer Window 기법)"
    }
  ] as PracticeProblem[],

  implementation: [
    {
      language: 'python' as const,
      description: "거북이(slow)와 토끼(fast) 패턴 구현입니다. fast가 2칸씩 뜁니다.",
      code: `def hasCycle(head):
    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next      # 1칸
        fast = fast.next.next # 2칸

        if slow == fast:
            return True # 잡혔다! (Cycle)

    return False # 끝에 도달함 (No Cycle)`
    }
  ],

  initialCode: {
    python: `# Python Runner Technique (Middle Node)
class Node:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# 1 -> 2 -> 3 -> 4 -> 5
head = Node(1)
curr = head

curr.next = Node(2)
curr = curr.next

curr.next = Node(3)
curr = curr.next

curr.next = Node(4)
curr = curr.next

curr.next = Node(5)
curr = curr.next

# Initialize Pointers
slow = head
fast = head

# Loop (Simulating Floyd's Runner)
# Round 1
slow = slow.next
fast = fast.next.next

# Round 2
slow = slow.next
fast = fast.next.next

# Result: Slow is at Middle (3)!
middle = slow
print(f"Middle: {middle.val}")`,
  },

  guide: [
    {
      title: "기본 설정 (Setup)",
      items: [
        {
          label: "포인터 초기화",
          code: "slow = head\nfast = head",
          description: "두 포인터를 모두 시작점(head)에 둡니다.",
          tags: ["Initialization"],
          isEditable: true
        }
      ]
    },
    {
      title: "Floyd's Cycle (토끼와 거북이)",
      items: [
        {
          label: "한 칸 이동 (Slow)",
          code: "slow = slow.next",
          description: "거북이는 한 번에 한 칸씩 이동합니다.",
          tags: ["Slow", "x1"],
          isEditable: true
        },
        {
          label: "두 칸 이동 (Fast)",
          code: "fast = fast.next.next",
          description: "토끼는 한 번에 두 칸씩 이동합니다. (속도 차이 발생)",
          tags: ["Fast", "x2"],
          isEditable: true
        },
        {
          label: "만남 확인",
          code: "if slow == fast:\n    print('Cycle found!')",
          description: "두 포인터가 만난다면 사이클이 존재한다는 증거입니다.",
          tags: ["Check"],
          isEditable: true
        }
      ]
    },
    {
      title: "Window Sliding (투 포인터)",
      items: [
        {
          label: "간격 벌리기",
          code: "fast = fast.next",
          description: "초기에 fast만 먼저 출발시켜 두 포인터 사이의 간격을 만듭니다.",
          tags: ["Gap"],
          isEditable: true
        }
      ]
    }
  ]
};
