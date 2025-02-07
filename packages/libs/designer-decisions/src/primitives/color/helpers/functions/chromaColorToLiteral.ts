import type { Color as ChromaColor } from 'chroma-js';

import type { ColorFormat, ColorObjectLiteral } from '../../../../types';
import { quantized } from '../../../number';

const OKLAB_LIGHTNESS_BASE = 2;
const OKLAB_CHROMA_BASE = 2;
const OKLAB_HUE_BASE = 0;
const SRGB_HUE_BASE = 0;
const SRGB_LIGHTNESS_BASE = 2;
const SRGB_SATURATION_BASE = 2;

export function chromaColorToLiteral<T extends ColorObjectLiteral = ColorObjectLiteral>(
    color: ChromaColor,
    format: ColorFormat,
    quantize: number = 0.01,
): T {
    if (format === 'oklch') {
        const [l, c, h] = color.oklch();

        return {
            l: quantized(l || 0, quantize, OKLAB_LIGHTNESS_BASE),
            c: quantized(c || 0, quantize, OKLAB_CHROMA_BASE),
            h: quantized(h || 0, quantize, OKLAB_HUE_BASE),
        } as T;
    } else if (format === 'oklab') {
        const [l, a, b] = color.oklab();

        return {
            l: quantized(l || 0, quantize, OKLAB_LIGHTNESS_BASE),
            a: quantized(a || 0, quantize, OKLAB_CHROMA_BASE),
            b: quantized(b || 0, quantize, OKLAB_CHROMA_BASE),
        } as T;
    } else if (format === 'hsl') {
        const [h, s, l] = color.hsl();

        return {
            h: quantized(h || 0, quantize, SRGB_HUE_BASE),
            s: quantized(s || 0, quantize, SRGB_SATURATION_BASE),
            l: quantized(l || 0, quantize, SRGB_LIGHTNESS_BASE),
        } as T;
    }
    const [r, g, b] = color.rgb();
    return { r, g, b } as T;
}
