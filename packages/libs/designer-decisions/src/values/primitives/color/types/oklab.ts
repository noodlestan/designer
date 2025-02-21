import type { ColorOklabAxisLiteral, Degrees, NormalNumber } from '../../../../inputs';
import type { BaseSet } from '../../set';

import type { ColorChannelBaseValue } from './channel';

export type OklabLightnessComplementaryChannels = { c: ColorOklabAxisLiteral; h: Degrees };

export type OklabLightnessValue = ColorChannelBaseValue<
    OklabLightnessComplementaryChannels,
    NormalNumber
>;

export type OklabChromaComplementaryChannels = { l: NormalNumber; h: Degrees };

export type OklabChromaValue = ColorChannelBaseValue<
    OklabChromaComplementaryChannels,
    ColorOklabAxisLiteral
>;

export type OklabHueComplementaryChannels = { l: NormalNumber; c: ColorOklabAxisLiteral };

export type OklabHueValue = ColorChannelBaseValue<OklabHueComplementaryChannels, Degrees>;

export type OklabLightnessScale = BaseSet<OklabLightnessValue>;

export type OklabChromaScale = BaseSet<OklabChromaValue>;

export type OklabHueSet = BaseSet<OklabHueValue>;

export type ColorOklabChannelName = 'oklab-lightness' | 'oklab-chroma' | 'oklab-hue';

export type ColorOklabChannelValue = OklabLightnessValue | OklabChromaValue | OklabHueValue;

export type ColorOklabComplementaryChannels =
    | OklabLightnessComplementaryChannels
    | OklabChromaComplementaryChannels
    | OklabHueComplementaryChannels;
