import type { DecisionValueContext, SRGBLightnessScale, SRGBLightnessValue } from '../../../types';

export const createSRGBLightnessScale = (
    context: DecisionValueContext,
    values: SRGBLightnessValue[],
): SRGBLightnessScale => {
    return {
        get: () => values,
    };
};
