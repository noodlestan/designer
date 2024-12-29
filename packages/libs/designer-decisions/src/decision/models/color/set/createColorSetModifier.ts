import { createColorSet, createColorSteppedSeries, createColorValue } from '../../../../primitives';
import type { ColorSet, ColorSetModifierInput, DecisionModelFactory } from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSetModifier: DecisionModelFactory<ColorSet, ColorSetModifierInput> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const start = createColorValue(valueContext, params.start);

                const values = createColorSteppedSeries(start, params.steps, params.modifier);
                return createColorSet(valueContext, values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
