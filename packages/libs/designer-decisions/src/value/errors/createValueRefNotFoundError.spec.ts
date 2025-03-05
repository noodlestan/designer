import { describe, expect, it, vi } from 'vitest';

import type { DecisionRef } from '../../inputs';
import type { ValueContext } from '../types';

import { createValueRefNotFoundError } from './createValueRefNotFoundError';

describe('createValueRefNotFoundError()', () => {
    describe('Given context, name, and ref', () => {
        const mockDecisionContext = {
            ref: vi.fn(() => ({ $uuid: 'decision-uuid' })),
        };
        const mockValueContext = {
            decisionContext: vi.fn(() => mockDecisionContext),
        } as unknown as ValueContext;

        const mockRef: DecisionRef = { $uuid: 'ref-uuid' };
        const valueName = 'TestName';

        const context = mockValueContext;

        it('should return a ValueError object with the expected attributes', () => {
            const result = createValueRefNotFoundError({ context, valueName, ref: mockRef });

            expect(result.context).toBe(mockValueContext);
            expect(result.valueName).toBe(valueName);
            expect(result.ref).toBe(mockRef);
        });

        it('should return a ValueError object with the expected message', () => {
            const result = createValueRefNotFoundError({ context, valueName, ref: mockRef });

            expect(result.message()).toContain('not found, referenced in');
        });
    });
});
