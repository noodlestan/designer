import type { DecisionRef } from '../ref';

import type { TypefaceRangeInput } from './range';
import type { TypefaceSourceInput } from './source';
import type { TypefaceStyleInput } from './style';

export type TypefaceObjectLiteral = {
    fontName: string;
    capabilities?: string[];
    source?: TypefaceSourceInput;
    ranges?: TypefaceRangeInput[];
    styles?: TypefaceStyleInput[];
};

export type TypefaceLiteral = string | TypefaceObjectLiteral;

export type SizeInputTypefaceInput = DecisionRef | TypefaceLiteral;
