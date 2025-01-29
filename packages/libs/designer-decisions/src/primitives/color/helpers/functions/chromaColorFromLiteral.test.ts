import { describe, expect, it } from 'vitest';

import type { ColorLiteral } from '../../../../types';

import { chromaColorFromLiteral } from './chromaColorFromLiteral';

describe('chromaColorFromLiteral()', () => {
    it('should create a ChromaColor from an HSL literal', () => {
        const input = { h: 240, s: 0.5, l: 0.4 };
        const [h, s, l] = chromaColorFromLiteral(input).hsl();
        expect(h).toBeCloseTo(240);
        expect(s).toBeCloseTo(0.5);
        expect(l).toBeCloseTo(0.4);
    });

    it('should create a ChromaColor from an OKLAB literal', () => {
        const input = { l: 0.5, a: 0.1, b: -0.2 };
        const [l, a, b] = chromaColorFromLiteral(input).oklab();
        expect(l).toBeCloseTo(0.5);
        expect(a).toBeCloseTo(0.1);
        expect(b).toBeCloseTo(-0.2);
    });

    it('should create a ChromaColor from an OKLCH literal', () => {
        const input = { l: 0.04, c: 0.01, h: 15 };
        const [l, c, h] = chromaColorFromLiteral(input).oklch();
        expect(l).toBeCloseTo(0.04);
        expect(c).toBeCloseTo(0.01);
        expect(h).toBeCloseTo(15);
    });

    it('should create a ChromaColor from a valid color string (hex)', () => {
        const input = '#804020';
        const result = chromaColorFromLiteral(input).hex();
        expect(result).toEqual('#804020');
    });

    it('should throw an error for an invalid color object', () => {
        const input = {} as ColorLiteral;
        expect(() => chromaColorFromLiteral(input)).toThrowError('Invalid color object.');
    });

    it('should throw an error for an invalid color string', () => {
        const input = 'invalidColor';
        expect(() => chromaColorFromLiteral(input)).toThrowError(
            'Invalid color literal "Error: unknown format: invalidColor"',
        );
    });
});
