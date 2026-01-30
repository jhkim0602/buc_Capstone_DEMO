import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const TREE_BST_CONFIG: CTPModuleConfig = {
  title: "Binary Search Tree (BST)",
  description: "효율적인 탐색과 정렬을 위한 이진 트리 구조입니다.",
  mode: 'code',
  story: {
    problem: `수많은 책이 무작위로 쌓여있다면, 특정 책을 찾기 위해 모든 책을 뒤져야 합니다(O(N)).
하지만 책들이 '가나다순'이나 '번호순'으로 꽂혀 있다면 훨씬 빨리 찾을 수 있지 않을까요?`,
    definition: `이진 탐색 트리(BST)는 **정렬된 상태를 유지하는 트리**입니다.

**핵심 규칙**
- 모든 노드에 대해, **왼쪽 자식**은 나보다 작고, **오른쪽 자식**은 나보다 큽니다.
- 이 규칙 덕분에 매 단계마다 **탐색 범위를 절반**으로 줄일 수 있습니다 (Ideal O(log N)).

**불변식**
- In-Order Traversal(중위 순회)을 하면 오름차순으로 정렬된 데이터가 나온다.
- 모든 서브트리도 BST 성질을 만족한다.`,
    analogy: `업다운(Up-Down) 게임과 같습니다. 숫자를 맞출 때 50을 불렀는데 "Down"이라고 하면, 51~100은 쳐다볼 필요도 없이 버립니다.
BST 탐색도 이와 같이 '필요 없는 절반'을 과감히 버리며 정답을 찾아갑니다.`,
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- **범위 축소**: Target보다 작으면 오른쪽으로, 크면 왼쪽으로 이동하는 결정 과정
- **경로 기록**: 탐색하면서 거쳐가는 노드들이 '정답을 찾기 위한 단서'가 됨
- **정렬 상태**: 중위 순회 시 자연스럽게 정렬된 값이 나옴

**실습 요약**
- 루트에서 시작해 조건에 따라 계속 아래로 내려감
- 값을 찾거나, Leaf에 도달하면(찾는 값 없음) 종료`
  },
  features: [
    { title: "정렬된 구조 (Sorted)", description: "왼쪽 < 부모 < 오른쪽 규칙을 항상 만족합니다. 이 성질을 이용해 데이터를 정렬된 상태로 저장합니다." },
    { title: "효율적인 탐색 (Search)", description: "균형이 잘 잡혀있다면 스무고개처럼 절반씩 후보를 지워나가며 O(log N)만에 찾습니다." },
    { title: "동적 업데이트", description: "배열은 중간 삽입 시 O(N)이 걸리지만, BST는 위치만 찾으면 링크 수정 만으로 삽입/삭제가 가능합니다." }
  ],
    complexity: {
        access: "O(log N)",
        search: "O(log N)",
        insertion: "O(log N)",
        deletion: "O(log N)"
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
        else:
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
# Static snapshot to avoid deep recursion in Skulpt
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

active_node = None
visited_nodes = []
found_node = None

target = 7
current = 8
while current is not None:
    active_node = current
    visited_nodes.append(current)
    if current == target:
        found_node = current
        break
    left, right = tree[current]
    if target < current:
        current = left
    else:
        current = right

nodes = nodes
edges = edges

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["root", "result"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 5639, title: "이진 검색 트리", tier: "Gold V", description: "BST 기본." },
    { id: 1406, title: "에디터", tier: "Silver II", description: "연결 구조 활용." },
    { id: 7662, title: "이중 우선순위 큐", tier: "Gold IV", description: "BST/Heap 아이디어." },
  ],
};
