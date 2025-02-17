import type { ValueContext } from '../../../values';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';
import type { SRGBLightnessScale, SRGBLightnessValue } from '../../types';

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
