import { describe, expect, it } from 'vitest';

import { nearest } from './nearest';

describe('nearest()', () => {
    describe('Given a positive base smaller than one', () => {
        it('should round to the nearest multiple of base', () => {
            expect(nearest(42.678, 0.001)).toBe(42.678);
            expect(nearest(42.678, 0.025)).toBe(42.675);
            expect(nearest(42.678, 0.01)).toBe(42.68);
        });
    });

    describe('Given a positive base bigger than one', () => {
        it('should round to the nearest multiple of base', () => {
            expect(nearest(42.678, 1)).toBe(43);
            expect(nearest(42.678, 2.5)).toBe(42.5);
            expect(nearest(42.678, 4)).toBe(44);
            expect(nearest(99, 3)).toBe(99);
            expect(nearest(99, 10)).toBe(100);
        });
    });

    describe('Given a negative base', () => {
        it('should return the number as is', () => {
            expect(nearest(42.678, -5)).toBe(42.678);
        });
    });

    describe('Given base 0', () => {
        it('should return the number as is', () => {
            expect(nearest(42.678, 0)).toBe(42.678);
        });
    });

    describe('Given a numbers that result in floating point (in)precision', () => {
        it('should truncate to the same number of decimals as the base', () => {
            expect(nearest(1, 0.03)).toBe(0.99);
            expect(nearest(1, 0.003)).toBe(0.999);
        });
    });
});
