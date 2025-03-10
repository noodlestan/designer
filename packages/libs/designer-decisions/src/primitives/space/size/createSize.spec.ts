import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type SizeObjectLiteral } from '../../../inputs';
import { createPrimitiveContextMock, mockSizeDefinition } from '../../../mocks';

import { createSize } from './createSize';
import { normalizeSizeInput } from './private';

vi.mock('./private');

const normalizeSizeInputMocked = vi.mocked(normalizeSizeInput);

describe('createSize()', () => {
    const sizeDef = mockSizeDefinition;

    const sizeLiteral = { value: 123.371, unit: 'rem' } as SizeObjectLiteral;
    const mockInput = 13;
    const [mockPrimitiveContext] = createPrimitiveContextMock(mockInput);

    beforeEach(() => {
        vi.clearAllMocks();
        normalizeSizeInputMocked.mockReturnValue(sizeLiteral);
    });

    describe('Given a context with an input', () => {
        it('should call normalizeColorChannelInputMocked() with the expected arguments', () => {
            createSize(sizeDef, mockPrimitiveContext);

            expect(normalizeSizeInputMocked).toHaveBeenCalledWith(sizeDef, mockPrimitiveContext);
        });

        it('should expose the resolved attributes', () => {
            const result = createSize(sizeDef, mockPrimitiveContext);
            expect(result.value).toEqual(sizeLiteral.value);
            expect(result.unit).toEqual(sizeLiteral.unit);
        });
    });

    describe('When literal() is called', () => {
        it('should return a SizeObjectLiteral', () => {
            const size = createSize(sizeDef, mockPrimitiveContext);
            const result = size.literal();
            expect(result).toEqual(sizeLiteral);
        });
    });

    describe('When quantize() is called with params', () => {
        it('should return a quantized SizeObjectLiteral', () => {
            const size = createSize(sizeDef, mockPrimitiveContext);
            const result = size.quantize(5);

            expect(result.value).toEqual(123.5);
            expect(result.unit).toEqual(sizeLiteral.unit);
        });
    });

    describe('When quantize() is called with q:0', () => {
        it('should return the raw value', () => {
            const size = createSize(sizeDef, mockPrimitiveContext);
            const result = size.quantize(0);
            expect(result).toEqual(sizeLiteral);
        });
    });
});
