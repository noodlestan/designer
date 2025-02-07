import { describe, expect, it } from 'vitest';

import { quantized } from './quantized';

describe('quantized()', () => {
    describe('Given a positive q smaller than one', () => {
        it('should round to the quantized multiple of q', () => {
            expect(quantized(42.678, 0.001)).toBe(42.678);
            expect(quantized(42.678, 0.025)).toBe(42.675);
            expect(quantized(42.678, 0.01)).toBe(42.68);
        });
    });

    describe('Given a positive q bigger than one', () => {
        it('should round to the quantized multiple of q', () => {
            expect(quantized(42.678, 1)).toBe(43);
            expect(quantized(42.678, 2.5)).toBe(42.5);
            expect(quantized(42.678, 4)).toBe(44);
            expect(quantized(99, 3)).toBe(99);
            expect(quantized(99, 10)).toBe(100);
        });
    });

    describe('Given a negative q', () => {
        it('should return the number as is', () => {
            expect(quantized(42.678, -5)).toBe(42.678);
        });
    });

    describe('Given q is 0', () => {
        it('should return the number as is', () => {
            expect(quantized(42.678, 0)).toBe(42.678);
        });
    });

    describe('Given a number that results in floating point (in)quantize', () => {
        it('should truncate to the same number of decimals as the quantize param', () => {
            expect(quantized(1, 0.03)).toBe(0.99);
            expect(quantized(1, 0.003)).toBe(0.999);
        });
    });
});
