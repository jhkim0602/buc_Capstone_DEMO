import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const CYCLE_DETECTION_CONFIG: CTPModuleConfig = {
  title: "사이클 탐지",
  description: "사이클 탐지의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Graph"],
  story: {
    problem: "사이클 존재 여부는 위상 정렬, Deadlock 판별 등 핵심 조건입니다.",
    definition: "DFS는 방문 상태(미방문/방문중/완료)로 사이클을 판정할 수 있습니다.\n방문중(1) 상태로 되돌아가면 사이클이 존재합니다.",
    analogy: "한 방향 도로를 따라가다 다시 같은 교차로로 돌아오면 사이클입니다.",
    playgroundDescription: "상태가 0→1→2로 바뀌는 흐름과 사이클 감지 순간을 확인하세요.",
  },
  features: [
    { title: "상태 기반 판별", description: "방문중(Gray) 노드를 다시 만나면 사이클입니다." },
    { title: "방향성에 따라 방법 다름", description: "무방향 그래프는 parent 체크, 방향 그래프는 색칠법 사용." },
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
      description: "DFS 색칠법으로 사이클 탐지",
      code: `def has_cycle(u, adj, state):
    state[u] = 1  # visiting
    for v in adj[u]:
        if state[v] == 1:
            return True
        if state[v] == 0 and has_cycle(v, adj, state):
            return True
    state[u] = 2
    return False
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Graph Cycle Detection (DFS states)
graph = {
    0: [1, 2],
    1: [3],
    2: [3, 4],
    3: [1],  # cycle: 1 -> 3 -> 1
    4: [5],
    5: [6],
    6: []
}

N = 7
state = [0] * N  # 0=unvisited, 1=visiting, 2=done
has_cycle = False
active_index = -1
active_node = -1


def detect_cycle(u):
    global active_index
    global active_node
    global has_cycle
    active_index = u
    active_node = u
    trace("node_active", scope="graph", id=u)
    state[u] = 1
    trace("node_visit", scope="graph", ids=[u])
    for v in graph[u]:
        trace("edge_active", scope="graph", u=u, v=v)
        if state[v] == 1:
            has_cycle = True
            return
        if state[v] == 0:
            detect_cycle(v)
            if has_cycle:
                return
    state[u] = 2
    trace("node_finalize", scope="graph", id=u)
    return


for i in range(N):
    if state[i] == 0:
        detect_cycle(i)
        if has_cycle:
            break

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["state", "has_cycle"]:
    _dump(_k)
`
  },
  showStatePanel: true,
  statePanelMode: "summary",
  practiceProblems: [
    { id: 9466, title: "텀 프로젝트", tier: "Gold III", description: "사이클 판정." },
    { id: 20040, title: "사이클 게임", tier: "Gold IV", description: "Union-Find 사이클." },
    { id: 16929, title: "Two Dots", tier: "Gold IV", description: "DFS 사이클." },
  ],
};
