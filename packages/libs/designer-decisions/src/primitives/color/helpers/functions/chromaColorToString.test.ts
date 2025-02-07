import chroma from 'chroma-js';
import { describe, expect, it } from 'vitest';

import { chromaColorToString } from './chromaColorToString';

describe('chromaColorToString()', () => {
    describe('Given a color', () => {
        it('should convert to "oklch" format', () => {
            const color = chroma.oklch(0.51235, 0.03357, 310.327);
            const result = chromaColorToString(color, 'oklch');
            expect(result).toEqual('oklch(51.24% 0.0336 310.33deg)');
        });

        it('should convert to "oklab" format', () => {
            const color = chroma.oklab(0.51235, 0.03357, -0.03357);
            const result = chromaColorToString(color, 'oklab');
            expect(result).toEqual('oklab(51.24% 0.0336 -0.0336)');
        });

        it('should convert to "hsl" format', () => {
            const color = chroma.hsl(310.327, 0.51235, 0.41235);
            const result = chromaColorToString(color, 'hsl');
            expect(result).toEqual('hsl(310.33deg 51.24% 41.24%)');
        });

        it('should convert to "rgb" hex format', () => {
            const color = chroma.rgb(128, 64, 32);
            const result = chromaColorToString(color, 'rgb');
            expect(result).toEqual('#804020');
        });
    });

    describe('Given a color and a quantize', () => {
        const quantize = 1;

        it('should convert to "oklch" format', () => {
            const color = chroma.oklch(0.51235, 0.03357, 310.327);
            const result = chromaColorToString(color, 'oklch', quantize);
            expect(result).toEqual('oklch(51% 0.03 310deg)');
        });

        it('should convert to "oklab" format', () => {
            const color = chroma.oklab(0.51235, 0.03357, -0.03357);
            const result = chromaColorToString(color, 'oklab', quantize);
            expect(result).toEqual('oklab(51% 0.03 -0.03)');
        });

        it('should convert to "hsl" format', () => {
            const color = chroma.hsl(310.327, 0.51235, 0.41235);
            const result = chromaColorToString(color, 'hsl', quantize);
            expect(result).toEqual('hsl(310deg 51% 41%)');
        });
    });
});
