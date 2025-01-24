import type {
    DecisionValueContext,
    SRGBSaturationScale,
    SRGBSaturationValue,
} from '../../../types';
import { createItemSet } from '../../set';

export const createSRGBSaturationScale = (
    context: DecisionValueContext,
    input: SRGBSaturationValue[],
): SRGBSaturationScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        get: () => items,
    };
};
