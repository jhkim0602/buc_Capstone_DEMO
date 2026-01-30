import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const UNION_RANK_CONFIG: CTPModuleConfig = {
  title: "Union by Rank",
  description: "Union by Rank의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Union-Find"],
  story: {
    problem: "트리 높이가 커지면 find가 느려집니다.",
    definition: "Union by Rank는 더 낮은 트리를 높은 트리에 붙여 **트리 높이를 최소화**합니다.\nrank는 높이(또는 근사 높이)를 나타내며, 작은 랭크를 큰 랭크 아래로 붙입니다.\n\n**불변식**\n- rank가 큰 루트가 유지되며, 트리 높이 증가를 최소화한다.",
    analogy: "작은 팀을 큰 팀에 합쳐 조직 구조를 얕게 유지합니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- rank가 큰 쪽으로 parent가 붙는 과정\n- rank가 증가하는 순간\n- 비교/경로 추적이 줄어드는 흐름",
  },
  features: [
    { title: "높이 관리", description: "rank/size를 기준으로 결합합니다." },
    { title: "성능 보장", description: "경로 압축과 함께 거의 O(1) 성능을 유지합니다." },
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
      description: "Union by Rank",
      code: `def union(a, b):
    ra, rb = find(a), find(b)
    if ra == rb:
        return
    if rank[ra] < rank[rb]:
        parent[ra] = rb
    elif rank[ra] > rank[rb]:
        parent[rb] = ra
    else:
        parent[rb] = ra
        rank[ra] += 1
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Union-Find: Union by Rank
parent = [0, 1, 2, 3, 4, 5]
rank = [0, 0, 0, 0, 0, 0]
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
    if ra == rb:
        return
    if rank[ra] < rank[rb]:
        parent[ra] = rb
    elif rank[ra] > rank[rb]:
        parent[rb] = ra
    else:
        parent[rb] = ra
        rank[ra] += 1


union(0, 1)
union(2, 3)
union(1, 3)
arr = parent

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["parent", "rank", "result"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 1717, title: "집합의 표현", tier: "Gold V", description: "Union-Find 기본." },
    { id: 4195, title: "친구 네트워크", tier: "Gold II", description: "집합 크기 관리." },
    { id: 1976, title: "여행 가자", tier: "Gold IV", description: "연결성." },
  ],
};
