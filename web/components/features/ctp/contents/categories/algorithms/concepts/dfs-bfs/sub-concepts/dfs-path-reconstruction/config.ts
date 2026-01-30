import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DFS_PATH_RECONSTRUCTION_CONFIG: CTPModuleConfig = {
  title: "DFS 경로 복원",
  description: "DFS 탐색 중 parent를 기록해 경로를 복원합니다.",
  mode: "code",
  tags: ["DFS"],
  story: {
    problem: "경로 존재 여부뿐 아니라 실제 경로를 출력해야 하는 문제가 많습니다.",
    definition: "DFS는 탐색 과정에서 parent를 기록해 **경로를 복원**할 수 있습니다.\n목표 노드에서 parent를 따라 거꾸로 올라가면 시작점으로 돌아갑니다.\n\n**불변식**\n- parent[x]는 x를 최초 방문했을 때의 부모입니다.\n- DFS 경로는 최단 경로는 아닐 수 있습니다.",
    analogy: "갈림길마다 표지판을 남겨 되돌아오는 방법입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- parent가 채워지는 순간과 방향\n- target에서 start로 복원되는 경로",
  },
  features: [
    { title: "parent 기록", description: "새로 방문할 때 부모를 저장합니다." },
    { title: "경로 복원", description: "target에서 parent를 따라 역추적합니다." },
    { title: "DFS 특성", description: "찾은 경로가 최단 경로는 아닐 수 있습니다." },
    { title: "실전 활용", description: "트리 부모 찾기/경로 출력 문제." },
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
      description: "DFS with parent",
      code: `def dfs(u, graph, parent, visited):
    visited[u] = True
    for v in graph[u]:
        if not visited[v]:
            parent[v] = u
            dfs(v, graph, parent, visited)
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# DFS Path Reconstruction
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
visited = [False] * n
parent = [-1] * n
active_node = -1


def dfs(u):
    global active_node
    visited[u] = True
    active_node = u
    trace("node_active", scope="graph", id=u)
    trace("node_visit", scope="graph", ids=[u])
    for v in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        if not visited[v]:
            parent[v] = u
            dfs(v)
    trace("node_finalize", scope="graph", id=u)


dfs(start)

# reconstruct path
path = []
cur = target
while cur != -1:
    path.append(cur)
    cur = parent[cur]
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
    { id: 2644, title: "촌수계산", tier: "Silver II", description: "DFS 경로 추적." },
    { id: 11725, title: "트리의 부모 찾기", tier: "Silver II", description: "parent 기록." },
    { id: 1167, title: "트리의 지름", tier: "Gold II", description: "DFS 경로 활용." },
  ],
};
