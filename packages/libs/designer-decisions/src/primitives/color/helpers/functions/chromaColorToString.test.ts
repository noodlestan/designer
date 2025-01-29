import chroma from 'chroma-js';
import { describe, expect, it } from 'vitest';

import { chromaColorToString } from './chromaColorToString';

describe('chromaColorToString()', () => {
    it('should convert to OKLCH string', () => {
        const color = chroma.oklch(0.04, 0.01, 15);
        const result = chromaColorToString(color, 'oklch', 2);
        expect(result).toEqual('oklch(4% 0.01 15deg)');
    });

    it('should convert to OKLAB string', () => {
        const color = chroma.oklab(0.5, 0.1, -0.2);
        const result = chromaColorToString(color, 'oklab', 2);
        expect(result).toEqual('oklab(50% 0.1 -0.2)');
    });

    it('should convert to HSL string', () => {
        const color = chroma.hsl(240, 0.5, 0.4);
        const result = chromaColorToString(color, 'hsl', 2);
        expect(result).toEqual('hsl(240deg 50% 40%)');
    });

    it('should convert to RGB hex string', () => {
        const color = chroma.rgb(128, 64, 32);
        const result = chromaColorToString(color, 'rgb', 2);
        expect(result).toEqual('#804020');
    });
});
