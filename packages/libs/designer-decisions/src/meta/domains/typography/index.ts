import { FontSizeDecisionTypes } from './font-size';
import { FontWeightDecisionTypes } from './font-weight';
import { TypefaceDecisionTypes } from './typeface';

export const TypographyDecisionTypes = [
    ...TypefaceDecisionTypes,
    ...FontSizeDecisionTypes,
    ...FontWeightDecisionTypes,
];
