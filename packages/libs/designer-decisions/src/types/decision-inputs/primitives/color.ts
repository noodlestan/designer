import type { DecisionRef } from '../../decision-values';

import type { DegreesInput, PercentageInput } from './numbers';

/** hue */

export type HueRefOfHueValue = DecisionRef & {
    type: 'hue-value';
};

export type ColorHueInput = DegreesInput | HueRefOfHueValue;

/** saturation */

export type SaturationRefOfSaturationValue = DecisionRef & {
    type: 'saturation-value';
};

export type ColorSaturationInput = PercentageInput | SaturationRefOfSaturationValue;

/** lightness */

export type LightnessRefOfLightnessValue = DecisionRef & {
    type: 'lightness-value';
};

export type ColorLightnessInput = PercentageInput | LightnessRefOfLightnessValue;

/** color */

export type ColorRefOfColorValue = DecisionRef & {
    type: 'color-value';
};

export type ColorRefOfColorSet = DecisionRef & {
    type: 'color-set';
    index: number;
};

export type ColorRef = ColorRefOfColorValue | ColorRefOfColorSet;

export type ColorRawInput = string | number;

export type ColorSpaceHSLInput = {
    h: ColorHueInput;
    s: ColorSaturationInput;
    l: ColorLightnessInput;
};

export type ColorSpaceRGBInput = { r: number; g: number; b: number };

export type ColorSpaceInput = ColorSpaceHSLInput | ColorSpaceRGBInput;

export type ColorInput = ColorRef | ColorRawInput | ColorSpaceInput;

export type ColorSpaceName = 'rgb' | 'hsl' | 'hsv';
