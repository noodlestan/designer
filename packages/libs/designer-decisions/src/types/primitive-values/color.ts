import type { Color } from 'chroma-js';

import type { ColorSpaceInput, ColorSpaceName } from '../decision-inputs';

import type { BaseValue } from './base';

export type HueValue = BaseValue<number> & {
    getColor: (components: { s: number; l: number }) => ColorValue;
};

export type SaturationValue = BaseValue<number> & {
    getColor: (components: { h: number; l: number }) => ColorValue;
};

export type LightnessValue = BaseValue<number> & {
    getColor: (components: { h: number; s: number }) => ColorValue;
};

export type LightnessScale = BaseValue<LightnessValue[]>;

export type AlphaValue = BaseValue<number>;

export type ColorValue = BaseValue<Color> & {
    getSpace(space: ColorSpaceName): ColorSpaceInput;
    getString(space: ColorSpaceName): string;
};

export type ColorSet = BaseValue<ColorValue[]>;
