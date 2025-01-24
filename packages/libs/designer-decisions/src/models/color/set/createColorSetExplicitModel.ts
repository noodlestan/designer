import { createColorSet, createColorValue } from '../../../primitives';
import type { ColorSet, ColorSetExplicitInput, DecisionModelFactory } from '../../../types';

export const createColorSetExplicitModel: DecisionModelFactory<
    ColorSet,
    ColorSetExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value => createColorValue(valueContext, value));
            return createColorSet(valueContext, values);
        },
    };
};
