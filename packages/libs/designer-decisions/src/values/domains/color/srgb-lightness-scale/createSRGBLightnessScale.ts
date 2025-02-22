import type { ValueContext } from '../../../../value';
import { createBaseValue, createItemSet } from '../../../primitives';
import type { SRGBLightnessScale, SRGBLightnessValue } from '../../../primitives/color/types';

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
