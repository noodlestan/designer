import { describe, expect, it } from 'vitest';

import { generateBoundedSeries } from './generateBoundedSeries';

describe('generateBoundedSeries()', () => {
    describe('Given no parameters', () => {
        it('should return an array with a single "0"', () => {
            const result = generateBoundedSeries();
            expect(result).toEqual([0]);
        });
    });

    describe('Given steps less than 1', () => {
        it('should return an array with only the "from" value', () => {
            const result = generateBoundedSeries(1, 10, 0);
            expect(result).toEqual([1]);
        });
    });

    describe('Given steps is 1', () => {
        it('should return an evenly spaced series of numbers', () => {
            const result = generateBoundedSeries(0, 10, 1);
            expect(result).toEqual([0, 5, 10]);
        });
    });

    describe('Given valid from, to, and steps parameters', () => {
        it('should return an evenly spaced series of numbers', () => {
            const result = generateBoundedSeries(0, 10, 4);
            expect(result).toEqual([0, 2, 4, 6, 8, 10]);
        });
    });

    describe('Given from and to are the same', () => {
        it('should return a series with a single number', () => {
            const result = generateBoundedSeries(5, 5, 3);
            expect(result).toEqual([5, 5, 5, 5, 5]);
        });
    });

    describe('Given negative from and to', () => {
        it('should return a series with numbers between from and to', () => {
            const result = generateBoundedSeries(-10, -5, 4);
            expect(result).toEqual([-10, -9, -8, -7, -6, -5]);
        });
    });

    describe('Given from is greater than to', () => {
        it('should return a series with numbers between from and to (descending)', () => {
            const result = generateBoundedSeries(10, 0, 4);
            expect(result).toEqual([10, 8, 6, 4, 2, 0]);
        });
    });

    describe('Given no precision parameter', () => {
        it('should return a series with values not rounded', () => {
            const result = generateBoundedSeries(1, 1.25, 1);
            expect(result).toEqual([1, 1.125, 1.25]);
        });
    });

    describe('Given a precision of 2', () => {
        it('should return a series with values rounded to the nearest 2', () => {
            const result = generateBoundedSeries(0, 10, 3, 2);
            expect(result).toEqual([0.0, 0.25, 0.5, 0.75, 1.0]);
        });
    });

    describe('Given a precision parameter of 0.2', () => {
        it('should return a series with values rounded to the nearest 0.2', () => {
            const result = generateBoundedSeries(0, 10, 3, 0.2);
            expect(result).toEqual([0.0, 0.2, 0.4, 0.8, 1]);
        });
    });
});
