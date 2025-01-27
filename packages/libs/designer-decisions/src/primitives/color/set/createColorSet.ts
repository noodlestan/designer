import type { ColorSet, ColorValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';

export const createColorSet = (context: ValueContext, input: ColorValue[]): ColorSet => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
