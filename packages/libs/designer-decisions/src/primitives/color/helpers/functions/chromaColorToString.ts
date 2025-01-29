import type { Color as ChromaColor } from 'chroma-js';

import type { ColorFormat, ColorOkLCHLiteral, ColorOkLabLiteral } from '../../../../types';

import { chromaColorToLiteral } from './chromaColorToLiteral';

const round = (value: number, precision: number): number => {
    const factor = 10 ** precision;
    return Math.round(value * factor) / factor;
};

export function chromaColorToString(
    color: ChromaColor,
    format: ColorFormat,
    precision: number = 5,
): string {
    const p = precision;
    if (format === 'oklch') {
        const object = chromaColorToLiteral<ColorOkLCHLiteral>(color, format);
        return `oklch(${round(object.l * 100, p)}% ${round(object.c, p)} ${round(object.h || 0, p)}deg)`;
    } else if (format === 'oklab') {
        const object = chromaColorToLiteral<ColorOkLabLiteral>(color, format);
        return `oklab(${round(object.l * 100, p)}% ${round(object.a, p)} ${round(object.b, p)})`;
    } else if (format === 'hsl') {
        return color.css('hsl');
    }
    return color.hex('rgb');
}
