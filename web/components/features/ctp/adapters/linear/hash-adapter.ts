import { BaseAdapter } from '../base-adapter';
import { VisualItem } from '@/components/features/ctp/common/types';

export class HashAdapter extends BaseAdapter {
    parse(globals: any): VisualItem[][] {
        const container = this.findContainer(globals);
        const buckets = container?.value ?? this.findBuckets(globals);
        if (!buckets) return [];

        const scope = container?.owner ?? globals;
        const activeBucket = this.findNumber(scope, ['active_bucket', 'hash_index', 'last_index']);
        const rehashing = scope?.rehashing === true;
        const rehashBucket = this.findNumber(scope, ['rehash_bucket']);
        const rehashKey = scope?.rehash_key;
        const rehashValue = scope?.rehash_value;
        const probePath = Array.isArray(scope?.probe_path) ? scope.probe_path : [];
        const maxLen = Math.max(1, ...buckets.map((b) => Array.isArray(b) ? b.length : 0));

        return buckets.map((bucket, bIdx) => {
            const row: VisualItem[] = [];
            const entries = Array.isArray(bucket) ? bucket : [];

            for (let i = 0; i < maxLen; i++) {
                const entry = entries[i];
                let value: any = null;
                let label = i === 0 ? `Bucket ${bIdx}` : `${bIdx}:${i}`;
                let isGhost = true;
                let status: VisualItem['status'] = undefined;

                if (entry !== undefined && entry !== null) {
                    if (Array.isArray(entry) && entry.length >= 2) {
                        value = `${entry[0]}→${entry[1]}`;
                    } else if (typeof entry === 'object' && 'key' in entry && 'value' in entry) {
                        value = `${(entry as any).key}→${(entry as any).value}`;
                    } else {
                        value = entry;
                    }
                    isGhost = false;
                }

                if (rehashing && typeof rehashBucket === 'number') {
                    status = rehashBucket === bIdx ? 'comparing' : undefined;
                } else if (rehashing) {
                    status = 'comparing';
                } else if (typeof activeBucket === 'number' && activeBucket === bIdx) {
                    status = 'active';
                } else if (probePath.includes(bIdx)) {
                    status = 'pop';
                }

                if (rehashing && rehashBucket === bIdx && rehashKey !== undefined) {
                    const matchesKey = Array.isArray(entry) ? entry[0] === rehashKey : (entry as any)?.key === rehashKey;
                    const matchesValue = rehashValue === undefined || (Array.isArray(entry) ? entry[1] === rehashValue : (entry as any)?.value === rehashValue);
                    if (matchesKey && matchesValue) {
                        status = 'success';
                    }
                }

                row.push({
                    id: `bucket-${bIdx}-${i}`,
                    value: isGhost ? null : this.cleanValue(value),
                    label,
                    isGhost,
                    status
                });
            }

            return row;
        });
    }

    private findBuckets(globals: any) {
        const candidates = ['buckets', 'table', 'hash_table', 'hashTable'];
        for (const key of candidates) {
            const val = globals[key];
            if (Array.isArray(val)) return val as any[];
        }
        return null;
    }

    private findContainer(globals: any) {
        const candidates = ['buckets', 'table', 'hash_table', 'hashTable'];
        for (const [key, val] of Object.entries(globals)) {
            if (key.startsWith('__') || key === 'HashTable') continue;
            if (!val || typeof val !== 'object') continue;
            for (const candidate of candidates) {
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
}
