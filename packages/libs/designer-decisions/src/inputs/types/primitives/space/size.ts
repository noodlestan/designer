import type { DecisionRef } from '../ref';

export type SizeRaw = string | number;

export type SizeAbsoluteUnits = 'px' | 'rem';

export type SizeObjectLiteral = {
    value: number;
    units: SizeAbsoluteUnits;
};
export type SizeLiteral = SizeRaw | SizeObjectLiteral;

export type SizeValueInput = DecisionRef | SizeLiteral;
