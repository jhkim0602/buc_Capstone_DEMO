import { PracticeProblem } from "../../../../../../shared/ctp-practice";
import { ComplexityData } from "../../../../../../shared/ctp-complexity";

export const ARRAY_2D_CONFIG = {
  title: "2D Array (행렬과 그리드)",
  description: "가로(행)와 세로(열)로 이루어진 2차원 공간입니다. 데이터를 평면상에 배치하고 싶을 때 사용하는 가장 직관적인 구조입니다.",
  tags: ["행렬", "이중 반복문", "좌표계", "완전 탐색"],

  story: {
    problem: `영화관 좌석을 예매한다고 상상해보세요.\n좌석은 단순히 일렬로 있지 않고, 'A열 5번', 'G열 12번'처럼 행과 열로 위치를 찾습니다.\n\n만약 이걸 단순히 1번부터 1000번까지의 숫자로만 관리한다면, 내 옆자리나 앞자리에 누가 앉았는지 계산하기 엄청 복잡해질 겁니다.`,
    definition: "데이터를 '행(Row)'과 '열(Column)'의 2차원 표(Grid) 형태로 관리하는 자료구조",
    analogy: "엑셀(Excel) 시트나 바둑판을 떠올리면 가장 정확합니다. 우리는 (행, 열) 두 개의 숫자로 정확한 위치를 집어낼 수 있습니다.",
    playgroundLimit: "작은 2차원 배열을 만들고, (r, c) 좌표를 통해 값을 수정해보세요. 드래그로 범위를 선택해서 채워볼 수도 있습니다."
  },

  features: [
    { title: "행 우선 순회 (Row-Major)", description: "메모리는 1줄로 되어있기 때문에, 2차원 배열은 사실 '긴 1차원 배열'을 잘라서 쓴 것입니다. 보통 가로줄(Row) 순서대로 저장되므로 가로로 읽는 게 훨씬 빠릅니다." },
    { title: "좌표계의 함정 (y, x)", description: "수학에선 (x, y)라고 쓰지만, 코딩에선 `arr[행][열]` 즉 `(y, x)` 순서로 씁니다. `arr[y][x]`라고 생각해야 헷갈리지 않습니다." },
    { title: "방향 벡터 (Delta Array)", description: "상하좌우로 이동해야 할 때, `dy=[-1, 1, 0, 0]`, `dx=[0, 0, -1, 1]` 같은 배열을 미리 만들어두고 반복문으로 처리하는 기술이 필수적입니다." },
  ],

  deepDive: {
      interviewProbablity: "Very High",
      realWorldUseCases: [
          "이미지 처리: 사진은 픽셀들의 2차원 배열입니다. (R, G, B까지 하면 3차원)",
          "게임 맵: 체스판, 지뢰찾기, RPG 게임의 타일 맵은 모두 2차원 배열입니다.",
          "그래프 표현: 정점들 간의 연결 관계를 '인접 행렬(Adjacency Matrix)'로 표현합니다."
      ],
      performanceTrap: "`for j in cols: for i in rows:` 처럼 세로로 순회하면 '캐시 미스(Cache Miss)'가 발생해 속도가 2~3배 느려질 수 있습니다. 항상 '행 우선'으로 순회하세요!"
  },

  comparison: {
      vs: "Graph List (인접 리스트)",
      pros: ["두 점이 연결되었는지 O(1)에 확인 가능", "구현이 매우 직관적이고 쉬움"],
      cons: ["희소 행렬(대부분이 0인 경우)일 때 메모리 낭비가 매우 심함 (N^2)"]
  },

  complexity: {
    access: "O(1)",
    search: "O(N×M)",
    insertion: "N/A (Fixed Geometry)",
    deletion: "N/A",
  } as ComplexityData,

  practiceProblems: [
    {
      id: 2566,
      title: "최댓값",
      tier: "Bronze III",
      description: "9x9 격자판을 이중 반복문으로 순회하며 가장 큰 값이 어디 있는지(행, 열) 찾아보세요."
    },
    {
      id: 10798,
      title: "세로읽기",
      tier: "Bronze I",
      description: "캐시 효율은 떨어지지만, 문제 요구사항에 맞춰 '세로(Column) 방향'으로 순회하는 로직을 연습해봅니다."
    },
    {
      id: 2178,
      title: "미로 탐색 (BFS)",
      tier: "Silver I",
      description: "2차원 배열 위에서 '방향 벡터'를 이용해 상하좌우로 움직이며 최단 거리를 찾는, 코딩테스트의 정석 문제입니다. (BFS 알고리즘 필요)"
    },
    {
      id: 1018,
      title: "체스판 다시 칠하기",
      tier: "Silver IV",
      description: "특정 범위(8x8)를 잘라내어(Slicing) 확인하는 '완전 탐색' 문제입니다. 인덱스 계산 실력을 기르기에 좋습니다."
    }
  ] as PracticeProblem[],

  implementation: [
    {
      language: 'python' as const,
      description: "Python 리스트 컴프리헨션으로 2차원 배열을 만드는 것이 가장 깔끔합니다. `[[0]*M]*N` 같은 얕은 복사 실수를 주의하세요!",
      code: `# 1. N행 M열 0으로 초기화
N, M = 3, 4
grid = [[0] * M for _ in range(N)]

# 2. 방향 벡터 (상-하-좌-우) 정의
# (행 변화량 dr, 열 변화량 dc)
dr = [-1, 1, 0, 0]
dc = [0, 0, -1, 1]

# 3. (r, c) 위치에서 4방향 탐색
r, c = 1, 1
for i in range(4):
    nr = r + dr[i]
    nc = c + dc[i]

    # 4. 지도 밖으로 나가는지 체크 (필수!)
    if 0 <= nr < N and 0 <= nc < M:
        print(f"이웃 좌표: {nr}, {nc}")`
    }
  ],

  initialCode: {
    python: `# Python 2D Matrix 연습
# 3x3 행렬 예시
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# 1. 2번째 행, 3번째 열 값 출력 (6)
# 인덱스는 0부터 시작하므로 [1][2] 입니다.
print(grid[1][2])

# 2. 값 변경
grid[1][1] = 99

# 3. 전체 출력 (행 단위로)
for row in grid:
    print(row)`,
  },

  commandReference: {
     python: [
         { label: '초기화', code: '[[0]*m for _ in range(n)]' },
         { label: '접근', code: 'val = grid[r][c]' },
         { label: '행 길이', code: 'len(grid) # N' },
         { label: '열 길이', code: 'len(grid[0]) # M' },
     ]
  }
};
