import { describe, expect, it, vi } from 'vitest';

import { ERROR_DECISION_NOT_FOUND, ERROR_LAYER_DECISION } from '../constants';
import { createDecisionContext } from '../createDecisionContext';

import { createDecisionNotFoundError } from './createDecisionNotFoundError';

describe('createDecisionNotFoundError()', () => {
    const ref = { $uuid: 'test-uuid' };
    const mockDecisionContext = createDecisionContext(ref, vi.fn(), []);

    describe('Given a context and a ref', () => {
        const mockRef = { $uuid: 'test-uuid' };

        it('should return a DecisionError object with the expected attributes', () => {
            const result = createDecisionNotFoundError({
                context: mockDecisionContext,
                ref: mockRef,
            });
            expect(result.layer).toEqual(ERROR_LAYER_DECISION);
            expect(result.name).toEqual(ERROR_DECISION_NOT_FOUND);
            expect(result.context).toEqual(mockDecisionContext);
            expect(result.ref).toEqual(mockRef);
        });

        it('should return a DecisionError object with the expected message', () => {
            const result = createDecisionNotFoundError({
                context: mockDecisionContext,
                ref: mockRef,
            });

            expect(result.message()).toContain('Decision Not Found');
            expect(result.message()).toContain(mockRef.$uuid);
        });
    });
});
