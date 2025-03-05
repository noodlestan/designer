import { describe, expect, it } from 'vitest';

import type { AnchoredNumberSeriesParams, NumberClamp } from '../../../inputs';

import { generateAnchoredSeries } from './generateAnchoredSeries';

describe('generateAnchoredSeries()', () => {
    describe('Given no parameters', () => {
        it('should return an array with only the anchor (default 0)', () => {
            const result = generateAnchoredSeries();
            expect(result).toEqual([0]);
        });
    });

    describe('Given the anchor, before, and after params', () => {
        const anchor = 5;
        const before = { steps: 3, modifier: { mode: 'linear', by: -1 } };
        const after = { steps: 2, modifier: { mode: 'linear', by: 10 } };
        const params = { before, after } as AnchoredNumberSeriesParams;

        it('should return an array with the extended series', () => {
            const result = generateAnchoredSeries(anchor, params);

            expect(result).toEqual([2, 3, 4, 5, 15, 25]);
        });
    });

    describe('Given a clamp parameter', () => {
        const anchor = 5;
        const before = { steps: 3, modifier: { mode: 'linear', by: -1 } };
        const after = { steps: 2, modifier: { mode: 'linear', by: 10 } };
        const params = { before, after } as AnchoredNumberSeriesParams;
        const clamp: NumberClamp = [4, 15];

        it('should return an array with clamped values', () => {
            const result = generateAnchoredSeries(anchor, params, clamp);

            expect(result).toEqual([4, 4, 4, 5, 15, 15]);
        });
    });

    describe('Given no quantize parameter', () => {
        const anchor = 5.111;
        const before = { steps: 1, modifier: { mode: 'linear', by: -0.1 } };
        const after = { steps: 1, modifier: { mode: 'linear', by: 1.33 } };
        const params = { before, after } as AnchoredNumberSeriesParams;

        it('should return an array with values not rounded', () => {
            const result = generateAnchoredSeries(anchor, params);

            expect(result).toEqual([5.011, 5.111, 6.441]);
        });
    });

    describe('Given a quantize of 2', () => {
        const anchor = 33;
        const before = { steps: 3, modifier: { mode: 'geometric', by: 0.75 } };
        const after = { steps: 2, modifier: { mode: 'geometric', by: 2.33 } };
        const params = { before, after } as AnchoredNumberSeriesParams;
        const quantize = 2;

        it('should return a series with values rounded to the nearest 2', () => {
            const result = generateAnchoredSeries(anchor, params, undefined, quantize);

            expect(result).toEqual([14, 18, 24, 34, 76, 180]);
        });
    });

    describe('Given a quantize parameter of 0.2', () => {
        const anchor = 5.1111;
        const before = { steps: 3, modifier: { mode: 'geometric', by: 0.66 } };
        const after = { steps: 2, modifier: { mode: 'geometric', by: 1.33 } };
        const params = { before, after } as AnchoredNumberSeriesParams;
        const quantize = 0.2;

        it('should return a series with values rounded to the nearest 0.2', () => {
            const result = generateAnchoredSeries(anchor, params, undefined, quantize);

            expect(result).toEqual([1.4, 2.2, 3.4, 5.2, 6.8, 9]);
        });
    });
});
