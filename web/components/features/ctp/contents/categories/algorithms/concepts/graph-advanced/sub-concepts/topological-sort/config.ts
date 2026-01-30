import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const TOPOLOGICAL_SORT_CONFIG: CTPModuleConfig = {
  title: "위상 정렬 (Topological Sort)",
  description: "위상 정렬 (Topological Sort)의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Advanced Graph"],
  story: {
    problem: "작업 순서가 있는 문제는 선후관계를 지켜야 합니다.",
    definition: "위상 정렬은 **DAG(사이클 없는 방향 그래프)**에서 간선 방향을 만족하는 정점 순서를 구합니다.\n진입차수 0인 정점부터 제거하며 순서를 만들어갑니다.",
    analogy: "선행 과목을 먼저 듣고 후속 과목을 듣는 과정입니다.",
    playgroundDescription: "진입차수 0 노드가 큐에 들어가고 빠지는 흐름을 관찰하세요.",
  },
  features: [
    { title: "진입차수 기반", description: "Kahn 알고리즘으로 큐를 이용합니다." },
    { title: "사이클 판별", description: "결과 길이가 V보다 작으면 사이클이 있습니다." },
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
      description: "Topological Sort (Kahn)",
      code: `from collections import deque

q = deque([i for i in range(n) if indeg[i] == 0])
order = []
while q:
    u = q.popleft()
    order.append(u)
    for v in graph[u]:
        indeg[v] -= 1
        if indeg[v] == 0:
            q.append(v)
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Topological Sort (Kahn)
graph = {
    0: [1, 2],
    1: [3],
    2: [3],
    3: []
}

indeg = [0, 0, 0, 0]
for u in graph:
    for v in graph[u]:
        indeg[v] += 1

queue = [i for i in range(4) if indeg[i] == 0]
order = []
head = 0
active_index = -1
active_node = -1

while head < len(queue):
    u = queue[head]
    head += 1
    order.append(u)
    active_index = len(order) - 1
    active_node = u
    trace("node_active", scope="graph", id=u)
    trace("node_visit", scope="graph", ids=[u])
    trace("node_finalize", scope="graph", id=u)
    for v in graph[u]:
        indeg[v] -= 1
        trace("edge_consider", scope="graph", u=u, v=v)
        if indeg[v] == 0:
            queue.append(v)
            trace("node_compare", scope="graph", ids=[v])

arr = order

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["order", "queue", "indegree"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 2252, title: "줄 세우기", tier: "Gold III", description: "위상 정렬 기본." },
    { id: 2623, title: "음악프로그램", tier: "Gold III", description: "여러 조건의 위상 정렬." },
    { id: 1005, title: "ACM Craft", tier: "Gold III", description: "DP + 위상 정렬." },
  ],
};
