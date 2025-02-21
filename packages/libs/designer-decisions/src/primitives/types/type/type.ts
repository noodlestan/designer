import type { TypefaceRangeInput, TypefaceSourceInput, TypefaceStyleInput } from '../../../inputs';
import type { BaseValue } from '../base';

export type Typeface = {
    fontName: string;
    capabilities: string[];
    source?: TypefaceSourceInput;
    ranges: TypefaceRangeInput[];
    styles: TypefaceStyleInput[];
    toString: () => string;
};

export type TypefaceValue = BaseValue<Typeface>;
