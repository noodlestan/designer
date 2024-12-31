import { createBoundedColorList, createColorSet, createColorValue } from '../../../../primitives';
import type { ColorSet, ColorSetBoundedInput, DecisionModelFactory } from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSetBoundedModel: DecisionModelFactory<
    ColorSet,
    ColorSetBoundedInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const fromValue = createColorValue(valueContext, params.from);
                const toValue = createColorValue(valueContext, params.to);

                const values = createBoundedColorList(fromValue, toValue, params.steps);

                return createColorSet(valueContext, values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
