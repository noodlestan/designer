import type { NumberModifier } from '../../../../../inputs';

export const generateNumberSeriesStep = (
    series: number[],
    modifier: Partial<NumberModifier>,
): number => {
    const index = series.length;
    const prev = series[index - 1];

    if (!index) {
        throw new Error(`Series is empty`);
    }

    const { mode = 'linear' } = modifier;

    if (mode === 'proportional') {
        const { by = 0 } = modifier;
        return series[0] + by * index * series[0];
    } else if (mode === 'geometric') {
        const { by = 1 } = modifier;
        return prev * by;
    }

    const { by = 0 } = modifier;
    return prev + by;
};
