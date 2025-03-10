import type { DecisionRef } from '../ref';

export type SizeRaw = string | number;

export type SizeRelativeUnits = 'em' | '%';
export type SizeAbsoluteUnits = 'px' | 'rem';

export type SizeUnits = SizeRelativeUnits | SizeAbsoluteUnits;

export type SizeObjectLiteral = {
    value: number;
    unit?: SizeUnits;
};

export type SizeLiteral = SizeRaw | SizeObjectLiteral;

export type SizeValueInput = DecisionRef | SizeLiteral;
