import type { AbstractNumericValue } from '../../types';

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
        throw new Error(`Invalid paramter base. Must be integer, received "${base}"`);
    }

    const normalized = normalize !== undefined ? normalize : (v: number) => v;

    return {
        get: () => normalized(quantized(value, quantize, base)),
        raw: () => value,
        quantized: (q?: number) => normalized(quantized(value, q ?? quantize, base)),
    };
};
