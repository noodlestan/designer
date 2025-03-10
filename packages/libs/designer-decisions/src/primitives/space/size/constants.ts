import type {
    SizeAbsoluteUnits,
    SizeObjectLiteral,
    SizeRelativeUnits,
    SizeUnits,
} from '../../../inputs';

export const SIZE_ABSOLUTE_UNITS: SizeAbsoluteUnits[] = ['px', 'rem'];
export const SIZE_RELATIVE_UNITS: SizeRelativeUnits[] = ['em', '%'];
export const SIZE_UNITS: SizeUnits[] = [...SIZE_ABSOLUTE_UNITS, ...SIZE_RELATIVE_UNITS];

export const SIZE_FALLBACK_NUMERIC = 0;

export const SIZE_FALLBACK_LITERAL: SizeObjectLiteral = { value: 0, unit: 'px' };

export const SIZE_QUANTIZE = 0.01;
