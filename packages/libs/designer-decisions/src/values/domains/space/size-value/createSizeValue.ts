import type { SizeValueInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { type SizeValueOptions, createBaseValue } from '../../../base';
import { createNumericValue, createSize } from '../../../primitives';
import { SIZE_VALUE_QUANTIZE } from '../constants';
import type { SizeValue } from '../types';

import { resolveSizeValue } from './resolveSizeValue';

export const createSizeValue = (
    context: ValueContext,
    input: SizeValueInput,
    options: SizeValueOptions = {},
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
        toString: ({ quantize: q }: SizeValueOptions = {}) => {
            return String(quantized(q ?? quantize)) + units;
        },
        toObject: ({ quantize: q }: SizeValueOptions = {}) => {
            return {
                value: quantized(q ?? quantize),
                units,
            };
        },
    };
};
