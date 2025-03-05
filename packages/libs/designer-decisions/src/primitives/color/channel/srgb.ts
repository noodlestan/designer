import type { Degrees, NormalNumber } from '../../../inputs';

export type SRGBHueComplementaryChannels = {
    s: NormalNumber;
    l: NormalNumber;
};

export type SRGBSaturationComplementaryChannels = {
    h: Degrees;
    l: NormalNumber;
};

export type SRGBLightnessComplementaryChannels = {
    h: Degrees;
    s: NormalNumber;
};

export type ColorSRGBComplementaryChannels =
    | SRGBHueComplementaryChannels
    | SRGBSaturationComplementaryChannels
    | SRGBLightnessComplementaryChannels;
