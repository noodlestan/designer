import type { ValueContext } from '../../../values';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';
import type { SRGBSaturationScale, SRGBSaturationValue } from '../../types';

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
