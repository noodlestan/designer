import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type FontWeightInput, type FontWeightObjectLiteral } from '../../../../inputs';
import { createPrimitiveContextMock, createValueContextMock } from '../../../../mocks';
import { type FontWeight, createFontWeight } from '../../../../primitives';

import { createFontWeightValue } from './createFontWeightValue';
import { resolveFontWeightValue } from './resolveFontWeightValue';

vi.mock('./resolveFontWeightValue');
vi.mock('../../../../primitives');

const resolveFontWeightValueMocked = vi.mocked(resolveFontWeightValue);
const createFontWeightMocked = vi.mocked(createFontWeight);

describe('createFontWeightValue()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given a size definition, a context, and an input', () => {
        const mockInput = { $name: 'Foo' } as FontWeightInput;
        const [mockValueContext] = createValueContextMock(mockInput);

        it('should return a BaseValue with the provided context', () => {
            const result = createFontWeightValue(mockValueContext);

            expect(result.context()).toEqual(mockValueContext);
        });
    });

    describe('When get() is called', () => {
        const mockInput = { name: 'Black' } as FontWeightInput;
        const [mockValueContext, { primitiveContextSpy }] = createValueContextMock(mockInput);

        const mockLiteral = { value: 100 } as FontWeightObjectLiteral;
        const [mockPrimitiveContext] = createPrimitiveContextMock();
        const mockFontWeight = { name: 'foo' } as unknown as FontWeight;

        beforeEach(() => {
            resolveFontWeightValueMocked.mockReturnValue(mockLiteral);
            primitiveContextSpy.mockReturnValue(mockPrimitiveContext);
            createFontWeightMocked.mockReturnValue(mockFontWeight);
        });

        it('should call resolveFontWeightValue() with the expected arguments', () => {
            const result = createFontWeightValue(mockValueContext);
            result.get();

            expect(resolveFontWeightValueMocked).toHaveBeenCalledWith(mockValueContext);
        });

        it('should call primitiveContext() with the resolved input', () => {
            const result = createFontWeightValue(mockValueContext);
            result.get();

            expect(primitiveContextSpy).toHaveBeenCalledWith(mockLiteral);
        });

        it('should call createColor() with the expected arguments', () => {
            const result = createFontWeightValue(mockValueContext);
            result.get();

            expect(createFontWeightMocked).toHaveBeenCalledWith(mockPrimitiveContext);
        });

        it('should return the created FontWeight primitive', () => {
            const result = createFontWeightValue(mockValueContext);

            expect(result.get()).toBe(mockFontWeight);
        });
    });
});
