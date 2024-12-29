import type { NumberModifierInput } from '../../../types';

export const generateSeriesValue = (series: number[], modifier: NumberModifierInput): number => {
    const index = series.length;
    const prev = series[index - 1];

    if (modifier.mode === 'linear') {
        return prev + modifier.by;
    } else if (modifier.mode === 'proportional') {
        return series[0] + modifier.by * index * series[0];
    } else if (modifier.mode === 'geometric') {
        return prev * modifier.by;
    }

    return prev;
};
