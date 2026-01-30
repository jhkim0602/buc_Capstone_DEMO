import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const BFS_PATH_RECONSTRUCTION_CONFIG: CTPModuleConfig = {
  title: "BFS 경로 복원",
  description: "최단 경로를 parent 배열로 복원합니다.",
  mode: "code",
  tags: ["BFS"],
  story: {
    problem: "BFS는 최단 거리뿐 아니라 실제 경로 출력이 자주 요구됩니다.",
    definition: "BFS는 최단 거리와 함께 **최단 경로 자체**를 복원할 수 있습니다.\n탐색 중 parent를 기록하고, target에서 parent를 따라 역추적합니다.\n\n**불변식**\n- parent가 설정된 노드는 최초 방문 시점의 최단 거리입니다.\n- BFS에서 parent는 최단 경로 트리를 이룹니다.",
    analogy: "길을 따라 표지판을 남겨 되돌아오는 방식입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- parent가 채워지는 순서\n- target에서 start로 복원되는 경로",
  },
  features: [
    { title: "최단 경로", description: "가중치가 동일한 그래프에서 최단 경로 보장." },
    { title: "경로 복원", description: "parent 배열을 따라 역추적합니다." },
    { title: "방문 시점", description: "최초 방문이 최단 거리임을 이용합니다." },
    { title: "실전 활용", description: "경로 출력형 문제에 반복됩니다." },
  ],
  complexity: {
    access: "O(1)",
    search: "O(V+E)",
    insertion: "O(1)",
    deletion: "O(1)",
  },
  implementation: [
    {
      language: "python",
      description: "BFS with parent",
      code: `from collections import deque

def bfs_path(start, target, graph):
    n = len(graph)
    parent = [-1] * n
    q = deque([start])
    parent[start] = start
    while q:
        u = q.popleft()
        if u == target:
            break
        for v in graph[u]:
            if parent[v] == -1:
                parent[v] = u
                q.append(v)
    path = []
    if parent[target] != -1:
        cur = target
        while cur != parent[cur]:
            path.append(cur)
            cur = parent[cur]
        path.append(cur)
        path.reverse()
    return path
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# BFS Path Reconstruction
graph = {
    0: [1, 2],
    1: [3],
    2: [3, 4],
    3: [5],
    4: [5],
    5: []
}

n = 6
start = 0
target = 5

parent = [-1] * n
queue = [start]
head = 0
parent[start] = start
active_node = -1

while head < len(queue):
    u = queue[head]
    head += 1
    active_node = u
    trace("node_active", scope="graph", id=u)
    trace("node_visit", scope="graph", ids=[u])
    if u == target:
        trace("node_finalize", scope="graph", id=u)
        break
    for v in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        if parent[v] == -1:
            parent[v] = u
            queue.append(v)
    trace("node_finalize", scope="graph", id=u)

# reconstruct path
path = []
if parent[target] != -1:
    cur = target
    while cur != parent[cur]:
        path.append(cur)
        cur = parent[cur]
    path.append(cur)
    path.reverse()

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["parent", "path"]:
    _dump(_k)
`
  },
  showStatePanel: true,
  statePanelMode: "full",
  practiceProblems: [
    { id: 13913, title: "숨바꼭질 4", tier: "Gold IV", description: "경로 복원 BFS." },
    { id: 11725, title: "트리의 부모 찾기", tier: "Silver II", description: "parent 기록." },
    { id: 2644, title: "촌수계산", tier: "Silver II", description: "최단 경로(복원 응용)." },
  ],
};
