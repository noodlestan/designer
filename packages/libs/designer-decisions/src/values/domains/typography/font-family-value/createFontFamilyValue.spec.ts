import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type FontFamilyArrayLiteral, type FontFamilyInput } from '../../../../inputs';
import { createPrimitiveContextMock, createValueContextMock } from '../../../../mocks';
import { type FontFamily, createFontFamily } from '../../../../primitives';

import { createFontFamilyValue } from './createFontFamilyValue';
import { resolveFontFamilyValue } from './resolveFontFamilyValue';

vi.mock('./resolveFontFamilyValue');
vi.mock('../../../../primitives');

const resolveFontFamilyValueMocked = vi.mocked(resolveFontFamilyValue);
const createFontFamilyMocked = vi.mocked(createFontFamily);

describe('createFontFamilyValue()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given a context and an input', () => {
        const mockInput = { $name: 'Foo' } as FontFamilyInput;
        const [mockValueContext, { forPrimitiveSpy }] = createValueContextMock(mockInput);

        const mockFontFamily = { families: ['Foo, Bar, "Baz Qux"'] } as FontFamily;
        const mockLiteral = ['Foo'] as FontFamilyArrayLiteral;

        const [mockPrimitiveContext] = createPrimitiveContextMock();

        beforeEach(() => {
            resolveFontFamilyValueMocked.mockReturnValue(mockLiteral);
            forPrimitiveSpy.mockReturnValue(mockPrimitiveContext);
            createFontFamilyMocked.mockReturnValue(mockFontFamily);
        });

        it('should return a FontFamilyValue with the provided context', () => {
            const result = createFontFamilyValue(mockValueContext);
            expect(result.context()).toEqual(mockValueContext);
        });

        it('should return a FontFamilyValue with the primitive attributes', () => {
            const result = createFontFamilyValue(mockValueContext);
            expect(result.families).toEqual(mockFontFamily.families);
        });

        it('should call resolveFontFamilyValue() with the expected arguments', () => {
            createFontFamilyValue(mockValueContext);
            expect(resolveFontFamilyValueMocked).toHaveBeenCalledWith(mockValueContext);
        });

        it('should call forPrimitive() with the resolved input', () => {
            createFontFamilyValue(mockValueContext);
            expect(forPrimitiveSpy).toHaveBeenCalledWith(mockLiteral);
        });

        it('should call createColor() with the expected arguments', () => {
            createFontFamilyValue(mockValueContext);
            expect(createFontFamilyMocked).toHaveBeenCalledWith(mockPrimitiveContext);
        });

        describe('when get() is called', () => {
            it('should return the created FontFamily primitive', () => {
                const result = createFontFamilyValue(mockValueContext);
                expect(result.get()).toBe(mockFontFamily);
            });
        });
    });
});
