import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DFS_BACKTRACKING_CONFIG: CTPModuleConfig = {
  title: "DFS 백트래킹",
  description: "DFS로 해를 탐색하면서 가지치기를 적용하는 방법을 익힙니다.",
  mode: "code",
  tags: ["DFS"],
  story: {
    problem: "해답 후보를 모두 탐색하면서 불필요한 경로를 일찍 포기해야 하는 문제가 많습니다.",
    definition: "백트래킹은 선택 → 재귀 탐색 → 되돌리기를 반복하며 해를 찾습니다.\n\n**불변식**\n- path는 현재까지 유효한 선택만 포함합니다.\n- 조건을 위반하면 즉시 되돌아갑니다.",
    analogy: "미로에서 길을 선택했다가 막히면 되돌아오는 방식입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- path가 확장/축소되는 순간\n- 목표를 찾았을 때 탐색이 멈추는 지점",
  },
  features: [
    { title: "선택/취소", description: "경로에 추가하고, 실패 시 되돌립니다." },
    { title: "가지치기", description: "조건 위반이면 즉시 탐색을 중단합니다." },
    { title: "탐색 공간 축소", description: "불필요한 분기를 줄여 시간 절약." },
    { title: "실전 빈도", description: "순열/조합/스도쿠/경로 문제에 반복됩니다." },
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
      description: "DFS Backtracking",
      code: `def dfs(u, target, graph, path):
    path.append(u)
    if u == target:
        return True
    for v in graph[u]:
        if v not in path and dfs(v, target, graph, path):
            return True
    path.pop()
    return False
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# DFS Backtracking (find a path)
graph = {
    0: [1, 2],
    1: [3, 4],
    2: [4, 5],
    3: [],
    4: [6],
    5: [6],
    6: []
}

start = 0
target = 6
path = []
found = False
active_node = -1


def dfs(u):
    global found, active_node
    if found:
        return
    active_node = u
    trace("node_active", scope="graph", id=u)
    path.append(u)
    trace("node_visit", scope="graph", ids=[u])
    if u == target:
        found = True
        trace("node_finalize", scope="graph", id=u)
        return
    for v in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        if v not in path:
            dfs(v)
            if found:
                return
    path.pop()


dfs(start)

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["path", "found"]:
    _dump(_k)
`
  },
  showStatePanel: true,
  statePanelMode: "summary",
  practiceProblems: [
    { id: 15649, title: "N과 M (1)", tier: "Silver III", description: "백트래킹 기본." },
    { id: 15650, title: "N과 M (2)", tier: "Silver III", description: "조합 백트래킹." },
    { id: 2661, title: "좋은수열", tier: "Gold IV", description: "가지치기 필수." },
  ],
};
