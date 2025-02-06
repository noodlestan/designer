import type { ColorOklabHueInput, OklabHueValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
import { resolveOklabHueValue } from './resolveOklabHueValue';

export const createOklabHueValue = (
    context: ValueContext,
    input: ColorOklabHueInput,
): OklabHueValue => {
    context.consume(input);

    const value = resolveOklabHueValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => value,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { l, c } = channels;
            return createColorValue(context.outputContext(), { l, c, h: value });
        },
    };
};
