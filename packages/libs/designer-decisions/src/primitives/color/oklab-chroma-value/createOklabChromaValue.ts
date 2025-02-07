import type {
    ColorOklabChromaInput,
    ColorchannelOptions,
    OklabChromaValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { quantized } from '../../number';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
import { resolveOklabChromaValue } from './resolveOklabChromaValue';

export const createOklabChromaValue = (
    context: ValueContext,
    input: ColorOklabChromaInput,
    options: ColorchannelOptions = {},
): OklabChromaValue => {
    context.consume(input);

    const { quantize } = options;
    const value = resolveOklabChromaValue(context, input);

    const normalised = () => clampChannelValue(quantized(value, quantize), 'oklab-chroma');

    return {
        ...createBaseValue(context),
        get: () => normalised(),
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { h, l } = channels;
            return createColorValue(context.outputContext(), { h, c: value, l });
        },
    };
};
