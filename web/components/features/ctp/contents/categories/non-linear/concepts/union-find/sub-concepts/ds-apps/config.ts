import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DS_APPS_CONFIG: CTPModuleConfig = {
  title: "응용 문제",
  description: "응용 문제의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Union-Find"],
  story: {
    problem: "여러 연결성 쿼리를 반복 처리해야 하는 경우가 많습니다.",
    definition: "Union-Find는 연결성 판별, 사이클 검출에 즉시 활용됩니다.\n연결 정보를 계속 갱신하면서도 find는 거의 O(1)에 가깝게 유지됩니다.\n\n**불변식**\n- 같은 집합의 노드는 항상 같은 대표를 가진다.",
    analogy: "같은 동네인지 확인하는 것과 같습니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- union 호출로 parent가 묶이는 과정\n- 서로 다른 집합이 합쳐지는 순간\n- 경로 압축이 적용되며 parent가 평평해지는 흐름",
  },
  features: [
    { title: "연결성 쿼리", description: "두 노드가 같은 집합인지 빠르게 판별합니다." },
    { title: "사이클 판별", description: "간선을 추가할 때 사이클 발생 여부를 확인합니다." },
  ],
  complexity: {
    access: "O(1)",
    search: "O(α(N))",
    insertion: "O(α(N))",
    deletion: "N/A",
  },
  implementation: [
    {
      language: "python",
      description: "연결성 쿼리 예시",
      code: `edges = [(0,1),(2,3),(1,2)]
for a, b in edges:
    union(a, b)
print(find(0) == find(3))
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Union-Find: Connectivity Checks
n = 6
parent = list(range(n))
active_index = -1
compare_indices = []
path_nodes = []


def find(x):
    global active_index, path_nodes
    active_index = x
    path_nodes.append(x)
    trace("node_active", scope="union-find", id=x)
    trace("node_visit", scope="union-find", ids=[x])
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]


def union(a, b):
    global compare_indices, path_nodes
    compare_indices = [a, b]
    trace("node_compare", scope="union-find", ids=[a, b])
    path_nodes = []
    ra = find(a)
    rb = find(b)
    if ra != rb:
        parent[rb] = ra


edges = [(0, 1), (2, 3), (1, 2), (4, 5)]
for a, b in edges:
    union(a, b)

arr = parent

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["parent", "result"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 1717, title: "집합의 표현", tier: "Gold V", description: "Union-Find 기본." },
    { id: 10775, title: "공항", tier: "Gold II", description: "Union-Find 응용." },
    { id: 4386, title: "별자리 만들기", tier: "Gold III", description: "MST 응용." },
  ],
};
