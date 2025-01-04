import type { ColorOklabChroma, DecisionValueContext, OklabChromaValue } from '../../../types';
import { createColorValue } from '../value';

import { resolveOklabChromaValue } from './resolveOklabChromaValue';

export const createOklabChromaValue = (
    context: DecisionValueContext,
    input: ColorOklabChroma,
): OklabChromaValue => {
    const value = resolveOklabChromaValue(context, input);

    return {
        get: () => value,
        toColor: components => {
            const { h, l } = components;
            return createColorValue(context, { h, c: value, l });
        },
    };
};
