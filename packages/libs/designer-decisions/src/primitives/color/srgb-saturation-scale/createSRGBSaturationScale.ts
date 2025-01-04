import type {
    DecisionValueContext,
    SRGBSaturationScale,
    SRGBSaturationValue,
} from '../../../types';

export const createSRGBSaturationScale = (
    context: DecisionValueContext,
    values: SRGBSaturationValue[],
): SRGBSaturationScale => {
    return {
        get: () => values,
    };
};
