import type { DecisionRef } from '../../../decision-values';
import type { Degrees, NormalNumber } from '../numbers';

export type ColorSRGBHueInput = Degrees | DecisionRef;

export type ColorSRGBSaturationInput = NormalNumber | DecisionRef;

export type ColorSRGBLightnessInput = NormalNumber | DecisionRef;

export type ColorSRGBHSLInput = {
    h: ColorSRGBHueInput;
    s: ColorSRGBSaturationInput;
    l: ColorSRGBLightnessInput;
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

export type ColorSRGBInput = ColorSRGBHSLInput | ColorSRGBChannelsLiteral;

export type ColorSRGBLiteral = ColorSRGBHSLiteral | ColorSRGBChannelsLiteral;
