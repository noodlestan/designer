import type { ColorOklabAxisLiteral, Degrees, NormalNumber } from '../../../inputs';

export type OklabLightnessComplementaryChannels = { c: ColorOklabAxisLiteral; h: Degrees };

export type OklabChromaComplementaryChannels = { l: NormalNumber; h: Degrees };

export type OklabHueComplementaryChannels = { l: NormalNumber; c: ColorOklabAxisLiteral };

export type ColorOklabComplementaryChannels =
    | OklabLightnessComplementaryChannels
    | OklabChromaComplementaryChannels
    | OklabHueComplementaryChannels;
