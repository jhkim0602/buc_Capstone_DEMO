import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const HEAP_BASICS_CONFIG: CTPModuleConfig = {
  title: "힙 기본 (Heap Basics)",
  description: "완전 이진 트리 기반의 힙 구조와 배열 인덱스 규칙을 학습합니다.",
  mode: "interactive",
  interactive: {
    components: ["peek", "reset"],
    maxSize: 10,
  },
  tags: ["Complete Binary Tree", "Array Index", "Priority Queue"],
  story: {
    problem: `응급실에 환자가 계속 들어옵니다. 위급한 순서대로 치료해야 하는데, 매번 환자 전체를 다시 검사(정렬)하면 너무 느립니다.
"가장 위급한 1명"만 빠르게 찾고 싶다면 어떻게 해야 할까요?`,
    definition: `힙(Heap)은 **최댓값이나 최솟값**을 빠르게 찾아내기 위해 고안된 완전 이진 트리입니다.

**핵심 규칙**
- **Heap Priority**: 부모 노드는 항상 자식 노드보다 우선순위가 높습니다(Max Heap: 부모 > 자식).
- **Structure**: 마지막 레벨을 제외하고 모든 노드가 꽉 채워진 **완전 이진 트리** 형태여야 합니다(배열로 구현 가능).

**불변식**
- 루트 노드에는 항상 전체 데이터 중 가장 우선순위가 높은 값이 위치한다.
- 모든 부모-자식 관계에서 우선순위 규칙이 성립한다.`,
    analogy: `회사의 조직도와 비슷합니다.
사장님(Root)이 가장 높은 권한을 갖고, 그 아래 임원, 팀장 순으로 내려갑니다.
단, 옆 부서 팀장끼리는 누가 더 높은지 비교하지 않습니다(느슨한 정렬).`,
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- **Root의 특징**: 항상 가장 큰(또는 작은) 값이 위치함
- **배열 매핑**: 트리 구조가 배열 인덱스(1, 2, 3...)에 차례대로 대응되는 원리
- **Peek**: O(1)만에 최우선순위 값을 확인하는 과정

**실습 요약**
- 새로운 값이 들어와도 힙 속성을 유지함
- 루트만 보면 전체 최댓값을 알 수 있음`
  },
  features: [
    { title: "완전 이진 트리", description: "중간에 빈 공간 없이 꽉 채워진 트리 형태입니다. 덕분에 포인터 없이 '배열'만으로 효율적 구현이 가능합니다." },
    { title: "배열 인덱스 매핑", description: "부모 인덱스가 `i`라면, 왼쪽 자식은 `2i`, 오른쪽 자식은 `2i+1`이 되는 수학적 규칙을 가집니다. (1-based 기준)" },
    { title: "우선순위 큐 구현체", description: "우선순위 큐(ADT)를 구현하는 가장 효율적인 자료구조가 바로 힙(Data Structure)입니다." }
  ],
  complexity: {
    access: "O(1)",
    search: "O(N)",
    insertion: "O(log N)",
    deletion: "O(log N)",
  },
  implementation: [
    {
      language: "python",
      description: "heapq 모듈을 활용한 기본 예시입니다.",
      code: `import heapq

heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 2)
heapq.heappush(heap, 8)

print(heap[0])  # 루트(최솟값)`,
    },
  ],
  practiceProblems: [
    {
      id: 1927,
      title: "최소 힙",
      tier: "Silver II",
      description: "힙의 기본 연산을 구현합니다.",
    },
    {
      id: 11279,
      title: "최대 힙",
      tier: "Silver II",
      description: "최댓값 우선 힙을 구현합니다.",
    },
    {
      id: 1655,
      title: "가운데를 말해요",
      tier: "Gold II",
      description: "두 힙을 이용해 중앙값을 유지합니다.",
    },
  ],
};
