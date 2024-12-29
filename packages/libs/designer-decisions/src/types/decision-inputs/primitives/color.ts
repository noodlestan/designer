import type { DecisionRef } from '../../decision-values';

import type { DegreesInput, NumberModifierInput, PercentageInput } from './numbers';

/** hue */

export type HueRefOfHueValue = DecisionRef & {
    $type: 'hue-value';
};

export type ColorHueInput = DegreesInput | HueRefOfHueValue;

/** saturation */

export type SaturationRefOfSaturationValue = DecisionRef & {
    $type: 'saturation-value';
};

export type ColorSaturationInput = PercentageInput | SaturationRefOfSaturationValue;

/** lightness */

export type LightnessRefOfLightnessValue = DecisionRef & {
    $type: 'lightness-value';
};

export type ColorLightnessInput = PercentageInput | LightnessRefOfLightnessValue;

/** color */

export type ColorRefOfColorValue = DecisionRef & {
    $type: 'color-value';
};

export type ColorRefOfColorSet = DecisionRef & {
    $type: 'color-set';
    $index: number;
};

export type ColorRef = ColorRefOfColorValue | ColorRefOfColorSet;

export type ColorRawInput = string | number;

export type ColorSpaceHSLInput = {
    h: ColorHueInput;
    s: ColorSaturationInput;
    l: ColorLightnessInput;
};

export type ColorSpaceHSLLiteralInput = {
    h: number;
    s: number;
    l: number;
};

export type ColorSpaceHSVInput = {
    h: ColorHueInput;
    s: ColorSaturationInput;
    v: ColorLightnessInput;
};

export type ColorSpaceRGBInput = {
    r: number;
    g: number;
    b: number;
};

export type ColorSpaceInput = ColorSpaceHSLInput | ColorSpaceHSVInput | ColorSpaceRGBInput;

export type ColorInput = ColorRef | ColorRawInput | ColorSpaceInput;

export type ColorModifierInput = {
    hue?: NumberModifierInput;
    lightness?: NumberModifierInput;
    saturation?: NumberModifierInput;
};

export type ColorSpaceName = 'rgb' | 'hsl' | 'hsv';
