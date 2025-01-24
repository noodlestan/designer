import type { DecisionValueContext, SpaceInputValue, SpaceValue } from '../../../types';

import { resolveSpaceValue } from './resolveSpaceValue';

export const createSpaceValue = (
    context: DecisionValueContext,
    input: SpaceInputValue,
): SpaceValue => {
    context.consume(input);

    const value = resolveSpaceValue(context, input);

    return {
        get: () => String(value.value) + value.units,
        getValueWithUnits: () => value,
    };
};
