import { describe, expect, it } from 'vitest';

import type { LookupContexts } from '../types';

import { isLookupContext } from './isLookupContext';

describe('isLookupContext', () => {
    describe('Given LookupContexts', () => {
        const context: LookupContexts = { all: [] };

        it('should returns true', () => {
            expect(isLookupContext(context)).toBe(true);
        });
    });

    describe('Given an incomplete object', () => {
        const context = { some: [] };

        it('should return false', () => {
            expect(isLookupContext(context)).toBe(false);
        });
    });

    describe('Given a null value', () => {
        it('should return false', () => {
            expect(isLookupContext(null)).toBe(false);
        });
    });

    describe('Given non-object types', () => {
        it('should return false', () => {
            expect(isLookupContext(undefined)).toBe(false);
            expect(isLookupContext('string')).toBe(false);
            expect(isLookupContext(123)).toBe(false);
            expect(isLookupContext([])).toBe(false);
        });
    });
});
