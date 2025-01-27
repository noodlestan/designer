import { describe, expect, it, vi } from 'vitest';

import { createDecisionContext } from '../createDecisionContext';

import { createUnexpectedError } from './createUnexpectedError';

describe('createUnexpectedError()', () => {
    const ref = { $uuid: 'test-uuid' };
    const context = createDecisionContext(ref, vi.fn(), []);

    describe('Given a context and an error', () => {
        const mockError = new Error('Test error');

        it('should return a DecisionError object with the expected message', () => {
            const result = createUnexpectedError({ context, error: mockError });

            const expectedMessage = `Unexpected error in {"$uuid":"test-uuid"}: ${mockError.stack}.`;
            expect(result.msg).toBe(expectedMessage);
        });
    });

    describe('Given a context and no error', () => {
        it('should return a DecisionError object with the expected message', () => {
            const result = createUnexpectedError({ context });

            const expectedMessage = `Unexpected error in {"$uuid":"test-uuid"}: undefined.`;
            expect(result.msg).toBe(expectedMessage);
        });
    });
});
