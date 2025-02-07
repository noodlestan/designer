import { describe, expect, it } from 'vitest';

import { createNumericValue } from './createNumericValue';

describe('createNumericValue()', () => {
    describe('Given a number', () => {
        const value = 123.329;

        it('should return the unmodified value in get()', () => {
            const result = createNumericValue(value);
            expect(result.get()).toBe(value);
        });

        it('should return the unmodified value in raw()', () => {
            const result = createNumericValue(value);
            expect(result.raw()).toBe(value);
        });

        it('should return the "un"quantized value (given no q)', () => {
            const result = createNumericValue(value);
            expect(result.quantized()).toBe(value);
        });

        it('should return quantized value (with base 0)', () => {
            const result = createNumericValue(value);
            expect(result.quantized(5)).toBe(125);
        });
    });

    describe('Given a number and a base param, but no quantize', () => {
        const value = 123.329;
        const options = {
            base: 2,
        };

        it('should return the unmodified value in get()', () => {
            const result = createNumericValue(value, options);
            expect(result.get()).toBe(value);
        });

        it('should return the unmodified value in raw()', () => {
            const result = createNumericValue(value, options);
            expect(result.raw()).toBe(value);
        });

        it('should return the "un"quantized value (given no q)', () => {
            const result = createNumericValue(value, options);
            expect(result.quantized()).toBe(value);
        });

        it('should return quantized value (with base 2)', () => {
            const result = createNumericValue(value, options);
            expect(result.quantized(5)).toBe(123.35);
        });
    });

    describe('Given a number and base and quantize params', () => {
        const value = 123.329;
        const options = {
            base: 2,
            quantize: 5,
        };

        it('should return the quantized value in get()', () => {
            const result = createNumericValue(value, options);
            expect(result.get()).toBe(123.35);
        });

        it('should return the unmodified value in raw()', () => {
            const result = createNumericValue(value, options);
            expect(result.raw()).toBe(value);
        });

        it('should return the quantized value', () => {
            const result = createNumericValue(value, options);
            expect(result.quantized()).toBe(123.35);
        });

        it('should return "un"quantized value (given q is 0)', () => {
            const result = createNumericValue(value, options);
            expect(result.quantized(0)).toBe(value);
        });

        it('should return quantized value (with base 2)', () => {
            const result = createNumericValue(value, options);
            expect(result.quantized(3)).toBe(123.33);
        });
    });

    describe('Given a number, base and quantize params, and a normalize function', () => {
        const value = 123.329;
        const options = {
            base: 2,
            quantize: 5,
            normalize: (n: number) => n + 1000,
        };

        it('should return the quantized and normalized value in get()', () => {
            const result = createNumericValue(value, options);
            expect(result.get()).toBe(1000 + 123.35);
        });

        it('should return the unmodified value in raw()', () => {
            const result = createNumericValue(value, options);
            expect(result.raw()).toBe(value);
        });

        it('should return the quantized and normalized value', () => {
            const result = createNumericValue(value, options);
            expect(result.quantized()).toBe(1000 + 123.35);
        });

        it('should return "un"quantized  and normalized value (given q is 0)', () => {
            const result = createNumericValue(value, options);
            expect(result.quantized(0)).toBe(1000 + value);
        });

        it('should return quantized value and normalized (with base 2)', () => {
            const result = createNumericValue(value, options);
            expect(result.quantized(3)).toBe(1000 + 123.33);
        });
    });
});
