import { beforeEach, describe, expect, it, vi } from 'vitest';

import { D_TEXT_STYLE_VALUE } from '../../../../constants';
import type { DecisionInput, DecisionRef } from '../../../../inputs';
import { createDecisionMock, createValueContextMock } from '../../../../mocks';
import { TEXT_STYLE_ATTRIBUTES_FALLBACK } from '../../../../primitives';
import {
    ERROR_VALUE_REF_MISMATCH,
    ERROR_VALUE_REF_NOT_FOUND,
    type ValueRefMismatchError,
    type ValueRefNotFoundError,
} from '../../../../value';

import { resolveTextStyleValueRef } from './resolveTextStyleValueRef';

describe('resolveTextStyleValueRef()', () => {
    const fallbackTextStyle = TEXT_STYLE_ATTRIBUTES_FALLBACK;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextMock();

        it('should return the fallback value', () => {
            const result = resolveTextStyleValueRef(mockValueContext, mockRef);
            expect(result).toEqual(fallbackTextStyle);
        });

        it('should add an error to the context', () => {
            resolveTextStyleValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.name).toEqual(ERROR_VALUE_REF_NOT_FOUND);
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe(D_TEXT_STYLE_VALUE);
        });
    });

    describe('When it resolves to a TextStyleValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { resolveSpy }] = createValueContextMock(mockRef);

        const mockInput = { model: 'text-style-value/foo' } as DecisionInput;
        const textStyleLiteral = { fontFamily: 'Georgia' };
        const [, mockDecision] = createDecisionMock([mockInput], {
            literal: () => textStyleLiteral,
        });

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
        });

        it('should return a TextStyleObjectLiteral produced from the decision', () => {
            const result = resolveTextStyleValueRef(mockValueContext, mockRef);
            expect(result).toEqual(textStyleLiteral);
        });
    });

    describe('When the decision does not match the expected type', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy, resolveSpy }] = createValueContextMock(mockRef);

        const mockInput = { model: 'unexpected-type/foo' } as DecisionInput;
        const [, mockDecision] = createDecisionMock([mockInput]);

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
        });

        it('should return the fallback value', () => {
            const result = resolveTextStyleValueRef(mockValueContext, mockRef);
            expect(result).toEqual(TEXT_STYLE_ATTRIBUTES_FALLBACK);
        });

        it('should add an error to the context', () => {
            resolveTextStyleValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefMismatchError;
            expect(error.name).toEqual(ERROR_VALUE_REF_MISMATCH);
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe(D_TEXT_STYLE_VALUE);
            expect(error.message()).toContain('matched "unexpected-type"');
            expect(error.accepted).toContain('text-style-value');
        });
    });
});
