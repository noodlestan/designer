import type {
    SpaceValue,
    SpaceValueFormattingOptions,
    SpaceValueInput,
    SpaceValueOptions,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';

import { resolveSpaceValue } from './resolveSpaceValue';

export const createSpaceValue = (
    context: ValueContext,
    input: SpaceValueInput,
    options: SpaceValueOptions = {},
): SpaceValue => {
    context.consume(input);

    const { quantize } = options;
    const { value, units } = resolveSpaceValue(context, input);

    const { get, raw, quantized } = createNumericValue(value, { quantize });

    return {
        ...createBaseValue(context),
        get,
        raw,
        quantized,
        getString: ({ quantize: q }: SpaceValueFormattingOptions = {}) =>
            String(quantized(q ?? quantize)) + units,
        getObject: ({ quantize: q }: SpaceValueFormattingOptions = {}) => ({
            value: quantized(q ?? quantize),
            units,
        }),
    };
};
