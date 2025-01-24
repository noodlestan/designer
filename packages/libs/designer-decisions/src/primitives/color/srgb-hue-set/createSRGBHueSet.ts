import type { DecisionValueContext, SRGBHueSet, SRGBHueValue } from '../../../types';

export const createSRGBHueSet = (
    context: DecisionValueContext,
    input: SRGBHueValue[],
): SRGBHueSet => {
    context.consume(input);

    return {
        get: () => input,
    };
};
