import { PracticeProblem } from "../../../../../../shared/ctp-practice";
import { ComplexityData } from "../../../../../../shared/ctp-complexity";

export const MEMORY_CACHE_CONFIG = {
  title: "Memory & Cache (성능의 비밀)",
  description: "알고리즘의 시간 복잡도(Big-O)가 같아도 실제 속도가 10배 차이나는 이유는 뭘까요? 범인은 바로 '캐시(Cache)'입니다.",
  tags: ["Cache Locality", "L1/L2/L3", "Spatial Locality", "False Sharing"],

  story: {
    problem: `도서관에서 책을 한 권씩 빌려온다고 생각해보세요.\n책상(CPU)까지 책을 가져오는 시간은 1분 걸리는데, 책을 읽는 건 1초면 끝납니다.\n\n한 번 갈 때 책을 한 권만 가져오는 것보다, \n주변에 꽂힌 책들을 '한꺼번에' 수레로 가져오는 게 훨씬 효율적이지 않을까요?`,
    definition: "CPU가 메인 메모리(RAM)까지 가지 않고, 자주 쓰는 데이터를 가까운 곳(Cache)에 미리 복사해두는 고속 기억 장치",
    analogy: "책상(L1 캐시) vs 책장(L2 캐시) vs 도서관 서고(RAM). 책상에 있는 책은 0.1초 만에 집을 수 있지만, 서고까지 다녀오르면(RAM Access) 10분이 걸립니다.",
    playgroundLimit: "배열을 행(가로)으로 읽을 때와 열(세로)로 읽을 때의 속도 차이를 직접 체험해보세요."
  },

  features: [
    { title: "공간 지역성 (Spatial Locality)", description: "한 번 접근한 데이터의 '주변 데이터'도 곧 사용될 확률이 높습니다. 그래서 컴퓨터는 데이터를 덩어리(Cache Line, 64byte)째로 가져옵니다." },
    { title: "시간 지역성 (Temporal Locality)", description: "방금 썼던 데이터는 조금 이따가 또 쓸 확률이 높습니다. 루프 변수 `i` 같은 게 대표적입니다." },
    { title: "거짓 공유 (False Sharing)", description: "멀티스레드 환경에서, 서로 다른 변수인데 우연히 같은 캐시 라인(한 덩어리)에 있어서 서로의 캐시를 무효화(Invalidate)시키는 성능 저하 현상입니다." },
  ],

  deepDive: {
    interviewProbablity: "Medium",
    realWorldUseCases: [
      "고성능 게임 엔진: 데이터 지향 설계(DOD)의 핵심이 바로 캐시 효율 최적화입니다.",
      "행렬 곱셈 최적화: Loop Tiling 기법을 통해 캐시 적중률(Hit Rate)을 극대화합니다.",
      "데이터베이스 인덱스: B-Tree 노드 크기를 디스크 페이지 크기에 맞추는 이유도 이와 비슷합니다."
    ],
    performanceTrap: "LinkedList는 메모리 여기저기에 흩어져 있어 캐시 효율이 최악입니다. 성능이 중요하다면 무조건 배열(Array/Vector)을 쓰세요."
  },

  comparison: {
    vs: "Random Access (Pointer Chasing)",
    pros: ["연속된 메모리 접근 시 프리패칭(Prefetching) 효과 극대화", "CPU 파이프라인 효율 증가"],
    cons: ["메모리 정렬(Alignment) 신경 써야 함", "False Sharing 같은 하드웨어 레벨 버그 가능성"]
  },

  complexity: {
    access: "O(1) (CPU Cycle Level Fast)",
    search: "Scanning is Super Fast",
    insertion: "N/A",
    deletion: "N/A",
  } as ComplexityData,

  practiceProblems: [],

  implementation: [
    {
      language: 'python' as const,
      description: "Python은 인터프리터 오버헤드가 커서 덜 티가 나지만, 대용량 배열에서는 순회 순서만 바꿔도 속도 차이가 발생합니다.",
      code: `import time

N = 5000
# 2차원 리스트 생성 (N x N)
matrix = [[0] * N for _ in range(N)]

# 1. 행 우선 순회 (Row-Major) : Fast!
# 메모리에 저장된 순서대로 읽습니다.
start = time.time()
for r in range(N):
    for c in range(N):
        val = matrix[r][c]
print(f"Row-major: {time.time() - start:.4f} sec")

# 2. 열 우선 순회 (Col-Major) : Slow...
# 메모리를 띄엄띄엄 읽어서 캐시가 계속 비워집니다.
start = time.time()
for c in range(N):
    for r in range(N):
        val = matrix[r][c]
print(f"Col-major: {time.time() - start:.4f} sec")`
    }
  ],

  initialCode: {
    python: `# Cache Locality Simulator
# 시각적으로 캐시 히트를 보여주는 가상 코드입니다.

# Row Major: 가로로 쭉 읽기
# [Hit] [Hit] [Hit] [Hit] ...
for r in range(8):
    for c in range(8):
        access_memory(r, c)

print("-" * 20)

# Col Major: 세로로 뚝뚝 끊어서 읽기
# [Miss!] [Miss!] [Miss!] ...
for c in range(8):
    for r in range(8):
        access_memory(r, c)`,
  },

  guide: [
    {
      title: "캐시 지역성 (Locality)",
      items: [
        {
          label: "행 우선 접근 (Row-Major)",
          code: "for r in range(N):\n    for c in range(N):\n        access(r, c)",
          description: "메모리에 저장된 순서대로 쭉 읽습니다. 캐시 히트율이 매우 높습니다.",
          tags: ["Spatial Locality", "Fast"],
          isEditable: true
        },
        {
          label: "열 우선 접근 (Col-Major)",
          code: "for c in range(N):\n    for r in range(N):\n        access(r, c)",
          description: "메모리를 띄엄띄엄 읽어서 캐시 라인을 계속 갈아치워야(Eviction) 합니다.",
          tags: ["Cache Miss", "Slow"],
          isEditable: true
        }
      ]
    }
  ]
};
