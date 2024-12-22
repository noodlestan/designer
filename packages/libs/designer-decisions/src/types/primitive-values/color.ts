import type { Color } from 'chroma-js';

import type { ColorSpaceInput, ColorSpaceName } from '../decision-inputs';

import type { BaseValue } from './base';

export type HueValue = BaseValue<number>;

export type SaturationValue = BaseValue<number>;

export type LightnessValue = BaseValue<number>;

export type LightnessScale = BaseValue<LightnessValue[]>;

export type AlphaValue = BaseValue<number>;

export type ColorValue = BaseValue<Color> & {
    getSpace(space: ColorSpaceName): ColorSpaceInput;
    getString(space: ColorSpaceName): string;
};

export type ColorSet = BaseValue<ColorValue[]>;
