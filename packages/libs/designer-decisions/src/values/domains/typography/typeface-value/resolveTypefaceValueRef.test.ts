import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DECISION_TYPEFACE_VALUE } from '../../../../constants';
import type { DecisionInput, DecisionRef } from '../../../../inputs';
import { createStaticDecisionMock, createValueContextWithResolveMock } from '../../../../mocks';
import type { ValueRefNotFoundError } from '../../../../value';
import type { TypefaceValue } from '../types';

import { FALLBACK_VALUE } from './private';
import { resolveTypefaceValueRef } from './resolveTypefaceValueRef';

vi.mock('../../../functions', async importOriginal => {
    return {
        ...(await importOriginal<typeof import('../../../functions')>()),
        resolveSetRefDecision: vi.fn(),
    };
});

describe('resolveTypefaceValueRef()', () => {
    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock();

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveTypefaceValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveTypefaceValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain('not found');
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe(DECISION_TYPEFACE_VALUE);
        });
    });

    describe('When it resolves to a TypefaceValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'typeface-value' } as DecisionInput;
        const typeface = FALLBACK_VALUE;
        const [, mockDecision] = createStaticDecisionMock<TypefaceValue>([mockInput], {
            get: () => typeface,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the Typeface produced by the decision', () => {
            const result = resolveTypefaceValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });
    });

    describe('When the decision does not match the expected type', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'decision-model' } as DecisionInput;
        const [, mockDecision] = createStaticDecisionMock([mockInput]);
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock([
            undefined,
            mockDecision,
        ]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveTypefaceValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveTypefaceValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain('matched "decision-model", expected typeface-value');
        });
    });
});
