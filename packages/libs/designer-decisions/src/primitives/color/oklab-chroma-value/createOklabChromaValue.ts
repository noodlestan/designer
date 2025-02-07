import type {
    ColorOklabChromaInput,
    ColorchannelOptions,
    OklabChromaValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';
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

    const normalize = (v: number) => clampChannelValue(v, 'oklab-chroma');
    const { get, raw, quantized } = createNumericValue(value, { quantize, normalize });

    return {
        ...createBaseValue(context),
        get,
        raw,
        quantized,
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { h, l } = channels;
            return createColorValue(context.outputContext(), { h, c: value, l });
        },
    };
};
