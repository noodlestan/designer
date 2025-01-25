import { describe, expect, it, vi } from 'vitest';

import type { DecisionRef } from '../../types';
import { createDecisionContext } from '../createDecisionContext';

import { createInputNotFoundError } from './createInputNotFoundError';

describe('createInputNotFoundError()', () => {
    describe('Given a context and a ref', () => {
        const ref: DecisionRef = { $uuid: 'test-uuid' };
        const context = createDecisionContext(ref, vi.fn(), []);

        it('should return a DecisionError object with the expected message', () => {
            const result = createInputNotFoundError(context, ref);

            const expectedMessage = `Ref ${JSON.stringify(ref)} not found.`;
            expect(result.msg).toBe(expectedMessage);
        });
    });
});
