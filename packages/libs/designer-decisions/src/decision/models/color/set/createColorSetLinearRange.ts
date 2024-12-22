import { createColorSet, createColorValue } from '../../../../primitives';
import type { ColorSet, ColorSetLinearRangeInput, DecisionModelFactory } from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSetLinearRange: DecisionModelFactory<
    ColorSet,
    ColorSetLinearRangeInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const from = createColorValue(valueContext, params.from);
                const to = createColorValue(valueContext, params.to);

                const values = Array(params.steps);
                values[0] = from.getString('rgb');
                // WIP
                values[params.steps - 1] = to.get();

                return createColorSet(valueContext, values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
