import type { FontStyleName, TextStyleAttributesLiteral, TextTransformName } from '../../../inputs';

export const TEXT_STYLE_ATTRIBUTES_FALLBACK: TextStyleAttributesLiteral = {};

export const TEXT_STYLE_ATTRIBUTES_TRANSFORM: TextTransformName[] = [
    'none',
    'uppercase',
    'lowercase',
    'capitalize',
];

export const TEXT_STYLE_ATTRIBUTES_STYLE: FontStyleName[] = ['normal', 'italic'];
