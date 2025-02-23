import { describe, expect, it } from 'vitest';

import { TypefaceLiteral } from '../../../inputs';

import { createTypeface } from './createTypeface';

describe('createTypeface()', () => {
    describe('Given an minimal TypefaceInput', () => {
        const typefaceInput = { fontName: 'Foo' };
        const typeface = createTypeface(typefaceInput);

        it('should expose the default attributes', () => {
            expect(typeface.fontName).toEqual(typefaceInput.fontName);
            expect(typeface.capabilities).toEqual([]);
            expect(typeface.source).toBeUndefined();
            expect(typeface.ranges).toEqual([]);
            expect(typeface.styles).toEqual([]);
        });

        it('should return a string with the font name', () => {
            const result = typeface.toString();
            expect(result).toBe(typefaceInput.fontName);
        });
    });

    describe('Given a complete TypefaceInput', () => {
        const typefaceInput: TypefaceLiteral = {
            fontName: 'Bar',
            source: { type: 'import', value: '@foo/bar/style.css' },
            capabilities: ['variable'],
            styles: [{ italic: true, weight: 300 }],
            ranges: [{ tag: 'ital', min: 0, max: 1, defaultValue: 0 }],
        };
        const typeface = createTypeface(typefaceInput);

        it('should expose the default attributes', () => {
            expect(typeface.fontName).toEqual(typefaceInput.fontName);
            expect(typeface.capabilities).toEqual(typefaceInput.capabilities);
            expect(typeface.source).toEqual(typefaceInput.source);
            expect(typeface.ranges).toEqual(typefaceInput.ranges);
            expect(typeface.styles).toEqual(typefaceInput.styles);
        });

        it('should return a string with the font name', () => {
            const result = typeface.toString();
            expect(result).toBe(typefaceInput.fontName);
        });
    });
});
