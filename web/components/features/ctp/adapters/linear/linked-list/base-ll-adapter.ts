import { BaseAdapter } from '../../base-adapter';
import { LinkedListNode } from '@/components/features/ctp/common/types';

export class BaseLinkedListAdapter extends BaseAdapter {
    parse(globals: any): LinkedListNode[] {
        const nodes: LinkedListNode[] = [];
        const visited = new Set<string>();
        const queue: any[] = [];
        const labelMap = new Map<string, string[]>();

        const registerLabel = (id: string, label: string) => {
            if (!labelMap.has(id)) labelMap.set(id, []);
            labelMap.get(id)?.push(label);
        };

        // 1. Universal Variable Detection (Scan Globals)
        for (const [key, val] of Object.entries(globals)) {
            if (key.startsWith('__') || key === 'Node') continue;

            const isLike = this.isNodeLike(val);


            if (isLike) {
                const id = (val as any).__id;

                // Label Logic: Capitalize
                const displayLabel = key.charAt(0).toUpperCase() + key.slice(1);
                registerLabel(id, displayLabel);

                if (!visited.has(id)) {
                    queue.push(val);
                    visited.add(id);
                }
            }
        }

        // 2. Traversal
        while (queue.length > 0) {
            const node = queue.shift();
            const id = node.__id;

            // Value extraction
            const value = node.val ?? node.value ?? node.data ?? '?';
            const nextNode = node.next;

            let nextId = null;
            if (this.isNodeLike(nextNode)) {
                nextId = nextNode.__id;
                if (!visited.has(nextId)) {
                    visited.add(nextId);
                    queue.push(nextNode);
                }
            }

            // Labels
            const labels = labelMap.get(id);
            const labelStr = labels ? labels.join(' / ') : undefined;
            const isHighlighted = labels ? labels.includes('Curr') : false;

            nodes.push({
                id: id,
                value: value,
                nextId: nextId,
                prevId: this.getPrevId(node), // Hook for Doubly
                label: labelStr,
                isHighlighted: isHighlighted,
                isNull: false
            });
        }

        return nodes;
    }

    protected isNodeLike(val: any): boolean {
        if (!val || typeof val !== 'object') return false;
        if (val.__type === 'Node' || val.__type === 'ListNode') return true;
        return (val.val !== undefined || val.data !== undefined) && (val.next !== undefined) && val.__id;
    }

    protected getPrevId(node: any): string | null {
        return null; // Default: No prev pointer
    }
}
