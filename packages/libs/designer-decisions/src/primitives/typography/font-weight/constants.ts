import type {
    FontWeightCSSName,
    FontWeightObjectLiteral,
    FontWeightOpenTypeName,
} from '../../../inputs';

export const FONT_WEIGHTS_BY_CSS_NAME: Record<FontWeightCSSName, number> = {
    normal: 400,
    bold: 700,
};

export const FONT_WEIGHTS_BY_OT_NAME: Record<FontWeightOpenTypeName, number> = {
    Thin: 100,
    'Extra Light': 200,
    Light: 300,
    Normal: 400,
    Medium: 500,
    'Semi Bold': 600,
    Bold: 700,
    'Extra Bold': 800,
    Black: 900,
};

export const FONT_WEIGHTS_BY_NAME: Record<string, number> = {
    ...FONT_WEIGHTS_BY_CSS_NAME,
    ...FONT_WEIGHTS_BY_OT_NAME,
};

export const FONT_WEIGHT_FALLBACK_NUMERIC = 400;

export const FONT_WEIGHT_FALLBACK_LITERAL: FontWeightObjectLiteral = {
    value: 400,
    name: 'Normal',
};
