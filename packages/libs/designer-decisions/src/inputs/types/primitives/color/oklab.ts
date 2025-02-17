import type { Degrees, NormalNumber } from '../numbers';
import type { DecisionRef } from '../ref';

export type ColorOklabAxisLiteral = number; // between -125 and 125
export type ColorOklabChromaLiteral = number; // between 0 and 0.4

export type ColorOklabLightnessInput = NormalNumber | DecisionRef;

export type ColorOklabChromaInput = NormalNumber | DecisionRef;

export type ColorOklabHueInput = Degrees | DecisionRef;

export type ColorOkLCHInput = {
    l: ColorOklabLightnessInput;
    c: ColorOklabChromaInput;
    h: ColorOklabHueInput;
};

export type ColorOkLabInput = {
    l: ColorOklabLightnessInput;
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

export type ColorOkInput = ColorOkLCHInput | ColorOkLabInput;

export type ColorOkLiteral = ColorOkLCHLiteral | ColorOkLabLiteral;
