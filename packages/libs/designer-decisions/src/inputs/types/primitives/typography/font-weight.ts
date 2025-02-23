import type { DecisionRef } from '../ref';

export type FontWeightOpenTypeName =
    | 'Thin'
    | 'Extra Light'
    | 'Light'
    | 'Normal'
    | 'Medium'
    | 'Semi Bold'
    | 'Bold'
    | 'Extra Bold'
    | 'Black';

export type FontWeightCSSName = 'normal' | 'bold';

export type FontWeightLiteral = FontWeightCSSName | FontWeightOpenTypeName | number;

export type FontWeightInput = DecisionRef | FontWeightLiteral;
