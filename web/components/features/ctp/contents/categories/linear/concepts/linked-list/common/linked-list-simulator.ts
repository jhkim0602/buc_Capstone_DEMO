
import { VisualStep } from "@/components/features/ctp/store/use-ctp-store";
import { LinkedListNode } from "@/components/features/ctp/playground/visualizers/linked-list/legacy/linked-list-visualizer";

// Internal Memory Representation
interface SimNode {
    id: string; // e.g. 'node-1'
    val: any;
    nextId: string | null;
    prevId: string | null;
    label?: string; // e.g. "Head"
}

interface SimScope {
    [varName: string]: string | null; // varName maps to nodeId
}

export type LLType = 'singly' | 'doubly' | 'circular';

export class LinkedListSimulator {
    private steps: VisualStep[] = [];
    private nodes: Map<string, SimNode> = new Map();
    private scope: SimScope = {}; // Variables like 'head', 'curr', 'newNode'
    private nodeCounter = 0;
    private type: LLType;

    constructor(type: LLType = 'singly') {
        this.type = type;
        this.reset();
    }

    private reset() {
        this.steps = [];
        this.nodes = new Map();
        this.scope = {};
        this.nodeCounter = 0;
    }

    private exportState(): LinkedListNode[] {
        // Convert internal Map to array for Visualizer
        // We also need to attach labels from Scope (e.g. if scope['head'] == 'node-1', label 'node-1' as 'Head')

        const visualNodes: LinkedListNode[] = [];

        // 1. Build basic nodes
        this.nodes.forEach(node => {
            const labels: string[] = [];

            // Find all variables pointing to this node
            Object.entries(this.scope).forEach(([varName, nodeId]) => {
                if (nodeId === node.id) labels.push(varName);
            });

            visualNodes.push({
                id: node.id,
                value: node.val,
                nextId: node.nextId,
                prevId: node.prevId,
                label: labels.length > 0 ? labels.join(' / ') : undefined,
                isHighlighted: labels.includes('curr') || labels.includes('new_node') // Simple highlight rule
            });
        });

        // 2. Sort by "logical" order for better visual (Head first)
        // This is a simple topological sort or just following 'head'
        const sorted: LinkedListNode[] = [];
        const visited = new Set<string>();

        let currentId = this.scope['head'];

        // Add Header chain
        while (currentId && !visited.has(currentId) && this.nodes.has(currentId)) {
            visited.add(currentId);
            const node = visualNodes.find(n => n.id === currentId);
            if (node) {
                sorted.push(node);
                currentId = node.nextId as string;
            } else {
                break;
            }
        }

        // Add remaining disconnected nodes (e.g. new_node before linking)
        visualNodes.forEach(n => {
            if (!visited.has(n.id.toString())) {
                sorted.push(n);
            }
        });

        return sorted;
    }

    private addStep(desc: string, line?: number) {
        this.steps.push({
            id: `step-${this.steps.length}`,
            description: desc,
            data: this.exportState(),
            activeLine: line
        });
    }

    // --- Parser Core ---

    public parseAndRun(code: string): VisualStep[] {
        this.reset();
        const lines = code.split('\n');

        lines.forEach((line, idx) => {
            const raw = line.trim();
            if (!raw || raw.startsWith('#')) return; // Skip empty/comments

            const lineNum = idx + 1;

            try {
                this.executeLine(raw, lineNum);
            } catch (e) {
                console.warn(`Parse error at line ${lineNum}: ${raw}`, e);
                this.addStep(`⚠️ 실행 오류: ${lineNum}번 줄을 이해할 수 없습니다. 기본적인 문법(Node 생성, 할당)만 지원합니다.`, lineNum);
            }
        });

        if (this.steps.length <= 1 && code.trim().length > 0) {
            // Only Init step exists, but code was not empty -> meaning nothing matched regex
            const lines = code.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
            if (lines.length > 0) {
                this.addStep("⚠️ 경고: 실행 가능한 명령어를 찾지 못했습니다. 문법을 확인해주세요.");
            }
        }

        return this.steps;
    }

    private executeLine(line: string, lineNum: number) {
        // 1. Node Creation: var = Node(val)
        // Regex: (varName) = Node((value))
        const createMatch = line.match(/^(\w+)\s*=\s*Node\((\w+)\)/);
        if (createMatch) {
            const varName = createMatch[1];
            const val = createMatch[2];
            const nodeId = `node-${++this.nodeCounter}`;

            this.nodes.set(nodeId, {
                id: nodeId,
                val: val,
                nextId: null,
                prevId: null
            });
            this.scope[varName] = nodeId;

            this.addStep(`${varName} 변수에 값 ${val}을 가진 새 노드를 생성합니다.`, lineNum);
            return;
        }

        // 2. Property Assignment (Next): var.next = var2 OR var.next = Node(...)
        // Regex for: A.next = B (Simple variable)
        // Hard to parse nested like head.next.next. Let's support depth 1 for now.
        const nextAssignMatch = line.match(/^(\w+)\.next\s*=\s*(\w+)$/);
        if (nextAssignMatch) {
            const hostVar = nextAssignMatch[1]; // e.g. head
            const targetVar = nextAssignMatch[2]; // e.g. node2

            const hostId = this.scope[hostVar];
            const targetId = this.scope[targetVar] || (targetVar === 'None' ? null : undefined);

            // Handle head.next = head.next (No-op in parsing, but link update)
            // Need to resolve references like 'head.next' if they appear on RHS.

            if (hostId && targetId !== undefined) {
                const hostNode = this.nodes.get(hostId);
                if (hostNode) {
                    hostNode.nextId = targetId;
                    this.addStep(`${hostVar}의 다음(Next)을 ${targetVar === 'None' ? '없음(None)' : targetVar}으로 연결합니다.`, lineNum);

                    // Double Link Check
                    if (this.type === 'doubly' && targetId) {
                        const targetNode = this.nodes.get(targetId);
                        if (targetNode) {
                            targetNode.prevId = hostId;
                            //  this.addStep(`(자동) ${targetVar}의 이전(Prev)도 ${hostVar}로 연결됩니다.`, lineNum);
                        }
                    }
                }
            }
            return;
        }

        // 3. Property Assignment (Next) with Creation: var.next = Node(...)
        const nextCreateMatch = line.match(/^(\w+)\.next\s*=\s*Node\((\w+)\)/);
        if (nextCreateMatch) {
            const hostVar = nextCreateMatch[1];
            const val = nextCreateMatch[2];

            const hostId = this.scope[hostVar]; // handle deep chain? only var supported
            if (hostId) {
                const newNodeId = `node-${++this.nodeCounter}`;
                this.nodes.set(newNodeId, { id: newNodeId, val, nextId: null, prevId: null });

                const hostNode = this.nodes.get(hostId);
                if (hostNode) {
                    hostNode.nextId = newNodeId;
                    if (this.type === 'doubly') {
                        this.nodes.get(newNodeId)!.prevId = hostId;
                    }
                }
                this.addStep(`${hostVar} 뒤에 새 노드(${val})를 생성하여 연결합니다.`, lineNum);
            }
            return;
        }

        // 4. Pointer Movement: var = var.next OR var = var.next.next
        // Regex: lhs = rhs.next(.next)?( with optional comment)
        const moveMatch = line.match(/^(\w+)\s*=\s*(\w+)\.next(\.next)?/);
        if (moveMatch) {
            const lhs = moveMatch[1];
            const rhs = moveMatch[2];
            const isDoubleJump = !!moveMatch[3]; // has .next.next

            // Basic Movement: var = prev.next
            // Usually lhs == rhs (e.g. curr = curr.next), but slow = fast.next is also possible

            const currentId = this.scope[rhs];
            if (currentId) {
                const currentNode = this.nodes.get(currentId);

                // 1st Step
                if (currentNode && currentNode.nextId) {
                    let nextId: string | null = currentNode.nextId;
                    let desc = `${lhs}를 ${rhs}의 다음 노드`;

                    // Handle Double Jump
                    if (isDoubleJump) {
                        const step1Node = this.nodes.get(nextId);
                        if (step1Node && step1Node.nextId) {
                            nextId = step1Node.nextId;
                            desc += `의 다음 노드(2칸 점프)`;
                        } else {
                            // Hit Null in middle
                            nextId = null;
                            desc += `의 다음으로 이동하려 했으나 중간에 끊겼습니다 (None)`;
                        }
                    } else {
                        desc += `(으)로 이동합니다.`;
                    }

                    this.scope[lhs] = nextId;

                    const nextVal = nextId ? this.nodes.get(nextId)?.val : 'None';
                    this.addStep(`${desc} -> ${nextVal}`, lineNum);

                } else {
                    // Current is valid but has no next
                    this.scope[lhs] = null;
                    this.addStep(`${lhs}를 이동하려 했으나, ${rhs} 뒤에 노드가 없습니다 (None).`, lineNum);
                }
            } else {
                // RHS is null
                this.scope[lhs] = null;
                this.addStep(`${lhs}를 ${rhs}(None)에서 이동할 수 없습니다. 결과는 None입니다.`, lineNum);
            }
            return;
        }

        // 5. Basic Assignment: curr = head
        const assignMatch = line.match(/^(\w+)\s*=\s*(\w+)$/);
        if (assignMatch) {
            const lhs = assignMatch[1];
            const rhs = assignMatch[2];

            if (rhs === 'None') {
                this.scope[lhs] = null;
                this.addStep(`${lhs} 변수를 비웁니다 (None).`, lineNum);
            } else if (this.scope[rhs]) {
                this.scope[lhs] = this.scope[rhs];
                this.addStep(`${lhs} 변수가 ${rhs}와 같은 노드를 가리키게 합니다.`, lineNum);
            }
            return;
        }

        // 6. Deep Link (head.next.next = ...) - A bit cheat for 'Simple' engine
        // Regex support for head.next = ... is done. head.next.next is rarer in basic tutorial but let's support it via specialized block if needed.
        // 6. Deep Link (head.next.next = Node(...))
        // Regex: var.next.next = Node(val)
        const deepNextCreateMatch = line.match(/^(\w+)\.next\.next\s*=\s*Node\((\w+)\)/);
        if (deepNextCreateMatch) {
            const hostVar = deepNextCreateMatch[1];
            const val = deepNextCreateMatch[2];

            const hostId = this.scope[hostVar];
            if (hostId) {
                const hNode = this.nodes.get(hostId);
                // Traverse one step
                if (hNode && hNode.nextId) {
                    const nextNode = this.nodes.get(hNode.nextId);
                    if (nextNode) {
                        // Append to nextNode
                        const newNodeId = `node-${++this.nodeCounter}`;
                        this.nodes.set(newNodeId, { id: newNodeId, val, nextId: null, prevId: null });

                        nextNode.nextId = newNodeId;
                        if (this.type === 'doubly') {
                            this.nodes.get(newNodeId)!.prevId = hNode.nextId;
                        }
                        this.addStep(`${hostVar}.next.next에 새 노드(${val})를 연결합니다.`, lineNum);
                    } else {
                        this.addStep(`오류: ${hostVar}.next가 존재하지 않아 .next.next를 설정할 수 없습니다.`, lineNum);
                    }
                } else {
                    this.addStep(`오류: ${hostVar}.next가 존재하지 않아 .next.next를 설정할 수 없습니다.`, lineNum);
                }
            }
            return;
        }

        // 7. Generic Fallback
        // console.log("Unparsed line:", line);
    }
}
