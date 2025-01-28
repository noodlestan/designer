import type { NumberClamp, NumberModifier } from '../../../types';

import { generateNumberSeriesStep } from './functions/generateNumberSeriesStep';

export const generateNumberSeries = (
    start: number = 0,
    items: number = 0,
    modifier?: NumberModifier,
    clamp?: NumberClamp,
    precision: number = 2,
): number[] => {
    const roundedStart = parseFloat(start.toFixed(precision));

    const count = Math.floor(items);

    if (!modifier) {
        return Array(count).fill(roundedStart);
    }

    const series = [start];
    for (let i = 1; i < count; i++) {
        let next = generateNumberSeriesStep(series, modifier);
        if (clamp) {
            next = Math.max(clamp[0], Math.min(clamp[1], next));
        }
        series.push(next);
    }
    return series.map(number => parseFloat(number.toFixed(precision)));
};
