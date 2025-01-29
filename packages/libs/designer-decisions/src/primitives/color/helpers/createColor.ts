import type { Color, ColorFormat, ColorLiteral } from '../../../types';

import { chromaColorFromLiteral, chromaColorToString } from './functions';
import { chromaColorToLiteral } from './functions/chromaColorToLiteral';

export function createColor(input: ColorLiteral): Color {
    const color = chromaColorFromLiteral(input);

    return {
        get: () => color,
        toObject: (format: ColorFormat) => chromaColorToLiteral(color, format),
        toString: (format: ColorFormat) => chromaColorToString(color, format),
    };
}
