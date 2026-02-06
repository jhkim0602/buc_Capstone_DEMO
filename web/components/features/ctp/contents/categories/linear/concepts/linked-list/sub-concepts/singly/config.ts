import { CTPModuleConfig } from "@/components/features/ctp/common/types";
import { PracticeProblem } from "../../../../../../shared/ctp-practice";
import { ComplexityData } from "../../../../../../shared/ctp-complexity";

export const SINGLY_LL_CONFIG: CTPModuleConfig = {
  title: "Singly Linked List (단일 연결 리스트)",
  description: "데이터가 메모리 이곳저곳에 흩어져 있고, '다음 위치'를 가리키는 화살표(Pointer)로 연결된 구조입니다.",
  tags: ["Node", "Pointer", "Head & Tail", "Dynamic Size"],

  story: {
    problem: `친구들과 보물찾기를 한다고 상상해보세요.
첫 번째 보물 쪽지를 찾았더니, "도서관 3열 4번 책장으로 가라"고 적혀있습니다.
그곳에 가니 두 번째 쪽지가 있고, "운동장 조회대 밑으로 가라"고 합니다.

우리는 전체 지도를 다 갖고 있지 않고, 오직 '다음 장소'만 알 수 있습니다. 이것이 연결 리스트입니다.

**면접 질문 빈출도**: 매우 높음 (Very High)
Array와의 차이점, Reverse(뒤집기), Cycle Detection 등 꼬리 질의가 많습니다.`,
    definition: `데이터(Value)와 다음 노드의 주소(Next)를 담고 있는 '노드'들이 한 줄로 연결된 자료구조입니다.

**불변식 (Invariants)**
- head에서 next를 따라가면 모든 노드가 정확히 한 번씩 나타난다 (사이클 없을 때).

**Array와 비교**
- 장점: 중간 삽입/삭제가 매우 빠름(O(1), 위치 알 때), 메모리 크기 제한 없음(Dynamic).
- 단점: 인덱스 접근 불가능(O(N)), 다음 주소를 저장할 추가 메모리 필요.`,
    analogy: `보물찾기 쪽지들의 연결. 쪽지(노드)에는 '보물(데이터)'과 '다음 장소(포인터)'가 적혀있습니다.

**실생활 예시**
- **Undo/Redo 기능**: 이전 상태로 돌아가는 스택 구현에 쓰입니다.
- **음악 플레이어**: 재생목록에서 다음 곡, 이전 곡으로 넘어갑니다.
- **OS 파일 시스템**: 파일 조각들이 디스크 여기저기 흩어져 연결되어 있습니다.`,
    playgroundLimit: "노드를 추가하고 연결해보세요. 중간에 노드를 끼워넣을 때 링크가 어떻게 바뀌는지 관찰해보세요.",
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- head에서 순차적으로 이동하는 흐름
- 중간 삽입 시 next 링크가 바뀌는 지점
- 노드를 삭제할 때 연결이 어떻게 유지되는지

**실습 요약**
- 순회는 O(N), 삽입/삭제는 위치만 알면 O(1)임을 확인`
  },

  features: [
    { title: "동적 크기 (Dynamic Size)", description: "배열처럼 미리 크기를 잡을 필요가 없습니다. 필요할 때마다 쪽지(노드)를 하나씩 추가하면 됩니다." },
    { title: "순차 탐색 (Sequential Access)", description: "3번째 쪽지를 바로 찾을 수 없습니다. 반드시 첫 번째 쪽지부터 차례대로 따라가야 합니다. (O(N))" },
    { title: "효율적인 삽입/삭제", description: "탐색은 느리지만, 위치만 안다면 '화살표'만 살짝 바꿔서 데이터를 중간에 끼워넣거나 뺄 수 있습니다. (O(1))" },
    { title: "성능상 주의점 (Performance Trap)", description: "`get(i)` 연산이 O(N)이라는 걸 잊지 마세요. 반복문에서 `list.get(i)`를 호출하면 전체 성능은 O(N^2)으로 곤두박질 칩니다." }
  ],

<<<<<<< HEAD
=======
  deepDive: {
    interviewProbablity: "Very High",
    realWorldUseCases: [
      "Undo/Redo 기능: 이전 상태로 돌아가는 스택 구현에 쓰입니다.",
      "음악 플레이어 재생목록: 다음 곡, 이전 곡으로 넘어갑니다.",
      "OS 파일 시스템: 파일 조각들이 디스크 여기저기 흩어져 연결되어 있습니다."
    ],
    performanceTrap: "`get(i)` 연산이 O(N)이라는 걸 잊지 마세요. 반복문에서 `list.get(i)`를 호출하면 전체 성능은 O(N^2)으로 곤두박질 칩니다."
  },

  comparison: {
    vs: "Array",
    pros: ["중간 삽입/삭제가 매우 빠름 (O(1))", "메모리 크기 제한 없음"],
    cons: ["인덱스 접근 불가능 (O(N))", "다음 주소를 저장할 추가 메모리 필요 (Overhead)"]
  },

>>>>>>> origin/feature/interview
  complexity: {
    access: "O(N)",
    search: "O(N)",
    insertion: "O(1) (위치 알 때)",
    deletion: "O(1) (위치 알 때)",
  } as ComplexityData,

  practiceProblems: [
    {
      id: 1158,
      title: "요세푸스 문제",
      tier: "Silver IV",
      description: "원형으로 앉은 사람들을 순서대로 제거하는 문제입니다. 리스트의 삭제 연산을 연습하기 좋습니다."
    },
    {
      id: 1406,
      title: "에디터",
      tier: "Silver II",
      description: "커서를 움직이며 문자를 삽입/삭제합니다. 배열로 풀면 시간 초과가 나므로 연결 리스트가 필수입니다."
    },
    {
      id: 5397,
      title: "키로거",
      tier: "Silver II",
      description: "화살표 키와 백스페이스 처리를 연결 리스트(혹은 투 스택)로 구현해보세요."
    }
  ] as PracticeProblem[],

  implementation: [
    {
      language: 'python' as const,
      description: "Python은 고수준 언어라 포인터가 없지만, Class와 Reference로 똑같이 구현합니다.",
      code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return

        # 끝까지 걸어가서 붙이기 (O(N))
        cur = self.head
        while cur.next:
            cur = cur.next
        cur.next = new_node`
    }
  ],

  initialCode: {
<<<<<<< HEAD
    python: `# === USER CODE START ===
# Singly Linked List: 기차 놀이 (Basic)
=======
    python: `# Singly Linked List: 기차 놀이 (Basic)
>>>>>>> origin/feature/interview
# 노드를 하나씩 연결하여 리스트를 만듭니다.

class Node:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# 1. 기차 머리(Head) 만들기
head = Node(10)
print(f"머리 노드: {head.val}")

# 2. 칸 추가하기 (Append)
# 10 -> 20 -> 30
head.next = Node(20)
head.next.next = Node(30)

# 3. 전체 순회 (Traversal)
# 모든 칸을 방문하며 값을 확인합니다.
curr = head
while curr:
    print(f"현재 칸: {curr.val}")
<<<<<<< HEAD
    curr = curr.next
# === USER CODE END ===`,
=======
    curr = curr.next`,
>>>>>>> origin/feature/interview
  },

  guide: [
    {
      title: "기본 조작 (Read-Only)",
      items: [
        {
          label: "초기화",
          code: "head = Node(1)",
          description: "새로운 노드를 생성하고 head 포인터가 가리키게 합니다.",
          tags: ["Initialization"],
          isEditable: false
        },
        {
          label: "노드 연결",
          code: "head.next = Node(2)",
          description: "head 노드의 다음(next)으로 새로운 노드를 연결합니다.",
          tags: ["Linking", "O(1)"],
          isEditable: false
        }
      ]
    },
    {
      title: "순회 (Traversal)",
      items: [
        {
          label: "변수 선언",
          code: "curr = head",
          description: "탐색을 위해 현재 위치를 가리킬 curr 변수를 선언합니다.",
          tags: ["Pointer"],
          isEditable: true
        },
        {
          label: "한 칸 이동",
          code: "curr = curr.next",
          description: "curr 포인터를 다음 노드로 이동시킵니다. 만약 다음이 없다면 None이 됩니다.",
          tags: ["Movement", "O(1)"],
          isEditable: true
        },
        {
          label: "값 확인",
          code: "print(curr.val)",
          description: "현재 가리키고 있는 노드의 값을 출력합니다.",
          tags: ["Access"],
          isEditable: true
        }
      ]
    },
    {
      title: "수정 및 삽입 (Modification)",
      items: [
        {
          label: "값 변경",
          code: "curr.val = 99",
          description: "현재 노드의 값을 99로 변경합니다.",
          tags: ["Update", "O(1)"],
          isEditable: true
        },
        {
          label: "중간 삽입 패턴",
          code: "new_node.next = curr.next\ncurr.next = new_node",
          description: "새 노드를 중간에 끼워넣는 표준 패턴입니다. (순서 중요!)",
          tags: ["Pattern", "O(1)"],
          isEditable: true
        }
      ]
    }
  ]
};
