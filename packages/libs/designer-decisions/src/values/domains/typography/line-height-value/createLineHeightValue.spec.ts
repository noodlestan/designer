import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type LineHeightInput, type LineHeightObjectLiteral } from '../../../../inputs';
import { createPrimitiveContextMock, createValueContextMock } from '../../../../mocks';
import { type LineHeight, createLineHeight } from '../../../../primitives';

import { createLineHeightValue } from './createLineHeightValue';
import { resolveLineHeightValue } from './resolveLineHeightValue';

vi.mock('./resolveLineHeightValue');
vi.mock('../../../../primitives');

const resolveLineHeightValueMocked = vi.mocked(resolveLineHeightValue);
const createLineHeightMocked = vi.mocked(createLineHeight);

describe('createLineHeightValue()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given a context and an input', () => {
        const mockInput = { value: 1.5 } as LineHeightInput;
        const [mockValueContext, { forPrimitiveSpy }] = createValueContextMock(mockInput);

        const mockLiteral = { value: 100 } as LineHeightObjectLiteral;
        const [mockPrimitiveContext] = createPrimitiveContextMock();
        const mockLineHeight = { value: 100 } as LineHeight;

        beforeEach(() => {
            resolveLineHeightValueMocked.mockReturnValue(mockLiteral);
            forPrimitiveSpy.mockReturnValue(mockPrimitiveContext);
            createLineHeightMocked.mockReturnValue(mockLineHeight);
        });

        it('should return a BaseValue with the provided context', () => {
            const result = createLineHeightValue(mockValueContext);
            expect(result.context()).toEqual(mockValueContext);
        });

        it('should return a Value with the primitive attributes', () => {
            const result = createLineHeightValue(mockValueContext);
            expect(result.value).toEqual(mockLineHeight.value);
        });

        it('should call resolveLineHeightValue() with the expected arguments', () => {
            createLineHeightValue(mockValueContext);
            expect(resolveLineHeightValueMocked).toHaveBeenCalledWith(mockValueContext);
        });

        it('should call primitiveContext() with the resolved input', () => {
            createLineHeightValue(mockValueContext);
            expect(forPrimitiveSpy).toHaveBeenCalledWith(mockLiteral);
        });

        it('should call createColor() with the expected arguments', () => {
            createLineHeightValue(mockValueContext);
            expect(createLineHeightMocked).toHaveBeenCalledWith(mockPrimitiveContext);
        });

        describe('when get() is called', () => {
            it('should return the created LineHeight primitive', () => {
                const result = createLineHeightValue(mockValueContext);
                expect(result.get()).toBe(mockLineHeight);
            });
        });
    });
});
