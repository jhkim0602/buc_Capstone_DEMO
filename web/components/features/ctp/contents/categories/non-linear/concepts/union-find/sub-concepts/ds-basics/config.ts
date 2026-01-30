import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const DS_BASICS_CONFIG: CTPModuleConfig = {
  title: "분리 집합 (Disjoint Set)",
  description: "여러 요소를 서로소 집합(Disjoint Set)으로 나누고, 두 요소가 같은 집합에 속해 있는지 빠르게 판별합니다. (a.k.a Union-Find)",
  mode: "interactive",
  interactive: {
    components: ["peek", "reset"],
    maxSize: 8,
  },
  tags: ["Union-Find", "Cycle Detection", "Kruskal"],
  story: {
    problem: `여러 도시가 있고 도로를 하나씩 건설할 때, "A 도시와 B 도시가 이미 연결되어 있나?"를 알고 싶습니다.
매번 BFS/DFS로 탐색하면 너무 느립니다(O(N)). 더 빠른 방법이 필요합니다.`,
    definition: `Union-Find는 **상호 배타적인 집합(Disjoint Set)**들을 관리하는 자료구조입니다.

**핵심 동작**
- **Find(x)**: x가 속한 집합의 대표(Boss)를 찾습니다.
- **Union(a, b)**: a의 보스와 b의 보스를 찾아서, 한쪽이 다른 쪽의 부하가 되게 합니다.

**불변식**
- 같은 집합에 속한 모든 원소는 동일한 루트(대표 노드)를 가리킨다.
- Union 연산 후에는 두 집합이 하나로 합쳐진다.`,
    analogy: `동아리 통합 과정과 같습니다.
'축구부'와 '농구부'가 합쳐지면, 이제 '농구부장'도 '축구부장'의 지시를 따르게 됩니다.
"너 누구 라인이야?"라고 물으면(Find), 최종 보스 이름을 댑니다.`,
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- **초기 상태**: 모두가 자기 자신을 가리키는 고립된 상태
- **Union**: 화살표의 방향이 바뀌며 두 그룹이 하나로 뭉치는 모습
- **Find 경로**: 대표를 찾으러 위로 올라가는 과정

**실습 요약**
- 선이 연결되면 같은 색(그룹)이 됨
- 대표 노드가 바뀌면 그 아래 모든 노드의 소속이 바뀜(실제로는 Find 할 때 경로 압축됨)`
  },
  features: [
    { title: "초고속 연산 (Amortized O(1))", description: "경로 압축(Path Compression)과 랭크 기반 병합(Union by Rank)을 쓰면 거의 상수 시간에 동작합니다." },
    { title: "사이클 감지 (Cycle Detection)", description: "간선을 잇기 전에 두 노드의 대표가 같다면, 이미 연결된 상태이므로 사이클이 발생한 것입니다." },
    { title: "동적 연결성 (Dynamic Connectivity)", description: "실시간으로 네트워크가 연결되는 과정을 모델링하기에 가장 적합합니다." }
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
      description: "Union-Find 기본 구현",
      code: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, x):
        while self.parent[x] != x:
            x = self.parent[x]
        return x

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra != rb:
            self.parent[rb] = ra
`,
    }
  ],
  practiceProblems: [
    { id: 1717, title: "집합의 표현", tier: "Gold V", description: "Union-Find 기본 연산을 구현합니다." },
    { id: 1976, title: "여행 가자", tier: "Gold IV", description: "연결성 판별에 Union-Find를 활용합니다." },
    { id: 20040, title: "사이클 게임", tier: "Gold IV", description: "그래프 사이클 검출에 사용합니다." },
  ],
};
