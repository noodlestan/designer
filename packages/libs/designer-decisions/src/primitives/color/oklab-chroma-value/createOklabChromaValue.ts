import type {
    ColorChannelValueOptions,
    ColorOklabChromaInput,
    OklabChromaValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createNumericValue } from '../../number';
import {
    COLOR_CHANNEL_OKLAB_CHROMA_BASE as base,
    COLOR_CHANNEL_OKLAB_CHROMA_NAME as name,
    COLOR_CHANNEL_OKLAB_CHROMA_QUANTIZE as quant,
} from '../constants';
import { clampChannelValue } from '../helpers';
import { createColorValue } from '../value';

import { resolveOklabChromaValue } from './resolveOklabChromaValue';

export const createOklabChromaValue = (
    context: ValueContext,
    input: ColorOklabChromaInput,
    options: ColorChannelValueOptions = {},
): OklabChromaValue => {
    context.consume(input);

    const { quantize = quant } = options;
    const value = resolveOklabChromaValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'oklab-chroma');
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    return {
        ...createBaseValue(context),
        get,
        raw,
        quantized,
        name: () => name,
        toColor: channels => {
            const { h, l } = channels;
            return createColorValue(context.outputContext(), { h, c: value, l }, { quantize });
        },
    };
};
