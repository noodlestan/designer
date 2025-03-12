import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type ColorInput, type ColorLiteral } from '../../../../inputs';
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

    describe('Given a context and an input', () => {
        const mockInput = '#123abc' as ColorInput;
        const [mockValueContext, { forPrimitiveSpy }] = createValueContextMock(mockInput);

        const mockLiteral = { h: 123.371, s: 0.4, l: 0.5 } as ColorLiteral;
        const [mockPrimitiveContext] = createPrimitiveContextMock();
        const mockColor = { chroma: 'foo' } as unknown as Color;
        const mockOptions = {} as ColorValueOptions;

        beforeEach(() => {
            resolveColorValueMocked.mockReturnValue(mockLiteral);
            forPrimitiveSpy.mockReturnValue(mockPrimitiveContext);
            createColorMocked.mockReturnValue(mockColor);
        });

        it('should return a ColorValue with the provided context', () => {
            const result = createColorValue(mockValueContext);
            expect(result.context()).toEqual(mockValueContext);
        });

        it('should return a ColorValue with the primitive attributes', () => {
            const result = createColorValue(mockValueContext);
            expect(result.chroma).toEqual(mockColor.chroma);
        });

        it('should call resolveColorValue() with the expected arguments', () => {
            createColorValue(mockValueContext, mockOptions);
            expect(resolveColorValueMocked).toHaveBeenCalledWith(mockValueContext);
        });

        it('should call forPrimitive() with the resolved input', () => {
            createColorValue(mockValueContext, mockOptions);
            expect(forPrimitiveSpy).toHaveBeenCalledWith(mockLiteral);
        });

        it('should call createColor() with the expected arguments', () => {
            createColorValue(mockValueContext, mockOptions);
            expect(createColorMocked).toHaveBeenCalledWith(mockPrimitiveContext, mockOptions);
        });

        describe('when get() is called', () => {
            it('should return the created Color primitive', () => {
                const result = createColorValue(mockValueContext, mockOptions);
                expect(result.get()).toBe(mockColor);
            });
        });
    });
});
