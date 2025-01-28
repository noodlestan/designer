import { describe, expect, it, vi } from 'vitest';

import { createDecisionContext } from '../createDecisionContext';

import { createInputNotFoundError } from './createInputNotFoundError';

describe('createInputNotFoundError()', () => {
    const ref = { $uuid: 'test-uuid' };
    const mockContext = createDecisionContext(ref, vi.fn(), []);

    describe('Given a context and a ref', () => {
        const mockRef = { $uuid: 'test-uuid' };

        it('should return a DecisionError object with the expected attributes', () => {
            const result = createInputNotFoundError({ context: mockContext, ref: mockRef });

            expect(result.context).toEqual(mockContext);
            expect(result.ref).toEqual(mockRef);
        });

        it('should return a DecisionError object with the expected message', () => {
            const result = createInputNotFoundError({ context: mockContext, ref: mockRef });

            expect(result.message()).toContain('not found');
        });
    });
});
