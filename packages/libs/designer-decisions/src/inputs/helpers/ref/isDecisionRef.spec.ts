import { describe, expect, it } from 'vitest';

import type { DecisionRef } from '../../types';

import { isDecisionRef } from './isDecisionRef';

describe('isDecisionRef()', () => {
    describe('Given an object with $name', () => {
        const validData: DecisionRef = { $name: 'Test' };

        it('should return true', () => {
            const result = isDecisionRef(validData);
            expect(result).toBe(true);
        });
    });

    describe('Given an object with $uuid', () => {
        const validData: DecisionRef = { $uuid: '1234' };

        it('should return true', () => {
            const result = isDecisionRef(validData);
            expect(result).toBe(true);
        });
    });

    describe('Given an object without $name or $uuid property', () => {
        const invalidData = { otherProp: 'value' };

        it('should return false', () => {
            const result = isDecisionRef(invalidData);
            expect(result).toBe(false);
        });
    });

    describe('Given null ', () => {
        const invalidData = null;

        it('should return false ', () => {
            const result = isDecisionRef(invalidData);
            expect(result).toBe(false);
        });
    });

    describe('Given non-object data', () => {
        const invalidData = 123;

        it('should return false', () => {
            const result = isDecisionRef(invalidData);
            expect(result).toBe(false);
        });
    });
});
