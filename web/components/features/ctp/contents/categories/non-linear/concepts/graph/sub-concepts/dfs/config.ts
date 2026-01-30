import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const GRAPH_DFS_CONFIG: CTPModuleConfig = {
  title: "DFS",
  description: "그래프 DFS의 핵심 개념을 간단히 익힙니다.",
  mode: "code",
  tags: ["Graph"],
  story: {
    problem: "그래프의 연결성/경로 존재 여부는 방문 순서에 따라 달라집니다.",
    definition: "DFS는 한 갈래를 끝까지 탐색한 뒤 되돌아옵니다.\n스택(재귀 호출)이 현재 경로를 나타내며, 모든 이웃 처리가 끝나면 노드는 완료됩니다.",
    analogy: "막다른 골목까지 들어가 보고 돌아오는 탐험입니다.",
    playgroundDescription: "DFS가 어떤 순서로 정점을 방문하고, 언제 완료되는지 확인하세요.",
  },
  features: [
    { title: "깊이 우선", description: "재귀 또는 스택으로 구현합니다." },
    { title: "방문 처리", description: "visited로 재방문을 막습니다." },
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
      description: "DFS (재귀)",
      code: `def dfs(u, adj, visited):
    visited.add(u)
    for v in adj[u]:
        if v not in visited:
            dfs(v, adj, visited)
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Graph DFS Order
graph = {
    0: [1, 2],
    1: [3, 4],
    2: [5],
    3: [6],
    4: [6, 7],
    5: [7],
    6: [],
    7: []
}

start = 0
visited = []
stack = []
active_node = -1


def dfs(u):
    global active_node
    trace("node_active", scope="graph", id=u)
    visited.append(u)
    trace("node_visit", scope="graph", ids=[u])
    stack.append(u)
    active_node = u
    for v in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        if v not in visited:
            dfs(v)
    trace("node_finalize", scope="graph", id=u)
    stack.pop()


dfs(start)
order = visited

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["order", "visited", "stack"]:
    _dump(_k)
`
  },
  showStatePanel: true,
  statePanelMode: "summary",
  practiceProblems: [
    { id: 1260, title: "DFS와 BFS", tier: "Silver II", description: "DFS 기본." },
    { id: 11724, title: "연결 요소의 개수", tier: "Silver II", description: "DFS로 컴포넌트 계산." },
  ],
};
