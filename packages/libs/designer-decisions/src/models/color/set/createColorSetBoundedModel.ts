import { createColorSet, createColorValue, generateBoundedColorList } from '../../../primitives';
import type { ColorSet, ColorSetBoundedInput, DecisionModelFactory } from '../../../types';

export const createColorSetBoundedModel: DecisionModelFactory<
    ColorSet,
    ColorSetBoundedInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const fromValue = createColorValue(valueContext, params.from);
            const toValue = createColorValue(valueContext, params.to);

            const list = generateBoundedColorList(fromValue, toValue, params.steps);
            const values = list.map(item => createColorValue(valueContext, item));
            return createColorSet(valueContext, [fromValue, ...values, toValue]);
        },
    };
};
