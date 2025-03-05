import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DECISION_TYPEFACE_VALUE } from '../../../../constants';
import type { DecisionInput, DecisionRef } from '../../../../inputs';
import { createDecisionMock, createValueContextMock } from '../../../../mocks';
import { TYPEFACE_FALLBACK_LITERAL } from '../../../../primitives';
import type { ValueRefNotFoundError } from '../../../../value';

import { resolveTypefaceValueRef } from './resolveTypefaceValueRef';

describe('resolveTypefaceValueRef()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextMock();

        it('should return the fallback value', () => {
            const result = resolveTypefaceValueRef(mockValueContext, mockRef);
            expect(result).toEqual(TYPEFACE_FALLBACK_LITERAL);
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
        const mockInput = { model: 'typeface-value/foo' } as DecisionInput;
        const typeFaceLiteral = { fontName: 'Georgia' };
        const [, mockDecision] = createDecisionMock([mockInput], {
            get: () => ({ literal: () => typeFaceLiteral }),
        });
        const [mockValueContext, { resolveSpy }] = createValueContextMock();

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
        });

        it('should return a TypefaceObjectLiteral produced from the decision', () => {
            const result = resolveTypefaceValueRef(mockValueContext, mockRef);
            expect(result).toEqual(typeFaceLiteral);
        });
    });

    describe('When the decision does not match the expected type', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'unexpected-type/foo' } as DecisionInput;
        const [, mockDecision] = createDecisionMock([mockInput]);
        const [mockValueContext, { resolveSpy, addErrorSpy }] = createValueContextMock();

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
        });

        it('should return the fallback value', () => {
            const result = resolveTypefaceValueRef(mockValueContext, mockRef);
            expect(result).toEqual(TYPEFACE_FALLBACK_LITERAL);
        });

        it('should add an error to the context', () => {
            resolveTypefaceValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain('matched "unexpected-type", expected typeface-value');
        });
    });
});
