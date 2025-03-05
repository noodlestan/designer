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

export type FontWeightNamed = FontWeightOpenTypeName | FontWeightCSSName;

export type FontWeightRaw = FontWeightNamed | number;

export type FontWeightObjectLiteral = {
    value: number;
    name?: FontWeightNamed;
};

export type FontWeightLiteral = FontWeightRaw | FontWeightObjectLiteral;

export type FontWeightInput = DecisionRef | FontWeightLiteral;
