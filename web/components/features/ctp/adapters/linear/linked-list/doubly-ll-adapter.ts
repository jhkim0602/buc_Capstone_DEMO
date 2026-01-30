import { BaseLinkedListAdapter } from './base-ll-adapter';

export class DoublyLinkedListAdapter extends BaseLinkedListAdapter {
    // Override to support Prev pointer extraction
    protected getPrevId(node: any): string | null {
        const prevNode = node.prev;
        if (this.isNodeLike(prevNode)) {
            return prevNode.__id;
        }
        return null;
    }
}
