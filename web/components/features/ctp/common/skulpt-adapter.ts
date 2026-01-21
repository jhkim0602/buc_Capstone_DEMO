
// Utility to convert Raw Python Objects (from Skulpt Worker) to CTP Visual Types
// Utility to convert Raw Python Objects (from Skulpt Worker) to CTP Visual Types
import { VisualItem, LinearItem, GridItem, LinkedListNode } from '@/components/features/ctp/common/types';

// TODO: Define strict types for Worker payload if possible
// The payload is basically JSON-ified version of Skulpt objects
// e.g. { type: 'list', value: [1, 2, 3] } or just raw JS arrays if remapToJs worked perfectly

export class SkulptAdapter {

    // 1D Array Adapter
    // Input: [1, 2, 3] or { ... }
    static toLinearItems(pyList: any[]): LinearItem[] {
        if (!Array.isArray(pyList)) return [];
        return pyList.map((val, idx) => ({
            id: `item-${idx}`,
            value: val
        }));
    }

    // Grid Adapter
    // Input: [[1, 2], [3, 4]]
    static toGridItems(pyGrid: any[][]): GridItem[][] {
        if (!Array.isArray(pyGrid)) return [];
        return pyGrid.map((row, rIdx) => {
            if (!Array.isArray(row)) return [];
            return row.map((val, cIdx) => ({
                id: `cell-${rIdx}-${cIdx}`,
                value: val,
                label: `${rIdx},${cIdx}`
            }));
        });
    }

    // Vector Adapter
    // Input: { data: [1, 2, 0, 0], capacity: 4, size: 2 } (If user implements class)
    // Or just a list [1, 2] and we infer?
    // For now, let's support a simple list -> vector conversion for compatibility
    static toVectorItems(pyList: any[], capacity?: number): { data: LinearItem[], capacity: number, size: number } {
        if (!Array.isArray(pyList)) return { data: [], capacity: 0, size: 0 };

        const size = pyList.length;
        // Mock capacity logic if not provided by Python state
        const cap = capacity || Math.max(size, 8);

        const items: LinearItem[] = pyList.map((val, idx) => ({
            id: `vec-${idx}`,
            value: val,
            label: idx.toString()
        }));

        // Fill empty slots for capacity visualization
        for (let i = size; i < cap; i++) {
            items.push({
                id: `vec-ghost-${i}`,
                value: 0, // or null
                label: i.toString(),
                isGhost: true
            });
        }

        return { data: items, capacity: cap, size };
    }

    // Linked List Adapter
    // Input: Global Variables map (to find head/curr/etc)
    // Traverses the graph from 'head' (or any node found)
    static toLinkedListItems(globals: any): LinkedListNode[] {
        const nodes: LinkedListNode[] = [];
        const visited = new Set<string>(); // Visit by ID
        const queue: any[] = [];

        // 1. Identify Entry Points and Label Map
        // We scan globals to find which variable points to which Node ID
        const labelMap = new Map<string, string[]>(); // ID -> ["head", "curr"]

        const registerLabel = (id: string, label: string) => {
            if (!labelMap.has(id)) labelMap.set(id, []);
            labelMap.get(id)?.push(label);
        };

        // Heuristic: Scan globals for "Node" likelihood
        // Skulpt objects from our custom serializer have { __type: 'Node', __id: ... }
        // OR they might be generic instances with 'val' and 'next' properties
        const isNodeLike = (val: any) => {
            if (!val || typeof val !== 'object') return false;
            // Check explicit type mark from worker
            if (val.__type === 'Node' || val.__type === 'ListNode') return true;
            // Check duck typing (has val/data and next)
            // Note: internal structure might be val.val or val.data if simple object
            // But our serializer flattens Skulpt objects. 
            // Let's check if it has valid ID and 'next' field (even if null)
            return (val.val !== undefined || val.data !== undefined) && (val.next !== undefined) && val.__id;
        };

        // 1. Scan ALL globals to find any variable pointing to a node (Universal Tracking)
        for (const [key, val] of Object.entries(globals)) {
            // Skip internal Python variables (starts with __) or the Class definition itself
            if (key.startsWith('__') || key === 'Node') continue;

            if (isNodeLike(val)) {
                const id = (val as any).__id;

                // Use the variable name as the label
                // Capitalize for display aesthetics (e.g. "my_ptr" -> "My_ptr")
                const displayLabel = key.charAt(0).toUpperCase() + key.slice(1);
                registerLabel(id, displayLabel);

                // If this is a root variable, ensure it's visited/queued
                // This catches "Orphaned" nodes that are referenced by a variable but disconnected from 'head'
                if (!visited.has(id)) {
                    queue.push(val);
                    visited.add(id);
                }
            }
        }

        // Add any other nodes found in globals to queue if not visited (e.g. disconnected nodes in memory)
        for (const val of Object.values(globals)) {
            if (isNodeLike(val)) {
                const id = (val as any).__id;
                if (!visited.has(id)) {
                    queue.push(val);
                    visited.add(id);
                }
            }
        }

        // 2. BFS Traversal
        while (queue.length > 0) {
            const node = queue.shift();
            const id = node.__id;

            // Extract Value & Next
            // Python attributes might be 'val/value' and 'next'
            const value = node.val ?? node.value ?? '?';
            const nextNode = node.next;

            let nextId = null;
            if (nextNode && typeof nextNode === 'object' && nextNode.__id) {
                nextId = nextNode.__id;

                // Add to queue if not visited
                if (!visited.has(nextId)) {
                    visited.add(nextId);
                    queue.push(nextNode);
                }
            }

            // Extract Prev (for Doubly Linked List)
            const prevNode = node.prev;
            let prevId = null;
            if (prevNode && typeof prevNode === 'object' && prevNode.__id) {
                prevId = prevNode.__id;
                // We don't necessarily traverse back via Prev to avoid re-checking, or maybe?
                // BFS via next is safer for flow, but if disjoint via prev...
                // Usually doubly lists are connected via next anyway.
            }

            // Determine Labels
            const labels = labelMap.get(id);
            // specific priority: Head > Curr > Prev
            // Combine? "Head / Curr"
            const labelStr = labels ? labels.join(' / ') : undefined;

            // Determine Highlight (Logic: if 'curr' points here, highlight)
            const isHighlighted = labels ? labels.includes('Curr') : false;

            nodes.push({
                id: id,
                value: value,
                nextId: nextId,
                prevId: prevId,
                label: labelStr,
                isHighlighted: isHighlighted,
                isNull: false
            });
        }

        // 3. Sort nodes? 
        // Visualizer receives a list. Usually BFS order is fine for linear layout.
        // If we want 'head' first, BFS from head guarantees it usually.

        return nodes;
    }
}
