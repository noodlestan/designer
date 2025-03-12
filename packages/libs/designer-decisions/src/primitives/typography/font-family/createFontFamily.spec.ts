import { describe, expect, it } from 'vitest';

import type { FontFamilyLiteral } from '../../../inputs';
import { createPrimitiveContextMock } from '../../../mocks';

import { FONT_FAMILY_FALLBACK_LITERAL } from './constants';
import { createFontFamily } from './createFontFamily';

describe('createFontFamily()', () => {
    describe('Given a string', () => {
        const fontFamilyInput = 'Foo';

        const [primitiveContext] = createPrimitiveContextMock(fontFamilyInput);
        const fontFamily = createFontFamily(primitiveContext);

        it('should expose the family names', () => {
            expect(fontFamily.families).toEqual(['Foo']);
        });

        it('should expose the font names', () => {
            expect(fontFamily.fontName).toEqual('Foo');
        });

        it('should expose a string with the font family', () => {
            const result = fontFamily.toString();
            expect(result).toEqual('Foo');
        });

        it('should expose a literal with all the properties', () => {
            const literal = fontFamily.literal();
            expect(literal).toEqual({
                families: ['Foo'],
                fontName: 'Foo',
            });
        });
    });

    describe('Given a string with multiple items', () => {
        const fontFamilyInput = 'Foo, Bar, "baz qux"';

        const [primitiveContext] = createPrimitiveContextMock(fontFamilyInput);
        const fontFamily = createFontFamily(primitiveContext);

        it('should expose the family names', () => {
            expect(fontFamily.families).toEqual(['Foo', 'Bar', 'baz qux']);
        });

        it('should expose the font names', () => {
            expect(fontFamily.fontName).toEqual('Foo');
        });

        it('should expose a string with the font families, adding quotes to the items that need it', () => {
            const result = fontFamily.toString();
            expect(result).toEqual('Foo, Bar, "baz qux"');
        });
    });

    describe('Given a string with whitespace', () => {
        const fontFamilyInput = ' Foo\n ';
        const [primitiveContext] = createPrimitiveContextMock(fontFamilyInput);
        const fontFamily = createFontFamily(primitiveContext);

        it('should trim the value', () => {
            expect(fontFamily.families).toEqual(['Foo']);
        });
    });

    describe('Given a string with multiple items', () => {
        const fontFamilyInput = 'Foo, Bar, "baz qux", Qux+Bar';

        const [primitiveContext] = createPrimitiveContextMock(fontFamilyInput);
        const fontFamily = createFontFamily(primitiveContext);

        it('should expose the unquoted family names', () => {
            expect(fontFamily.families).toEqual(['Foo', 'Bar', 'baz qux', 'Qux+Bar']);
        });

        it('should expose a string with the font families, adding quotes to the items that need it', () => {
            const result = fontFamily.toString();
            expect(result).toEqual('Foo, Bar, "baz qux", "Qux+Bar"');
        });
    });

    describe('Given a string with multiple items, some containg whitespace', () => {
        const fontFamilyInput = ' Foo\n , Bar, " baz qux"';
        const [primitiveContext] = createPrimitiveContextMock(fontFamilyInput);
        const fontFamily = createFontFamily(primitiveContext);

        it('should trim and unquote the values', () => {
            expect(fontFamily.families).toEqual(['Foo', 'Bar', 'baz qux']);
        });
    });

    describe('Given a string with multiple items, some being empty', () => {
        const fontFamilyInput = 'Foo, , " "';
        const [primitiveContext] = createPrimitiveContextMock(fontFamilyInput);
        const fontFamily = createFontFamily(primitiveContext);

        it('should return only the valid values', () => {
            expect(fontFamily.families).toEqual(['Foo']);
        });
    });

    describe('Given an array', () => {
        const fontFamilyInput = ['Foo', 'Bar', 'baz qux', '"Qux+Bar"'];

        const [primitiveContext] = createPrimitiveContextMock(fontFamilyInput);
        const fontFamily = createFontFamily(primitiveContext);

        it('should expose the family names', () => {
            expect(fontFamily.families).toEqual(['Foo', 'Bar', 'baz qux', 'Qux+Bar']);
        });

        it('should expose a string with the font families, adding quotes to the items that need it', () => {
            const result = fontFamily.toString();
            expect(result).toEqual('Foo, Bar, "baz qux", "Qux+Bar"');
        });
    });

    describe('Given am array with multiple items, some containg whitespace', () => {
        const fontFamilyInput = [' Foo\n ', ' Bar', ' baz qux'];
        const [primitiveContext] = createPrimitiveContextMock(fontFamilyInput);
        const fontFamily = createFontFamily(primitiveContext);

        it('should trim and unquote the values', () => {
            expect(fontFamily.families).toEqual(['Foo', 'Bar', 'baz qux']);
        });
    });

    describe('Given am array with multiple items, some being empty', () => {
        const fontFamilyInput = ['Foo', ' ', '" "'];
        const [primitiveContext] = createPrimitiveContextMock(fontFamilyInput);
        const fontFamily = createFontFamily(primitiveContext);

        it('should return only the valid values', () => {
            expect(fontFamily.families).toEqual(['Foo']);
        });
    });

    describe('Given an empty string', () => {
        const fontFamilyInput = '';
        const [primitiveContext] = createPrimitiveContextMock(fontFamilyInput);
        const fontFamily = createFontFamily(primitiveContext);

        it('should expose the fallback value', () => {
            expect(fontFamily.families).toEqual(FONT_FAMILY_FALLBACK_LITERAL);
        });
    });

    describe('Given an empty array', () => {
        const fontFamilyInput = [] as FontFamilyLiteral;
        const [primitiveContext] = createPrimitiveContextMock(fontFamilyInput);
        const fontFamily = createFontFamily(primitiveContext);

        it('should expose the fallback value', () => {
            expect(fontFamily.families).toEqual(FONT_FAMILY_FALLBACK_LITERAL);
        });
    });
});
