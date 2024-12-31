import { createSRGBLightnessValue } from '../../../primitives';
import {
    type ColorSRGBLightnessValueExplicitInput,
    type DecisionModelFactory,
    type SRGBLightnessValue,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSRGBLightnessValueExplicitModel: DecisionModelFactory<
    SRGBLightnessValue,
    ColorSRGBLightnessValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const value = createSRGBLightnessValue(valueContext, params.value);

            return createDecisionValue(valueContext, value);
        },
    };
};
