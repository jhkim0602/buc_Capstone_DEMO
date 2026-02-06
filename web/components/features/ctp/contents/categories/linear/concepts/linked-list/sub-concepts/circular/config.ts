import { CTPModuleConfig } from "@/components/features/ctp/common/types";
import { PracticeProblem } from "../../../../../../shared/ctp-practice";
import { ComplexityData } from "../../../../../../shared/ctp-complexity";

export const CIRCULAR_LL_CONFIG: CTPModuleConfig = {
  title: "Circular Linked List (원형 연결 리스트)",
  description: "끝이 없는 고리 형태의 리스트입니다. 마지막 노드(Tail)가 다시 첫 번째 노드(Head)를 가리킵니다.",
  tags: ["Cycle", "Round Robin", "Scheduling", "Infinite Loop"],

  story: {
    problem: `놀이공원의 회전목마(Merry-Go-Round)를 타본 적 있나요?
맨 앞 말이 달린다고 맨 끝 말이 멈추지 않습니다. 계속 돌고 돌죠.

음악 스트리밍 앱에서 '전곡 반복 재생'을 켰을 때, 마지막 곡이 끝나면 다시 첫 곡으로 돌아가는 원리도 이와 같습니다.

**면접 질문 빈출도**: 낮음 (Low)
실무(OS, 시스템 프로그래밍)에서는 중요하지만 코딩 테스트에서는 자주 나오지 않습니다.`,
    definition: `마지막 노드(Tail)의 Next 포인터가 NULL이 아니라, 다시 Head를 가리키는 연결 리스트입니다.

**불변식 (Invariants)**
- tail.next는 항상 head를 가리킨다.
- 순회는 반드시 종료 조건(head 복귀)을 갖는다.

**Singly Linked List와 비교**
- 장점: 마지막에서 처음으로 이동 가능, 무한 반복 구현 용이.
- 단점: 종료 조건 구현이 까다로움(무한 루프 버그 위험).`,
    analogy: `수건 돌리기 게임. 사람들이 원형으로 앉아있어서, 계속 오른쪽으로 전달해도 끝이 나지 않고 다시 처음 사람에게 돌아옵니다.

**실생활 예시**
- **CPU 스케줄링**: 라운드 로빈 방식으로 프로세스 A -> B -> C -> A ... 순서대로 실행시킵니다.
- **게임 턴 관리**: 플레이어 1 -> 2 -> 3 -> 1 ... 순서가 돌아옵니다.
- **스트리밍 버퍼**: 링 버퍼(Ring Buffer) 구현 시 사용하여 메모리를 효율적으로 재사용합니다.`,
    playgroundLimit: "주의! 반복문을 `while (cur != null)`로 돌리면 영원히 끝나지 않는 무한 루프에 빠집니다. 종료 조건(`cur != head`)을 잘 설정해야 합니다.",
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- tail이 다시 head를 가리키는 구조
- 한 바퀴만 도는 안전한 순회 패턴
- 라운드 로빈처럼 순환되는 흐름

**실습 요약**
- 종료 조건 없이 순회하면 무한 루프가 된다는 점 확인`
  },

  features: [
    { title: "끝이 없음 (Infinite)", description: "NULL 포인터가 없습니다. 계속 순회하면 데이터를 무한히 반복해서 읽을 수 있습니다." },
    { title: "시작이 곧 끝", description: "어떤 노드에서 시작하든, 계속 가면 다시 제자리로 돌아옵니다. 특정 노드를 'Head'라고 부르기 애매할 때도 있습니다." },
    { title: "라운드 로빈 (Round Robin)", description: "OS 스케줄러가 여러 프로세스에게 공평하게 시간을 나눠줄 때, 이 구조를 사용하여 순서대로 실행시킵니다." },
    { title: "성능상 주의점 (Performance Trap)", description: "순회 코드를 짤 때 `do-while` 문을 쓰거나, `head` 도착 여부를 체크하지 않으면 프로그램이 멈추지 않습니다." }
  ],

<<<<<<< HEAD
=======
  deepDive: {
    interviewProbablity: "Low",
    realWorldUseCases: [
      "CPU 스케줄링 (Round Robin): 프로세스 A -> B -> C -> A -> ...",
      "멀티플레이어 게임 턴 관리: 플레이어 1 -> 2 -> 3 -> 1 ...",
      "스트리밍 버퍼: 링 버퍼(Ring Buffer) 구현 시 사용됩니다."
    ],
    performanceTrap: "순회 코드를 짤 때 `do-while` 문을 쓰거나, `head` 도착 여부를 체크하지 않으면 프로그램이 멈추지 않습니다."
  },

  comparison: {
    vs: "Singly Linked List",
    pros: ["마지막에서 처음으로 이동 가능", "무한 반복 구현 용이"],
    cons: ["종료 조건 구현이 까다로움", "무한 루프 버그 위험"]
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
      id: 1158,
      title: "요세푸스 문제",
      tier: "Silver IV",
      description: "원형 큐(Circular Queue)나 원형 리스트를 이용해 자연스럽게 시뮬레이션 할 수 있습니다."
    }
  ] as PracticeProblem[],

  implementation: [
    {
      language: 'python' as const,
      description: "Tail의 next를 Head로 연결해주는 것이 핵심입니다.",
      code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# 1. 노드 생성
n1 = Node('A')
n2 = Node('B')
n3 = Node('C')

# 2. 원형 연결
n1.next = n2
n2.next = n3
n3.next = n1  # Tail -> Head

# 3. 무한 순회 (10번만)
cur = n1
for _ in range(10):
    print(cur.data, end=" -> ")
    cur = cur.next
# 결과: A -> B -> C -> A -> B -> C ...`
    }
  ],

  initialCode: {
<<<<<<< HEAD
    python: `# === USER CODE START ===
# Circular Linked List: 라운드 로빈 스케줄러 (Scheduler)
=======
    python: `# Circular Linked List: 라운드 로빈 스케줄러 (Scheduler)
>>>>>>> origin/feature/interview
# 프로세스들에게 CPU 시간을 공평하게 분배하는 알고리즘 시뮬레이션입니다.
# Process ID: 100 -> 101 -> 102 -> 100 (Loop)

class Node:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# 1. 프로세스 큐 준비
p1 = Node(100)
p2 = Node(101)
p3 = Node(102)

# 2. 원형 연결 (Circular Link)
p1.next = p2
p2.next = p3
p3.next = p1 # Tail Connects to Head

# 3. 스케줄링 시뮬레이션 (Simulation)
# Time Quantum마다 다음 프로세스로 Context Switching 합니다.

current_proc = p1
for time_slice in range(1, 7):
    # Execute Process
    print(f"Time {time_slice}: Running PID {current_proc.val}")
<<<<<<< HEAD

    # Context Switch (Next Process)
    current_proc = current_proc.next
# === USER CODE END ===`,
=======
    
    # Context Switch (Next Process)
    current_proc = current_proc.next`,
>>>>>>> origin/feature/interview
  },

  guide: [
    {
      title: "원형 연결 (Circular)",
      items: [
        {
          label: "마지막 연결",
          code: "tail.next = head",
          description: "마지막 노드가 다시 첫 번째 노드를 가리키게 하여 고리를 만듭니다.",
          tags: ["Loop"],
          isEditable: false
        }
      ]
    },
    {
      title: "순회 주의사항",
      items: [
        {
          label: "무한 루프 방지",
          code: "curr != head",
          description: "일반 리스트처럼 None(NULL)을 찾으면 안 됩니다. 다시 head로 돌아왔는지 체크하세요!",
          tags: ["Termination"],
          isEditable: true
        },
        {
          label: "안전한 순회 패턴",
          code: "if not head: return\n\ncurr = head\nwhile True:\n    print(curr.val)\n    curr = curr.next\n    if curr == head: break",
          description: "do-while 문이 없는 파이썬에서 가장 안전하게 한 바퀴만 도는 패턴입니다.",
          tags: ["Pattern"],
          isEditable: true
        }
      ]
    }
  ]
};
