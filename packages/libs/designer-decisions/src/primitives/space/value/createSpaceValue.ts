import type { SpaceValue, SpaceValueInput, SpaceValueOptions, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { nearest } from '../../number';

import { resolveSpaceValue } from './resolveSpaceValue';

export const createSpaceValue = (
    context: ValueContext,
    input: SpaceValueInput,
    options: SpaceValueOptions = {},
): SpaceValue => {
    context.consume(input);

    const { precision } = options;
    const value = resolveSpaceValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => String(nearest(value.value, precision)) + value.units,
        getValueWithUnits: () => ({
            value: nearest(value.value, precision),
            units: value.units,
        }),
    };
};
