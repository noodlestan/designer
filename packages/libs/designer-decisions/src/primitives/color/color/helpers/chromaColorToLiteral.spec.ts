import chroma from 'chroma-js';
import { describe, expect, it } from 'vitest';

import type {
    ColorOkLCHLiteral,
    ColorOkLabLiteral,
    ColorSRGBChannelsLiteral,
    ColorSRGBHSLiteral,
} from '../../../../inputs';
import {
    COLOR_FORMAT_HSL,
    COLOR_FORMAT_OKLAB,
    COLOR_FORMAT_OKLCH,
    COLOR_FORMAT_RGB,
} from '../../channel/constants';

import { chromaColorToLiteral } from './chromaColorToLiteral';

describe('chromaColorToLiteral()', () => {
    describe('Given a color', () => {
        it('should convert to "oklch" format', () => {
            const color = chroma.oklch(0.51235, 0.03357, 310.327);
            const result = chromaColorToLiteral<ColorOkLCHLiteral>(color, COLOR_FORMAT_OKLCH);
            expect(result).toEqual({
                l: 0.5124,
                c: 0.0336,
                h: 310.33,
            });
        });

        it('should convert to "oklab" format', () => {
            const color = chroma.oklab(0.51235, 0.03357, -0.03357);
            const result = chromaColorToLiteral<ColorOkLabLiteral>(color, COLOR_FORMAT_OKLAB);
            expect(result).toEqual({
                l: 0.5124,
                a: 0.0336,
                b: -0.0336,
            });
        });

        it('should convert to "hsl" format', () => {
            const color = chroma.hsl(310.327, 0.51235, 0.41235);
            const result = chromaColorToLiteral<ColorSRGBHSLiteral>(color, COLOR_FORMAT_HSL);
            expect(result).toEqual({
                h: 310.33,
                s: 0.5124,
                l: 0.4124,
            });
        });

        it('should convert to "rgb" hex format', () => {
            const color = chroma.rgb(128.137, 64.137, 32.137);
            const result = chromaColorToLiteral<ColorSRGBChannelsLiteral>(color, COLOR_FORMAT_RGB);
            expect(result).toEqual({
                r: 128,
                g: 64,
                b: 32,
            });
        });
    });

    describe('Given a color and a quantize', () => {
        const quantize = 1;

        it('should convert to "oklch" format', () => {
            const color = chroma.oklch(0.51235, 0.03357, 310.327);
            const result = chromaColorToLiteral<ColorOkLCHLiteral>(
                color,
                COLOR_FORMAT_OKLCH,
                quantize,
            );
            expect(result).toEqual({
                l: 0.51,
                c: 0.03,
                h: 310,
            });
        });

        it('should convert to "oklab" format', () => {
            const color = chroma.oklab(0.51235, 0.03357, -0.03357);
            const result = chromaColorToLiteral<ColorOkLabLiteral>(
                color,
                COLOR_FORMAT_OKLAB,
                quantize,
            );
            expect(result).toEqual({
                l: 0.51,
                a: 0.03,
                b: -0.03,
            });
        });

        it('should convert to "hsl" format', () => {
            const color = chroma.hsl(310.327, 0.51235, 0.41235);
            const result = chromaColorToLiteral<ColorSRGBHSLiteral>(
                color,
                COLOR_FORMAT_HSL,
                quantize,
            );
            expect(result).toEqual({
                h: 310,
                s: 0.51,
                l: 0.41,
            });
        });
    });
});
