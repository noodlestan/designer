import { describe, expect, it } from 'vitest';

import type { SizeObjectLiteral } from '../../../../inputs';

import { isValidSizeObjectLiteral } from './isValidSizeObjectLiteral';

describe('isValidSizeObjectLiteral()', () => {
    describe('When input is valid', () => {
        const validInputs: SizeObjectLiteral[] = [
            { value: 10, units: 'px' },
            { value: 42.5, units: 'rem' },
        ];

        it('should return true for valid SizeObjectLiteral objects', () => {
            validInputs.forEach(input => {
                expect(isValidSizeObjectLiteral(input)).toBe(true);
            });
        });
    });

    describe('When input is invalid', () => {
        const invalidInputs = [
            null,
            undefined,
            true,
            false,
            'string',
            123,
            { value: 'not-a-number', units: 'px' },
            { value: NaN, units: 'px' },
            { value: 10, units: 'em' },
            { value: 10 },
            { units: 'px' },
            {},
        ];

        it('should return false for invalid inputs', () => {
            invalidInputs.forEach(input => {
                expect(isValidSizeObjectLiteral(input)).toBe(false);
            });
        });
    });
});
