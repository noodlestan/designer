import { FontFamilyDecisionTypes } from './font-family';
import { FontSizeDecisionTypes } from './font-size';
import { FontWeightDecisionTypes } from './font-weight';
import { LetterSpacingDecisionTypes } from './letter-spacing';
import { LineHeightDecisionTypes } from './line-height';
import { TypefaceDecisionTypes } from './typeface';

export const TypographyDecisionTypes = [
    ...TypefaceDecisionTypes,
    ...FontFamilyDecisionTypes,
    ...FontSizeDecisionTypes,
    ...LetterSpacingDecisionTypes,
    ...LineHeightDecisionTypes,
    ...FontWeightDecisionTypes,
];
