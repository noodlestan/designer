import type { Color as ChromaColor } from 'chroma-js';

import type { ColorFormat, ColorObjectLiteral } from '../../../../types';

export function chromaColorToLiteral<T extends ColorObjectLiteral = ColorObjectLiteral>(
    color: ChromaColor,
    format: ColorFormat,
): T {
    if (format === 'oklch') {
        const [l, c, h] = color.oklch();
        return { l: l || 0, c: c || 0, h: h || 0 } as T;
    } else if (format === 'oklab') {
        const [l, a, b] = color.oklab();
        return { l, a, b } as T;
    } else if (format === 'hsl') {
        const [h, s, l] = color.hsl();
        return { h: h || 0, s, l } as T;
    }
    const [r, g, b] = color.rgb();
    return { r, g, b } as T;
}
