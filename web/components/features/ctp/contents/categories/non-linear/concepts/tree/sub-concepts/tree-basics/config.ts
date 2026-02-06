import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const TREE_BASICS_CONFIG: CTPModuleConfig = {
  title: "트리 기본 (Tree Basics)",
  description: "트리 핵심 용어와 성질을 5단계 시각화로 익히는 입문 세션입니다.",
  mode: "interactive",
  interactive: {
    components: ["peek", "reset"],
    maxSize: 10,
  },
  tags: ["Root", "Degree", "Distance", "Level", "Width", "Size", "Subtree", "Path"],
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
- **노드 클릭**: 선택 노드 정보 카드에서 차수/레벨/유형 확인
- **Peek 버튼 1회**: 차수/거리 관찰 (node degree, tree degree, distance)
- **Peek 버튼 2회**: 레벨/너비 관찰 (level별 노드 수, width)
- **Peek 버튼 3회**: 노드/트리 크기 관찰 (node size, tree size)
- **Peek 버튼 4회**: 서브트리 관찰 (D 루트 기준 독립 트리)
- **Peek 버튼 5회**: 노드 간 유일 경로 관찰

**실습 요약**
- 같은 트리라도 관찰 관점(차수/거리/레벨/크기/서브트리/경로)에 따라 해석이 달라집니다.
- 기본 성질을 먼저 고정하면 이후 Traversal/BST에서 불변식을 빠르게 이해할 수 있습니다.`
  },
  features: [
    { title: "계층 구조 (Hierarchy)", description: "데이터의 상하 관계/포함 관계를 표현합니다. 파일 시스템, 조직도, DOM 구조가 대표 사례입니다." },
    { title: "차수와 거리", description: "node degree / tree degree / node distance를 구분하면 트리 특성을 정량적으로 설명할 수 있습니다." },
    { title: "레벨과 너비", description: "level별 노드 수를 세어 최대값을 width로 정의하면 BFS 기반 문제와 연결됩니다." },
    { title: "크기와 서브트리", description: "node size(서브트리 크기)와 tree size(전체 노드 수)는 재귀/DP 문제의 기본 지표입니다." },
    { title: "재귀적 정의 (Recursive)", description: "트리의 각 부분(Subtree)도 다시 트리입니다. 트리 문제를 재귀로 푸는 근거가 됩니다." },
    { title: "유일 경로 (Unique Path)", description: "임의의 두 노드를 잇는 단순 경로는 정확히 하나입니다. (사이클 없음)" },
    { title: "깊이/높이 개념", description: "Depth와 Height를 구분하면 순회, 거리, 지름 문제를 명확하게 모델링할 수 있습니다." }
  ],
  complexity: {
    access: "O(N)",
    search: "O(N)",
    insertion: "O(1) ~ O(N)",
    deletion: "O(1) ~ O(N)",
  },
  complexityNames: {
    access: "값 기준 임의 노드 접근",
    search: "조건 탐색(순회 기반)",
    insertion: "부모를 이미 알 때 / 부모 탐색 포함",
    deletion: "리프 삭제 / 서브트리 재연결 포함",
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
