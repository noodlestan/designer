import type { SRGBSaturationScale, SRGBSaturationValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';

export const createSRGBSaturationScale = (
    context: ValueContext,
    input: SRGBSaturationValue[],
): SRGBSaturationScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
