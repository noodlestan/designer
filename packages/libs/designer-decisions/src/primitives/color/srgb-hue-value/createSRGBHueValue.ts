import type {
    ColorSRGBHueInput,
    ColorchannelOptions,
    SRGBHueValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { nearest } from '../../number';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
import { resolveSRGBHueValue } from './resolveSRGBHueValue';

export const createSRGBHueValue = (
    context: ValueContext,
    input: ColorSRGBHueInput,
    options: ColorchannelOptions = {},
): SRGBHueValue => {
    context.consume(input);

    const { precision } = options;
    const value = resolveSRGBHueValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => nearest(value, precision),
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { s, l } = channels;
            return createColorValue(context.outputContext(), { h: value, s, l });
        },
    };
};
