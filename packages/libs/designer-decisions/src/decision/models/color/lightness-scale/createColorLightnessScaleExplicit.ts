import { createLightnessScale } from '../../../../primitives';
import type {
    ColorLightnessScaleExplicitInput,
    DecisionModelFactory,
    LightnessScale,
} from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorLightnessScaleExplicit: DecisionModelFactory<
    LightnessScale,
    ColorLightnessScaleExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                return createLightnessScale(valueContext, params.values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
