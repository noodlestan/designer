import type { ColorFormat, ColorLiteral } from '../../../inputs';

import { chromaColorFromLiteral, chromaColorToLiteral, chromaColorToString } from './functions';
import type { Color, ColorValueFormatOptions, ColorValueOptions } from './types';

export function createColor(input: ColorLiteral, options: ColorValueOptions = {}): Color {
    const { quantize } = options;
    const color = chromaColorFromLiteral(input);

    return {
        get: () => color,
        toObject: (format: ColorFormat, { quantize: q }: ColorValueFormatOptions = {}) => {
            return chromaColorToLiteral(color, format, q ?? quantize);
        },
        toString: (format: ColorFormat, { quantize: q }: ColorValueFormatOptions = {}) => {
            return chromaColorToString(color, format, q ?? quantize);
        },
    };
}
