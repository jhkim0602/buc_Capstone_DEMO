import { VisualItem } from '@/components/features/ctp/common/types';

/**
 * Data Adapter Interface
 * 
 * Responsible for converting Raw Python Globals (from Skulpt Worker)
 * into Standard CTP Visualization Items.
 * 
 * Strategies:
 * - Linear (Array, List) -> LinearItem[]
 * - Grid (2D Array) -> GridItem[][]
 * - Graph (Linked List, Tree) -> LinkedListNode[] or GraphNode[]
 */
export interface DataAdapter {
    /**
     * Parses the global variable map from Python engine.
     * @param globals Key-Value map of global variables
     * @returns A generic list of VisualItems (or specialized subtype)
     */
    parse(globals: any): any;
}

/**
 * Base Adapter Class
 * Shared utility methods for all adapters (e.g. value cleaning)
 */
export abstract class BaseAdapter implements DataAdapter {
    abstract parse(globals: any): any;

    protected cleanValue(val: any): string | number {
        if (val === undefined || val === null) return '?';
        return val;
    }
}
