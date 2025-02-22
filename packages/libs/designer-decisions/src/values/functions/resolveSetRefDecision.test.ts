import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionRef } from '../../inputs';
import { createStaticDecisionMock, createValueContextMock } from '../../mocks';
import { ValueInputError } from '../../value';
import { BaseSet } from '../base';
import { createItemSet } from '../primitives';

import { resolveSetRefDecision } from './resolveSetRefDecision';

describe('resolveSetRefDecision()', () => {
    const [mockContext, { addErrorSpy }] = createValueContextMock();
    const mockValueName = 'mock-scale';
    const mockSpace1 = { value: 10, units: 'px' };
    const mockSpace2 = { value: 12, units: 'px' };

    const itemSet = createItemSet([mockSpace1, mockSpace2]);
    const [, decisionMock] = createStaticDecisionMock<BaseSet<typeof mockSpace1>>([], {
        get: () => itemSet,
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given an index within the scale', () => {
        it('should return the correct value from the scale', () => {
            const ref: DecisionRef = { $uuid: 'test-uuid', index: 1 };
            const result = resolveSetRefDecision(decisionMock, mockContext, mockValueName, ref);

            expect(result).toEqual(mockSpace2);
        });
    });

    describe('Given an index that does not exist in the set', () => {
        it('should return undefined ', () => {
            const ref: DecisionRef = { $uuid: 'test-uuid', index: 5 };
            const result = resolveSetRefDecision(decisionMock, mockContext, mockValueName, ref);

            expect(result).toBeUndefined();
        });
        it('should return undefined and add an error if the reference is out of bounds', () => {
            const ref: DecisionRef = { $uuid: 'test-uuid', index: 5 };

            resolveSetRefDecision(decisionMock, mockContext, mockValueName, ref);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueInputError;
            expect(error.message()).toContain('out of bounds');
        });
    });

    describe('Given no index', () => {
        it('should return the first item of the set', () => {
            const ref: DecisionRef = { $uuid: 'test-uuid' };
            const result = resolveSetRefDecision(decisionMock, mockContext, mockValueName, ref);

            expect(result).toEqual(mockSpace1);
        });
    });
});
