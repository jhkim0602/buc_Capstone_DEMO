import { DataAdapter } from './base-adapter';
import { ArrayAdapter } from './linear/array-adapter';
import { GridAdapter } from './linear/grid-adapter';
import { QueueAdapter } from './linear/queue-adapter';
import { DequeAdapter } from './linear/deque-adapter';
import { HashAdapter } from './linear/hash-adapter';
import { BaseLinkedListAdapter } from './linear/linked-list/base-ll-adapter';
import { DoublyLinkedListAdapter } from './linear/linked-list/doubly-ll-adapter';
import { GraphAdapter } from './non-linear/graph-adapter';
import { HeapAdapter } from './non-linear/heap-adapter';
import { MergeSortAdapter } from './sorting/merge-sort-adapter';
import { HeapSortAdapter } from './sorting/heap-sort-adapter';

export type AdapterType =
    | 'array'
    | 'grid'
    | 'queue'
    | 'deque'
    | 'hash-table'
    | 'graph'
    | 'heap'
    | 'linked-list'
    | 'doubly-linked-list'
    | 'circular-linked-list'
    | 'merge-sort'
    | 'heap-sort';

export class AdapterFactory {
    static getAdapter(type: AdapterType): DataAdapter {
        switch (type) {
            case 'array':
                return new ArrayAdapter();
            case 'grid':
                return new GridAdapter();
            case 'queue':
                return new QueueAdapter();
            case 'deque':
                return new DequeAdapter();
            case 'hash-table':
                return new HashAdapter();
            case 'graph':
                return new GraphAdapter();
            case 'heap':
                return new HeapAdapter();
            case 'linked-list':
            case 'circular-linked-list': // Base handles circular logic via Graph traversal naturally
                return new BaseLinkedListAdapter();
            case 'doubly-linked-list':
                return new DoublyLinkedListAdapter();
            case 'merge-sort':
                return new MergeSortAdapter();
            case 'heap-sort':
                return new HeapSortAdapter();
            default:
                console.warn(`No specific adapter found for ${type}, defaulting to Array`);
                return new ArrayAdapter();
        }
    }
}
