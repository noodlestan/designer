import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DECISION_FONT_WEIGHT_VALUE } from '../../../../constants';
import type { DecisionInput, DecisionRef, FontWeightObjectLiteral } from '../../../../inputs';
import {
    createDecisionMock,
    createPrimitiveContextMock,
    createValueContextMock,
} from '../../../../mocks';
import { FONT_WEIGHT_FALLBACK_LITERAL, createFontWeight } from '../../../../primitives';
import type { ValueRefNotFoundError } from '../../../../value';

import { resolveFontWeightValueRef } from './resolveFontWeightValueRef';

describe('resolveFontWeightValueRef()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextMock();

        it('should return the fallback value', () => {
            const result = resolveFontWeightValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FONT_WEIGHT_FALLBACK_LITERAL);
        });

        it('should add an error to the context', () => {
            resolveFontWeightValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain('not found');
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe(DECISION_FONT_WEIGHT_VALUE);
        });
    });

    describe('When it resolves to a FontWeightValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'font-weight-value/foo' } as DecisionInput;
        const fontWeightLiteral: FontWeightObjectLiteral = { value: 900 };
        const [, mockDecision] = createDecisionMock([mockInput], {
            get: () => createFontWeight(createPrimitiveContextMock(fontWeightLiteral)[0]),
        });
        const [mockValueContext, { resolveSpy }] = createValueContextMock(mockInput);

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
        });

        it('should return a FontWeightObjectLiteral produced from the decision', () => {
            const result = resolveFontWeightValueRef(mockValueContext, mockRef);
            expect(result).toEqual(fontWeightLiteral);
        });
    });

    describe('When the decision does not match the expected type', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'unexpected-type/foo' } as DecisionInput;
        const [, mockDecision] = createDecisionMock([mockInput]);
        const [mockValueContext, { addErrorSpy, resolveSpy }] = createValueContextMock(mockInput);

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
        });

        it('should return the fallback value', () => {
            const result = resolveFontWeightValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FONT_WEIGHT_FALLBACK_LITERAL);
        });

        it('should add an error to the context', () => {
            resolveFontWeightValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain('matched "unexpected-type"');
            expect(error.message()).toContain('font-weight-value');
        });
    });
});
