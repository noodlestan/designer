import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionError } from '../../types';
import { createDecisionContext } from '../createDecisionContext';

import { createUnexpectedError } from './createUnexpectedError';

describe('createUnexpectedError()', () => {
    const ref = { $uuid: 'test-uuid' };
    const context = createDecisionContext(ref, vi.fn(), []);

    let result: DecisionError;

    describe('Given a context and an error', () => {
        const mockError = new Error('Test error');

        beforeEach(() => {
            result = createUnexpectedError(context, mockError);
        });

        it('should return a DecisionError object with the expected message', () => {
            const expectedMessage = `Unexpected error in {"$uuid":"test-uuid"}: ${mockError.stack}.`;
            expect(result.msg).toBe(expectedMessage);
        });
    });

    describe('Given a context and no error', () => {
        beforeEach(() => {
            result = createUnexpectedError(context);
        });

        it('should return a DecisionError object with the expected message', () => {
            const expectedMessage = `Unexpected error in {"$uuid":"test-uuid"}: undefined.`;
            expect(result.msg).toBe(expectedMessage);
        });
    });
});
