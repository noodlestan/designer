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

export type ColorSRGBHSLLiteral = {
    h: number;
    s: number;
    l: number;
};

export type ColorSRGBChannels = {
    r: number;
    g: number;
    b: number;
};

export type ColorSRGB = ColorSRGBHSL;

export type ColorSRGBLiteral = ColorSRGBHSLLiteral | ColorSRGBChannels;
