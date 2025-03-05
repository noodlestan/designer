import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
    type TypefaceObjectLiteral,
    type TypefaceValueInput,
    createStaticInput,
} from '../../../../inputs';
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
        const params = { $name: 'Foo' } as TypefaceValueInput;
        const mockInput = createStaticInput({ params });
        const [mockValueContext] = createValueContextMock(mockInput);

        it('should return a BaseValue with the provided context', () => {
            const result = createTypefaceValue(mockValueContext, params);

            expect(result.context()).toEqual(mockValueContext);
        });
    });

    describe('When get() is called', () => {
        const params = { fontName: 'Georgia' } as TypefaceValueInput;
        const mockInput = createStaticInput({ params });
        const mockLiteral = {
            fontName: 'Foo',
        } as TypefaceObjectLiteral;
        const mockTypeface = { name: 'foo' } as unknown as Typeface;
        const [mockValueContext, { primitiveContextSpy }] = createValueContextMock(mockInput);
        const [mockPrimitiveContext] = createPrimitiveContextMock();

        beforeEach(() => {
            resolveTypefaceValueMocked.mockReturnValue(mockLiteral);
            primitiveContextSpy.mockReturnValue(mockPrimitiveContext);
            createTypefaceMocked.mockReturnValue(mockTypeface);
        });

        it('should call resolveTypefaceValue() with the expected arguments', () => {
            const result = createTypefaceValue(mockValueContext, params);
            result.get();

            expect(resolveTypefaceValueMocked).toHaveBeenCalledWith(mockValueContext, params);
        });

        it('should call primitiveContext() with the resolved input', () => {
            const result = createTypefaceValue(mockValueContext, params);
            result.get();

            expect(primitiveContextSpy).toHaveBeenCalledWith(mockLiteral);
        });

        it('should call createColor() with the expected arguments', () => {
            const result = createTypefaceValue(mockValueContext, params);
            result.get();

            expect(createTypefaceMocked).toHaveBeenCalledWith(mockPrimitiveContext);
        });

        it('should return the created Size primitive', () => {
            const result = createTypefaceValue(mockValueContext, params);

            expect(result.get()).toBe(mockTypeface);
        });
    });
});
