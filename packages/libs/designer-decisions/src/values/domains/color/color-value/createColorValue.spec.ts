import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type ColorLiteral, type ColorValueInput, createStaticInput } from '../../../../inputs';
import { createPrimitiveContextMock, createValueContextMock } from '../../../../mocks';
import { type Color, createColor } from '../../../../primitives';
import type { ColorValueOptions } from '../types';

import { createColorValue } from './createColorValue';
import { resolveColorValue } from './resolveColorValue';

vi.mock('./resolveColorValue');
vi.mock('../../../../primitives');

const resolveColorValueMocked = vi.mocked(resolveColorValue);
const createColorMocked = vi.mocked(createColor);

describe('createColorValue()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given a size definition, a context, and an input', () => {
        const params = { $name: 'Foo' } as ColorValueInput;
        const mockInput = createStaticInput({ params });
        const [mockValueContext] = createValueContextMock(mockInput);

        it('should return a BaseValue with the provided context', () => {
            const result = createColorValue(mockValueContext, params);

            expect(result.context()).toEqual(mockValueContext);
        });
    });

    describe('When get() is called', () => {
        const params = { h: 123.371, s: 0.4, l: 0.5 } as ColorValueInput;
        const mockInput = createStaticInput({ params });
        const mockLiteral = '#123abc' as ColorLiteral;
        const mockColor = { chroma: 'foo' } as unknown as Color;
        const [mockValueContext, { primitiveContextSpy }] = createValueContextMock(mockInput);
        const [mockPrimitiveContext] = createPrimitiveContextMock();
        const mockOptions = {} as ColorValueOptions;

        beforeEach(() => {
            resolveColorValueMocked.mockReturnValue(mockLiteral);
            primitiveContextSpy.mockReturnValue(mockPrimitiveContext);
            createColorMocked.mockReturnValue(mockColor);
        });

        it('should call resolveColorValue() with the expected arguments', () => {
            const result = createColorValue(mockValueContext, params, mockOptions);
            result.get();

            expect(resolveColorValueMocked).toHaveBeenCalledWith(mockValueContext, params);
        });

        it('should call primitiveContext() with the resolved input', () => {
            const result = createColorValue(mockValueContext, params, mockOptions);
            result.get();

            expect(primitiveContextSpy).toHaveBeenCalledWith(mockLiteral);
        });

        it('should call createColor() with the expected arguments', () => {
            const result = createColorValue(mockValueContext, params, mockOptions);
            result.get();

            expect(createColorMocked).toHaveBeenCalledWith(mockPrimitiveContext, mockOptions);
        });

        it('should return the created Size primitive', () => {
            const result = createColorValue(mockValueContext, params, mockOptions);

            expect(result.get()).toBe(mockColor);
        });
    });
});
