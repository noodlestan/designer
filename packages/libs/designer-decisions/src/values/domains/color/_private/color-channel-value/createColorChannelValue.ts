import type { ColorOklabChromaInput } from '../../../../../inputs';
import type { ValueContext } from '../../../../../value';
import { createBaseValue } from '../../../../base';
import {
    type ColorChannelValue,
    type ColorChannelValueOptions,
    clampChannelValue,
    createNumericValue,
} from '../../../../primitives';
import { createColorValue } from '../../color-value';

import { resolveColorChannelValue } from './resolveColorChannelValue';

export const createOklabChromaValue = (
    channel: {
        name: string;
        quant: number;
    },
    context: ValueContext,
    input: ColorOklabChromaInput,
    options: ColorChannelValueOptions = {},
): ColorChannelValue => {
    const { name, quant } = channel;
    const baseValue = createBaseValue(context, input);

    const { quantize = quant } = options;
    const value = resolveColorChannelValue(context, input);

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
