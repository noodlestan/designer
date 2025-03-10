import type { SizeObjectLiteral, SizeUnits } from '../../../inputs';
import { SIZE_UNITS } from '../../space';

export const FONT_SIZE_UNITS: SizeUnits[] = SIZE_UNITS;

export const FONT_SIZE_FALLBACK_LITERAL: SizeObjectLiteral = { value: 16, unit: 'px' };

export const FONT_SIZE_FALLBACK_NUMERIC = 16;

export const FONT_SIZE_QUANTIZE = 0.01;
