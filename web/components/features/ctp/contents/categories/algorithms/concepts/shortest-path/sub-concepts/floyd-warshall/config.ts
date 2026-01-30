import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const FLOYD_WARSHALL_CONFIG: CTPModuleConfig = {
  title: "플로이드-워셜",
  description: "플로이드-워셜의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Shortest Path"],
  story: {
    problem: "모든 정점 쌍의 최단 경로가 필요한 경우가 있습니다.",
    definition: "플로이드-워셜은 **모든 정점 쌍의 최단 거리**를 O(V^3)으로 계산합니다.\n중간 정점 k를 하나씩 허용하면서 dist[i][j]를 갱신합니다.\n\n**불변식**\n- k번째 단계가 끝나면, {0..k}만 중간에 사용한 최단 거리가 확정됩니다.",
    analogy: "모든 도시 쌍의 최단거리 표를 미리 만들어두는 방식입니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- k가 바뀔 때 dist 행렬이 어떻게 변하는지\n- i,j 셀이 갱신되는 순간\n- 삼중 루프의 진행 순서",
  },
  features: [
    { title: "전체 쌍 계산", description: "모든 i,j에 대한 최단거리 계산." },
    { title: "단순한 구현", description: "삼중 루프로 구현이 간단합니다." },
    { title: "음수 간선 허용", description: "음수 간선은 허용하지만 음수 사이클은 허용되지 않습니다." },
  ],
  complexity: {
    access: "O(1)",
    search: "O(V^3)",
    insertion: "O(V^3)",
    deletion: "O(V^3)",
  },
  implementation: [
    {
      language: "python",
      description: "Floyd-Warshall",
      code: `for k in range(n):
    for i in range(n):
        for j in range(n):
            if dist[i][k] + dist[k][j] < dist[i][j]:
                dist[i][j] = dist[i][k] + dist[k][j]
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Floyd-Warshall (All Pairs)
INF = 10**9
matrix = [
    [0, 3, INF, 7],
    [8, 0, 2, INF],
    [5, INF, 0, 1],
    [2, INF, INF, 0]
]

n = 4
active_cell = [0, 0]
for k in range(n):
    for i in range(n):
        for j in range(n):
            active_cell = [i, j]
            if matrix[i][k] + matrix[k][j] < matrix[i][j]:
                matrix[i][j] = matrix[i][k] + matrix[k][j]

grid = matrix

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["dist", "result"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 11404, title: "플로이드", tier: "Gold IV", description: "플로이드-워셜 기본." },
    { id: 11780, title: "플로이드 2", tier: "Gold II", description: "경로 복원." },
    { id: 1956, title: "운동", tier: "Gold IV", description: "사이클 최단 경로." },
  ],
};
