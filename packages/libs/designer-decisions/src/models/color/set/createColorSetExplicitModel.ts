import { createColorSet, createColorValue } from '../../../primitives';
import type { ColorSet, ColorSetExplicitInput, DecisionModelFactory } from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSetExplicitModel: DecisionModelFactory<
    ColorSet,
    ColorSetExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value => createColorValue(valueContext, value));
            const value = createColorSet(valueContext, values);

            return createDecisionValue(valueContext, value);
        },
    };
};
