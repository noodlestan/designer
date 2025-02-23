import { createBaseValue } from '..';
import type { SizeValueInput } from '../../../inputs';
import type { ValueContext } from '../../../value';
import { createNumericValue, createSize } from '../../primitives';

import { resolveSizeBaseValue } from './resolveSizeBaseValue';
import type { BaseSizeValue, SizeDefinition, SizeValueOptions } from './types';

export const createSizeBaseValue = (
    sizeDefinition: SizeDefinition,
    context: ValueContext,
    input: SizeValueInput,
    options: SizeValueOptions = {},
): BaseSizeValue => {
    const baseValue = createBaseValue(context, input);

    const { quant } = sizeDefinition;
    const { quantize = quant } = options;
    const { value, units } = resolveSizeBaseValue(sizeDefinition, context, input);

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
