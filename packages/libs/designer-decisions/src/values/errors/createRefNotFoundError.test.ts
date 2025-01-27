import { describe, expect, it, vi } from 'vitest';

import type { DecisionRef, ValueContext } from '../../types';

import { createRefNotFoundError } from './createRefNotFoundError';

describe('createRefNotFoundError()', () => {
    describe('Given context, name, and ref', () => {
        const mockDecisionContext = {
            ref: vi.fn(() => ({ $uuid: 'decision-uuid' })),
        };
        const refStr = JSON.stringify(mockDecisionContext.ref());
        const mockContext = {
            decisionContext: vi.fn(() => mockDecisionContext),
        } as unknown as ValueContext;

        const mockRef: DecisionRef = { $uuid: 'ref-uuid' };
        const mockRefStr = JSON.stringify(mockRef);
        const name = 'TestName';

        it('should return a DecisionValueError object with the expected message', () => {
            const result = createRefNotFoundError({ context: mockContext, name, ref: mockRef });

            const expectedMessage = `Ref (${name}) ${mockRefStr} not found, referenced in "${refStr}".`;

            expect(result.msg).toBe(expectedMessage);
        });
    });
});
