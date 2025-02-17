import type { ValueContext } from '../../../values';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';
import type { ColorSet, ColorValue } from '../../types';

export const createColorSet = (context: ValueContext, input: ColorValue[]): ColorSet => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
