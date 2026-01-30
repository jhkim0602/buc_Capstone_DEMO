import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const PATH_COMPRESSION_CONFIG: CTPModuleConfig = {
  title: "Path Compression",
  description: "Path Compression의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Union-Find"],
  story: {
    problem: "find를 반복하면 깊은 경로가 쌓입니다.",
    definition: "Path Compression은 find 과정에서 **지나온 모든 노드를 루트에 직접 연결**합니다.\n한 번의 find로 트리 높이가 급격히 낮아집니다.\n\n**불변식**\n- find 이후, 해당 경로의 노드들은 루트를 바로 가리킨다.",
    analogy: "복잡한 길을 지름길로 바꾸는 것과 같습니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- path_nodes가 기록되는 경로\n- find 이후 parent가 루트로 바뀌는 순간\n- 반복 호출 시 트리가 더 평평해지는 흐름",
  },
  features: [
    { title: "경로 단축", description: "find 호출 후 경로가 한 번에 루트로 연결됩니다." },
    { title: "반복 호출 최적화", description: "여러 번 호출할수록 트리가 평평해집니다." },
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
      description: "Path Compression",
      code: `def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Union-Find: Path Compression
parent = [0, 0, 1, 2, 3, 4]
active_index = -1
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


find(5)
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
    { id: 1976, title: "여행 가자", tier: "Gold IV", description: "연결성 확인." },
    { id: 20040, title: "사이클 게임", tier: "Gold IV", description: "사이클 판정." },
  ],
};
