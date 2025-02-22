import type { ColorOklabChromaInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import {
    type ColorChannelValueOptions,
    type OklabChromaValue,
    COLOR_CHANNEL_OKLAB_CHROMA_BASE as base,
    clampChannelValue,
    createNumericValue,
    COLOR_CHANNEL_OKLAB_CHROMA_NAME as name,
    COLOR_CHANNEL_OKLAB_CHROMA_QUANTIZE as quant,
} from '../../../primitives';
import { createColorValue } from '../color-value';

import { resolveOklabChromaValue } from './resolveOklabChromaValue';

export const createOklabChromaValue = (
    context: ValueContext,
    input: ColorOklabChromaInput,
    options: ColorChannelValueOptions = {},
): OklabChromaValue => {
    const baseValue = createBaseValue(context, input);

    const { quantize = quant } = options;
    const value = resolveOklabChromaValue(context, input);

    const normalize = (v: number) => clampChannelValue(v, 'oklab-chroma');
    const { get, raw, quantized } = createNumericValue(value, { base, quantize, normalize });

    return {
        ...baseValue,
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
