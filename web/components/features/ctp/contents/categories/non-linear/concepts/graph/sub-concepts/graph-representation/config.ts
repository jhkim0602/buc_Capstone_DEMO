import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const GRAPH_REPRESENTATION_CONFIG: CTPModuleConfig = {
  title: "그래프 표현 (Adj List/Matrix)",
  description: "현실 세계의 연결 관계를 컴퓨터에 저장하는 두 가지 핵심 방법(행렬 vs 리스트)을 비교합니다.",
  mode: "interactive",
  interactive: {
    components: ["peek", "reset"],
    maxSize: 8,
  },
  tags: ["Graph", "Adjacency Matrix", "Adjacency List"],
  story: {
    problem: `지하철 노선도나 친구 관계를 컴퓨터에 어떻게 저장해야 할까요?
"누가 누구랑 연결되었나?"를 효율적으로 저장해야 탐색도 빠르고 메모리도 아낄 수 있습니다.`,
    definition: `그래프 표현 방식은 크게 두 가지가 있습니다.

1. **인접 행렬 (Adjacency Matrix)**: N x N 표를 만들어 연결되면 1, 아니면 0으로 표시합니다.
2. **인접 리스트 (Adjacency List)**: 각 정점마다 '연결된 친구 목록'만 따로 적어둡니다.

**선택 기준**
- 간선이 빽빽하면(Dense) -> 행렬이 유리 (조회 빠름)
- 간선이 듬성듬성하면(Sparse) -> 리스트가 유리 (메모리 절약)`,
    analogy: `**행렬**은 '출석부'와 같습니다. 모든 학생 칸이 있고 왔는지 안 왔는지 체크합니다. (결석이 많으면 종이 낭비)
**리스트**는 '주소록'과 같습니다. 실제로 연락처가 있는 친구 이름만 적어둡니다. (효율적)`,
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- **메모리 차이**: 행렬은 비어있는 칸(0)이 많아도 공간을 차지함
- **연결 확인**: "A랑 B랑 친구야?"를 물었을 때, 행렬은 즉시(O(1)) 알지만, 리스트는 찾아봐야 함
- **친구 전체 조회**: "A의 친구 다 불러와"는 리스트가 훨씬 빠름

**실습 요약**
- 희소 그래프(Sparse)에서는 리스트가 압도적으로 효율적임
- 밀집 그래프(Dense)에서는 행렬이 구현하기 편하고 빠를 수 있음`
  },
  features: [
    { title: "인접 행렬 (Matrix)", description: "2차원 배열로 모든 연결 관계를 표시합니다. 간선 확인이 O(1)로 빠르지만, 메모리를 N^2만큼 차지합니다." },
    { title: "인접 리스트 (List)", description: "각 정점에 연결된 간선만 리스트로 관리합니다. 메모리를 아낄 수 있어 대부분의 알고리즘 문제에서 선호됩니다." },
    { title: "Dense vs Sparse", description: "간선이 매우 많은 밀집 그래프는 행렬, 적은 희소 그래프는 리스트가 적합합니다." }
  ],
  complexity: {
    access: "Adj Matrix O(1) / Adj List O(deg)",
    search: "O(V+E) (탐색 알고리즘 기준)",
    insertion: "Adj List O(1) / Adj Matrix O(1)",
    deletion: "Adj List O(E) / Adj Matrix O(1)",
  },
  implementation: [
    {
      language: "python",
      description: "인접 리스트와 인접 행렬 기본 예시",
      code: `# Adj List
V = 4
adj = {0:[1,2], 1:[2], 2:[3], 3:[]}

# Adj Matrix
matrix = [[0]*V for _ in range(V)]
for u in adj:
    for v in adj[u]:
        matrix[u][v] = 1
`,
    }
  ],
  practiceProblems: [
    { id: 1260, title: "DFS와 BFS", tier: "Silver II", description: "그래프 탐색의 기본을 구현합니다." },
    { id: 11724, title: "연결 요소의 개수", tier: "Silver II", description: "DFS/BFS로 컴포넌트를 세어봅니다." },
    { id: 1753, title: "최단경로", tier: "Gold IV", description: "우선순위 큐 기반 다익스트라를 구현합니다." },
  ],
};
