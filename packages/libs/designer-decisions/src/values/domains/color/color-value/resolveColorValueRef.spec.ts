import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DECISION_COLOR_VALUE } from '../../../../constants';
import type { ColorOkLCHLiteral, DecisionInput, DecisionRef } from '../../../../inputs';
import {
    createDecisionMock,
    createPrimitiveContextMock,
    createValueContextMock,
} from '../../../../mocks';
import { COLOR_FALLBACK_LITERAL, createColor } from '../../../../primitives';
import {
    ERROR_VALUE_REF_MISMATCH,
    ERROR_VALUE_REF_NOT_FOUND,
    type ValueRefMismatchError,
    type ValueRefNotFoundError,
} from '../../../../value';
import { resolveSetRefDecision } from '../../../functions';

import { createColorValue } from './createColorValue';
import { resolveColorValueRef } from './resolveColorValueRef';

vi.mock('../../../functions');

const resolveSetRefDecisionMocked = vi.mocked(resolveSetRefDecision);

describe('resolveColorValueRef()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextMock();

        it('should return the fallback value', () => {
            const result = resolveColorValueRef(mockValueContext, mockRef);
            expect(result).toEqual(COLOR_FALLBACK_LITERAL);
        });

        it('should add an error to the context', () => {
            resolveColorValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.name).toEqual(ERROR_VALUE_REF_NOT_FOUND);
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe(DECISION_COLOR_VALUE);
        });
    });

    describe('When it resolves to a ColorSet decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-set/foo' } as DecisionInput;
        const colorObjectLiteral: ColorOkLCHLiteral = { l: 0.48, c: 0.1, h: 330 };
        const [, mockDecision] = createDecisionMock([mockInput]);
        const [mockValueContext, { resolveSpy }] = createValueContextMock(colorObjectLiteral);
        const colorValue = createColorValue(mockValueContext);

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
            resolveSetRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveSetRefDecision() with the correct arguments', () => {
            resolveColorValueRef(mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockValueContext,
                mockDecision,
                DECISION_COLOR_VALUE,
                mockRef,
            );
        });

        it('should return the resolved ColorValue', () => {
            const result = resolveColorValueRef(mockValueContext, mockRef);
            expect(result).toEqual(colorObjectLiteral);
        });
    });

    describe('When it resolves to a ColorSet decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const [mockValueContext] = createValueContextMock();

        beforeEach(() => {
            resolveSetRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveColorValueRef(mockValueContext, mockRef);
            expect(result).toEqual(COLOR_FALLBACK_LITERAL);
        });
    });

    describe('When it resolves to a ColorValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'color-value/foo' } as DecisionInput;
        const colorObjectLiteral: ColorOkLCHLiteral = { l: 0.48, c: 0.1, h: 330 };
        const [, mockDecision] = createDecisionMock(
            [mockInput],
            createColor(createPrimitiveContextMock(colorObjectLiteral)[0]),
        );
        const [mockValueContext, { resolveSpy }] = createValueContextMock(colorObjectLiteral);

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
        });

        it('should return a ColorOkLCHLiteral produced from the decision', () => {
            const result = resolveColorValueRef(mockValueContext, mockRef);
            expect(result).toEqual(colorObjectLiteral);
        });
    });

    describe('When the decision does not match the expected type', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'unexpected-type/foo' } as DecisionInput;
        const [, mockDecision] = createDecisionMock([mockInput]);
        const [mockValueContext, { addErrorSpy, resolveSpy }] = createValueContextMock();

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
        });

        it('should return the fallback value', () => {
            const result = resolveColorValueRef(mockValueContext, mockRef);
            expect(result).toEqual(COLOR_FALLBACK_LITERAL);
        });

        it('should add an error to the context', () => {
            resolveColorValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefMismatchError;
            expect(error.name).toEqual(ERROR_VALUE_REF_MISMATCH);
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe(DECISION_COLOR_VALUE);
            expect(error.message()).toContain('matched "unexpected-type"');
            expect(error.accepted).toContain('color-set');
            expect(error.accepted).toContain('color-value');
        });
    });
});
