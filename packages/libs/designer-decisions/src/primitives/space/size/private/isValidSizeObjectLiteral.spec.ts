import { describe, expect, it } from 'vitest';

import type { SizeObjectLiteral } from '../../../../inputs';

import { isValidSizeObjectLiteral } from './isValidSizeObjectLiteral';

describe('isValidSizeObjectLiteral()', () => {
    describe('When input is valid', () => {
        const validInputs: SizeObjectLiteral[] = [
            { value: 10, unit: 'px' },
            { value: 42.5, unit: 'rem' },
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
            { value: 'not-a-number', unit: 'px' },
            { value: NaN, unit: 'px' },
            { value: 10, unit: 'em' },
            { value: 10 },
            { unit: 'px' },
            {},
        ];

        it('should return false for invalid inputs', () => {
            invalidInputs.forEach(input => {
                expect(isValidSizeObjectLiteral(input)).toBe(false);
            });
        });
    });
});
