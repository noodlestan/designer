import { createColorSet } from '../../../../primitives';
import type { ColorSet, ColorSetExplicitInput, DecisionModelFactory } from '../../../../types';
import { createDecisionValue } from '../../../value';

export const createColorSetExplicit: DecisionModelFactory<ColorSet, ColorSetExplicitInput> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                return createColorSet(valueContext, params.values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
