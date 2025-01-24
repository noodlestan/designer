import type { DecisionValueContext, SRGBHueSet, SRGBHueValue } from '../../../types';
import { createItemSet } from '../../set';

export const createSRGBHueSet = (
    context: DecisionValueContext,
    input: SRGBHueValue[],
): SRGBHueSet => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        get: () => items,
    };
};
