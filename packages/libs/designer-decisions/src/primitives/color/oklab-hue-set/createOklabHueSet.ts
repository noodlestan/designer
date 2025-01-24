import type { DecisionValueContext, OklabHueSet, OklabHueValue } from '../../../types';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';

export const createOklabHueSet = (
    context: DecisionValueContext,
    input: OklabHueValue[],
): OklabHueSet => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
