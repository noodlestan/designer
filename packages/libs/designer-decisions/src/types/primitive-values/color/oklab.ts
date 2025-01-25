import type { ColorOklabAxisLiteral, Degrees, NormalNumber } from '../../decision-inputs';
import type { BaseSet, BaseValue } from '../base';

import type { ColorValue } from './color';

export type OklabLightnessComplementaryChannels = { c: ColorOklabAxisLiteral; h: Degrees };

export type OklabLightnessValue = BaseValue<NormalNumber> & {
    toColor: (channels: OklabLightnessComplementaryChannels) => ColorValue;
};

export type OklabChromaComplementaryChannels = { l: NormalNumber; h: Degrees };

export type OklabChromaValue = BaseValue<ColorOklabAxisLiteral> & {
    toColor: (channels: OklabChromaComplementaryChannels) => ColorValue;
};

export type OklabHueComplementaryChannels = { l: NormalNumber; c: ColorOklabAxisLiteral };

export type OklabHueValue = BaseValue<Degrees> & {
    toColor: (channels: OklabHueComplementaryChannels) => ColorValue;
};

export type OklabLightnessScale = BaseSet<OklabLightnessValue>;

export type OklabChromaScale = BaseSet<OklabChromaValue>;

export type OklabHueSet = BaseSet<OklabHueValue>;

export type ColorOklabChannelName = 'oklab-lightness' | 'oklab-chroma' | 'oklab-hue';

export type ColorOklabChannelValue = OklabLightnessValue | OklabChromaValue | OklabHueValue;

export type ColorOklabComplementaryChannels =
    | OklabLightnessComplementaryChannels
    | OklabChromaComplementaryChannels
    | OklabHueComplementaryChannels;
