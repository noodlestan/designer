import type { DecisionValueContext, SpaceScale, SpaceValue } from '../../../types';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';

export const createSpaceScale = (
    context: DecisionValueContext,
    input: SpaceValue[],
): SpaceScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
