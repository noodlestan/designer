import type { ColorFormat, ColorLiteral } from '../../../inputs';
import type { ColorValueOptions } from '../../domains';

import { chromaColorFromLiteral, chromaColorToLiteral, chromaColorToString } from './functions';
import type { Color, ColorFormatOptions } from './types';

export function createColor(input: ColorLiteral, options: ColorValueOptions = {}): Color {
    const { quantize } = options;
    const color = chromaColorFromLiteral(input);

    return {
        get: () => color,
        toObject: (format: ColorFormat, { quantize: q }: ColorFormatOptions = {}) => {
            return chromaColorToLiteral(color, format, q ?? quantize);
        },
        toString: (format: ColorFormat, { quantize: q }: ColorFormatOptions = {}) => {
            return chromaColorToString(color, format, q ?? quantize);
        },
    };
}
