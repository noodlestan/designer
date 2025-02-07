import type {
    ColorOklabLightnessInput,
    ColorchannelOptions,
    OklabLightnessValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { nearest } from '../../number';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
import { resolveOklabLightnessValue } from './resolveOklabLightnessValue';

export const createOklabLightnessValue = (
    context: ValueContext,
    input: ColorOklabLightnessInput,
    options: ColorchannelOptions = {},
): OklabLightnessValue => {
    context.consume(input);

    const { precision } = options;
    const value = resolveOklabLightnessValue(context, input);

    const normalised = () => clampChannelValue(nearest(value, precision), 'oklab-lightness');

    return {
        ...createBaseValue(context),
        get: normalised,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { c, h } = channels;
            return createColorValue(context.outputContext(), { l: value, c, h });
        },
    };
};
