import type { NumberModifierInput } from '../../../types';

import { generateSeriesValue } from './generateSeriesValue';

export const createNumberSteppedSeries = (
    start: number,
    steps: number,
    modifier?: NumberModifierInput,
    clamp?: [number, number],
    precision: number = 2,
): number[] => {
    if (!modifier) {
        return Array(steps)
            .fill(start)
            .map(num => parseFloat(num.toFixed(precision)));
    }

    const series = [start];
    for (let i = 1; i < steps; i++) {
        let next = generateSeriesValue(series, modifier);
        if (clamp) next = Math.max(clamp[0], Math.min(clamp[1], next));
        series.push(parseFloat(next.toFixed(precision)));
    }
    return series;
};
