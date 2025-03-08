import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type SizeLiteral, type SizeValueInput } from '../../../inputs';
import {
    createPrimitiveContextMock,
    createValueContextMock,
    mockSizeDefinition,
} from '../../../mocks';
import { type NumberFormatOptions, type Size, createSize } from '../../../primitives';

import { createSizeBaseValue } from './createSizeBaseValue';
import { resolveSizeBaseValue } from './resolveSizeBaseValue';

vi.mock('./resolveSizeBaseValue');
vi.mock('../../../primitives');

const resolveSizeBaseValueMocked = vi.mocked(resolveSizeBaseValue);
const createSizeMocked = vi.mocked(createSize);

describe('createSizeBaseValue()', () => {
    const sizeDef = mockSizeDefinition;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given a size definition, a context, and an input', () => {
        const mockInput = { value: 123.371, units: 'rem' } as SizeValueInput;
        const [mockValueContext, { forPrimitiveSpy }] = createValueContextMock(mockInput);

        const mockLiteral = { value: 44 } as SizeLiteral;
        const [mockPrimitiveContext] = createPrimitiveContextMock();
        const mockSize = { value: 33 } as Size;
        const mockOptions = {} as NumberFormatOptions;

        beforeEach(() => {
            resolveSizeBaseValueMocked.mockReturnValue(mockLiteral);
            forPrimitiveSpy.mockReturnValue(mockPrimitiveContext);
            createSizeMocked.mockReturnValue(mockSize);
        });

        it('should return a BaseValue with the provided context', () => {
            const result = createSizeBaseValue(sizeDef, mockValueContext);
            expect(result.context()).toEqual(mockValueContext);
        });

        it('should return a  Value with the primitive attributes', () => {
            const result = createSizeBaseValue(sizeDef, mockValueContext);
            expect(result.value).toEqual(mockSize.value);
        });

        it('should call resolveSizeBaseValue() with the expected arguments', () => {
            createSizeBaseValue(sizeDef, mockValueContext, mockOptions);
            expect(resolveSizeBaseValueMocked).toHaveBeenCalledWith(sizeDef, mockValueContext);
        });

        it('should call primitiveContext() with the resolved input', () => {
            createSizeBaseValue(sizeDef, mockValueContext, mockOptions);
            expect(forPrimitiveSpy).toHaveBeenCalledWith(mockLiteral);
        });

        it('should call createSize() with the expected arguments', () => {
            createSizeBaseValue(sizeDef, mockValueContext, mockOptions);
            expect(createSizeMocked).toHaveBeenCalledWith(
                sizeDef,
                mockPrimitiveContext,
                mockOptions,
            );
        });

        describe('when get() is called', () => {
            it('should return the created Size primitive', () => {
                const result = createSizeBaseValue(sizeDef, mockValueContext, mockOptions);
                expect(result.get()).toBe(mockSize);
            });
        });
    });
});
