import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const GRAPH_BFS_CONFIG: CTPModuleConfig = {
  title: "BFS",
  description: "그래프 BFS의 핵심 개념을 간단히 익힙니다.",
  mode: "code",
  tags: ["Graph"],
  story: {
    problem: "동일 가중치 최단 거리 문제는 레벨 순 탐색이 필요합니다.",
    definition: "BFS는 가까운 정점부터 레벨 순으로 확장합니다.\n큐에서 꺼낸 순간 해당 정점의 거리는 최단 거리로 확정됩니다.",
    analogy: "물결이 퍼져나가듯 한 층씩 탐색합니다.",
    playgroundDescription: "큐가 확장되는 흐름과 dist가 갱신되는 순간을 확인하세요.",
  },
  features: [
    { title: "레벨 탐색", description: "큐를 사용해 가까운 정점부터 방문합니다." },
    { title: "최단 거리", description: "간선 가중치가 동일할 때 최단 거리를 보장합니다." },
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
      description: "BFS",
      code: `from collections import deque

def bfs(start, adj):
    q = deque([start])
    visited = {start}
    while q:
        u = q.popleft()
        for v in adj[u]:
            if v not in visited:
                visited.add(v)
                q.append(v)
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Graph BFS Order
graph = {
    0: [1, 2],
    1: [3, 4],
    2: [4, 5],
    3: [6],
    4: [6, 7],
    5: [7],
    6: [],
    7: []
}

N = 8
start = 0
visited = [False] * N
dist = [-1] * N
parent = [-1] * N
queue = [start]
head = 0
order = []
active_node = -1
visited[start] = True
dist[start] = 0
parent[start] = start

while head < len(queue):
    u = queue[head]
    head += 1
    order.append(u)
    active_node = u
    trace("node_active", scope="graph", id=u)
    trace("node_visit", scope="graph", ids=[u])
    for v in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        if not visited[v]:
            visited[v] = True
            dist[v] = dist[u] + 1
            parent[v] = u
            trace("dist_update", scope="graph", id=v, dist=dist[v], parent=parent[v])
            queue.append(v)
    trace("node_finalize", scope="graph", id=u)

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["order", "queue", "dist"]:
    _dump(_k)
`
  },
  showStatePanel: true,
  statePanelMode: "summary",
  practiceProblems: [
    { id: 1260, title: "DFS와 BFS", tier: "Silver II", description: "BFS 기본." },
    { id: 1697, title: "숨바꼭질", tier: "Silver I", description: "최단 거리 BFS." },
  ],
};
