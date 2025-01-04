import type { DecisionValueContext, SRGBHueSet, SRGBHueValue } from '../../../types';

export const createSRGBHueSet = (
    context: DecisionValueContext,
    values: SRGBHueValue[],
): SRGBHueSet => {
    return {
        get: () => values,
    };
};
