import type { ColorSRGBHue, DecisionValueContext, SRGBHueValue } from '../../../types';
import { createBaseValue } from '../../base';
import { createColorValue } from '../value';

import { resolveSRGBHueValue } from './resolveSRGBHueValue';

export const createSRGBHueValue = (
    context: DecisionValueContext,
    input: ColorSRGBHue,
): SRGBHueValue => {
    context.consume(input);

    const value = resolveSRGBHueValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => value,
        toColor: channels => {
            const { s, l } = channels;
            return createColorValue(context.outputContext(), { h: value, s, l });
        },
    };
};
