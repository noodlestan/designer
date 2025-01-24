import type { ColorSet, ColorValue, DecisionValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';

export const createColorSet = (context: DecisionValueContext, input: ColorValue[]): ColorSet => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
