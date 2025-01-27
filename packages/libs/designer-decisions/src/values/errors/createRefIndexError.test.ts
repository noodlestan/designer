import { describe, expect, it, vi } from 'vitest';

import type { DecisionRef, ValueContext } from '../../types';

import { createRefIndexError } from './createRefIndexError';

describe('createRefIndexError()', () => {
    describe('Given context, name, and ref', () => {
        const mockDecisionContext = {
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        };
        const refStr = JSON.stringify(mockDecisionContext.ref());
        const mockContext = {
            decisionContext: vi.fn(() => mockDecisionContext),
        } as unknown as ValueContext;

        const name = 'ValueName';
        const mockRef: DecisionRef = { $uuid: 'ref-uuid', index: 99 };
        const mockRefStr = JSON.stringify(mockRef);

        it('should return a DecisionValueError object with the expected message', () => {
            const result = createRefIndexError({ context: mockContext, name, ref: mockRef });

            const expectedMessage = `Ref (${name}) ${mockRefStr} out of bounds referenced in "${refStr}".`;

            expect(result.msg).toBe(expectedMessage);
        });
    });
});
