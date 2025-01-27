import type { SRGBHueSet, SRGBHueValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';

export const createSRGBHueSet = (context: ValueContext, input: SRGBHueValue[]): SRGBHueSet => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
