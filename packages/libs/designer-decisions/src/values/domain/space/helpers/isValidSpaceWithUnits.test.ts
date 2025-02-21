import { describe, expect, it } from 'vitest';

import type { SpaceWithUnits } from '../../../../inputs';

import { isValidSpaceWithUnits } from './isValidSpaceWithUnits';

describe('isValidSpaceWithUnits()', () => {
    describe('When input is valid', () => {
        const validInputs: SpaceWithUnits[] = [
            { value: 10, units: 'px' },
            { value: 0, units: 'em' },
            { value: 42.5, units: 'rem' },
        ];

        it('should return true for valid SpaceWithUnits objects', () => {
            validInputs.forEach(input => {
                expect(isValidSpaceWithUnits(input)).toBe(true);
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
            { value: 10, units: 'invalid-unit' },
            { value: 10 },
            { units: 'px' },
            {},
        ];

        it('should return false for invalid inputs', () => {
            invalidInputs.forEach(input => {
                expect(isValidSpaceWithUnits(input)).toBe(false);
            });
        });
    });
});
