import type { DecisionValueContext, SRGBLightnessScale, SRGBLightnessValue } from '../../../types';
import { createItemSet } from '../../set';

export const createSRGBLightnessScale = (
    context: DecisionValueContext,
    input: SRGBLightnessValue[],
): SRGBLightnessScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        get: () => items,
    };
};
