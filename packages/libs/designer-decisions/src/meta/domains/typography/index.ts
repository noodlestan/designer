import { FontSizeDecisionTypes } from './font-size';
import { FontWeightDecisionTypes } from './font-weight';
import { LineHeightDecisionTypes } from './line-height';
import { TypefaceDecisionTypes } from './typeface';

export const TypographyDecisionTypes = [
    ...TypefaceDecisionTypes,
    ...FontSizeDecisionTypes,
    ...LineHeightDecisionTypes,
    ...FontWeightDecisionTypes,
];
