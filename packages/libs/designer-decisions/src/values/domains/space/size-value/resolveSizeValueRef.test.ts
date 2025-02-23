import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DECISION_SIZE_VALUE } from '../../../../constants';
import type { DecisionInput, DecisionRef, SizeObjectLiteral } from '../../../../inputs';
import {
    createStaticDecisionMock,
    createValueContextMock,
    createValueContextWithResolveMock,
} from '../../../../mocks';
import type { ValueRefNotFoundError } from '../../../../value';
import { resolveSetRefDecision } from '../../../functions';
import type { SizeScale, SizeValue } from '../types';

import { createSizeValue } from './createSizeValue';
import { FALLBACK_VALUE } from './private';
import { resolveSizeValueRef } from './resolveSizeValueRef';

vi.mock('../../../functions', async importOriginal => {
    return {
        ...(await importOriginal<typeof import('../../../functions')>()),
        resolveSetRefDecision: vi.fn(),
    };
});

const resolveSetRefDecisionMocked = vi.mocked(resolveSetRefDecision);

describe('resolveSizeValueRef()', () => {
    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock();

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveSizeValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveSizeValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain('not found');
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe(DECISION_SIZE_VALUE);
        });
    });

    describe('When it resolves to a SizeScale with a quantized value and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'size-scale/foo' } as DecisionInput;
        const [, mockDecision] = createStaticDecisionMock<SizeScale>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const SizeObjectLiteral: SizeObjectLiteral = { value: 3.33, units: 'px' };
        const sizeValue = createSizeValue(createValueContextMock()[0], SizeObjectLiteral, {
            quantize: 5,
        });

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(sizeValue);
        });

        it('should call resolveSetRefDecision() with the correct arguments', () => {
            resolveSizeValueRef(mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                DECISION_SIZE_VALUE,
                mockRef,
            );
        });

        it('should return the resolved (quantized) SizeValue', () => {
            const result = resolveSizeValueRef(mockValueContext, mockRef);
            expect(result).toEqual({
                value: 5,
                units: 'px',
            });
        });
    });

    describe('When it resolves to a SizeScale decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'size-scale/foo' } as DecisionInput;
        const [, mockDecision] = createStaticDecisionMock<SizeScale>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveSizeValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });
    });

    describe('When it resolves to a SizeValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'size-value/foo' } as DecisionInput;
        const SizeObjectLiteral: SizeObjectLiteral = { value: 3.33, units: 'px' };
        const SizeValue = createSizeValue(createValueContextMock()[0], SizeObjectLiteral, {
            quantize: 5,
        });
        const [, mockDecision] = createStaticDecisionMock<SizeValue>([mockInput], {
            toObject: SizeValue.toObject,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the (quantized) SizeValue produced by the decision', () => {
            const result = resolveSizeValueRef(mockValueContext, mockRef);
            expect(result).toEqual({
                value: 5,
                units: 'px',
            });
        });
    });

    describe('When the decision does not match the expected type', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'unexpected-type/foo' } as DecisionInput;
        const [, mockDecision] = createStaticDecisionMock([mockInput]);
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock([
            undefined,
            mockDecision,
        ]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveSizeValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveSizeValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain('matched "unexpected-type", expected size-value');
        });
    });
});
