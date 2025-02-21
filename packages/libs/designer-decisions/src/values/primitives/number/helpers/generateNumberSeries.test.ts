import { describe, expect, it } from 'vitest';

import type { NumberClamp, NumberModifier } from '../../../../inputs';

import { generateNumberSeries } from './generateNumberSeries';

describe('generateNumberSeries()', () => {
    describe('Given no parameters', () => {
        it('should return an empty array', () => {
            const result = generateNumberSeries();
            expect(result).toEqual([]);
        });
    });

    describe('Given an anchor and a number of items, but no modifier', () => {
        const anchor = 1.333;
        const items = 3;

        it('should return array with the expected number of elements, all equal to the anchor', () => {
            const result = generateNumberSeries(anchor, items);
            expect(result).toEqual([1.333, 1.333, 1.333]);
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
        const clamp: NumberClamp = [15, 20];

        it('should return a series with values clamped within the range', () => {
            const result = generateNumberSeries(anchor, items, modifier, clamp);
            expect(result).toEqual([15, 15, 20, 20]);
        });
    });

    describe('Given no quantize', () => {
        const anchor = 1.111;
        const items = 4;
        const modifier: NumberModifier = { mode: 'linear', by: 0.552 };

        it('should return a series with values not rounded', () => {
            const result = generateNumberSeries(anchor, items, modifier, undefined);
            expect(result).toEqual([1.111, 1.663, 2.215, 2.767]);
        });
    });

    describe('Given a quantize of 2', () => {
        const anchor = 2.333;
        const items = 3;
        const modifier: NumberModifier = { mode: 'geometric', by: 2 };
        const quantize = 2;

        it('should return a series with values rounded to the nearest 2', () => {
            const result = generateNumberSeries(anchor, items, modifier, undefined, quantize);
            expect(result).toEqual([2, 4, 10]);
        });
    });

    describe('Given a quantize of 0.2', () => {
        const anchor = 1.111;
        const items = 4;
        const modifier: NumberModifier = { mode: 'linear', by: 0.555 };
        const quantize = 0.2;

        it('should return a series with values rounded to the nearest 0.2', () => {
            const result = generateNumberSeries(anchor, items, modifier, undefined, quantize);
            expect(result).toEqual([1.2, 1.6, 2.2, 2.8]);
        });
    });

    describe('Given a non-integer number of items', () => {
        const anchor = 1;
        const items = 4.7;
        const modifier: NumberModifier = { mode: 'linear', by: 1 };

        it('should round the anchor to the default quantize (2)', () => {
            const result = generateNumberSeries(anchor, items, modifier);
            expect(result).toEqual([1, 2, 3, 4]);
        });
    });
});
