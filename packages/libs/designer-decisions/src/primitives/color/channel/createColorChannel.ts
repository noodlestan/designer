import type { ColorObjectLiteral } from '../../../inputs';
import type { PrimitiveContext } from '../../../primitive';
import type { ColorChannelBaseOptions } from '../../../values';
import { quantized } from '../../number';
import { clampChannelValue, createColor } from '../color';

import { normalizeColorChannelInput } from './private';
import type {
    ColorChannel,
    ColorChannelDefinition,
    ColorChannelLiteral,
    ColorChannelOptions,
    ColorComplementaryChannels,
} from './types';

export function createColorChannel<
    C extends ColorComplementaryChannels = ColorComplementaryChannels,
>(
    channelDefinition: ColorChannelDefinition,
    context: PrimitiveContext<ColorChannelLiteral>,
    options?: ColorChannelBaseOptions,
): ColorChannel {
    const { channelName, channelKey, base, quantize: defaultQ, fallback } = channelDefinition;
    const { quantize = defaultQ } = options || {};

    const { value } = normalizeColorChannelInput(channelDefinition, context);

    const literal = () => ({
        value: value || fallback,
    });

    const getQuantized = (q?: number) => {
        const { value } = literal();
        const raw = quantized(value, q ?? quantize, base);
        const clamped = clampChannelValue(channelDefinition, raw);
        return {
            value: clamped,
        };
    };

    const toColor = (channels: C) => {
        const colorLiteral = {
            ...channels,
            [channelKey]: value,
        } as ColorObjectLiteral;
        return createColor(context.outputContext<ColorObjectLiteral>(colorLiteral));
    };

    const toNumber = ({ quantize: q }: ColorChannelOptions = {}) => {
        const { value } = getQuantized(q ?? quantize);
        return value;
    };

    const toString = ({ quantize: q }: ColorChannelOptions = {}) => {
        const { value } = getQuantized(q ?? quantize);
        return String(value);
    };

    return {
        ...literal(),
        literal,
        channelName,
        quantize: getQuantized,
        toNumber,
        toColor,
        toString,
    };
}
