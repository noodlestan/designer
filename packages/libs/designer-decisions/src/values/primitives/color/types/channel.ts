import type { ColorOklabComplementaryChannels } from './oklab';
import type { ColorSRGBComplementaryChannels } from './srgb';

export type ColorSRGBChannelName = 'srgb-hue' | 'srgb-saturation' | 'srgb-lightness';

export type ColorOklabChannelName = 'oklab-lightness' | 'oklab-chroma' | 'oklab-hue';

export type ColorChannelName = ColorSRGBChannelName | ColorOklabChannelName;

export type ColorComplementaryChannels =
    | ColorSRGBComplementaryChannels
    | ColorOklabComplementaryChannels;
