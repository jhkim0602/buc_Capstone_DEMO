import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const STACK_MONOTONIC_CONFIG: CTPModuleConfig = {
    title: "Monotonic Stack (단조 스택)",
    description: "스택을 이용해 데이터를 특정 순서(오름차순/내림차순)로 정렬하여 O(N) 문제를 해결합니다.",
    tags: ["Monotonicity", "Next Greater Element", "O(N)"],
    mode: "code",
    initialCode: {
<<<<<<< HEAD
        python: `# === USER CODE START ===
# 오큰수 (Next Greater Element) 구하기
=======
        python: `# 오큰수 (Next Greater Element) 구하기
>>>>>>> origin/feature/interview
nums = [9, 5, 2, 7, 3, 8]
n = len(nums)
result = [-1] * n
stack = [] # '값'이 아닌 '인덱스'를 저장합니다

print(f"Input: {nums}")

for i in range(n):
    # 현재 값(nums[i])이 스택의 Top보다 크다면?
    # -> Top에 있는 수들에게 '오큰수'는 바로 나(nums[i])입니다.
    while stack and nums[stack[-1]] < nums[i]:
        idx = stack.pop()
        result[idx] = nums[i] # 정답 기록
        print(f"Pop: {idx}번 인덱스 오큰수 발견! -> {nums[i]}")
    
    # 아직 오큰수를 못 찾았으므로 스택에 대기 (Push)
    stack.append(i)
    # print(f"Push: {i}번 인덱스 대기")

print(f"Result: {result}")
<<<<<<< HEAD

# === USER CODE END ===`
=======
`
>>>>>>> origin/feature/interview
    },
    story: {
        problem: `### 왜 필요할까? (Problem)
"내 오른쪽에 있는 첫 번째 큰 수는 누구일까?"

배열의 각 원소에 대해, 자신보다 오른쪽에 있는 수 중 가장 먼저 등장하는 큰 수(**오큰수**, Next Greater Element)를 찾아야 합니다.

*   이중 반복문(\`for i... for j...\`)으로 찾으면 **O(N^2)**의 시간이 걸립니다.
*   데이터가 100만 개라면? 시간 초과로 해결할 수 없습니다.

"스택을 사용하면 O(N)으로 줄일 수 있습니다."`,
        definition: `### 핵심 정의 (Definition)
Monotonic Stack (단조 스택)은 스택 내부의 원소들이 항상 **오름차순** 또는 **내림차순**을 유지하도록 관리하는 기술입니다.

*   **인덱스 저장**: 값 자체가 아닌 **인덱스**를 스택에 저장하는 것이 일반적입니다.(위치를 알아야 정답 배열에 기록할 수 있기 때문)
<<<<<<< HEAD
*   **Pop 조건**: 스택의 질서를 깨는 새로운 값이 등장하면, 질서를 맞출 때까지 기존 원소들을 제거(Pop)합니다.

**불변식**
- 스택 내부는 항상 단조성(오름/내림)을 유지한다.
- 각 원소는 최대 한 번 push/pop 된다.`,
=======
*   **Pop 조건**: 스택의 질서를 깨는 새로운 값이 등장하면, 질서를 맞출 때까지 기존 원소들을 제거(Pop)합니다.`,
>>>>>>> origin/feature/interview
        analogy: `### 쉽게 이해하기 (Analogy)
"옥상 정원과 키 큰 빌딩"을 상상해 보세요.

사람들이 옥상에 일렬로 서서 **오른쪽**을 바라봅니다.
나보다 **키가 작은 사람들**은 내 그림자에 가려져 오른쪽 풍경을 볼 수 없습니다. (스택에 남음)

하지만 나보다 **키가 큰 사람(빌딩)**이 등장하면?
"아, 내 오큰수는 저 사람이구나!" 하고 깨닫고 옥상에서 내려옵니다. (Pop & 정답 기록)`,
        playgroundDescription: `
아래 예제 코드는 오큰수(Next Greater Element)를 찾는 O(N) 알고리즘입니다.

*   🔵 탐색 (Blue): 현재 배열에서 검사 중인 숫자(\`i\`)입니다.
*   🟡 비교 (Yellow): 스택의 Top과 현재 숫자가 "싸우는" 중입니다.
*   🔴 제거 (Red): 스택 Top이 현재 숫자보다 작아서 패배(Pop)했습니다. (오큰수 당첨!)
*   🟢 정답 (Green): 오큰수를 찾은 위치에 정답이 기록됩니다.

숫자들이 스택에 쌓이다가, 더 큰 수를 만났을 때 **연쇄적으로 터져나가는(Pop)** 과정을 확인해보세요!
<<<<<<< HEAD
  
**실습 요약**
- 스택에 인덱스만 저장하는 이유 확인
- pop이 연쇄적으로 일어나는 순간 관찰
- 결과 배열이 언제 채워지는지 확인
`
    },
    features: [
        {
            title: "단조성 유지",
            description: "스택 내부를 오름차순/내림차순으로 유지하여 비교와 제거를 한 번씩만 수행합니다."
        },
        {
            title: "인덱스 기반 처리",
            description: "값이 아닌 인덱스를 저장해, 결과 배열에 즉시 기록할 수 있습니다."
        },
        {
            title: "선형 시간 해결",
            description: "각 원소는 최대 한 번 push/pop 되므로 전체 시간 복잡도는 O(N)입니다."
        }
    ],
=======
`
    },
>>>>>>> origin/feature/interview
    complexity: {
        access: "O(N)",
        search: "O(N)",
        insertion: "O(1)",
        deletion: "Amortized" // Or "O(1) Avg"
    },
    complexityNames: {
        access: "Total Time",
        search: "Space Aux",
        insertion: "Per Element",
        deletion: "Analysis"
    },
    practiceProblems: [
        {
            id: 17298,
            title: "오큰수 (NGE)",
            tier: "Gold IV",
            description: "가장 대표적인 Monotonic Stack 문제입니다. O(N^2)로 풀면 시간 초과가 발생합니다."
        },
        {
            id: 2493,
            title: "탑 (Tower)",
            tier: "Gold V",
            description: "이번엔 '왼쪽'에 있는 첫 번째 큰 수를 찾는 문제입니다. 방향만 반대일 뿐 원리는 같습니다."
        },
        {
            id: 6198,
            title: "옥상 정원 꾸미기",
            tier: "Gold V",
            description: "자신보다 작은 빌딩들을 내려다보는 문제입니다. (Monotonic Stack 응용)"
        }
    ],
    implementation: [
        {
            language: 'python',
            code: `# Monotonic Stack 기본 템플릿
def next_greater_element(nums):
    stack = [] # 인덱스 저장용
    result = [-1] * len(nums)

    for i in range(len(nums)):
        # 스택이 비어있지 않고, 현재 값이 스택 Top 값보다 크다면?
        # -> Monotonicity(내림차순)가 깨짐 -> Pop 수행!
        while stack and nums[stack[-1]] < nums[i]:
            idx = stack.pop()
            result[idx] = nums[i] # 오큰수 기록
        
        stack.append(i) # 현재 인덱스 Push
    
    return result`
        }
    ]
};
