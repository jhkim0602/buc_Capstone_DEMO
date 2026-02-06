import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const TREE_TRAVERSAL_CONFIG: CTPModuleConfig = {
  title: "이진 트리 순회 (Traversal)",
  description: "Pre/In/Postorder의 방문 시점 차이를 MODE 전환으로 비교하는 코드 세션입니다.",
  mode: "code",
  tags: ["Preorder", "Inorder", "Postorder", "DFS Pattern"],
  story: {
    problem: `같은 트리라도 "언제 노드를 처리하느냐"에 따라 결과가 완전히 달라집니다.
표현식 트리, 직렬화, BST 정렬 출력처럼 순회 방식이 정답 자체를 결정하는 문제가 많습니다.`,
    definition: `순회(Traversal)는 모든 노드를 **정해진 규칙**으로 1회씩 방문하는 과정입니다.

**핵심 규칙 (Root 기준 처리 시점)**
- **Preorder**: Root를 먼저 처리
- **Inorder**: Left 이후 Root 처리
- **Postorder**: Left/Right 이후 Root 처리

**불변식**
- 각 노드는 정확히 1회 처리된다.
- 트리 구조가 고정이면 같은 순회 규칙은 항상 동일한 결과를 낸다.`,
    analogy: `건물을 점검한다고 생각하면 이해가 쉽습니다.
- Preorder: 층에 들어가자마자 점검
- Inorder: 왼쪽 구역 점검 후 중앙 점검
- Postorder: 모든 하위 구역 점검 후 마지막 확인`,
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- **MODE 변경 + 실행**: preorder / inorder / postorder 결과 비교
- MODE 값을 preorder / inorder / postorder로 바꿨을 때 방문 순서 변화
- active_node가 이동하는 타이밍
- order 배열이 쌓이는 시점과 최종 결과`,
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
    {
      title: "같은 DFS, 다른 결과",
      description: "세 순회 모두 DFS 계열이지만 처리 시점이 달라 결과와 활용처가 달라집니다.",
    },
  ],
  complexity: {
    access: "O(N)",
    search: "O(N)",
    insertion: "O(1)",
    deletion: "O(H)",
  },
  complexityNames: {
    access: "전체 순회(모든 노드 방문)",
    search: "조건 노드 탐색(순회 기반)",
    insertion: "방문 결과 기록(append)",
    deletion: "스택/재귀 프레임 정리",
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
# Binary Tree Traversal (Switch MODE)
nodes = ["A", "B", "C", "D", "E", "F"]
edges = [["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "F"]]
tree = {
    "A": ("B", "C"),
    "B": ("D", "E"),
    "C": ("F", None),
    "D": (None, None),
    "E": (None, None),
    "F": (None, None),
}

MODE = "preorder"  # preorder | inorder | postorder

active_node = None
visited_nodes = []
compare_nodes = []
order = []

# state machine frame: ("enter" | "visit", node)
stack = [("enter", "A")]
while stack:
    state, node = stack.pop()
    if node is None:
        continue

    compare_nodes = [node]
    left, right = tree[node]

    if MODE == "preorder":
        if state == "enter":
            active_node = node
            visited_nodes.append(node)
            order = visited_nodes[:]
            if right is not None:
                stack.append(("enter", right))
            if left is not None:
                stack.append(("enter", left))

    elif MODE == "inorder":
        if state == "enter":
            if right is not None:
                stack.append(("enter", right))
            stack.append(("visit", node))
            if left is not None:
                stack.append(("enter", left))
        else:
            active_node = node
            visited_nodes.append(node)
            order = visited_nodes[:]

    else:  # postorder
        if state == "enter":
            stack.append(("visit", node))
            if right is not None:
                stack.append(("enter", right))
            if left is not None:
                stack.append(("enter", left))
        else:
            active_node = node
            visited_nodes.append(node)
            order = visited_nodes[:]

result = f"{MODE}: {' -> '.join(order)}"

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["MODE", "order", "result"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 1991, title: "트리 순회", tier: "Silver I", description: "전위/중위/후위 순회를 직접 구현합니다." },
    { id: 11725, title: "트리의 부모 찾기", tier: "Silver II", description: "트리에서 부모 관계를 구성하는 기초 문제입니다." },
    { id: 2263, title: "트리의 순회", tier: "Gold II", description: "순회 결과를 바탕으로 트리를 복원합니다." },
  ],
};
