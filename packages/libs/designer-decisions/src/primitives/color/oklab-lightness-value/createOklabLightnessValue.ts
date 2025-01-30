import type { ColorOklabLightnessInput, OklabLightnessValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createColorValue } from '../value';

import { resolveOklabLightnessValue } from './resolveOklabLightnessValue';

export const createOklabLightnessValue = (
    context: ValueContext,
    input: ColorOklabLightnessInput,
): OklabLightnessValue => {
    context.consume(input);

    const value = resolveOklabLightnessValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => value,
        toColor: channels => {
            const { c, h } = channels;
            return createColorValue(context.outputContext(), { l: value, c, h });
        },
    };
};
