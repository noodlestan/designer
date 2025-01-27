import type { SRGBLightnessScale, SRGBLightnessValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';

export const createSRGBLightnessScale = (
    context: ValueContext,
    input: SRGBLightnessValue[],
): SRGBLightnessScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
