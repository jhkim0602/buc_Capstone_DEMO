import { PracticeProblem } from "../../../../../../shared/ctp-practice";
import { ComplexityData } from "../../../../../../shared/ctp-complexity";

export const ARRAY_1D_CONFIG = {
  title: "1D Array (배열)",
  description: "데이터를 순서대로 나란히 저장하는 가장 기초적인 자료구조입니다.",
  tags: ["기초", "순차 저장", "인덱스"],

  // 1. Story Mode Content
  story: {
    problem: `만약 100명의 학생 점수를 저장해야 한다면 변수 100개를 만들어야 할까요?\nscore1, score2, ..., score100 처럼요?\n\n이러면 관리하기도 힘들고, 반복문으로 처리할 수도 없습니다.\n"점수들"을 하나의 이름으로 묶어서 관리할 수 있는 방법이 필요합니다.`,
    definition: "같은 타입의 데이터들을 메모리 상에 '연속적으로' 나열하고, 번호(Index)를 붙여 관리하는 자료구조",
    analogy: "마치 '계란판'과 같습니다. 칸마다 번호가 매겨져 있고, 한 줄로 나란히 이어져 있죠. 3번째 계란을 꺼내려면 '3번 칸'으로 바로 손을 뻗으면 됩니다.",
    playgroundLimit: "아래 에디터에서 arr[2] = 99 처럼 특정 칸의 값을 직접 바꿔보세요!",
    playgroundDescription: "100명의 학생 점수를 관리해야 한다고 상상해보세요. 변수 100개를 만드는 대신, 배열 하나로 관리하는 것이 훨씬 효율적입니다. 이 코드는 인덱스를 통해 즉시 학생의 점수를 찾고 수정하는 배열의 강력함을 보여줍니다."
  },

  features: [
    { title: "즉시 접근 (Random Access)", description: "몇 번째 칸이든 상관없이 똑같이 빠르게(O(1)) 접근할 수 있습니다. 이미 주소를 알고 있기 때문이죠." },
    { title: "연속된 메모리 (Cache Friendly)", description: "데이터가 붙어있어서 컴퓨터가 읽을 때 한꺼번에 미리 읽어올 수 있어 처리 속도가 매우 빠릅니다." },
    { title: "크기 고정 (Fixed Size)", description: "계란판의 크기를 마음대로 늘릴 수 없듯이, 배열도 한 번 만들면 크기를 바꾸기 어렵습니다." },
  ],

  deepDive: {
    interviewProbablity: "High",
    realWorldUseCases: [
      "Pixel Buffer: 모니터 화면의 픽셀들은 거대한 1차원 배열입니다.",
      "Lookup Table: 구구단 표처럼 미리 계산된 값을 저장해두고 바로 찾아봅니다.",
      "String: 문자열도 사실 문자들이 모인 1차원 배열입니다."
    ],
    performanceTrap: "배열의 맨 앞, 혹은 중간에 데이터를 끼워넣지 마세요. 뒤에 있는 친구들이 모두 한 칸씩 밀려나야 해서 매우 느려집니다 (O(N))."
  },

  comparison: {
    vs: "LinkedList",
    pros: ["압도적인 조회 속도 (인덱스만 알면 됨)", "메모리 낭비 없음 (데이터만 딱 저장)"],
    cons: ["크기를 미리 정해야 함", "중간에 끼워넣거나 삭제하기 불편함"]
  },

  complexity: {
    access: "O(1)",
    search: "O(N)",
    insertion: "O(N)",
    deletion: "O(N)",
  } as ComplexityData,

  practiceProblems: [
    {
      id: 10818,
      title: "최소, 최대",
      tier: "Bronze III",
      description: "배열을 한 번 훑으면서(Scan), 가장 큰 값과 작은 값을 찾아보세요."
    },
    {
      id: 2562,
      title: "최댓값",
      tier: "Bronze III",
      description: "값만 찾지 말고, 그 값이 '몇 번째'에 있는지도 기억해야 합니다."
    }
  ] as PracticeProblem[],

  implementation: [
    {
      language: 'python' as const,
      description: "Python의 리스트는 사실 '동적 배열(Dynamic Array)'이지만, 사용하는 방법은 일반 배열과 똑같습니다.",
      code: `# 1. 초기화
arr = [10, 20, 30, 40, 50]

# 2. 값 읽기 (O(1))
print(arr[2])  # 30

# 3. 값 바꾸기 (O(1))
arr[2] = 99
print(arr)     # [10, 20, 99, 40, 50]

# 4. 맨 뒤에 추가하기 (O(1))
arr.append(60)
# [10, 20, 99, 40, 50, 60]`
    }
  ],

  initialCode: {
    python: `# 1D Array: 시험 점수 관리 (Basic)
# 5명의 학생 점수를 담고 있는 배열입니다.
scores = [90, 85, 78, 92, 88]

# 1. 특정 학생 점수 확인 (Access)
print(f"3번째 학생 점수: {scores[2]}")  # 0부터 시작하므로 2번 인덱스

# 2. 점수 수정 (Update)
# 4번째 학생이 재시험을 봐서 점수가 올랐습니다.
scores[3] = 100

# 3. 전체 평균 구하기 (Iteration)
total = 0
for s in scores:
    total += s
    
print(f"총점: {total}")`,
  },

  guide: [
    {
      title: "버퍼 연산 (Buffer Ops)",
      items: [
        {
          label: "패킷 접근 (Access)",
          code: "pkt = buffer[0]",
          description: "인덱스를 통해 대기열의 패킷에 즉시 접근합니다. 시간 복잡도: O(1)",
          tags: ["O(1)", "Fetch"],
          isEditable: true
        },
        {
          label: "처리 완료 (Clear)",
          code: "buffer[0] = -1",
          description: "데이터를 물리적으로 삭제하지 않고, 논리적 값(-1)으로 덮어써서 빈 공간임을 표시합니다.",
          tags: ["Logical Delete"],
          isEditable: true
        },
        {
          label: "빈 공간 탐색",
          code: "if buffer[i] == -1:",
          description: "삽입할 공간을 찾기 위해 배열을 순회합니다. 최악의 경우 O(N)입니다.",
          tags: ["Linear Search", "O(N)"],
          isEditable: true
        }
      ]
    }
  ]
};
