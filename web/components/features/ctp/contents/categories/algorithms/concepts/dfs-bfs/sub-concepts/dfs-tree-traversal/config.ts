import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DFS_TREE_TRAVERSAL_CONFIG: CTPModuleConfig = {
  title: "트리 DFS 순회",
  description: "트리에서 DFS 순회(전/중/후위)의 차이를 이해합니다.",
  mode: "code",
  tags: ["DFS"],
  story: {
    problem: "트리는 DFS 순회로 구조를 읽고, 값을 집계하는 문제가 많습니다.",
    definition: "트리 순회는 **방문 시점**을 어디에 두느냐로 결과가 달라집니다.\n전위/중위/후위는 모두 DFS이지만, 출력 타이밍이 다릅니다.\n\n- 전위: 방문 → 자식\n- 중위: 왼 → 방문 → 오른\n- 후위: 자식 → 방문\n\n이 차이는 출력 순서뿐 아니라 **서브트리 집계 방식**까지 바꿉니다.",
    analogy: "루트부터 가지를 따라가며 표식을 남기는 방식입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- 방문 순서(preorder)가 쌓이는 과정\n- 자식 탐색이 끝난 뒤 완료(node_finalize)되는 시점",
  },
  features: [
    { title: "전위/중위/후위", description: "방문 시점 차이가 핵심입니다." },
    { title: "재귀 구조", description: "부모 → 자식으로 내려갑니다." },
    { title: "서브트리 집계", description: "DFS로 서브트리 합/크기를 계산합니다." },
    { title: "실전 활용", description: "트리 DP, 순회 출력 문제에 사용됩니다." },
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
      description: "Preorder DFS",
      code: `def preorder(u, tree, order):
    order.append(u)
    for v in tree[u]:
        preorder(v, tree, order)
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Tree DFS (preorder)
graph = {
    1: [2, 3],
    2: [4, 5],
    3: [6],
    4: [],
    5: [],
    6: []
}

order = []
active_node = -1


def dfs(u):
    global active_node
    active_node = u
    trace("node_active", scope="graph", id=u)
    order.append(u)
    trace("node_visit", scope="graph", ids=[u])
    for v in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        dfs(v)
    trace("node_finalize", scope="graph", id=u)


dfs(1)

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["order"]:
    _dump(_k)
`
  },
  showStatePanel: true,
  statePanelMode: "summary",
  practiceProblems: [
    { id: 1991, title: "트리 순회", tier: "Silver I", description: "전/중/후위 순회." },
    { id: 11725, title: "트리의 부모 찾기", tier: "Silver II", description: "DFS 트리 구조." },
    { id: 5639, title: "이진 검색 트리", tier: "Gold V", description: "후위 순회 출력." },
  ],
};
