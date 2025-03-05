import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type SizeLiteral, type SizeValueInput, createStaticInput } from '../../../inputs';
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
        const params = { $name: 'Foo' } as SizeValueInput;
        const mockInput = createStaticInput({ params });
        const [mockValueContext] = createValueContextMock(mockInput);

        it('should return a BaseValue with the provided context', () => {
            const result = createSizeBaseValue(sizeDef, mockValueContext, params);

            expect(result.context()).toEqual(mockValueContext);
        });
    });

    describe('When get() is called', () => {
        const params = { value: 123.371, units: 'rem' } as SizeValueInput;
        const mockInput = createStaticInput({ params });
        const mockLiteral = { value: 44 } as SizeLiteral;
        const mockSize = { value: 33 } as Size;
        const [mockValueContext, { primitiveContextSpy }] = createValueContextMock(mockInput);
        const [mockPrimitiveContext] = createPrimitiveContextMock();
        const mockOptions = {} as NumberFormatOptions;

        beforeEach(() => {
            resolveSizeBaseValueMocked.mockReturnValue(mockLiteral);
            primitiveContextSpy.mockReturnValue(mockPrimitiveContext);
            createSizeMocked.mockReturnValue(mockSize);
        });

        it('should call resolveSizeBaseValue() with the expected arguments', () => {
            const result = createSizeBaseValue(sizeDef, mockValueContext, params, mockOptions);
            result.get();

            expect(resolveSizeBaseValueMocked).toHaveBeenCalledWith(
                sizeDef,
                mockValueContext,
                params,
            );
        });

        it('should call primitiveContext() with the resolved input', () => {
            const result = createSizeBaseValue(sizeDef, mockValueContext, params, mockOptions);
            result.get();

            expect(primitiveContextSpy).toHaveBeenCalledWith(mockLiteral);
        });

        it('should call createSize() with the expected arguments', () => {
            const result = createSizeBaseValue(sizeDef, mockValueContext, params, mockOptions);
            result.get();

            expect(createSizeMocked).toHaveBeenCalledWith(
                sizeDef,
                mockPrimitiveContext,
                mockOptions,
            );
        });

        it('should return the created Size primitive', () => {
            const result = createSizeBaseValue(sizeDef, mockValueContext, params, mockOptions);

            expect(result.get()).toBe(mockSize);
        });
    });
});
