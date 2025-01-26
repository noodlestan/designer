import type { Degrees, NormalNumber } from '../../decision-inputs';
import type { BaseSet, BaseValue } from '../base';

import type { ColorValue } from './color';

export type SRGBHueComplementaryChannels = {
    s: NormalNumber;
    l: NormalNumber;
};

export type SRGBHueValue = BaseValue<Degrees> & {
    toColor: (channels: SRGBHueComplementaryChannels) => ColorValue;
};

export type SRGBSaturationComplementaryChannels = {
    h: Degrees;
    l: NormalNumber;
};

export type SRGBSaturationValue = BaseValue<NormalNumber> & {
    toColor: (channels: SRGBSaturationComplementaryChannels) => ColorValue;
};

export type SRGBLightnessComplementaryChannels = {
    h: Degrees;
    s: NormalNumber;
};

export type SRGBLightnessValue = BaseValue<NormalNumber> & {
    toColor: (channels: SRGBLightnessComplementaryChannels) => ColorValue;
};

export type SRGBHueSet = BaseSet<SRGBHueValue>;

export type SRGBSaturationScale = BaseSet<SRGBSaturationValue>;

export type SRGBLightnessScale = BaseSet<SRGBLightnessValue>;

export type ColorSRGBChannelName = 'srgb-hue' | 'srgb-saturation' | 'srgb-lightness';

export type ColorSRGBChannelValue = SRGBHueValue | SRGBSaturationValue | SRGBLightnessValue;

export type ColorSRGBComplementaryChannels =
    | SRGBLightnessComplementaryChannels
    | SRGBSaturationComplementaryChannels
    | SRGBHueComplementaryChannels;
