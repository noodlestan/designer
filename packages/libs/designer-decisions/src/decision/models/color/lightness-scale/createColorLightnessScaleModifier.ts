import { createLightnessScale, createLightnessValue } from '../../../../primitives';
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
                const start = createLightnessValue(valueContext, params.start);

                const values = Array(params.steps);
                values[0] = start;
                // WIP

                return createLightnessScale(valueContext, values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
