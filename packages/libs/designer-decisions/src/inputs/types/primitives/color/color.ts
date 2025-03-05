import type { DecisionRef } from '../ref';

import type { ColorOkInput, ColorOkLiteral } from './oklab';
import type { ColorSRGBInput, ColorSRGBLiteral } from './srgb';

export type ColorRaw = string | number;

export type ColorObjectInput = ColorOkInput | ColorSRGBInput;

export type ColorObjectLiteral = ColorOkLiteral | ColorSRGBLiteral;

export type ColorLiteral = ColorRaw | ColorObjectLiteral;

export type ColorValueInput = DecisionRef | ColorLiteral;

export type ColorFormat = 'oklch' | 'oklab' | 'hsl' | 'rgb';
