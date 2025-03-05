import type { ColorOklabChromaInput, ColorOklabHueInput, ColorOklabLightnessInput } from './oklab';
import type { ColorSRGBHueInput, ColorSRGBLightnessInput, ColorSRGBSaturationInput } from './srgb';

export type ColorChannelRaw = number;

export type ColorChannelInput =
    | ColorChannelRaw
    | ColorSRGBHueInput
    | ColorSRGBSaturationInput
    | ColorSRGBLightnessInput
    | ColorOklabLightnessInput
    | ColorOklabChromaInput
    | ColorOklabHueInput;
