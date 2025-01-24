import type { ColorSRGBHue, DecisionValueContext, SRGBHueValue } from '../../../types';
import { createColorValue } from '../value';

import { resolveSRGBHueValue } from './resolveSRGBHueValue';

export const createSRGBHueValue = (
    context: DecisionValueContext,
    input: ColorSRGBHue,
): SRGBHueValue => {
    context.consume(input);

    const value = resolveSRGBHueValue(context, input);

    return {
        get: () => value,
        toColor: components => {
            const { s, l } = components;
            return createColorValue(context.outputContext(), { h: value, s, l });
        },
    };
};
