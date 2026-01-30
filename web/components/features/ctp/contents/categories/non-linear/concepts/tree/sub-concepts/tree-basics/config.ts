import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const TREE_BASICS_CONFIG: CTPModuleConfig = {
  title: "트리 기본 (Tree Basics)",
  description: "계층 구조를 표현하는 트리의 기본 개념과 용어를 학습합니다.",
  mode: "interactive",
  interactive: {
    components: ["peek", "reset"],
    maxSize: 7,
  },
  tags: ["Root", "Parent", "Child", "Leaf"],
  story: {
    problem: `컴퓨터 폴더 구조, 회사의 조직도, HTML 문서 구조(DOM)...
이들의 공통점은 '위아래'가 있는 계층적인 관계라는 점입니다.
배열이나 연결 리스트처럼 한 줄로 세우는 것만으로는 이런 '포함 관계'를 표현하기 어렵습니다.`,
    definition: `트리(Tree)는 값을 가진 **노드(Node)**와 노드들을 연결하는 **간선(Edge)**으로 이루어진 비선형 자료구조입니다.

**핵심 규칙**
- **Root**: 가장 꼭대기에 있는 유일한 시작 노드입니다.
- **Parent-Child**: 부모는 여러 자식을 가질 수 있지만, 자식은 단 하나의 부모만 가집니다.
- **Cycle Free**: 회로(Cycle)가 존재하지 않습니다. 즉, 왔던 길을 되돌아가지 않고는 자기 자신으로 돌아올 수 없습니다.

**불변식**
- 노드가 N개라면, 간선은 항상 N-1개이다.
- 임의의 두 노드를 연결하는 경로는 유일하다.`,
    analogy: `가족의 족보(Family Tree)와 같습니다. 할아버지(Root) 밑에 아버지들이 있고, 그 밑에 자식들이 뻗어 나갑니다.
거꾸로 뒤집어 보면, 땅에 뿌리(Root)를 박고 가지가 뻗어 나가는 실제 나무와 모양이 똑같습니다.`,
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- **Root의 위치**: 항상 맨 위에 고정된 시작점
- **Leaf Node**: 자식이 없는 말단 노드들 (더 이상 뻗어나갈 수 없음)
- **부모-자식 연결**: 선으로 연결된 포함 관계

**실습 요약**
- 루트에서 리프까지 연결선이 끊어지지 않음
- 하나의 노드에 여러 자식이 달릴 수 있음`
  },
  features: [
    { title: "계층 구조 (Hierarchy)", description: "데이터 간의 상하 관계나 포함 관계를 직관적으로 표현합니다. 파일 시스템이 대표적입니다." },
    { title: "재귀적 정의 (Recursive)", description: "트리는 '루트와 그 자식 트리들(Subtrees)'로 이루어져 있습니다. 즉, 트리의 일부도 트리입니다." },
    { title: "유일한 경로", description: "임의의 두 노드 사이를 이동하는 경로는 오직 하나뿐입니다." }
  ],
  complexity: {
    access: "O(log N) ~ O(N)",
    search: "O(log N) ~ O(N)",
    insertion: "O(1)",
    deletion: "O(1)",
  },
  implementation: [
    {
      language: "python",
      description: "트리 노드 기본 구조 예시입니다.",
      code: `class TreeNode:
    def __init__(self, value):
        self.value = value
        self.children = []

root = TreeNode("A")
root.children.append(TreeNode("B"))
root.children.append(TreeNode("C"))`,
    },
  ],
  practiceProblems: [
    {
      id: 11725,
      title: "트리의 부모 찾기",
      tier: "Silver II",
      description: "루트가 주어졌을 때 각 노드의 부모를 구합니다.",
    },
    {
      id: 1167,
      title: "트리의 지름",
      tier: "Gold II",
      description: "트리에서 가장 먼 두 노드 사이의 거리를 구합니다.",
    },
    {
      id: 4803,
      title: "트리",
      tier: "Gold IV",
      description: "그래프가 트리인지 판별하는 문제입니다.",
    },
  ],
};
