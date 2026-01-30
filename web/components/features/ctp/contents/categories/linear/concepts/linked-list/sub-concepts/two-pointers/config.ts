import { CTPModuleConfig } from "@/components/features/ctp/common/types";
import { PracticeProblem } from "../../../../../../shared/ctp-practice";
import { ComplexityData } from "../../../../../../shared/ctp-complexity";

export const TWO_POINTERS_LL_CONFIG: CTPModuleConfig = {
  title: "Two Pointers & Runner (심화 기법)",
  description: "연결 리스트 알고리즘의 꽃입니다. 두 개의 포인터를 서로 다른 속도나 위치로 움직여서, 단 한 번의 순회(Pass)로 문제를 해결합니다.",
  tags: ["Tortoise and Hare", "Cycle Detection", "Middle Node", "Floyd's Algorithm"],

  story: {
    problem: `끝이 안 보이는 긴 터널(리스트)이 있습니다. 이 터널의 '딱 중간' 지점을 찾고 싶습니다.
길이를 모르니까 끝까지 갔다가(L), 다시 L/2만큼 돌아와야 할까요? (2번 이동)

만약 친구와 함께 달린다면 어떨까요? 내가 1칸 갈 때 친구가 2칸씩 간다면, 친구가 끝에 도착했을 때 나는 정확히 '중간'에 있을 겁니다!

**면접 질문 빈출도**: 높음 (High)
Cycle Detection 문제는 단골 출제 문제입니다. (Floyd's Algorithm)`,
    definition: `두 개의 포인터(Slow, Fast)를 사용하여, 리스트를 특별한 방식으로 순회하는 알고리즘 패턴입니다.

**불변식 (Invariants)**
- Fast는 항상 Slow보다 앞서거나 같은 위치에 있다.
- Fast가 끝에 도달하는 순간 Slow는 중간에 위치한다(2배 속도 기준).

**Naive Iteration과 비교**
- 장점: 한 번의 순회(One Pass)로 해결 가능, 추가 메모리 불필요(공간복잡도 O(1)).
- 단점: 직관적이지 않음 (수학적 증명이 필요할 수 있음).`,
    analogy: `토끼와 거북이 경주. 토끼(Fast)가 거북이(Slow)보다 2배 빠릅니다. 트랙이 원형이라면 토끼가 거북이를 언젠가 뒤에서 따라잡을(Cycle Detection) 것입니다.

**실생활 예시**
- **무한 루프 방지**: 시스템 프로세스가 교착 상태나 루프에 빠졌는지 감지할 때 유용합니다.
- **네트워크 패킷 분석**: 순환되는 경로가 있는지 탐지합니다.
- **중간값 찾기**: 데이터 스트림에서 빠르게 중간 위치를 찾아야 할 때 사용합니다.`,
    playgroundLimit: "Slow 포인터와 Fast 포인터를 직접 조작해보세요. Fast가 NULL에 닿으면 Slow는 어디에 있을까요?",
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- slow/fast가 서로 다른 속도로 움직이는 과정
- 만나는 순간 사이클 존재를 판정하는 이유
- 중간 지점이 어떻게 결정되는지

**실습 요약**
- Fast가 두 칸 이동할 때 Slow 위치를 추적
- 사이클이 있으면 반드시 만난다는 점 확인`
  },

  features: [
    { title: "Cycle Detection", description: "리스트에 루프가 있는지 확인하는 'Floyd's Cycle Finding' 알고리즘입니다. Fast가 Slow를 따라잡으면 루프가 있는 것입니다." },
    { title: "중간 지점 찾기", description: "전체 길이를 몰라도, Fast가 끝에 닿는 순간 Slow는 정확히 중간에 위치합니다. 리스트를 두 번 읽을 필요가 없습니다." },
    { title: "뒤에서 K번째 찾기", description: "Fast를 먼저 K칸 보내놓고, 그 뒤에 Slow와 Fast를 같이 출발시키면 됩니다. Fast가 끝에 닿으면 Slow가 뒤에서 K번째입니다." },
    { title: "성능상 주의점 (Performance Trap)", description: "Fast 포인터가 `next.next`로 이동하므로, `NULL` 체크를 꼼꼼히 안 하면 런타임 에러(NPE)가 터지기 쉽습니다." }
  ],

  complexity: {
    access: "N/A",
    search: "O(N)",
    insertion: "N/A",
    deletion: "N/A",
  } as ComplexityData,

  practiceProblems: [
    {
      id: 1806,
      title: "부분합",
      tier: "Gold IV",
      description: "연속 부분합이 S 이상이 되는 최소 길이를 투 포인터로 찾습니다."
    },
    {
      id: 2470,
      title: "두 용액",
      tier: "Gold V",
      description: "정렬된 배열에서 합이 0에 가장 가까운 두 값을 찾습니다."
    },
    {
      id: 2473,
      title: "세 용액",
      tier: "Gold III",
      description: "투 포인터를 확장해 세 수의 합이 0에 가장 가까운 값을 찾습니다."
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
    python: `# === USER CODE START ===
# Cycle Detection: Floyd's Algorithm
# 리스트 내의 순환 반복(Cycle) 존재 여부를 탐지합니다.

# 1. 선형 리스트 생성 (1~8)
class Node:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

head = Node(1)
curr = head
for i in range(2, 9):
    curr.next = Node(i)
    curr = curr.next

# 2. 사이클 생성 (Force Cycle)
# Tail(8)이 Node(4)를 가리키게 하여 루프를 만듭니다.
# 1->2->3->[4->5->6->7->8]->4...
tail = curr
cycle_entry_node = head.next.next.next # Node(4)
tail.next = cycle_entry_node

# 3. 알고리즘 실행
slow = head
fast = head
step = 0

# Fast는 2칸, Slow는 1칸씩 이동
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    step += 1

    # 포인터 일치 = 사이클 발견
    if slow == fast:
        print(f"Cycle Detected at Step {step} (Meet at Node {slow.val})")
        break
# === USER CODE END ===`,
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
