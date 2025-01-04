import type {
    ColorOklabLightness,
    DecisionValueContext,
    OklabLightnessValue,
} from '../../../types';
import { createColorValue } from '../value';

import { resolveOklabLightnessValue } from './resolveOklabLightnessValue';

export const createOklabLightnessValue = (
    context: DecisionValueContext,
    input: ColorOklabLightness,
): OklabLightnessValue => {
    const value = resolveOklabLightnessValue(context, input);

    return {
        get: () => value,
        toColor: components => {
            const { c, h } = components;
            return createColorValue(context, { l: value, c, h });
        },
    };
};
