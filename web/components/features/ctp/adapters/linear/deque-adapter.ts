import { BaseAdapter } from '../base-adapter';
import { VisualItem } from '@/components/features/ctp/common/types';

export class DequeAdapter extends BaseAdapter {
    parse(globals: any): VisualItem[] {
        const container = this.findContainer(globals, ['data', 'deque', 'dq', 'queue', 'arr']);
        const data = container?.value ?? this.findArray(globals, ['data', 'deque', 'dq', 'queue', 'arr']);
        if (!data) return [];

        const capacity = data.length;
        const front = this.findNumber(container?.owner ?? globals, ['front', 'f']) ?? this.findNumber(globals, ['front', 'f']) ?? 0;
        const size = this.findNumber(container?.owner ?? globals, ['size', 'count', 'n']) ?? this.findNumber(globals, ['size', 'count', 'n']) ?? this.inferCount(data);
        const rear = this.findNumber(container?.owner ?? globals, ['rear', 'r']) ?? this.findNumber(globals, ['rear', 'r']) ?? ((front + size) % capacity);

        return data.map((val, idx) => {
            let label = `${idx}`;
            let status: VisualItem['status'] = undefined;

            const isFront = size > 0 && idx === front;
            const canShowRear = size < capacity;
            const isRear = canShowRear && idx === rear;

            if (isFront && isRear) {
                label = 'Front/Rear';
                status = 'comparing';
            } else if (isFront) {
                label = 'Front';
                status = 'active';
            } else if (isRear) {
                label = 'Rear';
                status = 'success';
            }

            const isHighlighted = this.isInRange(idx, front, rear, size, capacity);

            return {
                id: `deque-${idx}`,
                value: (val === null || val === undefined) ? null : this.cleanValue(val),
                label,
                isHighlighted,
                isGhost: val === null || val === undefined,
                status
            };
        });
    }

    private findArray(globals: any, keys: string[]) {
        for (const key of keys) {
            const val = globals[key];
            if (Array.isArray(val)) return val;
        }
        return null;
    }

    private findContainer(globals: any, keys: string[]) {
        for (const [key, val] of Object.entries(globals)) {
            if (key.startsWith('__') || key === 'Deque') continue;
            if (!val || typeof val !== 'object') continue;
            for (const candidate of keys) {
                const maybe = (val as any)[candidate];
                if (Array.isArray(maybe)) {
                    return { owner: val as any, value: maybe };
                }
            }
        }
        return null;
    }

    private findNumber(globals: any, keys: string[]) {
        for (const key of keys) {
            const val = globals[key];
            if (typeof val === 'number') return val;
        }
        return null;
    }

    private inferCount(data: any[]) {
        return data.filter((v) => v !== null && v !== undefined).length;
    }

    private isInRange(idx: number, front: number, rear: number, count: number, capacity: number) {
        if (count <= 0) return false;
        if (count >= capacity) return true;
        if (front < rear) return idx >= front && idx < rear;
        if (front > rear) return idx >= front || idx < rear;
        return false;
    }
}
