import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DECISION_FONT_FAMILY_VALUE } from '../../../../constants';
import type { DecisionInput, DecisionRef } from '../../../../inputs';
import { createDecisionMock, createValueContextMock } from '../../../../mocks';
import { FONT_FAMILY_FALLBACK_LITERAL } from '../../../../primitives';
import {
    ERROR_VALUE_REF_MISMATCH,
    ERROR_VALUE_REF_NOT_FOUND,
    type ValueRefMismatchError,
    type ValueRefNotFoundError,
} from '../../../../value';

import { resolveFontFamilyValueRef } from './resolveFontFamilyValueRef';

describe('resolveFontFamilyValueRef()', () => {
    const fallbackFontFamily = FONT_FAMILY_FALLBACK_LITERAL;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextMock();

        it('should return the fallback value', () => {
            const result = resolveFontFamilyValueRef(mockValueContext, mockRef);
            expect(result).toEqual(fallbackFontFamily);
        });

        it('should add an error to the context', () => {
            resolveFontFamilyValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.name).toEqual(ERROR_VALUE_REF_NOT_FOUND);
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe(DECISION_FONT_FAMILY_VALUE);
        });
    });

    describe('When it resolves to a FontFamilyValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { resolveSpy }] = createValueContextMock(mockRef);

        const mockInput = { model: 'font-family-value/foo' } as DecisionInput;
        const fontFamilyLiteral = ['Foo', 'Bar'];
        const [, mockDecision] = createDecisionMock([mockInput], {
            families: fontFamilyLiteral,
        });

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
        });

        it('should return a FontFamilyObjectLiteral produced from the decision', () => {
            const result = resolveFontFamilyValueRef(mockValueContext, mockRef);
            expect(result).toEqual(fontFamilyLiteral);
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
            const result = resolveFontFamilyValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FONT_FAMILY_FALLBACK_LITERAL);
        });

        it('should add an error to the context', () => {
            resolveFontFamilyValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefMismatchError;
            expect(error.name).toEqual(ERROR_VALUE_REF_MISMATCH);
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe(DECISION_FONT_FAMILY_VALUE);
            expect(error.message()).toContain('matched "unexpected-type"');
            expect(error.accepted).toContain('font-family-value');
        });
    });
});
