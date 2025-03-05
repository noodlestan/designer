import type { LineHeightUnits, SizeObjectLiteral } from '../../../inputs';
import { SIZE_ABSOLUTE_UNITS } from '../../space';

export const FONT_SIZE_UNITS: LineHeightUnits[] = [...SIZE_ABSOLUTE_UNITS, 'em', '%'];

export const FONT_SIZE_FALLBACK_LITERAL: SizeObjectLiteral = { value: 16, unit: 'px' };

export const FONT_SIZE_FALLBACK_NUMERIC = 16;

export const FONT_SIZE_QUANTIZE = 0.01;
