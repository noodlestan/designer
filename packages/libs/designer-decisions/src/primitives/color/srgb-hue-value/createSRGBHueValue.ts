import type { ColorSRGBHueInput, SRGBHueValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
import { resolveSRGBHueValue } from './resolveSRGBHueValue';

export const createSRGBHueValue = (
    context: ValueContext,
    input: ColorSRGBHueInput,
): SRGBHueValue => {
    context.consume(input);

    const value = resolveSRGBHueValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => value,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { s, l } = channels;
            return createColorValue(context.outputContext(), { h: value, s, l });
        },
    };
};
