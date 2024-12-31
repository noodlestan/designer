import { createColorSet } from '../../../../primitives';
import type { ColorSet, ColorSetExplicitInput, DecisionModelFactory } from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSetExplicitModel: DecisionModelFactory<
    ColorSet,
    ColorSetExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                return createColorSet(valueContext, params.values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
