import {
    createInterpolatedNumberSeries,
    createLightnessScale,
    createLightnessValue,
} from '../../../../primitives';
import {
    type ColorLightnessScaleLinearRangeInput,
    type DecisionModelFactory,
    type LightnessScale,
} from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorLightnessScaleLinearRange: DecisionModelFactory<
    LightnessScale,
    ColorLightnessScaleLinearRangeInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const fromValue = createLightnessValue(valueContext, params.from);
                const toValue = createLightnessValue(valueContext, params.to);

                const from = fromValue.get();
                const to = toValue.get();
                const values = createInterpolatedNumberSeries(from, to, params.steps);
                return createLightnessScale(valueContext, values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
