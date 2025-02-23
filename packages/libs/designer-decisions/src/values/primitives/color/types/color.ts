import type { Color as ChromaColor } from 'chroma-js';

import type { ColorFormat, ColorObjectLiteral } from '../../../../inputs';
import type { NumberValueOptions } from '../../number/types';

export type ColorFormatOptions = NumberValueOptions;

export type Color = {
    get: () => ChromaColor;
    toObject<T extends ColorObjectLiteral = ColorObjectLiteral>(
        format: ColorFormat,
        options?: ColorFormatOptions,
    ): T;
    toString(format: ColorFormat, options?: ColorFormatOptions): string;
};
