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
        produce: (context, params) => {
            return createSRGBLightnessValue(context, params.value);
        },
    };
};
