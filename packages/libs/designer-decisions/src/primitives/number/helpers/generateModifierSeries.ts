import type { NumberModifier } from '../../../types';

import { generateModifierSeriesValue } from './functions/generateModifierSeriesValue';

export const generateModifierSeries = (
    anchor: number,
    steps: number,
    modifier?: NumberModifier,
    clamp?: [number, number],
    precision: number = 2,
): number[] => {
    if (!modifier) {
        return Array(steps)
            .fill(anchor)
            .map(num => parseFloat(num.toFixed(precision)));
    }

    const series = [anchor];
    for (let i = 1; i < steps; i++) {
        let next = generateModifierSeriesValue(series, modifier);
        if (clamp) {
            next = Math.max(clamp[0], Math.min(clamp[1], next));
        }
        series.push(parseFloat(next.toFixed(precision)));
    }
    return series;
};
