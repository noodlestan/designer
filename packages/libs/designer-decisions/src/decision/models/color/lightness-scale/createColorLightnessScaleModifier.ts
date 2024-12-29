import {
    createLightnessScale,
    createLightnessValue,
    createNumberSteppedSeries,
} from '../../../../primitives';
import type {
    ColorLightnessScaleModifierInput,
    DecisionModelFactory,
    LightnessScale,
} from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorLightnessScaleModifier: DecisionModelFactory<
    LightnessScale,
    ColorLightnessScaleModifierInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const startValue = createLightnessValue(valueContext, params.start);

                const start = startValue.get();
                const values = createNumberSteppedSeries(
                    start,
                    params.steps,
                    params.modifier,
                    [0, 1],
                );
                return createLightnessScale(valueContext, values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
