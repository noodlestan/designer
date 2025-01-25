import { describe, expect, it } from 'vitest';

import { createLookupContexts } from './createLookupContexts';

describe('createLookupContexts()', () => {
    describe('Given an array of contexts', () => {
        const contexts = ['foo', 'bar'];

        it('should create a LookupContexts object with "all" set to the array and "any" as undefined', () => {
            const result = createLookupContexts(contexts);
            expect(result).toEqual({ all: contexts, any: undefined });
        });
    });

    describe('Given an object with "all"', () => {
        const contexts = { all: ['foo'], any: [] };

        it('should create a LookupContexts object with "all" and "any" initialized', () => {
            const result = createLookupContexts(contexts);
            expect(result).toEqual(contexts);
        });
    });

    describe('Given an object with "all" and "any"', () => {
        const contexts = { all: ['foo'], any: ['bar'] };

        it('should create a LookupContexts object with "all" and "any" set to the object properties', () => {
            const result = createLookupContexts(contexts);
            expect(result).toEqual(contexts);
        });
    });

    describe('Given no contexts (undefined)', () => {
        it('should create a default LookupContexts object with "all" as an empty array and "any" as undefined', () => {
            const result = createLookupContexts();
            expect(result).toEqual({ all: [], any: undefined });
        });
    });
});
