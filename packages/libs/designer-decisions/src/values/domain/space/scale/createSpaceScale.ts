import type { ValueContext } from '../../../../value';
import { createBaseValue, createItemSet } from '../../../primitives';
import type { SpaceScale, SpaceValue } from '../types';

export const createSpaceScale = (context: ValueContext, input: SpaceValue[]): SpaceScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
