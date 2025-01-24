import type { DecisionValueContext, SRGBLightnessScale, SRGBLightnessValue } from '../../../types';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';

export const createSRGBLightnessScale = (
    context: DecisionValueContext,
    input: SRGBLightnessValue[],
): SRGBLightnessScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
