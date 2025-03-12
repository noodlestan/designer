import type { DecisionRef } from '../ref';

export type FontFamilyGenericName =
    | 'serif'
    | 'sans-serif'
    | 'monospace'
    | 'cursive'
    | 'fantasy'
    | 'system-ui';

export type FontFamilyName = FontFamilyGenericName | string;

export type FontFamilyItemInput = DecisionRef | FontFamilyName;

export type FontFamilyArrayLiteral = FontFamilyName[];

export type FontFamilyRaw = string;

export type FontFamilyLiteral = FontFamilyRaw | FontFamilyName | FontFamilyArrayLiteral;

export type FontFamilyInput = DecisionRef | FontFamilyLiteral | FontFamilyItemInput[];
