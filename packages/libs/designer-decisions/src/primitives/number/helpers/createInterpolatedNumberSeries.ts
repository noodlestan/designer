export const createInterpolatedNumberSeries = (
    from: number,
    to: number,
    steps: number,
    precision: number = 2,
): number[] => {
    if (steps < 1) return [];
    if (steps === 1) return [from];

    const stepSize = (to - from) / (steps - 1);
    const numbers = Array.from({ length: steps }, (_, i) => from + i * stepSize);

    return numbers.map(num => parseFloat(num.toFixed(precision)));
};
