import type {
    ColorOklabHueInput,
    ColorchannelOptions,
    OklabHueValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { nearest } from '../../number';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
import { resolveOklabHueValue } from './resolveOklabHueValue';

export const createOklabHueValue = (
    context: ValueContext,
    input: ColorOklabHueInput,
    options: ColorchannelOptions = {},
): OklabHueValue => {
    context.consume(input);

    const { precision } = options;
    const value = resolveOklabHueValue(context, input);

    const normalised = () => clampChannelValue(nearest(value, precision), 'oklab-hue');

    return {
        ...createBaseValue(context),
        get: () => normalised(),
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { l, c } = channels;
            return createColorValue(context.outputContext(), { l, c, h: value });
        },
    };
};
