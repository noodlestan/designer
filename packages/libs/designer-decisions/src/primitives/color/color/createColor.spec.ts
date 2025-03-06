import chroma from 'chroma-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createPrimitiveContextMock } from '../../../mocks';

import { createColor } from './createColor';
import { normalizeColorInput } from './private';

vi.mock('./private');

const normalizeColorInputMocked = vi.mocked(normalizeColorInput);

describe('createColor()', () => {
    const hslLiteral = { h: 252, s: 0.41, l: 0.44 };
    const chromaLiteral = { chroma: chroma.hsl(hslLiteral.h, hslLiteral.s, hslLiteral.l) };
    const [mockPrimitiveContext] = createPrimitiveContextMock(hslLiteral);

    beforeEach(() => {
        vi.clearAllMocks();
        normalizeColorInputMocked.mockReturnValue(chromaLiteral);
    });

    describe('Given a context with an input', () => {
        it('should call normalizeColorInputMocked() with the expected arguments', () => {
            createColor(mockPrimitiveContext);
            expect(normalizeColorInputMocked).toHaveBeenCalledWith(mockPrimitiveContext);
        });

        it('should expose the resolved attributes', () => {
            const result = createColor(mockPrimitiveContext);
            expect(result.chroma).toEqual(chromaLiteral.chroma);
        });
    });

    describe('When literal() is called', () => {
        it('should return a ChromaColorLiteral', () => {
            const color = createColor(mockPrimitiveContext);
            const result = color.literal();
            expect(result).toEqual(chromaLiteral);
        });
    });

    describe('When raw() is called', () => {
        it('should return a ChromaColorLiteral', () => {
            const color = createColor(mockPrimitiveContext);
            const result = color.raw();
            expect(result).toEqual(chromaLiteral.chroma);
        });
    });

    describe('When toObject() is called with no arguments', () => {
        it('should return the value as a ColorObjectLiteral', () => {
            const color = createColor(mockPrimitiveContext);
            const result = color.toObject();
            expect(result).toEqual({ l: 0.4495, c: 0.1432, h: 288.48 });
        });
    });

    describe('When toObject() is called with a format', () => {
        it('should return the value as a ColorObjectLiteral', () => {
            const color = createColor(mockPrimitiveContext);
            const result = color.toObject({ format: 'hsl' });
            expect(result).toEqual(hslLiteral);
        });
    });

    describe('When toObject() is called with quantize', () => {
        it('should return the value as a ColorObjectLiteral', () => {
            const color = createColor(mockPrimitiveContext);
            const result = color.toObject({ quantize: 0.5 });
            expect(result).toEqual({ l: 0.45, c: 0.145, h: 288.5 });
        });
    });

    describe('When toString() is called with no arguments', () => {
        it('should return the value as a string', () => {
            const color = createColor(mockPrimitiveContext);
            const result = color.toString();
            expect(result).toEqual('oklch(44.95% 0.1432 288.48deg)');
        });
    });

    describe('When toString() is called with a format', () => {
        it('should return the value as a string', () => {
            const color = createColor(mockPrimitiveContext);
            const result = color.toString({ format: 'hsl' });
            expect(result).toEqual('hsl(252deg 41% 44%)');
        });
    });

    describe('When toString() is called with quantize', () => {
        it('should return the value as a string', () => {
            const color = createColor(mockPrimitiveContext);
            const result = color.toString({ quantize: 0.5 });
            expect(result).toEqual('oklch(45% 0.145 288.5deg)');
        });
    });
});
