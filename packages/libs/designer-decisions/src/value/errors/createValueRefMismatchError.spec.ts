import { describe, expect, it, vi } from 'vitest';

import type { DecisionUnknown } from '../../decision';
import type { DecisionRef } from '../../inputs';
import type { ValueContext } from '../types';

import { createValueRefMismatchError } from './createValueRefMismatchError';

describe('createValueRefMismatchError()', () => {
    describe('Given context, value name, ref, decision, and accepted types', () => {
        const mockValueContext = {
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as ValueContext;
        const mockDecision = {
            type: vi.fn(() => 'TestType'),
        } as unknown as DecisionUnknown;

        const mockRef: DecisionRef = { $uuid: 'ref-uuid' };
        const valueName = 'ValueName';
        const accepted = ['TypeA', 'TypeB'];

        const context = mockValueContext;
        const decision = mockDecision;
        const ref = mockRef;

        it('should return a ValueRefMismatchError object with the expected attributes', () => {
            const result = createValueRefMismatchError({
                context,
                decision,
                valueName,
                ref,
                accepted,
            });

            expect(result.context).toBe(mockValueContext);
            expect(result.valueName).toBe(valueName);
            expect(result.ref).toBe(mockRef);
            expect(result.decision).toBe(mockDecision);
            expect(result.accepted).toEqual(accepted);
        });

        it('should return a ValueRefMismatchError object with the expected message', () => {
            const result = createValueRefMismatchError({
                context,
                decision,
                valueName,
                ref,
                accepted,
            });

            const expectedMessage = `matched "TestType", expected`;
            expect(result.message()).toContain(expectedMessage);
        });
    });
});
