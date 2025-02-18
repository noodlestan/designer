import type { AbstractNumericValue } from '../types';

import { quantized } from './helpers';

type NumericValueOptions = {
    base?: number;
    quantize?: number;
    normalize?: (v: number) => number;
};

const noop: (v: number) => number = v => v;

export const createNumericValue = (
    value: number,
    options: NumericValueOptions = {},
): AbstractNumericValue => {
    const { base, quantize, normalize = noop } = options;

    if (base !== undefined && !Number.isInteger(base)) {
        throw new Error(`Invalid parameter base. Must be an integer, received "${base}"`);
    }

    return {
        get: () => normalize(quantized(value, quantize, base)),
        raw: () => value,
        quantized: (q?: number) => {
            return normalize(quantized(value, q ?? quantize, base));
        },
    };
};
