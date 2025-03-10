import { describe, expect, it } from 'vitest';

import { parseValueAndUnit } from './parseValueAndUnit';

describe('parseValueAndUnit()', () => {
    describe('Given a positive integer value without a unit', () => {
        const input = '10';
        const expected = { value: 10, unit: undefined };

        it('should return the parsed value and undefined unit', () => {
            const result = parseValueAndUnit(input);
            expect(result).toEqual(expected);
        });
    });

    describe('Given a positive integer value and a unit', () => {
        const input = '10px';
        const expected = { value: 10, unit: 'px' };

        it('should return the parsed value and unit', () => {
            const result = parseValueAndUnit(input);
            expect(result).toEqual(expected);
        });
    });

    describe('Given a positive integer value and a spaced out unit', () => {
        const input = '10 px';
        const expected = { value: 10, unit: 'px' };

        it('should return the parsed value and unit', () => {
            const result = parseValueAndUnit(input);
            expect(result).toEqual(expected);
        });
    });

    describe('Given a positive decimal value and a unit', () => {
        const input = '10.5px';
        const expected = { value: 10.5, unit: 'px' };

        it('should return the parsed value and unit', () => {
            const result = parseValueAndUnit(input);
            expect(result).toEqual(expected);
        });
    });

    describe('Given a negative integer value and a unit', () => {
        const input = '-10px';
        const expected = { value: -10, unit: 'px' };

        it('should return the parsed value and unit', () => {
            const result = parseValueAndUnit(input);
            expect(result).toEqual(expected);
        });
    });

    describe('Given a negative decimal value and a unit', () => {
        const input = '-10.5px';
        const expected = { value: -10.5, unit: 'px' };

        it('should return the parsed value and unit', () => {
            const result = parseValueAndUnit(input);
            expect(result).toEqual(expected);
        });
    });

    describe('Given a value with leading and trailing whitespace', () => {
        const input = '  10px  ';
        const expected = { value: 10, unit: 'px' };

        it('should trim the input and return the parsed value and unit', () => {
            const result = parseValueAndUnit(input);
            expect(result).toEqual(expected);
        });
    });

    describe('Given an empty string', () => {
        const input = '';

        it('should return undefined', () => {
            const result = parseValueAndUnit(input);
            expect(result).toBeUndefined();
        });
    });

    describe('Given a string with only whitespace', () => {
        const input = '   ';

        it('should return undefined', () => {
            const result = parseValueAndUnit(input);
            expect(result).toBeUndefined();
        });
    });

    describe('Given an invalid input', () => {
        const input = 'abc';

        it('should return undefined', () => {
            const result = parseValueAndUnit(input);
            expect(result).toBeUndefined();
        });
    });
});
