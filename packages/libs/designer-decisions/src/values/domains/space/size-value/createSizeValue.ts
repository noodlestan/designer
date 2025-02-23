import type { SizeValueInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import { createNumericValue, createSize } from '../../../primitives';
import { SIZE_VALUE_QUANTIZE } from '../constants';
import type { SizeFormatOptions, SizeValue } from '../types';

import { resolveSizeValue } from './resolveSizeValue';

export const createSizeValue = (
    context: ValueContext,
    input: SizeValueInput,
    options: SizeFormatOptions = {},
): SizeValue => {
    const baseValue = createBaseValue(context, input);

    const { quantize = SIZE_VALUE_QUANTIZE } = options;
    const { value, units } = resolveSizeValue(context, input);

    const { get: getValue, raw, quantized } = createNumericValue(value, { quantize });

    return {
        ...baseValue,
        get: () => createSize({ value: getValue(), units }),
        raw,
        quantized,
        toString: ({ quantize: q }: SizeFormatOptions = {}) => {
            return String(quantized(q ?? quantize)) + units;
        },
        toObject: ({ quantize: q }: SizeFormatOptions = {}) => {
            return {
                value: quantized(q ?? quantize),
                units,
            };
        },
    };
};
