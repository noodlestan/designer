import type { TypefaceRangeInput, TypefaceSourceInput, TypefaceStyleInput } from '../../../inputs';
import type { BaseValue } from '../../primitives';

export type Typeface = {
    fontName: string;
    capabilities: string[];
    source?: TypefaceSourceInput;
    ranges: TypefaceRangeInput[];
    styles: TypefaceStyleInput[];
    toString: () => string;
};

export type TypefaceValue = BaseValue<Typeface>;
