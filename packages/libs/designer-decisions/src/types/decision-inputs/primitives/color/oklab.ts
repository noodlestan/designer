import type { DecisionRef } from '../../../decision-values';
import type { Degrees, NormalNumber } from '../numbers';

export type ColorOklabAxisLiteral = number; // between -125 and 125
export type ColorOklabChromaLiteral = number; // between 0 and 0.4

export type ColorOklabLightness = NormalNumber | DecisionRef;

export type ColorOklabChroma = NormalNumber | DecisionRef;

export type ColorOklabHue = Degrees | DecisionRef;

export type ColorOkLCH = {
    l: ColorOklabLightness;
    c: ColorOklabChroma;
    h: ColorOklabHue;
};

export type ColorOkLab = {
    l: ColorOklabLightness;
    a: ColorOklabAxisLiteral;
    b: ColorOklabAxisLiteral;
};

export type ColorOkLCHLiteral = {
    l: NormalNumber;
    c: ColorOklabChromaLiteral;
    h: Degrees;
};

export type ColorOkLabLiteral = {
    l: NormalNumber;
    a: ColorOklabAxisLiteral;
    b: ColorOklabAxisLiteral;
};

export type ColorOk = ColorOkLCH | ColorOkLab;

export type ColorOkLiteral = ColorOkLCHLiteral | ColorOkLabLiteral;
