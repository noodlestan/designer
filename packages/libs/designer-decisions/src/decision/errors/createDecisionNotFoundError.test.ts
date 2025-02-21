import { describe, expect, it, vi } from 'vitest';

import { createDecisionContext } from '../createDecisionContext';

import { createDecisionNotFoundError } from './createDecisionNotFoundError';

describe('createDecisionNotFoundError()', () => {
    const ref = { $uuid: 'test-uuid' };
    const mockContext = createDecisionContext(ref, vi.fn(), []);

    describe('Given a context and a ref', () => {
        const mockRef = { $uuid: 'test-uuid' };

        it('should return a DecisionError object with the expected attributes', () => {
            const result = createDecisionNotFoundError({ context: mockContext, ref: mockRef });

            expect(result.context).toEqual(mockContext);
            expect(result.ref).toEqual(mockRef);
        });

        it('should return a DecisionError object with the expected message', () => {
            const result = createDecisionNotFoundError({ context: mockContext, ref: mockRef });

            expect(result.message()).toContain('not found');
        });
    });
});
