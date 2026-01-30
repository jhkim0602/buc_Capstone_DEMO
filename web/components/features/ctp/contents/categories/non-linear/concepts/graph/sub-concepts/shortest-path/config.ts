import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const SHORTEST_PATH_CONFIG: CTPModuleConfig = {
  title: "최단 경로 (Dijkstra)",
  description: "최단 경로 (Dijkstra)의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Graph"],
  story: {
    problem: "최단 경로는 네비게이션, 네트워크 라우팅 등 핵심 문제입니다.",
    definition: "가중치가 음수가 없을 때 다익스트라로 최단 거리를 계산합니다.\n가장 작은 dist를 가진 정점을 확정하고, 인접 간선을 통해 dist를 갱신합니다.",
    analogy: "여러 길 중 '총 이동 비용'이 가장 작은 경로를 찾는 일입니다.",
    playgroundDescription: "확정되는 노드와 간선 위 dist 갱신을 확인하세요.",
  },
  features: [
    { title: "우선순위 큐", description: "가장 가까운 노드부터 확정합니다." },
    { title: "거리 갱신", description: "더 짧은 경로가 발견되면 dist를 업데이트합니다." },
  ],
  complexity: {
    access: "O(1)",
    search: "O((V+E) log V)",
    insertion: "O(log V)",
    deletion: "O(log V)",
  },
  implementation: [
    {
      language: "python",
      description: "다익스트라 기본 구현",
      code: `import heapq

def dijkstra(start, graph, n):
    INF = 10**9
    dist = [INF]*n
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d != dist[u]:
            continue
        for v, w in graph[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                heapq.heappush(pq, (nd, v))
    return dist
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Dijkstra (Distance Array)
graph = {
    0: [(1, 2), (2, 5)],
    1: [(2, 1), (3, 4)],
    2: [(3, 1), (4, 6)],
    3: [(5, 2)],
    4: [(5, 1), (6, 3)],
    5: [(6, 2)],
    6: []
}

N = 7
INF = 10**9
dist = [INF] * N
parent = [-1] * N
dist[0] = 0
parent[0] = 0
active_node = -1
compare_nodes = []
visited_nodes = []

pq = [(0, 0)]  # (dist, node)
while pq:
    pq.sort()
    d, u = pq.pop(0)
    if d != dist[u]:
        continue
    active_node = u
    visited_nodes.append(u)
    trace("node_active", scope="graph", id=u)
    trace("node_finalize", scope="graph", id=u)
    for v, w in graph[u]:
        compare_nodes = [v]
        trace("edge_consider", scope="graph", u=u, v=v, w=w)
        nd = d + w
        if nd < dist[v]:
            dist[v] = nd
            parent[v] = u
            trace("edge_relax", scope="graph", u=u, v=v, w=w, dist=nd)
            trace("dist_update", scope="graph", id=v, dist=nd, parent=parent[v])
            pq.append((nd, v))

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["dist", "parent"]:
    _dump(_k)
`
  },
  showStatePanel: true,
  statePanelMode: "summary",
  practiceProblems: [
    { id: 1753, title: "최단경로", tier: "Gold IV", description: "다익스트라 기본." },
    { id: 1916, title: "최소비용 구하기", tier: "Gold V", description: "다익스트라 응용." },
    { id: 11404, title: "플로이드", tier: "Gold IV", description: "플로이드 응용." },
  ],
};
