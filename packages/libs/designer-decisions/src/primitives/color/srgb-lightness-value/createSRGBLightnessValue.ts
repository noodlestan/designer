import type { ColorSRGBLightness, DecisionValueContext, SRGBLightnessValue } from '../../../types';
import { createColorValue } from '../value';

import { resolveSRGBLightnessValue } from './resolveSRGBLightnessValue';

export const createSRGBLightnessValue = (
    context: DecisionValueContext,
    input: ColorSRGBLightness,
): SRGBLightnessValue => {
    context.consume(input);

    const value = resolveSRGBLightnessValue(context, input);

    return {
        get: () => value,
        toColor: components => {
            const { h, s } = components;
            return createColorValue(context.outputContext(), { h, s, l: value });
        },
    };
};
