import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const QUEUE_LINEAR_CONFIG: CTPModuleConfig = {
    title: "선형 큐 (Linear Queue)",
    description: "가장 기본적인 줄 서기(FIFO) 구조입니다. 하지만 한 번 나간 자리는 다시 쓸 수 없다는 치명적인 단점이 있습니다.",
    mode: 'interactive',
    interactive: {
        components: ['push', 'pop', 'peek'],
        maxSize: 8,
    },
    tags: ["FIFO", "Array Based", "Simple"],
    story: {
        problem: "💡 왜 큐(Queue)가 필요할까요?\n\n데이터를 입력된 순서대로 처리해야 하는 상황은 무수히 많습니다. 스택(Stack)처럼 나중에 들어온 걸 먼저 처리하면(LIFO) 불공평하거나 논리적인 오류가 발생할 수 있습니다. 그래서 우리에겐 **'선착순'**을 보장하는 자료구조가 필요합니다.",

        definition: "📖 핵심 정의\n\n선형 큐(Linear Queue)는 긴 파이프와 같습니다. 한쪽 끝(`Rear`)에서는 데이터를 밀어 넣고, 반대쪽 끝(`Front`)에서는 데이터를 꺼냅니다. 중간에서 새치기를 하거나 빠져나갈 수 없습니다.\n\n가장 중요한 특징은 **FIFO (First-In, First-Out)**, 즉 먼저 들어온 데이터가 반드시 먼저 나간다는 점입니다.\n\n**불변식**\n- Front는 항상 다음에 나갈 위치를 가리킨다.\n- Rear는 다음에 들어갈 위치를 가리킨다.",

        analogy: "🚌 쉽게 이해하기: 버스 승차 대기열\n\n사람들이 버스를 타려고 한 줄로 서 있습니다. 버스가 도착하면(Dequeue) 맨 앞사람(`Front`)이 타고, 새로운 사람(Enqueue)은 맨 뒷사람(`Rear`) 뒤에 섭니다.\n\n하지만 선형 큐에는 **'앞사람이 타서 자리가 비어도, 뒷사람들이 앞으로 땡겨오지 않는다'**는 기이한 특징이 있습니다. 그래서 앞쪽 공간은 텅 비어있는데 뒤쪽은 꽉 차서 못 들어가는 상황이 발생합니다.",

        playgroundDescription: "## 🎮 시뮬레이션 가이드\n\n1. **FIFO 확인하기:**\n   - 숫자 `10`, `20`, `30`을 차례로 넣어보세요.\n   - 꺼낼 때도 `10`, `20`, `30` 순서로 나오는지 확인해보세요.\n\n2. **Dead Space (죽은 공간) 관찰:**\n   - 데이터를 몇 개 꺼내보세요. 앞쪽에 `Null`(빈 상자) 공간이 생깁니다.\n   - 이 상태에서 계속 데이터를 넣어보세요.\n   - **앞에 자리가 있는데도 불구하고** `Rear`가 끝에 닿으면 'Queue Full'이 뜨는 것을 볼 수 있습니다. 이것이 선형 큐의 한계입니다.\n\n**실습 요약**\n- Front/Rear 포인터가 어떻게 이동하는지 확인\n- 앞쪽 빈 공간이 재사용되지 않는 이유 확인"
    },
    features: [
        {
            title: "FIFO (First In First Out)",
            description: "선입선출의 원칙. 순서를 보장해야 하는 작업 목록(Task Schedule), 프린터 인쇄 대기열 등에 필수적입니다."
        },
        {
            title: "O(1) 접근성",
            description: "맨 앞의 데이터나 맨 뒤의 데이터에 접근하는 것은 즉시 가능합니다. 하지만 중간에 있는 데이터를 찾으려면 다 꺼내봐야 합니다."
        },
        {
            title: "치명적 단점: 메모리 낭비",
            description: "데이터를 꺼내도(`pop`) 배열의 앞쪽 인덱스는 비어있는 채로 남습니다. 이를 재사용하려면 모든 데이터를 앞으로 이동(`Shift`)시켜야 하는데, 이는 O(N)의 시간이 걸려 비효율적입니다."
        }
    ],
    complexity: {
        access: "O(n)",
        search: "O(n)",
        insertion: "O(1)",
        deletion: "O(1)"
    },
    complexityNames: {
        insertion: "Enqueue",
        deletion: "Dequeue"
    },
    implementation: [
        {
            language: 'python',
            description: "Python 리스트로 선형 큐의 기본 동작을 구현한 예시입니다.",
            code: `class LinearQueue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        # 리스트의 끝에 추가 (O(1))
        self.items.append(item)

    def dequeue(self):
        if not self.items:
            return None
        # 리스트의 맨 앞 제거
        # 주의: Python list.pop(0)은 모든 요소를 당겨오므로 O(N)입니다.
        # 실제로는 collections.deque를 써야 O(1)이 됩니다.
        return self.items.pop(0)

    def size(self):
        return len(self.items)

    def is_empty(self):
        return not self.items`
        }
    ],
    practiceProblems: [
        {
            id: 10845,
            title: "큐",
            tier: "Silver IV",
            description: "큐의 기본 연산(push, pop, size, empty, front, back)을 구현합니다."
        },
        {
            id: 18258,
            title: "큐 2",
            tier: "Silver IV",
            description: "빠른 입출력과 큐 연산을 요구하는 문제입니다."
        },
        {
            id: 2164,
            title: "카드2",
            tier: "Silver IV",
            description: "큐를 이용해 카드가 순차적으로 제거되는 과정을 시뮬레이션합니다."
        }
    ]
};
