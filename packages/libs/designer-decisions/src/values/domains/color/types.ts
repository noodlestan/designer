import type { Color as ChromaColor } from 'chroma-js';

import type { ColorOklabAxisLiteral, Degrees, NormalNumber } from '../../../inputs';
import type { BaseSet, BaseValue, ColorChannelBaseValue } from '../../base';
import type {
    Color,
    ColorFormatOptions,
    OklabChromaComplementaryChannels,
    OklabHueComplementaryChannels,
    OklabLightnessComplementaryChannels,
    SRGBHueComplementaryChannels,
    SRGBLightnessComplementaryChannels,
    SRGBSaturationComplementaryChannels,
} from '../../primitives';

export type ColorValueOptions = ColorFormatOptions;

export type ColorValue = BaseValue<ChromaColor> & Color;
export type ColorSet = BaseSet<ColorValue>;

export type OklabLightnessValue = ColorChannelBaseValue<
    OklabLightnessComplementaryChannels,
    NormalNumber
>;
export type OklabLightnessScale = BaseSet<OklabLightnessValue>;

export type OklabChromaValue = ColorChannelBaseValue<
    OklabChromaComplementaryChannels,
    ColorOklabAxisLiteral
>;
export type OklabChromaScale = BaseSet<OklabChromaValue>;

export type OklabHueValue = ColorChannelBaseValue<OklabHueComplementaryChannels, Degrees>;
export type OklabHueSet = BaseSet<OklabHueValue>;

export type SRGBHueValue = ColorChannelBaseValue<SRGBHueComplementaryChannels, Degrees>;
export type SRGBHueSet = BaseSet<SRGBHueValue>;

export type SRGBSaturationValue = ColorChannelBaseValue<
    SRGBSaturationComplementaryChannels,
    NormalNumber
>;
export type SRGBSaturationScale = BaseSet<SRGBSaturationValue>;

export type SRGBLightnessValue = ColorChannelBaseValue<
    SRGBLightnessComplementaryChannels,
    NormalNumber
>;
export type SRGBLightnessScale = BaseSet<SRGBLightnessValue>;

export type ColorOklabChannelValue = OklabLightnessValue | OklabChromaValue | OklabHueValue;
export type ColorSRGBChannelValue = SRGBHueValue | SRGBSaturationValue | SRGBLightnessValue;
export type ColorChannelValue = ColorSRGBChannelValue | ColorOklabChannelValue;
