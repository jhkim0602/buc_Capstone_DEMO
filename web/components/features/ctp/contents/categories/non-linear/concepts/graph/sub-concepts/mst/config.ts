import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const MST_CONFIG: CTPModuleConfig = {
  title: "최소 신장 트리 (MST)",
  description: "최소 신장 트리 (MST)의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Graph"],
  story: {
    problem: "모든 정점을 최소 비용으로 연결하는 구조는 네트워크 설계의 핵심입니다.",
    definition: "MST는 모든 정점을 연결하면서 간선 가중치 합이 최소인 트리입니다.\n핵심은 **사이클을 만들지 않으면서 가장 싼 간선을 선택**하는 것입니다.\n\n**불변식**\n- 선택된 간선 집합은 항상 사이클이 없다.\n- 어떤 컷을 가로지르는 최소 간선은 MST에 포함될 수 있다(컷 속성).",
    analogy: "모든 집을 잇되, 총 배관 비용이 최소인 배치입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- 고려(edge_consider)되는 간선과 실제 선택(edge_relax)되는 간선\n- 누적된 MST와 총 비용의 변화",
  },
  features: [
    { title: "Kruskal/Prim", description: "간선 중심(Kruskal), 정점 중심(Prim) 두 접근이 있습니다." },
    { title: "Union-Find 활용", description: "사이클 여부를 빠르게 판정합니다." },
    { title: "컷 속성", description: "어떤 컷을 가로지르는 최소 간선은 MST 후보가 됩니다." },
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
      code: `def kruskal(n, edges):
    parent = list(range(n))
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    def union(a, b):
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[rb] = ra
            return True
        return False
    mst = []
    for w, u, v in sorted(edges):
        if union(u, v):
            mst.append((u, v, w))
    return mst
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Kruskal MST (Selected Edges)
edges = [
    (0, 1, 1),
    (0, 2, 3),
    (1, 2, 1),
    (1, 3, 4),
    (2, 3, 2),
    (2, 4, 6),
    (3, 4, 3),
    (3, 5, 2),
    (4, 5, 1),
    (4, 6, 5),
    (5, 6, 2)
]

N = 7
parent = list(range(N))
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
total_weight = 0
for u, v, w in sorted(edges, key=lambda x: x[2]):
    trace("edge_consider", scope="graph", u=u, v=v, w=w)
    if find(u) != find(v):
        union(u, v)
        mst.append((u, v, w))
        total_weight += w
        active_node = u
        compare_nodes = [u, v]
        trace("edge_relax", scope="graph", u=u, v=v, w=w)
        trace("node_visit", scope="graph", ids=[u, v])
        trace("node_finalize", scope="graph", id=u)
        trace("node_finalize", scope="graph", id=v)

mst_edges = [f"{u}-{v}({w})" for u, v, w in mst]

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["mst_edges", "total_weight"]:
    _dump(_k)
`
  },
  showStatePanel: true,
  statePanelMode: "summary",
  practiceProblems: [
    { id: 1197, title: "최소 스패닝 트리", tier: "Gold IV", description: "MST 기본." },
    { id: 1922, title: "네트워크 연결", tier: "Gold IV", description: "Kruskal/Prim 적용." },
    { id: 4386, title: "별자리 만들기", tier: "Gold III", description: "좌표 기반 MST." },
  ],
};
