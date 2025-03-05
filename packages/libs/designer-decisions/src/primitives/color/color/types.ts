import type { Color as ChromaColor } from 'chroma-js';

import type { ColorFormat, ColorObjectLiteral } from '../../../inputs';
import type { Primitive } from '../../../primitive';
import type { NumberFormatOptions } from '../../number';

export type ColorFormatOptions = NumberFormatOptions & {
    format?: ColorFormat;
};

export type ChromaColorLiteral = {
    chroma: ChromaColor;
};

export type Color = Primitive<ChromaColorLiteral> & {
    raw: () => ChromaColor;
    toObject<T extends ColorObjectLiteral = ColorObjectLiteral>(options?: ColorFormatOptions): T;
    toString(options?: ColorFormatOptions): string;
};
