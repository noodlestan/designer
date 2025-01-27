import { describe, expect, it } from 'vitest';

import type { NumberClamp, NumberModifier } from '../../../types';

import { generateNumberSeries } from './generateNumberSeries';

describe('generateNumberSeries()', () => {
    describe('Given no parameters', () => {
        it('should return an empty array', () => {
            const result = generateNumberSeries();
            expect(result).toEqual([]);
        });
    });

    describe('Given an anchor and a number of items, but no modifier', () => {
        const anchor = 5;
        const items = 3;

        it('should return an array with items elements, all equal to the anchor', () => {
            const result = generateNumberSeries(anchor, items);
            expect(result).toEqual([5, 5, 5]);
        });
    });

    describe('Given an anchor of 1.3333 and a number of items, but no modifier', () => {
        const anchor = 1.3333;
        const items = 3;

        it('should round the anchor to the default precision (2)', () => {
            const result = generateNumberSeries(anchor, items);
            expect(result).toEqual([1.33, 1.33, 1.33]);
        });
    });

    describe('Given an anchor, items, and a modifier', () => {
        const anchor = 2;
        const items = 4;
        const modifier: NumberModifier = { mode: 'linear', by: 1 };

        it('should return a series modified by the given modifier', () => {
            const result = generateNumberSeries(anchor, items, modifier);
            expect(result).toEqual([2, 3, 4, 5]);
        });
    });

    describe('Given a clamp parameter', () => {
        const anchor = 10;
        const items = 4;
        const modifier: NumberModifier = { mode: 'linear', by: 5 };
        const clamp: NumberClamp = [10, 20];

        it('should return a series with values clamped within the range', () => {
            const result = generateNumberSeries(anchor, items, modifier, clamp);
            expect(result).toEqual([10, 15, 20, 20]);
        });
    });

    describe('Given a precision of 0', () => {
        const anchor = 2.333;
        const items = 3;
        const modifier: NumberModifier = { mode: 'geometric', by: 2 };
        const precision = 0;

        it('should return a series with integer values', () => {
            const result = generateNumberSeries(anchor, items, modifier, undefined, precision);
            expect(result).toEqual([2, 5, 9]);
        });
    });

    describe('Given a precision of 1', () => {
        const anchor = 1.111;
        const items = 4;
        const modifier: NumberModifier = { mode: 'linear', by: 0.555 };
        const precision = 1;

        it('should return a series with values rounded to 3 decimal places', () => {
            const result = generateNumberSeries(anchor, items, modifier, undefined, precision);
            expect(result).toEqual([1.1, 1.7, 2.2, 2.8]);
        });
    });
});
