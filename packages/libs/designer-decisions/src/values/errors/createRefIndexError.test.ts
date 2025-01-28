import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionRef, DecisionValueRefIndexError, ValueContext } from '../../types';

import { createRefIndexError } from './createRefIndexError';

describe('createRefIndexError()', () => {
    describe('Given context, name, and ref', () => {
        const mockDecisionContext = {
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        };
        const mockContext = {
            decisionContext: vi.fn(() => mockDecisionContext),
        } as unknown as ValueContext;

        const valueName = 'ValueName';
        const mockRef: DecisionRef = { $uuid: 'ref-uuid', index: 99 };

        let result: DecisionValueRefIndexError;

        beforeEach(() => {
            result = createRefIndexError({ context: mockContext, valueName, ref: mockRef });
        });

        it('should return a DecisionValueRefIndexError object with the expected attributes', () => {
            expect(result.context).toBe(mockContext);
            expect(result.valueName).toBe(valueName);
            expect(result.ref).toBe(mockRef);
        });

        it('should return a DecisionValueRefIndexError object with the expected message', () => {
            expect(result.message()).toContain('out of bounds');
        });
    });
});
