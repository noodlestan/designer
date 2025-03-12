import { beforeEach, describe, expect, it, vi } from 'vitest';

import { D_LINE_HEIGHT_VALUE } from '../../../../constants';
import type { DecisionInput, DecisionRef, LineHeightObjectLiteral } from '../../../../inputs';
import {
    createDecisionMock,
    createPrimitiveContextMock,
    createValueContextMock,
} from '../../../../mocks';
import { LINE_HEIGHT_FALLBACK_LITERAL, createLineHeight } from '../../../../primitives';
import {
    ERROR_VALUE_REF_MISMATCH,
    ERROR_VALUE_REF_NOT_FOUND,
    type ValueRefMismatchError,
    type ValueRefNotFoundError,
} from '../../../../value';

import { resolveLineHeightValueRef } from './resolveLineHeightValueRef';

describe('resolveLineHeightValueRef()', () => {
    const fallbackLineHeight = LINE_HEIGHT_FALLBACK_LITERAL;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextMock();

        it('should return the fallback value', () => {
            const result = resolveLineHeightValueRef(mockValueContext, mockRef);
            expect(result).toEqual(fallbackLineHeight);
        });

        it('should add an error to the context', () => {
            resolveLineHeightValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.name).toEqual(ERROR_VALUE_REF_NOT_FOUND);
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe(D_LINE_HEIGHT_VALUE);
        });
    });

    describe('When it resolves to a LineHeightValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { resolveSpy }] = createValueContextMock(mockRef);

        const mockInput = { model: 'line-height-value/foo' } as DecisionInput;
        const LineHeightLiteral: LineHeightObjectLiteral = { value: 1.75 };
        const [, mockDecision] = createDecisionMock(
            [mockInput],
            createLineHeight(createPrimitiveContextMock(LineHeightLiteral)[0]),
        );

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
        });

        it('should return a LineHeightObjectLiteral produced from the decision', () => {
            const result = resolveLineHeightValueRef(mockValueContext, mockRef);
            expect(result).toEqual(LineHeightLiteral);
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
            const result = resolveLineHeightValueRef(mockValueContext, mockRef);
            expect(result).toEqual(LINE_HEIGHT_FALLBACK_LITERAL);
        });

        it('should add an error to the context', () => {
            resolveLineHeightValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefMismatchError;
            expect(error.name).toEqual(ERROR_VALUE_REF_MISMATCH);
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe(D_LINE_HEIGHT_VALUE);
            expect(error.message()).toContain('matched "unexpected-type"');
            expect(error.accepted).toContain('line-height-value');
        });
    });
});
