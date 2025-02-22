import type { ValueContext } from '../../../../value';
import { createBaseValue, createItemSet } from '../../../primitives';
import type { SRGBHueSet, SRGBHueValue } from '../../../primitives/color/types';

export const createSRGBHueSet = (context: ValueContext, input: SRGBHueValue[]): SRGBHueSet => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
