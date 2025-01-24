import type { DecisionValueContext, SRGBLightnessScale, SRGBLightnessValue } from '../../../types';

export const createSRGBLightnessScale = (
    context: DecisionValueContext,
    input: SRGBLightnessValue[],
): SRGBLightnessScale => {
    context.consume(input);

    return {
        get: () => input,
    };
};
