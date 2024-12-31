import { createColorSet, createColorValue, generateBoundedColorList } from '../../../primitives';
import type { ColorSet, ColorSetBoundedInput, DecisionModelFactory } from '../../../types';
import { createDecisionValue } from '../../../values';

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
            const value = createColorSet(valueContext, [fromValue, ...values, toValue]);

            return createDecisionValue(valueContext, value);
        },
    };
};
