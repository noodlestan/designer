import type { SpaceInputValue, SpaceValue, ValueContext } from '../../../types';

import { resolveSpaceValue } from './resolveSpaceValue';

export const createSpaceValue = (context: ValueContext, input: SpaceInputValue): SpaceValue => {
    const value = resolveSpaceValue(context, input);

    return {
        get: () => String(value.value) + value.units,
        getValueWithUnits: () => value,
    };
};
