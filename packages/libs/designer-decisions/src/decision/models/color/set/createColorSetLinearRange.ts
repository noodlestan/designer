import {
    createColorSet,
    createColorValue,
    createInterpolatedColorSet,
} from '../../../../primitives';
import type { ColorSet, ColorSetLinearRangeInput, DecisionModelFactory } from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSetLinearRange: DecisionModelFactory<
    ColorSet,
    ColorSetLinearRangeInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const fromValue = createColorValue(valueContext, params.from);
                const toValue = createColorValue(valueContext, params.to);

                const values = createInterpolatedColorSet(fromValue, toValue, params.steps);

                return createColorSet(valueContext, values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
