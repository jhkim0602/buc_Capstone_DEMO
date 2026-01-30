import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DIJKSTRA_CONFIG: CTPModuleConfig = {
  title: "다익스트라 (Dijkstra)",
  description: "내비게이션의 원조. 음수 가중치가 없는 그래프에서, 시작점으로부터 모든 정점까지의 '최단 경로'를 확정짓는 알고리즘입니다.",
  mode: "code",
  tags: ["Shortest Path", "Greedy", "Priority Queue"],
  story: {
    problem: `서울에서 부산까지 가는 가장 빠른 길을 찾고 싶습니다.
BFS는 모든 도로의 길이가 같다고 가정하지만(1km), 실제로는 고속도로, 국도 등 도로마다 걸리는 시간(가중치)이 다릅니다.
단순히 '거쳐가는 도시 수'가 적다고 해서 빠른 길이 아닙니다.`,
    definition: `다익스트라(Dijkstra)는 **그리디(Greedy)** 전략을 사용합니다.

**핵심 동작**
- **아직 방문하지 않은 곳 중 가장 가까운 곳**을 무조건 선택합니다.
- "지금 당장 갈 수 있는 가장 싼 길"을 골라서 확정하고, 거기서부터 또 연결된 길들을 살피며 거리를 '갱신(Relaxation)'합니다.

**불변식**
- 확정된 노드(Visited)의 최단 거리는 절대 변하지 않는다. (음수 간선이 없다는 전제 하에)
- 큐에서 나온 정점은 시작점으로부터의 최단 거리가 확정된 셈이다.`,
    analogy: `내비게이션이 경로를 탐색하는 것과 유사합니다.
"현재 위치에서 갈 수 있는 가장 빠른 길"을 계속 선택하다 보면, 목적지까지의 최단 경로가 자연스럽게 완성됩니다.`,
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- **거리 확정 순서**: 가장 가까운(dist가 작은) 노드부터 차례로 확정되는 모습
- **Relaxation (완화)**: "어? 저쪽 길로 돌아가는 게 더 빠르네?" 하고 값을 갱신하는 순간
- **Priority Queue**: 큐 안에서 거리 순으로 정렬되어 나오는 과정

**실습 요약**
- 거리가 갱신될 때마다 큐에 새로운 경로가 추가됨
- 확정된 노드는 다시 큐에 들어가도 무시됨(visited 체크)`
  },
  features: [
    { title: "그리디 + DP", description: "매 순간 최선을 선택(Greedy)하며, 이전까지 구한 최단 거리를 이용(DP)해 다음 거리를 구합니다." },
    { title: "Relaxation (Edge)", description: "`d[v] > d[u] + w`라면, `d[v] = d[u] + w`로 갱신하는 과정이 핵심입니다." },
    { title: "음수 간선 불가", description: "음수 가중치가 있으면 그리디한 선택이 최단 경로를 보장하지 못합니다. (이땐 벨만-포드 사용)" },
    { title: "시간 복잡도", description: "우선순위 큐를 사용하면 O(E log V)로 매우 효율적입니다." }
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
      description: "Dijkstra",
      code: `import heapq

# dijkstra implementation
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Dijkstra (Distance Array)

graph = {
    0: [(1, 2), (2, 5)],
    1: [(2, 1), (3, 4)],
    2: [(3, 1)],
    3: []
}

N = len(graph)
INF = 10**9
dist = [INF] * N
parent = [-1] * N
dist[0] = 0
parent[0] = 0
active_node = -1
compare_nodes = []

pq = [(0, 0)]  # (dist, node)
while pq:
    pq.sort()
    d, u = pq.pop(0)
    if d != dist[u]:
        continue
    active_node = u
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

arr = dist

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["dist", "parent", "result"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 1753, title: "최단경로", tier: "Gold IV", description: "다익스트라 기본." },
    { id: 1916, title: "최소비용 구하기", tier: "Gold V", description: "다익스트라 응용." },
    { id: 1504, title: "특정한 최단 경로", tier: "Gold IV", description: "경유지 최단 경로." },
  ],
};
