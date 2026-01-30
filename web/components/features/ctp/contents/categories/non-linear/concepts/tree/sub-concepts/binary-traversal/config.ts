import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const TREE_TRAVERSAL_CONFIG: CTPModuleConfig = {
  title: "이진 트리 순회 (Traversal)",
  description: "전위/중위/후위 순회를 통해 트리를 방문하는 기본 방법을 학습합니다.",
  mode: "code",
  tags: ["Preorder", "Inorder", "Postorder"],
  story: {
    problem: "트리의 모든 노드를 일정한 순서로 방문해야 하는 경우가 많습니다.",
    definition: "순회는 트리의 모든 노드를 체계적으로 방문하는 방법입니다. 전위/중위/후위 순회가 대표적입니다.\n방문 시점이 달라지면 결과 순서도 완전히 달라집니다.\n\n**불변식**\n- 각 노드는 정확히 한 번 방문된다.",
    analogy: "책을 읽는 순서처럼, 트리도 읽는 순서가 정해져 있습니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- active가 전위 순서로 이동하는 흐름\n- visited_nodes에 쌓이는 방문 순서\n- 루트/좌/우 방문 타이밍의 차이",
  },
  features: [
    {
      title: "전위 순회 (Preorder)",
      description: "Root → Left → Right 순서로 방문합니다.",
    },
    {
      title: "중위 순회 (Inorder)",
      description: "Left → Root → Right 순서로 방문합니다.",
    },
    {
      title: "후위 순회 (Postorder)",
      description: "Left → Right → Root 순서로 방문합니다.",
    },
  ],
  complexity: {
    access: "O(N)",
    search: "O(N)",
    insertion: "N/A",
    deletion: "N/A",
  },
  implementation: [
    {
      language: "python",
      description: "재귀를 이용한 전위 순회 예시입니다.",
      code: `def preorder(node):
    if not node:
        return
    print(node.val)
    preorder(node.left)
    preorder(node.right)`,
    },
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Binary Tree Traversal (Preorder)
nodes = ["A", "B", "C", "D", "E", "F"]
edges = [["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "F"]]
children = {
    "A": ["B", "C"],
    "B": ["D", "E"],
    "C": ["F"]
}

active_node = None
visited_nodes = []

stack = ["A"]
while stack:
    node = stack.pop()
    active_node = node
    visited_nodes.append(node)
    for nxt in reversed(children.get(node, [])):
        stack.append(nxt)

nodes = nodes
edges = edges

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["order", "result"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 1991, title: "트리 순회", tier: "Silver I", description: "전위/중위/후위." },
    { id: 11725, title: "트리의 부모 찾기", tier: "Silver II", description: "트리 기본." },
    { id: 2263, title: "트리의 순회", tier: "Gold II", description: "순회 복원." },
  ],
};
