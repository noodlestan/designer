import { describe, expect, it, vi } from 'vitest';

import type { DecisionUnknown } from '../../decision';
import type { DecisionRef } from '../../inputs';
import { createValueContextMock } from '../../mocks';

import { ERROR_LAYER_VALUE, ERROR_VALUE_REF_MISMATCH } from './constants';
import { createValueRefMismatchError } from './createValueRefMismatchError';

describe('createValueRefMismatchError()', () => {
    describe('Given context, value name, ref, decision, and accepted types', () => {
        const [mockValueContext] = createValueContextMock();
        const mockDecision = {
            type: vi.fn(() => 'TestType'),
        } as unknown as DecisionUnknown;

        const mockRef: DecisionRef = { $uuid: 'ref-uuid' };
        const valueName = 'foo-value';
        const accepted = ['TypeA', 'TypeB'];

        const ref = mockRef;

        it('should return a ValueRefMismatchError object with the expected attributes', () => {
            const result = createValueRefMismatchError({
                context: mockValueContext,
                decision: mockDecision,
                valueName,
                ref,
                accepted,
            });
            expect(result.layer).toBe(ERROR_LAYER_VALUE);
            expect(result.name).toBe(ERROR_VALUE_REF_MISMATCH);
            expect(result.context).toBe(mockValueContext);
            expect(result.valueName).toBe(valueName);
            expect(result.ref).toBe(mockRef);
            expect(result.decision).toBe(mockDecision);
            expect(result.accepted).toEqual(accepted);
        });

        it('should return a ValueRefMismatchError object with the expected message', () => {
            const result = createValueRefMismatchError({
                context: mockValueContext,
                decision: mockDecision,
                valueName,
                ref,
                accepted,
            });
            expect(result.message()).toContain('Ref Mismatch resolving foo-value.');
            expect(result.message()).toContain(`matched "TestType", expected`);
            expect(result.message()).toContain(`TypeA or TypeB`);
        });
    });
});
