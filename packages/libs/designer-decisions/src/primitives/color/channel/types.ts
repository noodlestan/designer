import type { ColorChannelRaw, ColorFormat, ColorObjectLiteral } from '../../../inputs';
import type { Primitive } from '../../../primitive';
import type { NumberFormatOptions } from '../../number';
import type { Color, ColorFormatOptions } from '../color';

import type { ColorOklabComplementaryChannels } from './oklab';
import type { ColorSRGBComplementaryChannels } from './srgb';

export type ColorSRGBChannelName = 'srgb-hue' | 'srgb-saturation' | 'srgb-lightness';

export type ColorOklabChannelName = 'oklab-lightness' | 'oklab-chroma' | 'oklab-hue';

export type ColorChannelName = ColorSRGBChannelName | ColorOklabChannelName;

export type ColorComplementaryChannels =
    | ColorSRGBComplementaryChannels
    | ColorOklabComplementaryChannels;

export type ColorChannelDefinition = {
    valueName: string;
    channelName: ColorChannelName;
    colorFormat: ColorFormat;
    channelKey: keyof ColorObjectLiteral;
    range: [number, number];
    base: number;
    quantize: number;
    fallback: number;
    decisionTypes: {
        value: string;
        set: string;
    };
};

export type ColorChannelOptions = NumberFormatOptions;

export type ColorChannelObjectLiteral = {
    value: ColorChannelRaw;
};

export type ColorChannelLiteral = ColorChannelRaw | ColorChannelObjectLiteral;

export type ColorChannel<C extends ColorComplementaryChannels = ColorComplementaryChannels> =
    Primitive<ColorChannelObjectLiteral> & {
        channelName: ColorChannelName;
        quantize: (quantize?: number) => ColorChannelObjectLiteral;
        toNumber: (options?: ColorChannelOptions) => number;
        toColor(channels: C, options?: ColorChannelOptions): Color;
        toString(options?: ColorFormatOptions): string;
    };
