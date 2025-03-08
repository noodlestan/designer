import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type TypefaceObjectLiteral, type TypefaceValueInput } from '../../../../inputs';
import { createPrimitiveContextMock, createValueContextMock } from '../../../../mocks';
import { type Typeface, createTypeface } from '../../../../primitives';

import { createTypefaceValue } from './createTypefaceValue';
import { resolveTypefaceValue } from './resolveTypefaceValue';

vi.mock('./resolveTypefaceValue');
vi.mock('../../../../primitives');

const resolveTypefaceValueMocked = vi.mocked(resolveTypefaceValue);
const createTypefaceMocked = vi.mocked(createTypeface);

describe('createTypefaceValue()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given a size definition, a context, and an input', () => {
        const mockInput = { $name: 'Foo' } as TypefaceValueInput;
        const [mockValueContext, { forPrimitiveSpy }] = createValueContextMock(mockInput);

        const mockTypeface = { fontName: 'foo' } as Typeface;
        const mockLiteral = {
            fontName: 'Foo',
        } as TypefaceObjectLiteral;

        const [mockPrimitiveContext] = createPrimitiveContextMock();

        beforeEach(() => {
            resolveTypefaceValueMocked.mockReturnValue(mockLiteral);
            forPrimitiveSpy.mockReturnValue(mockPrimitiveContext);
            createTypefaceMocked.mockReturnValue(mockTypeface);
        });

        it('should return a BaseValue with the provided context', () => {
            const result = createTypefaceValue(mockValueContext);
            expect(result.context()).toEqual(mockValueContext);
        });

        it('should return a Value with the primitive attributes', () => {
            const result = createTypefaceValue(mockValueContext);
            expect(result.fontName).toEqual(mockTypeface.fontName);
        });

        it('should call resolveTypefaceValue() with the expected arguments', () => {
            createTypefaceValue(mockValueContext);
            expect(resolveTypefaceValueMocked).toHaveBeenCalledWith(mockValueContext);
        });

        it('should call primitiveContext() with the resolved input', () => {
            createTypefaceValue(mockValueContext);
            expect(forPrimitiveSpy).toHaveBeenCalledWith(mockLiteral);
        });

        it('should call createColor() with the expected arguments', () => {
            createTypefaceValue(mockValueContext);
            expect(createTypefaceMocked).toHaveBeenCalledWith(mockPrimitiveContext);
        });

        describe('when get() is called', () => {
            it('should return the created Size primitive', () => {
                const result = createTypefaceValue(mockValueContext);
                expect(result.get()).toBe(mockTypeface);
            });
        });
    });
});
