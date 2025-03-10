import type { SizeObjectLiteral, SizeUnits } from '../../../inputs';
import { SIZE_UNITS } from '../../space';

export const LETTER_SPACING_UNITS: SizeUnits[] = SIZE_UNITS;

export const LETTER_SPACING_FALLBACK_LITERAL: SizeObjectLiteral = { value: 0, unit: 'px' };

export const LETTER_SPACING_FALLBACK_NUMERIC = 16;

export const LETTER_SPACING_QUANTIZE = 0.01;

export const LETTER_SPACING_BASE = 2;
