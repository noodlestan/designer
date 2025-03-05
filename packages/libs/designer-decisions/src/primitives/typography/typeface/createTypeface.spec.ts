import { describe, expect, it } from 'vitest';

import type { TypefaceLiteral } from '../../../inputs';
import { createPrimitiveContextMock } from '../../../mocks';

import { createTypeface } from './createTypeface';
import { TYPEFACE_FALLBACK_FONT_NAME } from './private';

describe('createTypeface()', () => {
    describe('Given a string', () => {
        const typefaceInput = 'Foo';

        const [primitiveContext] = createPrimitiveContextMock(typefaceInput);
        const typeface = createTypeface(primitiveContext);

        it('should expose the default attributes', () => {
            expect(typeface.fontName).toEqual('Foo');
            expect(typeface.capabilities).toEqual([]);
            expect(typeface.source).toBeUndefined();
            expect(typeface.ranges).toEqual([]);
            expect(typeface.styles).toEqual([]);
        });

        it('should expose a string with the font name', () => {
            const result = typeface.toString();
            expect(result).toBe('Foo');
        });

        it('should expose a literal with all the properties', () => {
            const literal = typeface.literal();
            expect(literal).toEqual({
                capabilities: [],
                fontName: 'Foo',
                ranges: [],
                source: undefined,
                styles: [],
            });
        });
    });

    describe('Given a string with whitespace', () => {
        const typefaceInput = ' Foo\n ';
        const [primitiveContext] = createPrimitiveContextMock(typefaceInput);
        const typeface = createTypeface(primitiveContext);

        it('should trim the value', () => {
            expect(typeface.fontName).toEqual('Foo');
        });
    });

    describe('Given an empty string', () => {
        const typefaceInput = '';
        const [primitiveContext] = createPrimitiveContextMock(typefaceInput);
        const typeface = createTypeface(primitiveContext);

        it('should expose the fallback value', () => {
            expect(typeface.fontName).toEqual(TYPEFACE_FALLBACK_FONT_NAME);
        });
    });

    describe('Given a minimal TypefaceInput', () => {
        const typefaceInput = { fontName: 'Foo' };
        const [primitiveContext] = createPrimitiveContextMock(typefaceInput);
        const typeface = createTypeface(primitiveContext);

        it('should expose the default attributes', () => {
            expect(typeface.fontName).toEqual(typefaceInput.fontName);
            expect(typeface.capabilities).toEqual([]);
            expect(typeface.source).toBeUndefined();
            expect(typeface.ranges).toEqual([]);
            expect(typeface.styles).toEqual([]);
        });

        it('should expose a string with the font name', () => {
            const result = typeface.toString();
            expect(result).toBe(typefaceInput.fontName);
        });

        it('should expose a literal with all the properties', () => {
            const literal = typeface.literal();
            expect(literal).toEqual({
                capabilities: [],
                fontName: 'Foo',
                ranges: [],
                source: undefined,
                styles: [],
            });
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
        const [primitiveContext] = createPrimitiveContextMock(typefaceInput);
        const typeface = createTypeface(primitiveContext);

        it('should expose a literal with all the properties', () => {
            const literal = typeface.literal();
            expect(literal).toEqual(typefaceInput);
        });
    });

    describe('Given a TypefaceInput with unsupported capabilities', () => {
        const typefaceInput = { fontName: 'Foo', capabilities: ['foo', 'variable', 'bar'] };
        const [primitiveContext] = createPrimitiveContextMock(typefaceInput);
        const typeface = createTypeface(primitiveContext);

        it('should ignore the unsupported capabilities', () => {
            expect(typeface.capabilities).toEqual(['variable']);
        });
    });
});
