import type { ColorSet, ColorValue, DecisionValueContext } from '../../../types';
import { createItemSet } from '../../set';

export const createColorSet = (context: DecisionValueContext, input: ColorValue[]): ColorSet => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        get: () => items,
    };
};
