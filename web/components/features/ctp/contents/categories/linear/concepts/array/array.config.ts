import { PracticeProblem } from "../../shared/ctp-practice";
import { ComplexityData } from "../../shared/ctp-complexity";

export const ARRAY_CONFIG = {
  title: "배열 (Array)",
  description: "메모리 상에 원소를 연속적으로 배치하여, 인덱스를 통해 O(1) 시간 복잡도로 접근할 수 있는 가장 기본적인 선형 자료구조입니다.",
  tags: ["Random Access", "Static Size"],

  features: [
    { title: "임의 접근 (Random Access)", description: "인덱스(Index)를 사용하여 O(1) 시간에 어떤 원소든 즉시 접근할 수 있습니다." },
    { title: "캐시 지역성 (Cache Locality)", description: "데이터가 물리 메모리 상에 연속적으로 저장되므로 CPU 캐시 히트율이 높아 성능이 우수합니다." },
    { title: "고정된 크기 (Static Size)", description: "(일반적인 C/Java 배열의 경우) 생성 시 크기가 고정되며, 크기를 변경하려면 새로운 배열을 할당하고 복사해야 하는 비용이 발생합니다." },
    { title: "삽입/삭제의 비효율성", description: "배열의 중간에 원소를 삽입하거나 삭제할 경우, 연속성을 유지하기 위해 뒤의 모든 원소를 이동시켜야 하므로 O(N)의 시간이 소요됩니다." },
  ],

  complexity: {
    access: "O(1)",
    search: "O(N)",
    insertion: "O(N)",
    deletion: "O(N)",
  } as ComplexityData,

  practiceProblems: [
    {
      id: 10818,
      title: "최소, 최대",
      tier: "Bronze III",
      description: "N개의 정수가 주어질 때, 최솟값과 최댓값을 구하는 가장 기초적인 배열 순회 문제입니다."
    },
    {
      id: 2562,
      title: "최댓값 (Maximum Value)",
      tier: "Bronze III",
      description: "9개의 서로 다른 자연수 중 최댓값을 찾고 그 값이 몇 번째 수인지(Index) 찾는 문제입니다."
    },
    {
      id: 1546,
      title: "평균 (Average)",
      tier: "Bronze I",
      description: "모든 점수를 `점수/M*100`으로 고쳤을 때의 새로운 평균을 구하는 문제로, 배열 전체 요소의 갱신이 필요합니다."
    },
  ] as PracticeProblem[],

  implementation: [
    {
      language: 'python' as const,
      description: "Python의 List는 동적 배열로 구현되어 있어 별도의 import 없이 바로 사용할 수 있습니다.",
      code: `# 1. 배열 선언 및 초기화
arr = [1, 2, 3, 4, 5]

# 2. 요소 접근 (Access) - O(1)
print(arr[2])  # 3

# 3. 요소 수정 (Update) - O(1)
arr[2] = 10
print(arr)     # [1, 2, 10, 4, 5]

# 4. 요소 추가 (Append) - Amortized O(1)
arr.append(6)
print(arr)     # [1, 2, 10, 4, 5, 6]

# 5. 요소 삽입 (Insert) - O(N)
arr.insert(1, 99)
print(arr)     # [1, 99, 2, 10, 4, 5, 6]

# 6. 요소 삭제 (Pop) - O(1) (끝 삭제)
arr.pop()
print(arr)     # [1, 99, 2, 10, 4, 5]`
    }
  ],

  initialCode: {
    python: `# Python 배열 (List) 기본 연산
arr = [10, 25, 30]

# 요소 추가 (Append)
arr.append(45)

# 요소 수정 (Update)
arr[1] = 99

# 마지막 요소 제거 (Pop)
arr.pop()`
  },

};
