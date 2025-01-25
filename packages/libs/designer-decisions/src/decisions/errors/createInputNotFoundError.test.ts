import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionError, DecisionRef } from '../../types';
import { createDecisionContext } from '../createDecisionContext';

import { createInputNotFoundError } from './createInputNotFoundError';

describe('createInputNotFoundError()', () => {
    const ref: DecisionRef = { $uuid: 'test-uuid' };
    const context = createDecisionContext(ref, vi.fn(), []);

    let result: DecisionError;

    describe('Given a context and a ref', () => {
        beforeEach(() => {
            result = createInputNotFoundError(context, ref);
        });

        it('should return a DecisionError object with the expected message', () => {
            const expectedMessage = `Ref ${JSON.stringify(ref)} not found.`;
            expect(result.msg).toBe(expectedMessage);
        });
    });
});
