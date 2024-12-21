import { createColorSet, createColorValue } from '../../../../primitives';
import type { ColorSet, ColorSetModifierInput, DecisionModelFactory } from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSetModifier: DecisionModelFactory<ColorSet, ColorSetModifierInput> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const start = createColorValue(valueContext, params.start);

                const values = Array(params.steps);
                values[0] = start;
                // WIP

                return createColorSet(valueContext, values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
