import type { Color as ChromaColor } from 'chroma-js';

import type { ColorFormat, ColorObjectLiteral } from '../../../../inputs';
import { quantized } from '../../number';
import {
    COLOR_CHANNEL_OKLAB_CHROMA_BASE as OKLAB_CHROMA_BASE,
    COLOR_CHANNEL_OKLAB_HUE_BASE as OKLAB_HUE_BASE,
    COLOR_CHANNEL_OKLAB_LIGHTNESS_BASE as OKLAB_LIGHTNESS_BASE,
    COLOR_CHANNEL_SRGB_HUE_BASE as SRGB_HUE_BASE,
    COLOR_CHANNEL_SRGB_LIGHTNESS_BASE as SRGB_LIGHTNESS_BASE,
    COLOR_CHANNEL_SRGB_SATURATION_BASE as SRGB_SATURATION_BASE,
} from '../constants';

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
