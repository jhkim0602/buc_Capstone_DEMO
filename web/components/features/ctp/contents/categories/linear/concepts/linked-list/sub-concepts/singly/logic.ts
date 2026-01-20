import { useCallback } from "react";
import { useCTPStore, VisualStep } from "@/components/features/ctp/store/use-ctp-store";
import { LinkedListNode } from "@/components/features/ctp/playground/visualizers/linked-list/legacy/linked-list-visualizer";

export function useSinglyLinkedListSim() {
    const { setSteps } = useCTPStore();

    const runSimulation = useCallback((code: string) => {
        const steps: VisualStep[] = [];
        let nodes: LinkedListNode[] = [];
        const lines = code.split('\n');

        // Initial State

        // Simple Regex-based "Mock Interpreter"
        // This is a simplified logic tailored for the educational script provided in config.ts
        lines.forEach((line, lineIdx) => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;

            // 1. Create Head: head = Node(10)
            if (trimmed.match(/head\s*=\s*Node\((\d+)\)/)) {
                const val = trimmed.match(/head\s*=\s*Node\((\d+)\)/)![1];
                nodes = [{ id: 'node-head', value: val, label: 'Head', nextId: null }];

                steps.push({
                    id: `step-${lineIdx}`,
                    description: `새로운 노드(${val})를 생성하고, 'Head' 포인터가 이를 가리키게 합니다.`,
                    data: JSON.parse(JSON.stringify(nodes)),
                    activeLine: lineIdx + 1,
                    highlightedIndices: [0]
                });
            }

            // 2. Link Next: head.next = Node(20)
            else if (trimmed.match(/head\.next\s*=\s*Node\((\d+)\)/)) {
                const val = trimmed.match(/head\.next\s*=\s*Node\((\d+)\)/)![1];
                // Update previous node
                nodes[0].nextId = 'node-2';
                // Add new node
                nodes.push({ id: 'node-2', value: val, nextId: null });

                steps.push({
                    id: `step-${lineIdx}`,
                    description: `새로운 노드(${val})를 생성하고, Head의 다음(Next)으로 연결합니다.`,
                    data: JSON.parse(JSON.stringify(nodes)),
                    activeLine: lineIdx + 1,
                    highlightedIndices: [1]
                });
            }

            // 3. Link Next Next: head.next.next = Node(30)
            else if (trimmed.match(/head\.next\.next\s*=\s*Node\((\d+)\)/)) {
                const val = trimmed.match(/head\.next\.next\s*=\s*Node\((\d+)\)/)![1];
                nodes[1].nextId = 'node-3';
                nodes.push({ id: 'node-3', value: val, nextId: null, isNull: false });

                steps.push({
                    id: `step-${lineIdx}`,
                    description: `새로운 노드(${val})를 생성하고, 두 번째 노드 뒤에 연결합니다.`,
                    data: JSON.parse(JSON.stringify(nodes)),
                    activeLine: lineIdx + 1,
                    highlightedIndices: [2]
                });
            }

            // 4. Traversal Start: curr = head
            else if (trimmed === 'curr = head') {
                // Visualize 'curr' pointer. For simplicity, we add a label or highlight.
                // Let's add a 'Curr' label to the head node manually for this step.
                const newNodes = JSON.parse(JSON.stringify(nodes));
                newNodes[0].label = "Head / Curr";
                newNodes[0].isHighlighted = true;

                steps.push({
                    id: `step-${lineIdx}`,
                    description: `순회(Traversal)를 시작하기 위해 'curr' 변수가 Head 노드를 가리키게 합니다.`,
                    data: newNodes,
                    activeLine: lineIdx + 1,
                    highlightedIndices: [0]
                });
            }

            // 5. Traversal Loop (Simulated): while curr: ...
            // Since we can't run a real loop in this parser easily, we just simulate the output for the known code structure.
            else if (trimmed.includes('curr = curr.next') && steps.length > 3) {
                // Move curr to next nodes sequentially for demo
                // Step for moving to node 2
                const nodesStep2 = JSON.parse(JSON.stringify(nodes));
                nodesStep2[0].label = "Head";
                nodesStep2[1].label = "Curr";
                nodesStep2[1].isHighlighted = true;

                steps.push({
                    id: `step-${lineIdx}-move1`,
                    description: `curr 포인터를 다음 노드(${nodesStep2[1].value})로 이동합니다.`,
                    data: nodesStep2,
                    activeLine: lineIdx + 1,
                    highlightedIndices: [1]
                });

                // Step for moving to node 3
                const nodesStep3 = JSON.parse(JSON.stringify(nodes));
                nodesStep3[1].label = "";
                nodesStep3[2].label = "Curr";
                nodesStep3[2].isHighlighted = true;

                steps.push({
                    id: `step-${lineIdx}-move2`,
                    description: `curr 포인터를 다음 노드(${nodesStep3[2].value})로 이동합니다.`,
                    data: nodesStep3,
                    activeLine: lineIdx + 1,
                    highlightedIndices: [2]
                });

                // Step for Null
                steps.push({
                    id: `step-${lineIdx}-end`,
                    description: `더 이상 연결된 노드가 없습니다 (Next == None). 순회를 종료합니다.`,
                    data: nodes, // Reset labels
                    activeLine: lineIdx + 1
                });
            }

            // 6. Insert Middle (node20 = head.next ...)
            // Catching specific instruction context from config.ts
            else if (trimmed.includes('new_node = Node(25)')) {
                // Nothing visual yet, just creation in memory
                steps.push({
                    id: `step-${lineIdx}`,
                    description: `삽입할 새로운 노드(25)를 생성합니다. 아직 리스트에 연결되지는 않았습니다.`,
                    data: nodes,
                    activeLine: lineIdx + 1
                });
            }
            else if (trimmed.includes('new_node.next = node20.next')) {
                // Visualizing the first link of insertion
                // This is hard to show perfectly without 2D positioning, but we can imply it.
                // We'll skip complex intermediate state and show final result in next step for simple parser.
                steps.push({
                    id: `step-${lineIdx}`,
                    description: `새 노드(25)의 다음(Next)이 30을 가리키게 합니다. (25 -> 30)`,
                    data: nodes,
                    activeLine: lineIdx + 1
                });
            }
            else if (trimmed.includes('node20.next = new_node')) {
                // Finalize insertion
                const newNodes = JSON.parse(JSON.stringify(nodes));
                // Insert 25 between 20 (index 1) and 30 (index 2)
                newNodes[1].nextId = 'node-new';
                newNodes.splice(2, 0, { id: 'node-new', value: 25, nextId: 'node-3', isHighlighted: true, color: 'green' });

                // Fix IDs/Structure if strictly needed, but loose is fine for visualizer

                steps.push({
                    id: `step-${lineIdx}`,
                    description: `기존 노드(20)의 화살표를 새 노드(25)로 돌립니다. 삽입이 완료되었습니다! (20 -> 25 -> 30)`,
                    data: newNodes,
                    activeLine: lineIdx + 1,
                    highlightedIndices: [2]
                });
            }

        });

        setSteps(steps);
    }, [setSteps]);

    return {
        runSimulation
    };
}
