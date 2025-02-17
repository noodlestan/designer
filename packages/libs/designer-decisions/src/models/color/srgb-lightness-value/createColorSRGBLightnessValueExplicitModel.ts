import type { ColorSRGBLightnessValueExplicitInput } from '../../../inputs';
import { type SRGBLightnessValue, createSRGBLightnessValue } from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBLightnessValueExplicitModel: DecisionModelFactory<
    SRGBLightnessValue,
    ColorSRGBLightnessValueExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            return createSRGBLightnessValue(context, params.value, { quantize });
        },
    };
};
