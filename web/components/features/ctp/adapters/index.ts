import { DataAdapter } from './base-adapter';
import { ArrayAdapter } from './linear/array-adapter';
import { GridAdapter } from './linear/grid-adapter';
import { BaseLinkedListAdapter } from './linear/linked-list/base-ll-adapter';
import { DoublyLinkedListAdapter } from './linear/linked-list/doubly-ll-adapter';

export type AdapterType = 'array' | 'grid' | 'linked-list' | 'doubly-linked-list' | 'circular-linked-list';

export class AdapterFactory {
    static getAdapter(type: AdapterType): DataAdapter {
        switch (type) {
            case 'array':
                return new ArrayAdapter();
            case 'grid':
                return new GridAdapter();
            case 'linked-list':
            case 'circular-linked-list': // Base handles circular logic via Graph traversal naturally
                return new BaseLinkedListAdapter();
            case 'doubly-linked-list':
                return new DoublyLinkedListAdapter();
            default:
                console.warn(`No specific adapter found for ${type}, defaulting to Array`);
                return new ArrayAdapter();
        }
    }
}
