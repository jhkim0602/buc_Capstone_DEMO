import React from 'react';
import { LinkedListGraphVisualizer } from "@/components/features/ctp/playground/visualizers/linked-list/graph/linked-list-graph-visualizer";

export const VerticalLinkedStackVisualizer = (props: any) => (
    <LinkedListGraphVisualizer
        {...props}
        direction="vertical"
        emptyMessage="스택이 비어있습니다. push()를 해보세요!"
    />
);
