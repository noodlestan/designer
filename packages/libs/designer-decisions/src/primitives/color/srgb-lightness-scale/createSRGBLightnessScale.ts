import type { ColorSRGBLightness, SRGBLightnessScale, ValueContext } from '../../../types';
import { createSRGBLightnessValue } from '../srgb-lightness-value';

export const createSRGBLightnessScale = (
    context: ValueContext,
    input: ColorSRGBLightness[],
): SRGBLightnessScale => {
    return {
        get: () => input.map(item => createSRGBLightnessValue(context, item)),
    };
};
