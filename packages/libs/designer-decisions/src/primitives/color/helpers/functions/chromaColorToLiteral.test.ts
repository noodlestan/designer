import chroma from 'chroma-js';
import { describe, expect, it } from 'vitest';

import type {
    ColorOkLCHLiteral,
    ColorOkLabLiteral,
    ColorSRGBChannelsLiteral,
    ColorSRGBHSLiteral,
} from '../../../../types';

import { chromaColorToLiteral } from './chromaColorToLiteral';

describe('chromaColorToLiteral', () => {
    it('should convert to OKLCH format', () => {
        const color = chroma.oklch(0.04, 0.01, 15);
        const result = chromaColorToLiteral<ColorOkLCHLiteral>(color, 'oklch');
        expect(result.l).toBeCloseTo(0.04);
        expect(result.c).toBeCloseTo(0.01);
        expect(result.h).toBeCloseTo(15);
    });

    it('should convert to OKLAB format', () => {
        const color = chroma.oklab(0.5, 0.1, -0.2);
        const result = chromaColorToLiteral<ColorOkLabLiteral>(color, 'oklab');
        expect(result.l).toBeCloseTo(0.5);
        expect(result.a).toBeCloseTo(0.1);
        expect(result.b).toBeCloseTo(-0.2);
    });

    it('should convert to HSL format', () => {
        const color = chroma.hsl(240, 0.5, 0.4);
        const result = chromaColorToLiteral<ColorSRGBHSLiteral>(color, 'hsl');
        expect(result.h).toBeCloseTo(240);
        expect(result.s).toBeCloseTo(0.5);
        expect(result.l).toBeCloseTo(0.4);
    });

    it('should convert to SRGB format', () => {
        const color = chroma.rgb(128, 64, 32);
        const result = chromaColorToLiteral<ColorSRGBChannelsLiteral>(color, 'rgb');
        expect(result.r).toEqual(128);
        expect(result.g).toEqual(64);
        expect(result.b).toEqual(32);
    });
});
