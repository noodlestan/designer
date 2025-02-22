import type { SpaceValueInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import { createNumericValue } from '../../../primitives';
import { SPACE_VALUE_QUANTIZE } from '../constants';
import type { SpaceValue, SpaceValueFormatOptions, SpaceValueOptions } from '../types';

import { resolveSpaceValue } from './resolveSpaceValue';

export const createSpaceValue = (
    context: ValueContext,
    input: SpaceValueInput,
    options: SpaceValueOptions = {},
): SpaceValue => {
    const baseValue = createBaseValue(context, input);

    const { quantize = SPACE_VALUE_QUANTIZE } = options;
    const { value, units } = resolveSpaceValue(context, input);

    const { get, raw, quantized } = createNumericValue(value, { quantize });

    return {
        ...baseValue,
        get,
        raw,
        quantized,
        toString: ({ quantize: q }: SpaceValueFormatOptions = {}) => {
            return String(quantized(q ?? quantize)) + units;
        },
        toObject: ({ quantize: q }: SpaceValueFormatOptions = {}) => {
            return {
                value: quantized(q ?? quantize),
                units,
            };
        },
    };
};
