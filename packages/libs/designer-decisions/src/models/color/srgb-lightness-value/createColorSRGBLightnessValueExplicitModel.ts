import { createSRGBLightnessValue } from '../../../primitives';
import {
    type ColorSRGBLightnessValueExplicitInput,
    type DecisionModelFactory,
    type SRGBLightnessValue,
} from '../../../types';

export const createColorSRGBLightnessValueExplicitModel: DecisionModelFactory<
    SRGBLightnessValue,
    ColorSRGBLightnessValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            return createSRGBLightnessValue(valueContext, params.value);
        },
    };
};
