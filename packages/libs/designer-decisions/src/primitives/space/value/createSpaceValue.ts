import type { SpaceInput, SpaceValue, ValueContext } from '../../../types';

import { resolveSpaceValue } from './resolveSpaceValue';

export const createSpaceValue = (context: ValueContext, input: SpaceInput): SpaceValue => {
    const value = resolveSpaceValue(context, input);

    return {
        get: () => String(value.value) + value.units,
        getValueWithUnits: () => value,
    };
};
