import type { DecisionValueContext, OklabHueSet, OklabHueValue } from '../../../types';
import { createItemSet } from '../../set';

export const createOklabHueSet = (
    context: DecisionValueContext,
    input: OklabHueValue[],
): OklabHueSet => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        get: () => items,
    };
};
