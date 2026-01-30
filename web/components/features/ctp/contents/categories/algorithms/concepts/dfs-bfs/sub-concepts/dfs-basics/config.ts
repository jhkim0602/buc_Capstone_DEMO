import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DFS_BASICS_CONFIG: CTPModuleConfig = {
  title: "DFS 기본 (깊이 우선 탐색)",
  description: "한 우물만 끝까지 파는 탐색법입니다. 미로 찾기나 백트래킹(Backtracking)의 기초가 됩니다.",
  mode: "code",
  tags: ["Stack", "Recursion", "Backtracking"],
  story: {
    problem: `복잡한 미로에 갇혔습니다. 출구를 찾으려면 어떻게 해야 할까요?
한쪽 길을 정해서 막다른 벽이 나올 때까지 무조건 계속 가봐야 합니다.
막히면? 갈림길로 되돌아와서(Backtrack) 다른 길을 가봅니다.
이것이 인간이 미로를 푸는 가장 직관적인 방법, DFS입니다.`,
    definition: `DFS(Depth-First Search)는 **현재 경로**를 끝까지 탐색하는 방식입니다.

**핵심 동작**
- **Stack(스택)** 또는 **재귀(Recursion)**를 사용합니다.
- "지금 가고 있는 길"을 기억해야 하므로, 되돌아올 지점을 스택에 쌓아둡니다.
- 모든 노드를 방문해야 하거나, **경로의 특징**(예: 사이클 존재 여부)을 파악할 때 유리합니다.

**불변식**
- 방문한 정점은 중복해서 방문하지 않는다 (Visited 체크).
- 스택의 내용은 '시작점부터 현재 위치까지의 경로'를 나타낸다.`,
    analogy: `실타래를 풀면서 미로를 탐험하는 것과 같습니다.
앞으로 갈 때 실을 풀고, 막히면 실을 다시 감으며(Pop) 되돌아옵니다.`,
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- **깊게 들어가는 움직임**: 한 놈만 팬다(?)는 느낌으로 끝까지 들어가는 모습
- **Backtracking**: 막다른 길에서 되돌아올 때 스택에서 하나씩 빠지는 과정
- **재귀의 시각화**: 함수 호출 스택이 쌓이고 해제되는 흐름

**실습 요약**
- 스택(Stack)의 LIFO 특성이 탐색 순서를 결정함
- 막다른 곳에 닿아야 비로소 다른 갈래를 쳐다봄`
  },
  features: [
    { title: "재귀와 스택", description: "시스템의 호출 스택(Call Stack)을 이용해 명시적인 자료구조 없이도 간결하게 구현할 수 있습니다." },
    { title: "백트래킹의 기초", description: "N-Queen 문제처럼 '안 되면 되돌아가서 다시 해보는' 모든 알고리즘의 뼈대입니다." },
    { title: "메모리 효율성", description: "현재 경로상의 노드만 기억하면 되므로, BFS보다 메모리를 덜 쓸 수도 있습니다(트리가 깊지 않다면)." },
    { title: "경로 추적", description: "시작점에서 목표점까지 가는 구체적인 '경로'를 알아내야 할 때 유용합니다." }
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
      description: "DFS",
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
# DFS Traversal Order
graph = {
    0: [1, 2],
    1: [3, 4],
    2: [5],
    3: [],
    4: [],
    5: []
}

start = 0

visited_nodes = []
active_node = -1
stack = []


def dfs(u):
    global active_node
    active_node = u
    trace("node_active", scope="graph", id=u)
    stack.append(u)
    visited_nodes.append(u)
    trace("node_visit", scope="graph", ids=[u])
    for v in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        if v not in visited_nodes:
            dfs(v)
    trace("node_finalize", scope="graph", id=u)
    stack.pop()


dfs(start)
order = visited_nodes

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["order", "stack", "visited_nodes"]:
    _dump(_k)
`
  },
  showStatePanel: true,
  statePanelMode: "summary",
  practiceProblems: [
    { id: 1260, title: "DFS와 BFS", tier: "Silver II", description: "탐색 기본." },
    { id: 11724, title: "연결 요소의 개수", tier: "Silver II", description: "DFS 컴포넌트." },
    { id: 2667, title: "단지번호붙이기", tier: "Silver I", description: "DFS 응용." },
  ],
};
