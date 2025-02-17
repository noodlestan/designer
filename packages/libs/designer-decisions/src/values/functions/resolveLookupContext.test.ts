import { describe, expect, it } from 'vitest';

import { LookupContexts } from '../../lookup';
import { ParentValueContext } from '../types';

import { resolveLookupContext } from './resolveLookupContext';

describe('resolveLookupContext()', () => {
    describe('Given a LookupContexts object', () => {
        const lookupContext: LookupContexts = { all: ['Context A', 'Context B'] };

        it('should return the provided context', () => {
            const result = resolveLookupContext(lookupContext);
            expect(result).toBe(lookupContext);
        });
    });

    describe('Given a ParentValueContext', () => {
        const parentContext: ParentValueContext = {
            lookupContexts: () => ({ all: ['Context A'] }),
        } as ParentValueContext;

        it("should return the parent's lookup contexts", () => {
            const result = resolveLookupContext(parentContext);
            expect(result).toEqual({ all: ['Context A'] });
        });
    });

    describe('Given an undefined context', () => {
        it('should return the default lookup contexts', () => {
            const result = resolveLookupContext(undefined);
            expect(result).toEqual({ all: [] });
        });
    });
});
