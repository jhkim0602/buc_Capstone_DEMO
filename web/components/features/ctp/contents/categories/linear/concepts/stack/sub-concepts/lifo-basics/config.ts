import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const STACK_LIFO_CONFIG: CTPModuleConfig = {
    title: "스택의 기초 (LIFO)",
    description: "가장 나중에 들어온 데이터가 가장 먼저 나가는 '후입선출' 구조를 학습합니다.",
    tags: ["LIFO", "Push", "Pop", "기초"],

    mode: 'interactive',
    interactive: {
        components: ['push', 'pop', 'peek'],
        maxSize: 7
    },

    story: {
        problem: `컴퓨터의 '되돌리기(Ctrl+Z)' 기능이나, 웹 브라우저의 '뒤로 가기' 버튼은 어떤 순서로 동작할까요?
우리가 가장 최근에 한 작업을 먼저 취소하고, 그다음 최근 작업을 취소합니다. 즉, 시간의 역순으로 데이터에 접근해야 합니다.`,
        definition: `스택(Stack)은 '쌓다'라는 의미로, 데이터를 차곡차곡 쌓아 올리는 자료구조입니다.
<<<<<<< HEAD
가장 중요한 특징은 **LIFO (Last-In, First-Out)**, 즉 '나중에 들어온 것이 먼저 나간다'는 원칙입니다.

**불변식**
- 가장 최근에 넣은 데이터가 항상 Top에 있다.
- Pop은 항상 Top에서만 일어난다.`,
=======
가장 중요한 특징은 **LIFO (Last-In, First-Out)**, 즉 '나중에 들어온 것이 먼저 나간다'는 원칙입니다.`,
>>>>>>> origin/feature/interview
        analogy: `**프링글스 통**이나 **설거지 접시 더미**를 상상해보세요.
1. 접시를 닦아서 쌓을 때는 맨 위에 둡니다. (Push)
2. 접시를 꺼내서 쓸 때는 맨 위의 것부터 꺼냅니다. (Pop)
중간에 있는 접시를 억지로 꺼내려면 위에 있는 접시들을 모두 치워야 하죠!`,
        playgroundDescription: `**[실습 가이드]**
1. **Push**: 버튼을 눌러 데이터를 스택에 넣습니다. (최대 7개)
2. **Pop**: 맨 위의 데이터를 꺼냅니다.
3. **Overflow**: 꽉 찼을 때 Push를 하면 어떻게 되나요?
<<<<<<< HEAD
4. **Underflow**: 비어있을 때 Pop을 하면 어떻게 되나요?

**실습 요약**
- Push/Pop 순서를 바꾸면 결과가 어떻게 달라지는지 확인
- Top이 항상 최근 요소를 가리키는지 확인`
    },

    features: [
        {
            title: "LIFO 순서 보장",
            description: "가장 마지막 작업이 가장 먼저 되돌려지는 구조입니다. 실행 취소, 뒤로 가기, 깊이 우선 탐색에 적합합니다."
        },
        {
            title: "O(1) Push / Pop",
            description: "스택의 맨 위(Top)만 다루므로 삽입과 삭제가 매우 빠릅니다."
        },
        {
            title: "Top 중심 접근",
            description: "중간 데이터는 직접 접근할 수 없고, 반드시 위에서부터 차례대로 처리해야 합니다."
        }
    ],

=======
4. **Underflow**: 비어있을 때 Pop을 하면 어떻게 되나요?`
    },

>>>>>>> origin/feature/interview
    complexity: {
        access: "O(n)",
        search: "O(n)",
        insertion: "O(1)",
        deletion: "O(1)"
    },

    implementation: [
        {
            language: 'python',
            code: `stack = []
stack.append(1)     # Push: [1]
stack.append(2)     # Push: [1, 2]
top = stack.pop()   # Pop: 2 반환, 스택은 [1]

# Python의 List는 이미 스택의 모든 기능을 지원합니다.`
        }
    ],

    practiceProblems: [
        {
            id: 10828,
            title: "스택",
            tier: "Silver IV",
            description: "스택의 가장 기초적인 연산(push, pop, size, empty, top)을 구현하는 문제입니다.",
        },
        {
            id: 10773,
            title: "제로",
            tier: "Silver IV",
            description: "잘못된 수를 부를 때마다 0을 외쳐서 가장 최근의 수를 지우는, 스택의 성질을 활용하는 문제입니다.",
        },
        {
            id: 9012,
            title: "괄호",
            tier: "Silver IV",
            description: "주어진 괄호 문자열이 올바른 괄호 문자열(VPS)인지 스택을 이용해 판별합니다.",
        }
    ]
};
