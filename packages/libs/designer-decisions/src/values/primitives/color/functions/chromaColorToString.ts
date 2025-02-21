import type { Color as ChromaColor } from 'chroma-js';

import type { ColorFormat } from '../../../../inputs';
import { quantized } from '../../number';
import {
    COLOR_CHANNEL_OKLAB_CHROMA_BASE as OKLAB_CHROMA_BASE,
    COLOR_CHANNEL_OKLAB_HUE_BASE as OKLAB_HUE_BASE,
    COLOR_CHANNEL_OKLAB_LIGHTNESS_BASE as OKLAB_LIGHTNESS_BASE,
    COLOR_CHANNEL_SRGB_HUE_BASE as SRGB_HUE_BASE,
    COLOR_CHANNEL_SRGB_LIGHTNESS_BASE as SRGB_LIGHTNESS_BASE,
    COLOR_CHANNEL_SRGB_SATURATION_BASE as SRGB_SATURATION_BASE,
} from '../constants';

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
