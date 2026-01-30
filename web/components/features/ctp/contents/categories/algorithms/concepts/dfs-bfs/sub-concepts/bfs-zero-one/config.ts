import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const BFS_ZERO_ONE_CONFIG: CTPModuleConfig = {
  title: "0-1 BFS",
  description: "가중치가 0/1인 그래프의 최단 경로를 빠르게 구합니다.",
  mode: "code",
  tags: ["BFS"],
  story: {
    problem: "가중치가 0 또는 1일 때 다익스트라보다 빠르게 풀 수 있습니다.",
    definition: "0-1 BFS는 **덱**을 사용해 가중치 0은 앞, 1은 뒤로 넣습니다.\n우선순위 큐 없이도 최단 거리를 유지할 수 있습니다.\n\n**불변식**\n- dist는 항상 현재까지의 최솟값으로 유지됩니다.\n- 덱의 앞쪽은 더 좋은 후보(낮은 비용)를 우선 처리합니다.",
    analogy: "무료 도로는 먼저, 유료 도로는 나중에 가는 것과 같습니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- dist가 갱신되는 순간\n- 0/1 간선에 따른 덱 처리 순서",
  },
  features: [
    { title: "덱 사용", description: "0 가중치는 앞, 1 가중치는 뒤에 추가합니다." },
    { title: "최단 거리", description: "가중치가 0/1인 경우 O(V+E)로 해결합니다." },
    { title: "다익스트라 대체", description: "우선순위 큐 없이도 정확한 최단거리." },
    { title: "실전 활용", description: "숨바꼭질 3, 알고스팟 등." },
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
      description: "0-1 BFS",
      code: `from collections import deque

INF = 10**9

def zero_one_bfs(start, graph):
    n = len(graph)
    dist = [INF] * n
    dist[start] = 0
    dq = deque([start])
    while dq:
        u = dq.popleft()
        for v, w in graph[u]:
            if dist[v] > dist[u] + w:
                dist[v] = dist[u] + w
                if w == 0:
                    dq.appendleft(v)
                else:
                    dq.append(v)
    return dist
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# 0-1 BFS (weighted graph)
# edge: (neighbor, weight)
graph = {
    0: [(1, 0), (2, 1)],
    1: [(3, 1), (4, 0)],
    2: [(4, 1)],
    3: [(5, 0)],
    4: [(5, 1)],
    5: []
}

n = 6
start = 0

from collections import deque
INF = 10**9

dist = [INF] * n
dist[start] = 0
parent = [-1] * n
parent[start] = start
active_node = -1

queue = deque([start])
queue_view = list(queue)

while queue:
    queue_view = list(queue)
    u = queue.popleft()
    active_node = u
    trace("node_active", scope="graph", id=u)
    for v, w in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        if dist[v] > dist[u] + w:
            dist[v] = dist[u] + w
            parent[v] = u
            trace("dist_update", scope="graph", id=v, dist=dist[v], parent=parent[v])
            if w == 0:
                queue.appendleft(v)
            else:
                queue.append(v)
            queue_view = list(queue)
    trace("node_finalize", scope="graph", id=u)

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["dist"]:
    _dump(_k)
`
  },
  showStatePanel: true,
  statePanelMode: "summary",
  practiceProblems: [
    { id: 13549, title: "숨바꼭질 3", tier: "Gold V", description: "0-1 BFS 대표." },
    { id: 1261, title: "알고스팟", tier: "Gold IV", description: "0-1 BFS 응용." },
  ],
};
