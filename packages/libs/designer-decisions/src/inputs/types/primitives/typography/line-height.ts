import type { DecisionRef } from '../ref';

export type LineHeightUnits = 'px' | 'rem' | 'em' | '%';

export type LineHeightRaw = number;

export type LineHeightObjectLiteral = {
    value: LineHeightRaw;
    unit?: LineHeightUnits;
};

export type LineHeightLiteral = LineHeightRaw | LineHeightObjectLiteral;

export type LineHeightInput = DecisionRef | LineHeightLiteral;
