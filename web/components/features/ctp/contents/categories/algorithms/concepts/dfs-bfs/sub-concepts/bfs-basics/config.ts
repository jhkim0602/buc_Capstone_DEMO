import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const BFS_BASICS_CONFIG: CTPModuleConfig = {
  title: "BFS 기본 (너비 우선 탐색)",
  description: "시작점에서 가까운 정점부터 차례대로 방문하는 '단계별' 탐색 알고리즘입니다. 최단 경로 문제의 필수 기초입니다.",
  mode: "code",
  tags: ["Queue", "Level Order", "Shortest Path"],
  story: {
    problem: `친구 찾기 게임을 하는데, '나와 가장 가까운 친구'부터 순서대로 찾고 싶다면 어떻게 해야 할까요?
내 친구들(1촌)을 먼저 다 찾고, 그 친구들의 친구(2촌)를 찾아야 거리 순서가 맞습니다.
한 명만 줄기차게 파고들면(DFS) 거리가 뒤죽박죽이 됩니다.`,
    definition: `BFS(Breadth-First Search)는 **가장 가까운 노드(Level n)**를 모두 방문한 뒤에야, 다음 거리의 노드(Level n+1)로 넘어가는 탐색 방식입니다.

**핵심 동작**
- **Queue(대기열)**를 사용하여, 먼저 발견한 노드를 먼저 방문합니다(FIFO).
- 이 성질 덕분에 **가중치가 없는 그래프**에서 **최단 경로**를 보장합니다.

**불변식**
- 큐에서 꺼낸 정점은 '최단 거리'가 확정된 상태다.
- 거리가 k인 모든 노드를 방문하기 전에는, 거리가 k+1인 노드를 방문하지 않는다.`,
    analogy: `호수에 돌을 던졌을 때 물결이 동심원으로 퍼져나가는 것과 같습니다.
중심(시작점)에서 동시에 모든 방향으로 1미터, 2미터, 3미터... 퍼져나갑니다.`,
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- **큐(Queue)의 역할**: 방문할 노드들이 줄을 서서 기다리는 모습
- **거리(Distance) 계산**: 시작점으로부터 몇 번째 단계(Step)인지 확정되는 순간
- **동시 확산**: 여러 갈래로 동시에 뻗어나가는 듯한 시각적 흐름

**실습 요약**
- 큐에 들어간 순서대로(FIFO) 방문함
- 같은 레벨의 노드들은 큐에 연속적으로 모여있음`
  },
  features: [
    { title: "최단 경로 보장", description: "간선의 가중치가 모두 1일 때, BFS로 처음 도달한 경로가 무조건 최단 경로입니다." },
    { title: "큐(Queue) 사용", description: "대기열(FIFO)을 이용해 '방문 예약'을 관리합니다. 스택을 쓰는 DFS와 가장 큰 차이점입니다." },
    { title: "단계별 확산", description: "시작점으로부터 거리 1, 거리 2, 거리 3... 순서로 영역을 넓혀갑니다." },
    { title: "성능상 주의점", description: "큐에 노드가 기하급수적으로 쌓일 수 있어(지수적 증가), DFS보다 메모리를 많이 사용할 수 있습니다." }
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
      description: "BFS",
      code: `from collections import deque

def bfs(start, adj):
    q = deque([start])
    visited = {start}
    while q:
        u = q.popleft()
        for v in adj[u]:
            if v not in visited:
                visited.add(v)
                q.append(v)
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# BFS Traversal Order
graph = {
    0: [1, 2],
    1: [3, 4],
    2: [4, 5],
    3: [6],
    4: [6],
    5: [6],
    6: []
}

start = 0
N = 7

visited = [False] * N
dist = [-1] * N
parent = [-1] * N
visited_nodes = []
queue = [start]
visited[start] = True
dist[start] = 0
parent[start] = start
head = 0
active_node = -1

while head < len(queue):
    u = queue[head]
    head += 1
    visited_nodes.append(u)
    active_node = u
    trace("node_active", scope="graph", id=u)
    trace("node_visit", scope="graph", ids=[u])
    for v in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        if not visited[v]:
            visited[v] = True
            dist[v] = dist[u] + 1
            parent[v] = u
            trace("dist_update", scope="graph", id=v, dist=dist[v], parent=parent[v])
            queue.append(v)
    trace("node_finalize", scope="graph", id=u)

order = visited_nodes

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["order", "queue", "dist"]:
    _dump(_k)
`
  },
  showStatePanel: true,
  statePanelMode: "summary",
  practiceProblems: [
    { id: 2606, title: "바이러스", tier: "Silver III", description: "BFS/DFS 기초." },
    { id: 1260, title: "DFS와 BFS", tier: "Silver II", description: "탐색 기본." },
    { id: 1697, title: "숨바꼭질", tier: "Silver I", description: "최단 거리 BFS." },
  ],
};
