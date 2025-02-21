import type { DecisionRef } from '../ref';

import type { TypefaceRangeInput } from './range';
import type { TypefaceSourceInput } from './source';
import type { TypefaceStyleInput } from './style';

export type TypefaceLiteral = {
    fontName: string;
    capabilities: string[];
    source?: TypefaceSourceInput;
    ranges: TypefaceRangeInput[];
    styles: TypefaceStyleInput[];
};

export type TypefaceValueAttributesInput = Partial<TypefaceLiteral> & {
    fontName: string;
};

export type TypefaceValueInput = DecisionRef | TypefaceValueAttributesInput;
