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

    describe('Given a context and an input', () => {
        const mockInput = { name: 'Black' } as FontWeightInput;
        const [mockValueContext, { forPrimitiveSpy }] = createValueContextMock(mockInput);

        const mockLiteral = { value: 100 } as FontWeightObjectLiteral;
        const [mockPrimitiveContext] = createPrimitiveContextMock();
        const mockFontWeight = { value: 100 } as FontWeight;

        beforeEach(() => {
            resolveFontWeightValueMocked.mockReturnValue(mockLiteral);
            forPrimitiveSpy.mockReturnValue(mockPrimitiveContext);
            createFontWeightMocked.mockReturnValue(mockFontWeight);
        });

        it('should return a BaseValue with the provided context', () => {
            const result = createFontWeightValue(mockValueContext);
            expect(result.context()).toEqual(mockValueContext);
        });

        it('should return a Value with the primitive attributes', () => {
            const result = createFontWeightValue(mockValueContext);
            expect(result.value).toEqual(mockFontWeight.value);
        });

        it('should call resolveFontWeightValue() with the expected arguments', () => {
            createFontWeightValue(mockValueContext);
            expect(resolveFontWeightValueMocked).toHaveBeenCalledWith(mockValueContext);
        });

        it('should call primitiveContext() with the resolved input', () => {
            createFontWeightValue(mockValueContext);
            expect(forPrimitiveSpy).toHaveBeenCalledWith(mockLiteral);
        });

        it('should call createColor() with the expected arguments', () => {
            createFontWeightValue(mockValueContext);
            expect(createFontWeightMocked).toHaveBeenCalledWith(mockPrimitiveContext);
        });

        describe('when get() is called', () => {
            it('should return the created FontWeight primitive', () => {
                const result = createFontWeightValue(mockValueContext);
                expect(result.get()).toBe(mockFontWeight);
            });
        });
    });
});
