import type { SpaceInputValue, SpaceValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';

import { resolveSpaceValue } from './resolveSpaceValue';

export const createSpaceValue = (context: ValueContext, input: SpaceInputValue): SpaceValue => {
    context.consume(input);

    const value = resolveSpaceValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => String(value.value) + value.units,
        getValueWithUnits: () => value,
    };
};
