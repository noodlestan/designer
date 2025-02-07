import { quantized } from './quantized';

export const generateBoundedSeries = (
    from: number = 0,
    to: number = 0,
    steps: number = 0,
    quantize: number = 0,
): number[] => {
    if (steps < 1) return [from];

    const stepSize = (to - from) / (steps + 1);
    const numbers = Array.from({ length: steps + 2 }, (_, i) => from + i * stepSize);

    return numbers.map(num => quantized(num, quantize));
};
