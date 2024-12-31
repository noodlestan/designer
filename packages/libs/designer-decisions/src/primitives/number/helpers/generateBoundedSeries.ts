export const generateBoundedSeries = (
    from: number,
    to: number,
    steps: number,
    precision: number = 2,
): number[] => {
    if (steps < 1) return [from];

    const stepSize = (to - from) / steps;
    const numbers = Array.from({ length: steps + 1 }, (_, i) => from + i * stepSize);

    return numbers.map(num => parseFloat(num.toFixed(precision)));
};
