import type { ValueContext } from '../../../values';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';
import type { SRGBHueSet, SRGBHueValue } from '../../types';

export const createSRGBHueSet = (context: ValueContext, input: SRGBHueValue[]): SRGBHueSet => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
