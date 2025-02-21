import type { ValueContext } from '../../../../value';
import { createBaseValue, createItemSet } from '../../../primitives';
import type { ColorSet, ColorValue } from '../../../primitives/color/types';

export const createColorSet = (context: ValueContext, input: ColorValue[]): ColorSet => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
