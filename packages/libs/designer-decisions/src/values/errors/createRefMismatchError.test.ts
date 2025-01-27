import { describe, expect, it, vi } from 'vitest';

import type { DecisionRef, DecisionUnknown, ValueContext } from '../../types';

import { createRefMismatchError } from './createRefMismatchError';

describe('createRefMismatchError()', () => {
    describe('Given context, name, ref, decision, and accepted types', () => {
        const mockDecisionContext = {
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        };

        const refStr = JSON.stringify(mockDecisionContext.ref());
        const mockContext = {
            decisionContext: vi.fn(() => mockDecisionContext),
        } as unknown as ValueContext;
        const mockDecision = {
            type: vi.fn(() => 'TestType'),
        } as unknown as DecisionUnknown;

        const mockRef: DecisionRef = { $uuid: 'ref-uuid' };
        const mockRefStr = JSON.stringify(mockRef);
        const name = 'ValueName';
        const accepted = ['TypeA', 'TypeB'];

        it('should return a DecisionValueError object with the expected message', () => {
            const context = mockContext;
            const decision = mockDecision;
            const ref = mockRef;
            const result = createRefMismatchError({ context, name, ref, decision, accepted });

            const expectedMessage = `Ref (${name}) ${mockRefStr} referenced in "${refStr}" matched "TestType", expected ${accepted.join(', ')}.`;

            expect(result.msg).toBe(expectedMessage);
        });
    });
});
