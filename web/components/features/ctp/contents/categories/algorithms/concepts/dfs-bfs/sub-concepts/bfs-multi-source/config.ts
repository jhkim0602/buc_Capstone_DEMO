import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const BFS_MULTI_SOURCE_CONFIG: CTPModuleConfig = {
  title: "멀티 소스 BFS",
  description: "여러 출발점에서 동시에 레벨을 확장합니다.",
  mode: "code",
  tags: ["BFS"],
  story: {
    problem: "여러 시작점에서 동시에 거리를 확장해야 하는 문제가 많습니다.",
    definition: "멀티 소스 BFS는 큐를 여러 시작점으로 초기화합니다.\n여러 파동이 동시에 확장되며 가장 먼저 도달한 거리가 최단 거리입니다.\n\n**불변식**\n- dist가 -1이 아닌 노드는 이미 최단 거리가 확정된 상태입니다.\n- 최초 방문이 최단 거리라는 BFS 성질은 그대로 유지됩니다.",
    analogy: "여러 곳에서 동시에 퍼지는 파동처럼 확장됩니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- 여러 시작점이 동시에 확장되는 흐름\n- dist가 갱신되는 순서",
  },
  features: [
    { title: "다중 시작점", description: "큐에 여러 노드를 동시에 넣고 시작합니다." },
    { title: "최단 거리", description: "가중치가 동일하면 최단 거리 보장." },
    { title: "확산 문제", description: "전염/불/토마토 문제에 적용됩니다." },
    { title: "도달 불가", description: "dist=-1 처리로 미도달 영역을 구분합니다." },
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
      description: "Multi-source BFS",
      code: `from collections import deque

def multi_source_bfs(sources, graph):
    n = len(graph)
    dist = [-1] * n
    q = deque()
    for s in sources:
        dist[s] = 0
        q.append(s)
    while q:
        u = q.popleft()
        for v in graph[u]:
            if dist[v] == -1:
                dist[v] = dist[u] + 1
                q.append(v)
    return dist
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Multi-source BFS
graph = {
    0: [1, 2],
    1: [3],
    2: [3, 4],
    3: [5],
    4: [5],
    5: []
}

n = 6
sources = [0, 4]
from collections import deque

dist = [-1] * n
parent = [-1] * n
queue = deque()
queue_view = []
for s in sources:
    dist[s] = 0
    parent[s] = s
    queue.append(s)

active_node = -1

while queue:
    queue_view = list(queue)
    u = queue.popleft()
    active_node = u
    trace("node_active", scope="graph", id=u)
    trace("node_visit", scope="graph", ids=[u])
    for v in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        if dist[v] == -1:
            dist[v] = dist[u] + 1
            parent[v] = u
            trace("dist_update", scope="graph", id=v, dist=dist[v], parent=parent[v])
            queue.append(v)
            queue_view = list(queue)
    trace("node_finalize", scope="graph", id=u)

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["dist", "sources"]:
    _dump(_k)
`
  },
  showStatePanel: true,
  statePanelMode: "summary",
  practiceProblems: [
    { id: 7576, title: "토마토", tier: "Gold V", description: "멀티 소스 BFS." },
    { id: 7569, title: "토마토", tier: "Gold V", description: "3차원 멀티 소스." },
    { id: 4179, title: "불!", tier: "Gold IV", description: "동시 확산 BFS." },
  ],
};
