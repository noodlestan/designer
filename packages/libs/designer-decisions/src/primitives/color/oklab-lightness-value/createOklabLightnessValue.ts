import type {
    ColorOklabLightness,
    DecisionValueContext,
    OklabLightnessValue,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createColorValue } from '../value';

import { resolveOklabLightnessValue } from './resolveOklabLightnessValue';

export const createOklabLightnessValue = (
    context: DecisionValueContext,
    input: ColorOklabLightness,
): OklabLightnessValue => {
    context.consume(input);

    const value = resolveOklabLightnessValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => value,
        toColor: components => {
            const { c, h } = components;
            return createColorValue(context.outputContext(), { l: value, c, h });
        },
    };
};
