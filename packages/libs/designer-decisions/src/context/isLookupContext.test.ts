import { describe, expect, it } from 'vitest';

import type { LookupContexts } from '../types';

import { isLookupContext } from './isLookupContext';

describe('isLookupContext', () => {
    it('returns true for a valid LookupContexts object', () => {
        const validContext: LookupContexts = { all: [] };
        expect(isLookupContext(validContext)).toBe(true);
    });

    it('returns false for an object missing the "all" property', () => {
        const invalidContext = { some: [] };
        expect(isLookupContext(invalidContext)).toBe(false);
    });

    it('returns false for null', () => {
        expect(isLookupContext(null)).toBe(false);
    });

    it('returns false for non-object types', () => {
        expect(isLookupContext(undefined)).toBe(false);
        expect(isLookupContext('string')).toBe(false);
        expect(isLookupContext(123)).toBe(false);
        expect(isLookupContext([])).toBe(false);
    });
});
