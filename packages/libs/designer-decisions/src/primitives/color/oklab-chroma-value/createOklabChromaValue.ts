import type {
    ColorOklabChromaInput,
    ColorchannelOptions,
    OklabChromaValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { nearest } from '../../number';
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

    const { precision } = options;
    const value = resolveOklabChromaValue(context, input);

    const normalised = () => clampChannelValue(nearest(value, precision), 'oklab-chroma');

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
