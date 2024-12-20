import { createLightnessScale, createLightnessValue } from '../../../../primitives';
import {
    type ColorLightnessScaleLinearRangeInput,
    type DecisionModelFactory,
    type LightnessScale,
} from '../../../../types';
import { createDecisionValue } from '../../../value';

export const createColorLightnessScaleLinearRange: DecisionModelFactory<
    LightnessScale,
    ColorLightnessScaleLinearRangeInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const from = createLightnessValue(valueContext, params.from);
                const to = createLightnessValue(valueContext, params.to);

                const values = Array(params.steps);
                values[0] = from;
                // WIP
                values[params.steps - 1] = to;

                return createLightnessScale(valueContext, values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
