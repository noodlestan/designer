import type {
    TypefaceRangeInput,
    TypefaceSourceInput,
    TypefaceStyleInput,
} from '../../../../inputs';

export type Typeface = {
    fontName: string;
    capabilities: string[];
    source?: TypefaceSourceInput;
    ranges: TypefaceRangeInput[];
    styles: TypefaceStyleInput[];
    toString: () => string;
};
