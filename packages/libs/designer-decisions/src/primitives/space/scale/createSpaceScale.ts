import type { SpaceScale, SpaceValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';

export const createSpaceScale = (context: ValueContext, input: SpaceValue[]): SpaceScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
