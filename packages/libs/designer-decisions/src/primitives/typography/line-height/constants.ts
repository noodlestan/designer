import type { LineHeightObjectLiteral, LineHeightUnits } from '../../../inputs';
import { SIZE_ABSOLUTE_UNITS } from '../../space';

export const LINE_HEIGHT_UNITS: LineHeightUnits[] = [...SIZE_ABSOLUTE_UNITS, 'em', '%'];

export const LINE_HEIGHT_FALLBACK_NUMERIC = 1;

export const LINE_HEIGHT_FALLBACK_LITERAL: LineHeightObjectLiteral = { value: 1 };

export const LINE_HEIGHT_QUANTIZE = 0.01;
