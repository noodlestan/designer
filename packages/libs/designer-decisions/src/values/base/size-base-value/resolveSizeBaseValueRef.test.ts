import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DECISION_FONT_SIZE_VALUE } from '../../../constants';
import type { DecisionInput, DecisionRef, SizeObjectLiteral } from '../../../inputs';
import {
    createStaticDecisionMock,
    createValueContextMock,
    createValueContextWithResolveMock,
} from '../../../mocks';
import type { ValueRefNotFoundError } from '../../../value';
import { SizeScale, SizeValue } from '../../domains';
import { resolveSetRefDecision } from '../../functions';

import { createSizeBaseValue } from './createSizeBaseValue';
import { mockSizeDefinition } from './mocks';
import { resolveSizeBaseValueRef } from './resolveSizeBaseValueRef';

vi.mock('../../functions', async importOriginal => {
    return {
        ...(await importOriginal<typeof import('../../functions')>()),
        resolveSetRefDecision: vi.fn(),
    };
});

const resolveSetRefDecisionMocked = vi.mocked(resolveSetRefDecision);

describe('resolveSizeBaseValueRef()', () => {
    const sizeDef = mockSizeDefinition;

    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock();

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);
            expect(result).toEqual(sizeDef.fallback);
        });

        it('should add an error to the context', () => {
            resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain('not found');
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe(DECISION_FONT_SIZE_VALUE);
        });
    });

    describe('When it resolves to a SizeScale with a quantized value and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'size-scale/foo' } as DecisionInput;
        const [, mockDecision] = createStaticDecisionMock<SizeScale>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const SizeObjectLiteral: SizeObjectLiteral = { value: 3.33, units: 'px' };
        const sizeValue = createSizeBaseValue(
            sizeDef,
            createValueContextMock()[0],
            SizeObjectLiteral,
            {
                quantize: 5,
            },
        );

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(sizeValue);
        });

        it('should call resolveSetRefDecision() with the correct arguments', () => {
            resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                DECISION_FONT_SIZE_VALUE,
                mockRef,
            );
        });

        it('should return the resolved (quantized) SizeValue', () => {
            const result = resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);
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
            const result = resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);
            expect(result).toEqual(sizeDef.fallback);
        });
    });

    describe('When it resolves to a SizeValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'size-value/foo' } as DecisionInput;
        const SizeObjectLiteral: SizeObjectLiteral = { value: 3.33, units: 'px' };
        const SizeValue = createSizeBaseValue(
            sizeDef,
            createValueContextMock()[0],
            SizeObjectLiteral,
            {
                quantize: 5,
            },
        );
        const [, mockDecision] = createStaticDecisionMock<SizeValue>([mockInput], {
            toObject: SizeValue.toObject,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the (quantized) SizeValue produced by the decision', () => {
            const result = resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);
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
            const result = resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);
            expect(result).toEqual(sizeDef.fallback);
        });

        it('should add an error to the context', () => {
            resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain(
                'matched "unexpected-type", expected size-scale, size-value, font-size-value',
            );
        });
    });
});
