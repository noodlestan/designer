import type { Color as ChromaColor } from 'chroma-js';

import type { ColorFormat } from '../../../../types';
import { quantized } from '../../../number';

const OKLAB_LIGHTNESS_BASE = 2;
const OKLAB_CHROMA_BASE = 2;
const OKLAB_HUE_BASE = 0;
const SRGB_HUE_BASE = 0;
const SRGB_LIGHTNESS_BASE = 2;
const SRGB_SATURATION_BASE = 2;

export function chromaColorToString(
    color: ChromaColor,
    format: ColorFormat,
    quantize: number = 0.01,
): string {
    if (format === 'oklch') {
        const [l, c, h] = color.oklch();

        const lightness = quantized((l || 0) * 100, quantize * 100, OKLAB_LIGHTNESS_BASE);
        const chroma = quantized(c || 0, quantize, OKLAB_CHROMA_BASE);
        const hue = quantized(h || 0, quantize, OKLAB_HUE_BASE);

        return `oklch(${lightness}% ${chroma} ${hue}deg)`;
    } else if (format === 'oklab') {
        const [l, a, b] = color.oklab();

        const lightness = quantized((l || 0) * 100, quantize * 100, OKLAB_LIGHTNESS_BASE);
        const channelA = quantized(a || 0, quantize, OKLAB_CHROMA_BASE);
        const channelB = quantized(b || 0, quantize, OKLAB_CHROMA_BASE);

        return `oklab(${lightness}% ${channelA} ${channelB})`;
    } else if (format === 'hsl') {
        const [h, s, l] = color.hsl();

        const hue = quantized(h || 0, quantize, SRGB_HUE_BASE);
        const saturation = quantized((s || 0) * 100, quantize * 100, SRGB_SATURATION_BASE);
        const lightness = quantized((l || 0) * 100, quantize * 100, SRGB_LIGHTNESS_BASE);

        return `hsl(${hue}deg ${saturation}% ${lightness}%)`;
    }
    return color.hex('rgb');
}
