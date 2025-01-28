import { beforeEach, describe, expect, it, vi } from 'vitest';

import type {
    DecisionRef,
    DecisionUnknown,
    DecisionValueRefMismatchError,
    ValueContext,
} from '../../types';

import { createRefMismatchError } from './createRefMismatchError';

describe('createRefMismatchError()', () => {
    describe('Given context, name, ref, decision, and accepted types', () => {
        const mockDecisionContext = {
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        };
        const mockContext = {
            decisionContext: vi.fn(() => mockDecisionContext),
        } as unknown as ValueContext;
        const mockDecision = {
            type: vi.fn(() => 'TestType'),
        } as unknown as DecisionUnknown;

        const mockRef: DecisionRef = { $uuid: 'ref-uuid' };
        const valueName = 'ValueName';
        const accepted = ['TypeA', 'TypeB'];

        let result: DecisionValueRefMismatchError;

        beforeEach(() => {
            const context = mockContext;
            const decision = mockDecision;
            const ref = mockRef;
            result = createRefMismatchError({ context, decision, valueName, ref, accepted });
        });

        it('should return a DecisionValueRefMismatchError object with the expected attributes', () => {
            expect(result.context).toBe(mockContext);
            expect(result.valueName).toBe(valueName);
            expect(result.ref).toBe(mockRef);
            expect(result.decision).toBe(mockDecision);
            expect(result.accepted).toEqual(accepted);
        });

        it('should return a DecisionValueRefMismatchError object with the expected message', () => {
            const expectedMessage = `matched "TestType", expected`;
            expect(result.message()).toContain(expectedMessage);
        });
    });
});
