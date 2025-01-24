import type { ColorOklabHue, DecisionValueContext, OklabHueValue } from '../../../types';
import { createBaseValue } from '../../base';
import { createColorValue } from '../value';

import { resolveOklabHueValue } from './resolveOklabHueValue';

export const createOklabHueValue = (
    context: DecisionValueContext,
    input: ColorOklabHue,
): OklabHueValue => {
    context.consume(input);

    const value = resolveOklabHueValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => value,
        toColor: components => {
            const { l, c } = components;
            return createColorValue(context.outputContext(), { l, c, h: value });
        },
    };
};
