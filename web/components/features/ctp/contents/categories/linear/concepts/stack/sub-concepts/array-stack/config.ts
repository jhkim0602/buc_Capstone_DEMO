import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const STACK_ARRAY_CONFIG: CTPModuleConfig = {
    title: "배열 스택 (Array Stack)",
    description: "고정된 크기의 배열을 사용하여 스택을 직접 구현해봅니다.",
    tags: ["Implementation", "Array", "Fixed Size", "Overflow"],

    mode: 'code', // Code Editor Mode

    story: {
        problem: `만약 우리가 사용하는 프로그래밍 언어에 '스택' 라이브러리가 없다면 어떻게 해야 할까요?
가장 기본적인 자료구조인 **배열(Array)**을 이용해서 스택의 동작을 흉내 내야 합니다.`,
<<<<<<< HEAD
        definition: `**배열 스택**은 미리 정해진 크기(Capacity)의 배열을 만들고, **Top**이라는 인덱스 변수를 이용해 데이터의 위치를 관리하는 방식입니다.

**불변식**
- Top은 항상 다음 삽입 위치를 가리킨다.
- 유효 데이터는 [0, top-1] 구간에만 존재한다.`,
=======
        definition: `**배열 스택**은 미리 정해진 크기(Capacity)의 배열을 만들고, **Top**이라는 인덱스 변수를 이용해 데이터의 위치를 관리하는 방식입니다.`,
>>>>>>> origin/feature/interview
        analogy: `**엘리베이터 정원**과 같습니다.
1. 탈 수 있는 사람 수(Capacity)가 정해져 있습니다.
2. 꽉 찼는데 더 타려고 하면 경고음(Overflow)이 울립니다.
3. 가장 나중에 탄 사람이 문 앞(Top)에 있어서 먼저 내려야 합니다.`,
        playgroundDescription: `**[구현 목표]**
1. \`push\`: 배열의 \`top\` 인덱스에 데이터를 넣고 \`top\`을 1 증가시킵니다.
2. \`pop\`: \`top\`을 1 감소시키고 데이터를 꺼냅니다.
<<<<<<< HEAD
3. **Overflow 방지**: 배열이 꽉 찼는지(\`top == capacity\`) 확인해야 합니다.

**실습 요약**
- top 인덱스가 항상 다음 삽입 위치를 가리키는지 확인
- Overflow/Underflow 조건이 정확히 동작하는지 확인`,
    },

    features: [
        {
            title: "Top 인덱스로 위치 추적",
            description: "배열의 마지막 사용 위치를 Top으로 관리해, 삽입/삭제는 항상 O(1)입니다."
        },
        {
            title: "고정 크기 (Capacity)",
            description: "배열 크기를 넘으면 Overflow가 발생합니다. 메모리를 예측 가능한 환경에 적합합니다."
        },
        {
            title: "구현 단순성",
            description: "포인터 없이 배열과 인덱스만으로 구현되므로 디버깅이 쉽고 성능도 안정적입니다."
        }
    ],

    initialCode: {
        python: `# === USER CODE START ===
class ArrayStack:
=======
3. **Overflow 방지**: 배열이 꽉 찼는지(\`top == capacity\`) 확인해야 합니다.`
    },

    initialCode: {
        python: `class ArrayStack:
>>>>>>> origin/feature/interview
    def __init__(self, capacity):
        self.capacity = capacity
        # None으로 초기화된 고정 크기 배열 생성
        self.array = [None] * capacity
        self.top = 0

    def push(self, item):
        if self.top >= self.capacity:
            print("Error: Stack Overflow")
            return
        
        self.array[self.top] = item
        self.top += 1

    def pop(self):
        if self.top <= 0:
            print("Error: Stack Underflow")
            return None
            
        self.top -= 1
        return self.array[self.top]

    def peek(self):
        if self.top <= 0:
            return None
        return self.array[self.top - 1]

# --- 테스트 코드 (수정하지 마세요) ---
stack = ArrayStack(5)
stack.push(10)
stack.push(20)
print("Pop:", stack.pop())
stack.push(30)
stack.push(40)
stack.push(50)
<<<<<<< HEAD
stack.push(60) # Overflow 테스트
# === USER CODE END ===`
=======
stack.push(60) # Overflow 테스트`
>>>>>>> origin/feature/interview
    },

    complexity: {
        access: "O(1) - Top 접근",
        search: "O(n)",
        insertion: "O(1) - Push",
        deletion: "O(1) - Pop"
    },

<<<<<<< HEAD
    implementation: [
        {
            language: "python",
            description: "Top 포인터(인덱스)로 배열 스택을 구현하는 기본 형태입니다.",
            code: `class ArrayStack:
    def __init__(self, capacity):
        self.capacity = capacity
        self.items = [None] * capacity
        self.top = 0  # 다음에 들어갈 위치

    def push(self, value):
        if self.top >= self.capacity:
            raise IndexError("Stack overflow")
        self.items[self.top] = value
        self.top += 1

    def pop(self):
        if self.top == 0:
            raise IndexError("Stack underflow")
        self.top -= 1
        return self.items[self.top]

    def peek(self):
        if self.top == 0:
            return None
        return self.items[self.top - 1]`
        }
    ],

=======
>>>>>>> origin/feature/interview
    practiceProblems: [
        {
            id: 10828,
            title: "스택",
            tier: "Silver IV",
            description: "정수 스택을 구현하고 명령을 처리하는 프로그램을 작성합니다.",
        },
        {
            id: 1874,
            title: "스택 수열", // Stack Sequence
            tier: "Silver II",
            description: "스택에 push/pop 연산을 수행하여 특정 수열을 만들 수 있는지 확인합니다."
        }
    ]
};
