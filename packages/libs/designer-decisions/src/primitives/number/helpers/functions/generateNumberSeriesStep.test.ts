import { describe, expect, it } from 'vitest';

import { NumberModifier } from '../../../../inputs';

import { generateNumberSeriesStep } from './generateNumberSeriesStep';

describe('generateNumberSeriesStep()', () => {
    describe('Given an empty series', () => {
        it('should throw an error with the message "Series is empty"', () => {
            expect(() => generateNumberSeriesStep([], { mode: 'linear', by: 2 })).toThrowError(
                'Series is empty',
            );
        });
    });

    describe('Given an unknown mode', () => {
        const series = [1, 10];
        const modifier: Partial<NumberModifier> = { by: 5 };

        it('should return the next value on a linear series', () => {
            const result = generateNumberSeriesStep(series, modifier);
            expect(result).toBe(15);
        });
    });

    describe('Given a linear modifier and no `by` value', () => {
        const series = [1, 10];
        const modifier: Partial<NumberModifier> = { mode: 'linear' };

        it('should return the next value on the series', () => {
            const result = generateNumberSeriesStep(series, modifier);
            expect(result).toBe(10);
        });
    });

    describe('Given a linear modifier and a `by` value', () => {
        const series = [1, 10];
        const modifier: NumberModifier = { mode: 'linear', by: 5 };

        it('should return the next value on the series plus the `by` value', () => {
            const result = generateNumberSeriesStep(series, modifier);
            expect(result).toBe(15);
        });
    });

    describe('Given a proportional modifier and no `by` value', () => {
        const series = [1, 10];
        const modifier: Partial<NumberModifier> = { mode: 'proportional' };

        it('should return the next value on the series', () => {
            const result = generateNumberSeriesStep(series, modifier);
            expect(result).toBe(1);
        });
    });

    describe('Given a proportional modifier and a `by` value', () => {
        const series = [1, 10];
        const modifier: NumberModifier = { mode: 'proportional', by: 0.2 };

        it('should return the next value on the series plus `by * index * first value`', () => {
            const result = generateNumberSeriesStep(series, modifier);
            expect(result).toBe(1.4);
        });
    });

    describe('Given a geometric modifier and no `by` value', () => {
        const series = [1, 10];
        const modifier: Partial<NumberModifier> = { mode: 'geometric' };

        it('should return the next value on the series multiplied by 1 (default `by` value)', () => {
            const result = generateNumberSeriesStep(series, modifier);
            expect(result).toBe(10);
        });
    });

    describe('Given a geometric modifier and a `by` value', () => {
        const series = [1, 10];
        const modifier: NumberModifier = { mode: 'geometric', by: 1.2 };

        it('should return the next value on the series multiplied by the `by` value', () => {
            const result = generateNumberSeriesStep(series, modifier);
            expect(result).toBe(12);
        });
    });

    describe('Given a geometric modifier and a `by` value of 0', () => {
        const series = [1, 10];
        const modifier: NumberModifier = { mode: 'geometric', by: 0 };

        it('should return 0', () => {
            const result = generateNumberSeriesStep(series, modifier);
            expect(result).toBe(0);
        });
    });
});
