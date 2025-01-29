export const generateBoundedSeries = (
    from: number = 0,
    to: number = 0,
    steps: number = 0,
    precision: number = 2,
): number[] => {
    if (steps < 1) return [from];

    const stepSize = (to - from) / (steps + 1);
    const numbers = Array.from({ length: steps + 2 }, (_, i) => from + i * stepSize);

    return numbers.map(num => parseFloat(num.toFixed(precision)));
};
