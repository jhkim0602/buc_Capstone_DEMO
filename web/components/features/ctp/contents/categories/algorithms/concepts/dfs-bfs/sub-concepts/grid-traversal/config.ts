import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const GRID_TRAVERSAL_CONFIG: CTPModuleConfig = {
  title: "격자 탐색 응용",
  description: "격자에서 BFS/DFS를 적용하는 핵심 규칙을 익힙니다.",
  mode: "code",
  tags: ["DFS / BFS"],
  story: {
    problem: "격자 문제는 방향 이동, 경계 처리, 방문 체크에서 실수가 잦습니다.",
    definition: "격자 탐색은 (r, c) 좌표와 방향 벡터(dr/dc)를 사용해 이동을 표준화합니다.\n4방향/8방향, 장애물/빈칸 등 규칙을 먼저 명확히 정해야 합니다.\n\n**불변식**\n- 0 ≤ r < R, 0 ≤ c < C 경계를 항상 지킨다.\n- visited와 grid 값의 의미를 혼동하지 않는다.",
    analogy: "격자 지도에서 방향키로 움직이며 탐색하는 것과 같습니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- frontier(대기열)가 어떻게 확장되는지\n- visited/dist가 어느 타이밍에 갱신되는지\n- 경계 조건이 탐색을 어떻게 제한하는지",
  },
  features: [
    { title: "좌표/경계 처리", description: "범위 체크와 방문 관리가 핵심입니다." },
    { title: "방향 배열", description: "dr/dc로 이동을 표준화합니다." },
    { title: "거리 계산", description: "BFS로 최단거리 계산이 가능합니다." },
    { title: "응용 다양", description: "섬 개수, 미로, 최단거리 문제." },
  ],
  complexity: {
    access: "O(1)",
    search: "O(R*C)",
    insertion: "O(1)",
    deletion: "O(1)",
  },
  implementation: [
    {
      language: "python",
      description: "Grid BFS",
      code: `from collections import deque

q = deque([(0,0)])
visited = [[0]*C for _ in range(R)]
visited[0][0] = 1
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Grid BFS (Visited Marking)
grid = [
    [0, 0, 1, 0],
    [1, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0]
]

rows, cols = len(grid), len(grid[0])
visited = [[0 for _ in range(cols)] for _ in range(rows)]
dist = [[-1 for _ in range(cols)] for _ in range(rows)]
queue = [(0, 0)]
visited[0][0] = 1
dist[0][0] = 0
head = 0
active_cell = [0, 0]
frontier_cells = [[0, 0]]

dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
while head < len(queue):
    r, c = queue[head]
    head += 1
    active_cell = [r, c]
    frontier_cells = [list(cell) for cell in queue[head:]]
    for dr, dc in dirs:
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            if grid[nr][nc] == 0 and visited[nr][nc] == 0:
                visited[nr][nc] = 1
                dist[nr][nc] = dist[r][c] + 1
                queue.append((nr, nc))

# grid 자체를 그대로 두고 visited/dist를 통해 상태를 확인합니다.

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["dist", "queue", "visited"]:
    _dump(_k)
`
  },
  showStatePanel: true,
  statePanelMode: "summary",
  practiceProblems: [
    { id: 2178, title: "미로 탐색", tier: "Silver I", description: "BFS 기본 격자." },
    { id: 2667, title: "단지번호붙이기", tier: "Silver I", description: "DFS/BFS 연결 요소." },
    { id: 7576, title: "토마토", tier: "Gold V", description: "다중 시작점 BFS." },
  ],
};
