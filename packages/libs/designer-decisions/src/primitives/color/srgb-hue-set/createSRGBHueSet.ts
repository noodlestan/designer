import type { DecisionValueContext, SRGBHueSet, SRGBHueValue } from '../../../types';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';

export const createSRGBHueSet = (
    context: DecisionValueContext,
    input: SRGBHueValue[],
): SRGBHueSet => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
