import type { DecisionRef } from '../../../decision-values';
import type { Degrees, NormalNumber } from '../numbers';

export type ColorSRGBHue = Degrees | DecisionRef;

export type ColorSRGBSaturation = NormalNumber | DecisionRef;

export type ColorSRGBLightness = NormalNumber | DecisionRef;

export type ColorSRGBHSL = {
    h: ColorSRGBHue;
    s: ColorSRGBSaturation;
    l: ColorSRGBLightness;
};

export type ColorSRGBHSLiteral = {
    h: number;
    s: number;
    l: number;
};

export type ColorSRGBChannelsLiteral = {
    r: number;
    g: number;
    b: number;
};

export type ColorSRGB = ColorSRGBHSL | ColorSRGBChannelsLiteral;

export type ColorSRGBLiteral = ColorSRGBHSLiteral | ColorSRGBChannelsLiteral;
