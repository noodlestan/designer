import { describe, expect, it } from 'vitest';

import type { AnchoredNumberSeriesParams, NumberClamp } from '../../../types';

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

    describe('Given a precision parameter', () => {
        const anchor = 5.1111;
        const before = { steps: 3, modifier: { mode: 'geometric', by: 0.66 } };
        const after = { steps: 2, modifier: { mode: 'geometric', by: 1.33 } };
        const params = { before, after } as AnchoredNumberSeriesParams;
        const precision = 3;

        it('should return an array with rounded values', () => {
            const result = generateAnchoredSeries(anchor, params, undefined, precision);

            expect(result).toEqual([1.469, 2.226, 3.373, 5.111, 6.798, 9.041]);
        });
    });
});
