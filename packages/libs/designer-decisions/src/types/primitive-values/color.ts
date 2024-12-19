import type { ColorInput, ColorSpaceName } from '../decision-inputs';

export type HueValue = {
    get(): number;
};

export type SaturationValue = {
    get(): number;
};

export type LightnessValue = {
    get(): number;
};

export type AlphaValue = {
    get(): number;
};

export type ColorValue = {
    get(): string;
    getSpace(space: ColorSpaceName): ColorInput;
    getString(space: ColorSpaceName): string;
};
