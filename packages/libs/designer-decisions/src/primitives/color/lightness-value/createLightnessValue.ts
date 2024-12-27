import type { ColorLightnessInput, LightnessValue, ValueContext } from '../../../types';
import { createColorValue } from '../value';

import { resolveLightnessValue } from './resolveLightnessValue';

export const createLightnessValue = (
    context: ValueContext,
    input: ColorLightnessInput,
): LightnessValue => {
    const value = resolveLightnessValue(context, input);

    return {
        get: () => value,
        getColor: components => {
            const { h, s } = components;
            return createColorValue(context, { h, s, l: value });
        },
    };
};
