import type { ColorOklabChromaInput, OklabChromaValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
import { resolveOklabChromaValue } from './resolveOklabChromaValue';

export const createOklabChromaValue = (
    context: ValueContext,
    input: ColorOklabChromaInput,
): OklabChromaValue => {
    context.consume(input);

    const value = resolveOklabChromaValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => value,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { h, l } = channels;
            return createColorValue(context.outputContext(), { h, c: value, l });
        },
    };
};
