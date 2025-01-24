import type {
    DecisionValueContext,
    SRGBSaturationScale,
    SRGBSaturationValue,
} from '../../../types';

export const createSRGBSaturationScale = (
    context: DecisionValueContext,
    input: SRGBSaturationValue[],
): SRGBSaturationScale => {
    context.consume(input);

    return {
        get: () => input,
    };
};
