import type {
    DecisionValueContext,
    SRGBSaturationScale,
    SRGBSaturationValue,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';

export const createSRGBSaturationScale = (
    context: DecisionValueContext,
    input: SRGBSaturationValue[],
): SRGBSaturationScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
