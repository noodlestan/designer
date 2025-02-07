import type { SpaceValue, SpaceValueInput, SpaceValueOptions, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { quantized } from '../../number';

import { resolveSpaceValue } from './resolveSpaceValue';

export const createSpaceValue = (
    context: ValueContext,
    input: SpaceValueInput,
    options: SpaceValueOptions = {},
): SpaceValue => {
    context.consume(input);

    const { quantize } = options;
    const value = resolveSpaceValue(context, input);

    const normalised = () => quantized(value.value, quantize);

    return {
        ...createBaseValue(context),
        get: () => String(normalised()) + value.units,
        getValueWithUnits: () => ({
            value: normalised(),
            units: value.units,
        }),
    };
};
