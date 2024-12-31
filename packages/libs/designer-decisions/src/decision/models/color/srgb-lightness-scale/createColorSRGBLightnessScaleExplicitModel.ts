import { createSRGBLightnessScale } from '../../../../primitives';
import type {
    ColorSRGBLightnessScaleExplicitInput,
    DecisionModelFactory,
    SRGBLightnessScale,
} from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSRGBLightnessScaleExplicitModel: DecisionModelFactory<
    SRGBLightnessScale,
    ColorSRGBLightnessScaleExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                return createSRGBLightnessScale(valueContext, params.values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
