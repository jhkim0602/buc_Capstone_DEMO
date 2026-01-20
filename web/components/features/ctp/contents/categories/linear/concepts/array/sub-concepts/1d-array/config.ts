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
    playgroundLimit: "아래 에디터에서 arr[2] = 99 처럼 특정 칸의 값을 직접 바꿔보세요!"
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
    python: `# Python 배열 기초 실습
arr = [10, 20, 30]

# 1. 1번 칸의 값을 읽어보세요
val = arr[1]

# 2. 1번 칸의 값을 99로 바꿔보세요
arr[1] = 99

# 3. 새로운 값을 맨 뒤에 추가해보세요
arr.append(40)

# 4. 맨 뒤의 값을 삭제해보세요
arr.pop()`,
  },

  guide: [
    {
      title: "기본 연산",
      items: [
        {
          label: "읽기 (Access)",
          code: "val = arr[0]",
          description: "인덱스를 사용하여 값에 즉시 접근합니다. 가장 빠릅니다. O(1)",
          tags: ["Access", "Fast"],
          isEditable: true
        },
        {
          label: "쓰기 (Update)",
          code: "arr[0] = 99",
          description: "해당 인덱스의 값을 덮어씁니다. O(1)",
          tags: ["Update"],
          isEditable: true
        },
        {
          label: "초기화",
          code: "arr = [1, 2, 3, 4, 5]",
          description: "새로운 배열을 생성합니다.",
          tags: ["Init"],
          isEditable: true
        }
      ]
    },
    {
      title: "Python List 특징",
      items: [
        {
          label: "Append (맨 뒤 추가)",
          code: "arr.append(10)",
          description: "사실 파이썬 리스트는 동적 배열입니다. 맨 뒤 추가는 O(1)입니다.",
          tags: ["Append"],
          isEditable: true
        },
        {
          label: "Pop (맨 뒤 삭제)",
          code: "arr.pop()",
          description: "맨 뒤의 요소를 제거하고 반환합니다. O(1)",
          tags: ["Pop"],
          isEditable: true
        }
      ]
    }
  ]
};
