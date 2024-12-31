import type { ColorSRGBLightness, SRGBLightnessValue, ValueContext } from '../../../types';
import { createColorValue } from '../value';

import { resolveSRGBLightnessValue } from './resolveSRGBLightnessValue';

export const createSRGBLightnessValue = (
    context: ValueContext,
    input: ColorSRGBLightness,
): SRGBLightnessValue => {
    const value = resolveSRGBLightnessValue(context, input);

    return {
        get: () => value,
        toColor: components => {
            const { h, s } = components;
            return createColorValue(context, { h, s, l: value });
        },
    };
};
