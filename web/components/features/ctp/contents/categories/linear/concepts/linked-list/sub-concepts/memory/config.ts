import { PracticeProblem } from "../../../../../../shared/ctp-practice";
import { ComplexityData } from "../../../../../../shared/ctp-complexity";

export const MEMORY_LL_CONFIG = {
  title: "Memory & Sentinel (메모리 구조)",
  description: "연결 리스트가 실제 메모리(Heap) 상에서 어떻게 존재하는지, 그리고 구현을 깔끔하게 만드는 'Sentinel Node' 기법을 알아봅니다.",
  tags: ["Heap Memory", "Cache Miss", "Dummy Node", "Fragmentation"],

  story: {
    problem: `연결 리스트 코드를 짤 때 가장 짜증나는 것은?\n바로 "Head가 NULL일 때"와 "Tail을 삭제할 때" 같은 예외 처리입니다.\n\`if head is None:\`, \`if cur.next is None:\` ... if문 지옥에 빠지기 쉽습니다.\n\n만약 리스트의 양 끝에 '절대 지워지지 않는 가짜 노드(Dummy/Sentinel)'를 미리 박아두면 어떨까요?\n모든 노드는 '이전'과 '다음'이 무조건 존재하게 되어 예외 처리가 싹 사라집니다.`,
    definition: "구현 편의성을 위해 리스트의 시작(Head)이나 끝(Tail)에 배치하는 데이터 없는 빈 노드.",
    analogy: "책꽂이의 '북엔드(Bookend)'. 책이 쓰러지지 않게 양 끝을 받쳐줍니다. 실제 책은 아니지만 책들을 정리하는 데 필수적이죠.",
    playgroundLimit: "Dummy Node를 사용하면 삽입/삭제 로직이 얼마나 단순해지는지 비교해보세요."
  },

  features: [
    { title: "Sentinel Node (Dummy)", description: "Head/Tail 처리를 일반 노드 처리와 똑같이 만들어줍니다. 코드 복잡도를 획기적으로 줄여줍니다." },
    { title: "메모리 파편화 (Fragmentation)", description: "배열은 메모리에 착착 붙어있지만, 연결 리스트는 힙 메모리 여기저기에 흩어져 있습니다. (산탄총 맞은 것처럼)" },
    { title: "Cache Miss", description: "흩어진 노드를 찾아다니느라 CPU 캐시를 제대로 활용 못합니다. 배열보다 실제 속도가 느린 주 원인입니다." },
  ],

  deepDive: {
    interviewProbablity: "Medium",
    realWorldUseCases: [
      "OS 커널: 리스트 구현 시 거의 항상 Sentinel Node를 사용해 안정성을 높입니다.",
      "고성능 컴퓨팅: 메모리 풀(Memory Pool)을 사용해 노드들을 한곳에 모아 할당하여 캐시 효율을 높이는 기법을 씁니다."
    ],
    performanceTrap: "노드 하나마다 `malloc`(`new`)을 호출하는 건 시스템 콜 비용이 큽니다. 수백만 개의 노드를 만들면 할당 시간만으로도 시스템이 멈칫할 수 있습니다."
  },

  comparison: {
    vs: "Array Memory Layout",
    pros: ["메모리 할당/해제가 자유로움 (Fragmentation 허용)"],
    cons: ["Cache Locality 최악", "노드당 포인터 메모리 추가 소모"]
  },

  complexity: {
    access: "O(N) (Slow due into Cache Miss)",
    search: "O(N)",
    insertion: "O(1)",
    deletion: "O(1)",
  } as ComplexityData,

  practiceProblems: [],

  implementation: [
    {
      language: 'python' as const,
      description: "Dummy Node를 쓰면 `if not head:` 같은 분기문이 사라집니다.",
      code: `# Dummy Node 사용 전
def delete(head, val):
    if not head: return None
    if head.val == val: return head.next
    # ... 복잡한 로직 ...

# Dummy Node 사용 후 (Clean Code)
def delete_with_dummy(head, val):
    dummy = Node(-1, head) # 가짜 헤드
    cur = dummy

    while cur.next:
        if cur.next.val == val:
            cur.next = cur.next.next # 그냥 삭제
        else:
            cur = cur.next

    return dummy.next # 진짜 헤드 반환`
    }
  ],

  initialCode: {
    python: `# Python Sentinel Node Pattern
class Node:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# 실제 데이터: 1 -> 2
head = Node(1)
head.next = Node(2)

# 0. Dummy Node 생성 (Sentinel)
dummy = Node(-1) # 값은 상관 없음
dummy.next = head

# 1. 2를 삭제해봅시다. (Head가 바뀌거나 Empty가 되어도 안전)
cur = dummy
while cur.next:
    if cur.next.val == 2:
        print(f"Deleting {cur.next.val}...")
        cur.next = cur.next.next
    else:
        cur = cur.next

# 결과 확인 (Dummy 다음이 진짜 Head)
real_head = dummy.next
print(f"Head Data: {real_head.val}")`,
  },

  commandReference: {
    python: [
      { label: 'Dummy', code: 'd = Node(-1)' },
      { label: 'Connect', code: 'd.next = head' }
    ]
  }
};
