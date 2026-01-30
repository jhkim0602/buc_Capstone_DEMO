import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const MST_CONFIG: CTPModuleConfig = {
  title: "최소 신장 트리 (MST)",
  description: "도시들을 모두 연결하면서도, 도로 건설 비용을 최소화해야 한다면? 사이클 없이 모든 정점을 잇는 가장 저렴한 방법을 찾습니다.",
  mode: "code",
  tags: ["Advanced Graph", "Kruskal", "Prim", "Union-Find"],
  story: {
    problem: `N개의 섬을 모두 다리로 연결하고 싶습니다. 다리를 짓는 비용이 각기 다를 때, 가장 적은 비용으로 모든 섬을 잇는 방법은 무엇일까요?
너무 많은 다리를 지으면 비용 낭비고(Cycle), 너무 적으면 연결되지 않는 섬이 생깁니다.`,
    definition: `MST(Minimum Spanning Tree)는 그래프의 모든 정점을 포함(Spanning)하면서, 사이클이 없는(Tree) 부분 집합 중 가중치 합이 최소인 것을 말합니다.

**대표 알고리즘**
1. **Kruskal**: 가장 싼 간선부터 줍는다. (단, 사이클 생기면 패스) -> Union-Find 사용
2. **Prim**: 시작점에서 가까운 놈부터 내 편으로 만든다. -> Priority Queue 사용

**불변식**
- 트리에 포함된 간선은 V-1개여야 한다.
- 사이클이 절대 존재해서는 안 된다.`,
    analogy: `전력망이나 통신 케이블을 설치하는 것과 같습니다.
모든 집을 전기로 연결하되, 불필요하게 삥 돌아가는 케이블(Cycle)을 없애고 최소한의 선만 남깁니다.`,
    playgroundDescription: `이번 단계에서 무엇을 볼까? (Kruskal 기준)
- **간선 정렬**: 비용이 낮은 순서대로 간선을 검사하는 흐름
- **Cycle 감지**: Union-Find로 두 정점이 이미 같은 집합인지 확인하는 순간
- **트리 완성**: 정확히 V-1개의 간선이 선택되면 종료

**실습 요약**
- 싼 간선부터 고르되, 사이클이 생기는 간선은 버림을 확인
- 최종적으로 숲(Forest)이 하나의 큰 트리로 합쳐짐`
  },
  features: [
    { title: "Kruskal 알고리즘", description: "간선 중심(Edge-Centric) 방식. 간선을 비용 순으로 정렬하고 사이클을 피해 선택합니다." },
    { title: "Prim 알고리즘", description: "정점 중심(Vertex-Centric) 방식. 현재 트리에서 가장 가까운 정점을 하나씩 확장해 나갑니다." },
    { title: "Cycle Property", description: "사이클 내에서 가장 비싼 간선은 절대 MST에 포함되지 않습니다." },
    { title: "Cut Property", description: "정점들을 두 그룹으로 나누었을 때, 두 그룹을 잇는 가장 싼 간선은 반드시 MST에 포함됩니다." }
  ],
  complexity: {
    access: "O(1)",
    search: "O(E log E)",
    insertion: "O(log E)",
    deletion: "O(log E)",
  },
  implementation: [
    {
      language: "python",
      description: "Kruskal MST",
      code: `for w, u, v in sorted(edges):
    if union(u, v):
        mst.append((u, v, w))
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Kruskal MST (Selected Edges)
edges = [
    (0, 1, 1),
    (1, 2, 2),
    (0, 2, 3),
    (2, 3, 1)
]

parent = [0, 1, 2, 3]
active_node = -1
compare_nodes = []


def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]


def union(a, b):
    ra = find(a)
    rb = find(b)
    if ra != rb:
        parent[rb] = ra


mst = []
for u, v, w in sorted(edges, key=lambda x: x[2]):
    trace("edge_consider", scope="graph", u=u, v=v, w=w)
    if find(u) != find(v):
        union(u, v)
        mst.append((u, v, w))
        active_node = u
        compare_nodes = [u, v]
        trace("edge_relax", scope="graph", u=u, v=v, w=w)
        trace("node_visit", scope="graph", ids=[u, v])
        trace("node_finalize", scope="graph", id=u)
        trace("node_finalize", scope="graph", id=v)

arr = [f"{u}-{v}({w})" for u, v, w in mst]

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["mst_edges", "total_weight", "result"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 1197, title: "최소 스패닝 트리", tier: "Gold IV", description: "MST 기본." },
    { id: 1922, title: "네트워크 연결", tier: "Gold IV", description: "Kruskal/Prim 적용." },
    { id: 4386, title: "별자리 만들기", tier: "Gold III", description: "좌표 기반 MST." },
  ],
};
