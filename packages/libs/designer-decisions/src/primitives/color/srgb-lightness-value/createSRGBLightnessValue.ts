import type { ColorSRGBLightness, DecisionValueContext, SRGBLightnessValue } from '../../../types';
import { createBaseValue } from '../../base';
import { createColorValue } from '../value';

import { resolveSRGBLightnessValue } from './resolveSRGBLightnessValue';

export const createSRGBLightnessValue = (
    context: DecisionValueContext,
    input: ColorSRGBLightness,
): SRGBLightnessValue => {
    context.consume(input);

    const value = resolveSRGBLightnessValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => value,
        toColor: channels => {
            const { h, s } = channels;
            return createColorValue(context.outputContext(), { h, s, l: value });
        },
    };
};
