import type { ColorOklabChroma, DecisionValueContext, OklabChromaValue } from '../../../types';
import { createBaseValue } from '../../base';
import { createColorValue } from '../value';

import { resolveOklabChromaValue } from './resolveOklabChromaValue';

export const createOklabChromaValue = (
    context: DecisionValueContext,
    input: ColorOklabChroma,
): OklabChromaValue => {
    context.consume(input);

    const value = resolveOklabChromaValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => value,
        toColor: components => {
            const { h, l } = components;
            return createColorValue(context.outputContext(), { h, c: value, l });
        },
    };
};
