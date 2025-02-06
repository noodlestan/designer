import type { NumberClamp } from '../../../types';

export function clamped(num: number, clamp?: NumberClamp): number {
    if (clamp) {
        return Math.max(clamp[0], Math.min(clamp[1], num));
    }
    return num;
}
