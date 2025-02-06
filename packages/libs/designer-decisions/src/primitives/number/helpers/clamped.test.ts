import { describe, expect, it } from 'vitest';

import { clamped } from './clamped';

describe('clamped()', () => {
    describe('Given a number and no clamp', () => {
        it('should return the original number', () => {
            expect(clamped(42)).toBe(42);
        });
    });

    describe('Given a number within the clamp', () => {
        it('should return the original number', () => {
            expect(clamped(42, [5, 55])).toBe(42);
        });
    });

    describe('Given a number above the clamp', () => {
        it('should return the top boundary', () => {
            expect(clamped(82, [5, 55])).toBe(55);
        });
    });

    describe('Given a number below the clamp', () => {
        it('should return the bottom boundary', () => {
            expect(clamped(-2, [5, 55])).toBe(5);
        });
    });

    describe('Given a number and a clamp supplied in the wrong order', () => {
        it('should return the top boundary', () => {
            expect(clamped(0, [55, 5])).toBe(55);
        });
    });
});
