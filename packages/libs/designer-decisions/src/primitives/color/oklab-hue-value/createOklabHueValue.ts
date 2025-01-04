import type { ColorOklabHue, DecisionValueContext, OklabHueValue } from '../../../types';
import { createColorValue } from '../value';

import { resolveOklabHueValue } from './resolveOklabHueValue';

export const createOklabHueValue = (
    context: DecisionValueContext,
    input: ColorOklabHue,
): OklabHueValue => {
    const value = resolveOklabHueValue(context, input);

    return {
        get: () => value,
        toColor: components => {
            const { l, c } = components;
            return createColorValue(context, { l, c, h: value });
        },
    };
};
