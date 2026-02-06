import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const TREE_BST_CONFIG: CTPModuleConfig = {
  title: "Binary Search Tree (BST)",
  description: "정렬 불변식을 기반으로 search/insert 경로가 결정되는 트리 구조를 학습합니다.",
  mode: "code",
  tags: ["BST Invariant", "Search", "Insert", "Inorder Sorted"],
  story: {
    problem: `무작위 데이터에서 값을 찾으려면 최악 O(N) 비교가 필요합니다.
하지만 비교 결과에 따라 탐색 범위를 즉시 줄일 수 있다면 훨씬 빠르게 찾을 수 있습니다.`,
    definition: `이진 탐색 트리(BST)는 **정렬 상태를 유지하는 이진 트리**입니다.

**핵심 규칙**
- 모든 노드에서 왼쪽 서브트리 값 < 현재 노드 값 < 오른쪽 서브트리 값
- 모든 서브트리도 동일한 규칙을 만족

**불변식**
- Inorder 순회 결과는 항상 오름차순
- 탐색/삽입은 비교 결과(작다/크다)에 따라 한 방향으로만 내려간다.`,
    analogy: `업다운 게임과 같습니다.
현재 값보다 target이 작으면 왼쪽, 크면 오른쪽으로만 이동하므로 매 단계 후보가 줄어듭니다.`,
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- **ACTION 변경 + 실행**: search / insert 시나리오 전환
- ACTION 값을 search / insert로 바꿨을 때 경로(path) 변화
- compare_nodes가 보여주는 비교 기준
- target / insert_value 변경에 따른 분기 결과
- insert 시 nodes/edges가 갱신되며 트리 불변식이 유지되는지`,
  },
  features: [
    {
      title: "정렬 불변식",
      description: "왼쪽 < 부모 < 오른쪽 규칙으로 탐색 방향이 즉시 결정됩니다.",
    },
    {
      title: "탐색 경로의 단일성",
      description: "동일한 target은 항상 동일한 비교 경로를 따라갑니다.",
    },
    {
      title: "삽입 규칙의 단순성",
      description: "탐색 경로의 끝(null 위치)에 새 노드를 연결하면 불변식을 유지할 수 있습니다.",
    },
    {
      title: "균형 의존 성능",
      description: "균형이 좋으면 O(log N), 편향되면 O(N)까지 악화됩니다.",
    },
  ],
  complexity: {
    access: "O(log N) ~ O(N)",
    search: "O(log N) ~ O(N)",
    insertion: "O(log N) ~ O(N)",
    deletion: "O(log N) ~ O(N)",
  },
  complexityNames: {
    access: "루트부터 탐색 경로 길이",
    search: "값 조회",
    insertion: "새 노드 삽입",
    deletion: "노드 삭제(재연결/대체 포함)",
  },
  implementation: [
    {
      language: "python",
      code: `class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

class BST:
    def insert(self, root, val):
        if not root:
            return TreeNode(val)

        if val < root.val:
            root.left = self.insert(root.left, val)
        elif val > root.val:
            root.right = self.insert(root.right, val)
        return root

    def search(self, root, val):
        if not root or root.val == val:
            return root

        if val < root.val:
            return self.search(root.left, val)
        return self.search(root.right, val)`
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Binary Search Tree (BST)
nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]
edges = [
    [8, 3], [8, 10], [3, 1], [3, 6],
    [6, 4], [6, 7], [10, 14], [14, 13]
]

tree = {
    8: (3, 10),
    3: (1, 6),
    10: (None, 14),
    1: (None, None),
    6: (4, 7),
    14: (13, None),
    4: (None, None),
    7: (None, None),
    13: (None, None),
}

root = 8
active_node = None
visited_nodes = []
compare_nodes = []
found_node = None
path = []

ACTION = "search"  # search | insert
target = 7
insert_value = 5

if ACTION == "search":
    current = root
    while current is not None:
        active_node = current
        compare_nodes = [current, target]
        visited_nodes.append(current)
        path = visited_nodes[:]

        if current == target:
            found_node = current
            break

        left, right = tree[current]
        if target < current:
            current = left
        else:
            current = right

    if found_node is not None:
        result = f"search({target}) -> found"
    else:
        result = f"search({target}) -> not found"

else:  # ACTION == "insert"
    current = root
    parent = None

    while current is not None:
        active_node = current
        compare_nodes = [current, insert_value]
        visited_nodes.append(current)
        path = visited_nodes[:]

        parent = current
        left, right = tree[current]

        if insert_value < current:
            current = left
        elif insert_value > current:
            current = right
        else:
            break

    if current is None:
        tree[insert_value] = (None, None)
        nodes.append(insert_value)

        left, right = tree[parent]
        if insert_value < parent:
            tree[parent] = (insert_value, right)
        else:
            tree[parent] = (left, insert_value)

        edges.append([parent, insert_value])
        found_node = insert_value
        active_node = insert_value
        path = visited_nodes + [insert_value]
        result = f"insert({insert_value}) -> inserted under {parent}"
    else:
        found_node = current
        result = f"insert({insert_value}) -> already exists"

nodes = nodes
edges = edges

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["ACTION", "target", "insert_value", "path", "result"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 5639, title: "이진 검색 트리", tier: "Gold V", description: "전위 순회 입력으로 BST 후위 순회를 출력합니다." },
    { id: 2957, title: "이진 탐색 트리", tier: "Gold I", description: "삽입 순서에 따른 트리 깊이 누적을 추적합니다." },
    { id: 21939, title: "문제 추천 시스템 Version 1", tier: "Gold IV", description: "정렬 구조(set/heap) 운용으로 BST 사고를 훈련합니다." },
  ],
};
