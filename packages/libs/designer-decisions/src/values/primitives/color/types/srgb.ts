import type { Degrees, NormalNumber } from '../../../../inputs';
import type { BaseSet } from '../../../base';

import type { ColorChannelBaseValue } from './channel';

export type SRGBHueComplementaryChannels = {
    s: NormalNumber;
    l: NormalNumber;
};

export type SRGBHueValue = ColorChannelBaseValue<SRGBHueComplementaryChannels, Degrees>;

export type SRGBSaturationComplementaryChannels = {
    h: Degrees;
    l: NormalNumber;
};

export type SRGBSaturationValue = ColorChannelBaseValue<
    SRGBSaturationComplementaryChannels,
    NormalNumber
>;

export type SRGBLightnessComplementaryChannels = {
    h: Degrees;
    s: NormalNumber;
};

export type SRGBLightnessValue = ColorChannelBaseValue<
    SRGBLightnessComplementaryChannels,
    NormalNumber
>;

export type SRGBHueSet = BaseSet<SRGBHueValue>;

export type SRGBSaturationScale = BaseSet<SRGBSaturationValue>;

export type SRGBLightnessScale = BaseSet<SRGBLightnessValue>;

export type ColorSRGBChannelName = 'srgb-hue' | 'srgb-saturation' | 'srgb-lightness';

export type ColorSRGBChannelValue = SRGBHueValue | SRGBSaturationValue | SRGBLightnessValue;

export type ColorSRGBComplementaryChannels =
    | SRGBLightnessComplementaryChannels
    | SRGBSaturationComplementaryChannels
    | SRGBHueComplementaryChannels;
