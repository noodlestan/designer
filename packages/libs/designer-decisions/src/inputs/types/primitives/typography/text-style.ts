import type { DecisionRef } from '../ref';

import type { FontFamilyInput } from './font-family';
import type { FontSizeInput } from './font-size';
import type { FontWeightInput } from './font-weight';
import type { LetterSpacingInput } from './letter-spacing';
import type { LineHeightInput } from './line-height';

export type FontStyleName = 'normal' | 'italic';
export type TextTransformName = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

export type TextStyleCompositeInput = {
    extend?: DecisionRef;
    fontFamily?: FontFamilyInput;
    fontSize?: FontSizeInput;
    fontWeight?: FontWeightInput;
    lineHeight?: LineHeightInput;
    letterSpacing?: LetterSpacingInput;
};

export type TextStyleAttributesLiteral = {
    textTransform?: TextTransformName;
    fontStyle?: FontStyleName;
};

export type TextStyleObjectInput = TextStyleCompositeInput & TextStyleAttributesLiteral;

export type TextStyleInput = DecisionRef | TextStyleObjectInput;
