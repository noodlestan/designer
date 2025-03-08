import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionRef } from '../../inputs';
import { createDecisionMock, createValueContextMock } from '../../mocks';
import { createItemSet } from '../../primitives';
import { ERROR_VALUE_REF_INDEX, type ValueRefIndexError } from '../../value';
import type { BaseSet } from '../base';

import { resolveSetRefDecision } from './resolveSetRefDecision';

describe('resolveSetRefDecision()', () => {
    const [mockValueContext, { addErrorSpy }] = createValueContextMock();
    const mockValueName = 'mock-scale';
    const mockSize1 = { value: 10, units: 'px' };
    const mockSize2 = { value: 12, units: 'px' };

    const itemSet = createItemSet([mockSize1, mockSize2]);
    const [, decisionMock] = createDecisionMock<BaseSet<typeof mockSize1>>([], {
        item: itemSet.item,
        get: () => itemSet,
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given an index within the scale', () => {
        it('should return the correct value from the scale', () => {
            const mockRef: DecisionRef = { $uuid: 'test-uuid', index: 1 };
            const result = resolveSetRefDecision(
                mockValueContext,
                decisionMock,
                mockValueName,
                mockRef,
            );
            expect(result).toEqual(mockSize2);
        });
    });

    describe('Given an index that does not exist in the set', () => {
        it('should return undefined ', () => {
            const mockRef: DecisionRef = { $uuid: 'test-uuid', index: 5 };
            const result = resolveSetRefDecision(
                mockValueContext,
                decisionMock,
                mockValueName,
                mockRef,
            );
            expect(result).toBeUndefined();
        });

        it('should return undefined and add an error if the reference is out of bounds', () => {
            const mockRef: DecisionRef = { $uuid: 'test-uuid', index: 5 };
            resolveSetRefDecision(mockValueContext, decisionMock, mockValueName, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefIndexError;
            expect(error.name).toEqual(ERROR_VALUE_REF_INDEX);
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe(mockValueName);
        });
    });

    describe('Given no index', () => {
        it('should return the first item of the set', () => {
            const mockRef: DecisionRef = { $uuid: 'test-uuid' };
            const result = resolveSetRefDecision(
                mockValueContext,
                decisionMock,
                mockValueName,
                mockRef,
            );
            expect(result).toEqual(mockSize1);
        });
    });
});
