import type { DecisionRef } from '../../../decision-values';

import type { ColorOk, ColorOkLiteral } from './oklab';
import type { ColorSRGB, ColorSRGBLiteral } from './srgb';

export type ColorRaw = string | number;

export type ColorObject = ColorOk | ColorSRGB;

export type ColorObjectLiteral = ColorOkLiteral | ColorSRGBLiteral;

export type ColorInputValue = DecisionRef | ColorRaw | ColorObject;

export type ColorLiteral = ColorRaw | ColorObjectLiteral;

export type ColorFormat = 'oklch' | 'oklab' | 'hsl' | 'rgb';
