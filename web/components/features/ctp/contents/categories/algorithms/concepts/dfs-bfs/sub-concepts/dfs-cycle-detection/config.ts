import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DFS_CYCLE_DETECTION_CONFIG: CTPModuleConfig = {
  title: "DFS 사이클 탐지",
  description: "방문 상태(색칠법)으로 사이클을 판정합니다.",
  mode: "code",
  tags: ["DFS"],
  story: {
    problem: "순환 구조가 있으면 위상 정렬/경로 계산이 달라집니다.",
    definition: "DFS는 방문 상태(0/1/2)를 이용해 **역방향 간선**을 감지할 수 있습니다.\n방문 중(1)인 정점으로 다시 들어오면 사이클이 존재합니다.\n\n**불변식**\n- state=1(방문중) 노드를 다시 만나면 사이클\n- state=2(완료) 노드로의 간선은 사이클 증거가 아님",
    analogy: "길을 탐색하다가 이미 진행 중인 길로 되돌아가면 사이클입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- state가 0→1→2로 바뀌는 흐름\n- 방문중(1)으로 되돌아갈 때 사이클이 감지되는 순간",
  },
  features: [
    { title: "색칠법", description: "0(미방문), 1(방문중), 2(완료)로 관리합니다." },
    { title: "역방향 간선", description: "state=1인 노드를 다시 만나면 사이클입니다." },
    { title: "방향/무방향", description: "무방향 그래프는 부모 간선을 제외해야 합니다." },
    { title: "실전 활용", description: "위상 정렬/의존성 검증에 사용됩니다." },
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
      description: "DFS Cycle Detection",
      code: `def dfs(u, graph, state):
    state[u] = 1
    for v in graph[u]:
        if state[v] == 0:
            if dfs(v, graph, state):
                return True
        elif state[v] == 1:
            return True
    state[u] = 2
    return False
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# DFS Cycle Detection (directed)
graph = {
    0: [1, 2],
    1: [3],
    2: [3, 4],
    3: [1],  # back edge to create a cycle
    4: []
}

n = 5
state = [0] * n  # 0=unvisited,1=visiting,2=done
has_cycle = False
active_node = -1


def dfs(u):
    global has_cycle, active_node
    if has_cycle:
        return
    state[u] = 1
    active_node = u
    trace("node_active", scope="graph", id=u)
    for v in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        if state[v] == 0:
            dfs(v)
        elif state[v] == 1:
            has_cycle = True
    state[u] = 2
    trace("node_visit", scope="graph", ids=[u])
    trace("node_finalize", scope="graph", id=u)

for i in range(n):
    if state[i] == 0:
        dfs(i)

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["has_cycle", "state"]:
    _dump(_k)
`
  },
  showStatePanel: true,
  statePanelMode: "summary",
  practiceProblems: [
    { id: 11724, title: "연결 요소의 개수", tier: "Silver II", description: "DFS 방문 상태." },
    { id: 16929, title: "Two Dots", tier: "Gold IV", description: "DFS 사이클 탐지." },
    { id: 9466, title: "텀 프로젝트", tier: "Gold III", description: "사이클 판정." },
  ],
};
