import { PracticeProblem } from "../../../../../../shared/ctp-practice";
import { ComplexityData } from "../../../../../../shared/ctp-complexity";

export const VECTOR_CONFIG = {
  title: "Dynamic Array (동적 배열)",
  description: "크기가 고정된 배열의 한계를 넘어, 데이터가 추가됨에 따라 마법처럼 늘어나는 스마트한 배열입니다.",
  tags: ["ArrayList", "크기 자동 조절", "분할 상환 분석", "크기 vs 용량"],

  story: {
    problem: `여행을 가려는데 짐이 얼마나 많을지 모릅니다.\n작은 가방을 샀다가 짐이 넘치면, 더 큰 가방을 사고 짐을 전부 옮겨 담아야 하죠.\n\n매번 짐이 하나 늘어날 때마다 새 가방을 산다면(크기+1), 짐 옮기느라 시간(복사 비용)을 다 쓸 겁니다.`,
    definition: "배열이 꽉 차면, 자동으로 '훨씬 더 큰' 메모리 공간을 확보하고 이사(Copy)가는 자료구조 (Python List, C++ Vector)",
    analogy: "마법의 배낭입니다. 물건이 꽉 차면 배낭이 스스로 2배 커집니다! 덕분에 이사를 자주 가지 않아도 되죠.",
    playgroundLimit: "요소를 계속 추가해보세요. 어느 순간 Capacity(용량)가 훅 늘어나는 '이사' 순간을 목격할 수 있습니다."
  },

  features: [
    { title: "자동 확장 (Doubling Strategy)", description: "공간이 부족해지면 보통 2배(또는 1.5배) 더 큰 공간을 새로 만들고 이사합니다. 100개가 꽉 차면 200개짜리 방을 잡는 식이죠." },
    { title: "분할 상환 분석 (Amortized O(1))", description: "이사는 아주 가끔 일어납니다(O(N)). 대부분의 경우 그냥 넣기(O(1))만 하면 되죠. 이사비용을 전체 1/N로 나누면 평균적으로는 '매우 쌈(O(1))'이 됩니다." },
    { title: "메모리 예약 (Reservation)", description: "앞으로 1000개가 들어올 걸 안다면? 처음부터 1000개짜리 방을 잡는 게 이득입니다. (`reserve()`)" },
  ],

  deepDive: {
      interviewProbablity: "Medium",
      realWorldUseCases: [
          "Java ArrayList / C++ std::vector: 가장 많이 쓰는 기본 리스트입니다.",
          "JSON 파싱: 데이터가 몇 개나 들어올지 모를 때 무조건 동적 배열을 씁니다.",
          "버퍼(Buffer): 데이터가 스트림으로 계속 들어올 때 유동적으로 저장합니다."
      ],
      performanceTrap: "아무 생각 없이 `append`만 하면 중간중간 복사 비용(Reallocation)이 발생해 느려질 수 있습니다. 대략적인 크기를 안다면 미리 할당하세요!"
  },

  comparison: {
      vs: "LinkedList",
      pros: ["인덱스로 즉시 접근 가능 (O(1))", "메모리가 연속적이라 캐시 효율 좋음"],
      cons: ["중간 삽입/삭제가 느림 (O(N))", "사용하지 않는 예비 공간(Slack) 낭비"]
  },

  complexity: {
    access: "O(1)",
    search: "O(N)",
    insertion: "Amortized O(1)",
    deletion: "O(1) (맨 뒤)",
  } as ComplexityData,

  practiceProblems: [],

  implementation: [
    {
      language: 'python' as const,
      description: "Python 리스트는 내부적으로 동적 배열입니다. `sys.getsizeof`로 실제 메모리 크기가 계단식으로 커지는 걸 확인해보세요.",
      code: `import sys

# 빈 리스트 생성
data = []

# 데이터 20개 추가하며 크기 변화 관찰
for i in range(20):
    a = len(data)      # 논리적 크기 (Length)
    b = sys.getsizeof(data) # 실제 물리적 크기 (Capacity)

    # 꽉 찼을 때만 사이즈가 펑! 튀는걸 볼 수 있습니다.
    print(f"개수: {a:2d}, 메모리: {b:3d} bytes")
    data.append(i)`
    }
  ],

  initialCode: {
    python: `# Python List Growth Check
import sys

lst = []
print("   N | Memory (Bytes)")
print("-----------------------")

# 0부터 29까지 추가해보며 메모리 변화 관찰
for i in range(30):
    size = sys.getsizeof(lst)
    print(f"{i:4d} | {size}")

    # 리스트에 요소 추가
    lst.append(i)

# 결과: 메모리가 매번 늘지 않고, 가끔씩 '왕창' 늘어납니다!`,
  },

  commandReference: {
     python: [
        { label: '추가', code: 'lst.append(x)' },
        { label: '삽입', code: 'lst.insert(i, x)' },
        { label: '크기', code: 'len(lst)' },
        { label: '메모리', code: 'sys.getsizeof(lst)' }
     ]
  }
};
