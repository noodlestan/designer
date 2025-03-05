import type {
    Color,
    ColorChannel,
    ColorFormatOptions,
    OklabChromaComplementaryChannels,
    OklabHueComplementaryChannels,
    OklabLightnessComplementaryChannels,
    SRGBHueComplementaryChannels,
    SRGBLightnessComplementaryChannels,
    SRGBSaturationComplementaryChannels,
} from '../../../primitives';
import type { BaseSet, BaseValue } from '../../base';

export type ColorValueOptions = ColorFormatOptions;

export type ColorValue = BaseValue<Color>;
export type ColorSet = BaseSet<ColorValue>;

export type OklabLightnessValue = BaseValue<ColorChannel<OklabLightnessComplementaryChannels>>;
export type OklabLightnessScale = BaseSet<OklabLightnessValue>;

export type OklabChromaValue = BaseValue<ColorChannel<OklabChromaComplementaryChannels>>;
export type OklabChromaScale = BaseSet<OklabChromaValue>;

export type OklabHueValue = BaseValue<ColorChannel<OklabHueComplementaryChannels>>;
export type OklabHueSet = BaseSet<OklabHueValue>;

export type ColorOklabChannelValue = OklabLightnessValue | OklabChromaValue | OklabHueValue;

export type SRGBHueValue = BaseValue<ColorChannel<SRGBHueComplementaryChannels>>;
export type SRGBHueSet = BaseSet<SRGBHueValue>;

export type SRGBSaturationValue = BaseValue<ColorChannel<SRGBSaturationComplementaryChannels>>;
export type SRGBSaturationScale = BaseSet<SRGBSaturationValue>;

export type SRGBLightnessValue = BaseValue<ColorChannel<SRGBLightnessComplementaryChannels>>;
export type SRGBLightnessScale = BaseSet<SRGBLightnessValue>;

export type ColorSRGBChannelValue = SRGBHueValue | SRGBSaturationValue | SRGBLightnessValue;

export type ColorChannelValue = ColorSRGBChannelValue | ColorOklabChannelValue;
