import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionRef, DecisionValueRefNotFoundError, ValueContext } from '../../types';

import { createRefNotFoundError } from './createRefNotFoundError';

describe('createRefNotFoundError()', () => {
    describe('Given context, name, and ref', () => {
        const mockDecisionContext = {
            ref: vi.fn(() => ({ $uuid: 'decision-uuid' })),
        };
        const mockContext = {
            decisionContext: vi.fn(() => mockDecisionContext),
        } as unknown as ValueContext;

        const mockRef: DecisionRef = { $uuid: 'ref-uuid' };
        const valueName = 'TestName';
        let result: DecisionValueRefNotFoundError;

        beforeEach(() => {
            const context = mockContext;
            result = createRefNotFoundError({ context, valueName, ref: mockRef });
        });

        it('should return a DecisionValueError object with the expected attributes', () => {
            expect(result.context).toBe(mockContext);
            expect(result.valueName).toBe(valueName);
            expect(result.ref).toBe(mockRef);
        });

        it('should return a DecisionValueError object with the expected message', () => {
            expect(result.message()).toContain('not found, referenced in');
        });
    });
});
