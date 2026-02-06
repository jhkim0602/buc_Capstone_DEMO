import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const TREE_PROPERTIES_CONFIG: CTPModuleConfig = {
  title: "트리 성질 (차수/거리/레벨/너비/크기/서브트리)",
  description: "트리 핵심 지표를 단계형 시각화로 관찰하며 개념을 고정하는 인터랙티브 세션입니다.",
  mode: "interactive",
  interactive: {
    components: ["peek", "reset"],
    maxSize: 10,
  },
  tags: ["Degree", "Distance", "Level", "Width", "Size", "Subtree"],
  story: {
    problem: `트리는 용어를 외우는 것보다, 같은 트리에서 지표를 직접 계산해보는 순간 개념이 고정됩니다.
특히 차수/거리/레벨/크기/서브트리는 DFS/BFS/BST 학습의 공통 언어입니다.`,
    definition: `트리 성질을 아래 6개 핵심 지표로 정리합니다.

- **Node Degree**: 해당 노드가 가진 자식 수
- **Tree Degree**: 모든 노드의 차수 중 최대값
- **Node Distance**: 두 노드를 잇는 경로의 간선 수
- **Node Level**: 루트에서 해당 노드까지의 거리(간선 수)
- **Width**: 같은 level 노드 수의 최댓값
- **Node/Tree Size**: 노드 기준 서브트리 크기 / 트리 전체 노드 수`,
    analogy: `조직도를 떠올리면 쉽습니다.
- 팀장의 직속 부하 수 = node degree
- 회사에서 가장 큰 팀의 인원수 = tree degree
- 서로 다른 팀원 간 보고 라인 길이 = node distance`,
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- **노드 클릭**: 선택 노드 정보 카드에서 차수/레벨/유형 확인
- **Peek 1회**: 구조 (차수/레벨/너비)
- **Peek 2회**: 거리 (distance(E,J)=5)
- **Peek 3회**: 크기/서브트리 (node size, tree size)

실습 요약:
- 6개 성질을 3단계(구조 -> 거리 -> 크기)로 묶어 학습합니다.
- 먼저 노드를 클릭해 차수/레벨을 확인하고, 이후 Peek으로 지표 간 연결을 확인합니다.`,
  },
  features: [
    {
      title: "차수 (Degree)",
      description: "노드 단위 차수와 트리 전체 차수를 구분하면 분기 구조를 정확히 설명할 수 있습니다.",
    },
    {
      title: "거리 (Distance)",
      description: "두 노드 사이 경로 길이는 LCA/지름 문제의 기본 단위입니다.",
    },
    {
      title: "레벨 / 너비 (Level / Width)",
      description: "레벨별 노드 수를 세면 BFS 레이어 구조와 병렬 처리량을 직관적으로 파악할 수 있습니다.",
    },
    {
      title: "노드 크기 / 트리 크기 (Size)",
      description: "서브트리 크기 계산은 트리 DP, 분할 정복 문제의 핵심 전처리입니다.",
    },
    {
      title: "서브트리 (Subtree)",
      description: "하나의 노드를 루트로 보면 그 하위 구조 전체가 독립적인 트리가 됩니다.",
    },
  ],
  complexity: {
    access: "O(1)",
    search: "O(N)",
    insertion: "O(1) ~ O(H)",
    deletion: "O(size(subtree))",
  },
  complexityNames: {
    access: "지표 조회(사전 계산 시)",
    search: "지표 계산(DFS/BFS)",
    insertion: "트리 갱신 후 지표 재계산",
    deletion: "노드/서브트리 제거 후 지표 갱신",
  },
  implementation: [
    {
      language: "python",
      description: "서브트리 크기 계산(DFS) 기본 패턴입니다.",
      code: `subtree_size = {}

def dfs_size(node):
    total = 1
    for child in tree[node]:
        total += dfs_size(child)
    subtree_size[node] = total
    return total`,
    },
  ],
  practiceProblems: [
    {
      id: 11725,
      title: "트리의 부모 찾기",
      tier: "Silver II",
      description: "루트 기준 부모 관계와 레벨 정보를 계산하는 기초 문제입니다.",
    },
    {
      id: 15681,
      title: "트리와 쿼리",
      tier: "Gold V",
      description: "서브트리 크기 전처리(DFS)를 활용하는 대표 문제입니다.",
    },
    {
      id: 1761,
      title: "정점들의 거리",
      tier: "Platinum V",
      description: "노드 간 거리 계산과 LCA 개념을 함께 다룹니다.",
    },
  ],
};
