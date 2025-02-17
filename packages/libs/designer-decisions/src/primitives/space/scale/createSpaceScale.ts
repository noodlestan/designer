import type { ValueContext } from '../../../values';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';
import type { SpaceScale, SpaceValue } from '../../types';

export const createSpaceScale = (context: ValueContext, input: SpaceValue[]): SpaceScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
