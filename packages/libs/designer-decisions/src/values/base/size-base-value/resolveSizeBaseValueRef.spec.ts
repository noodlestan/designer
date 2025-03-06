import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionInput, DecisionRef, SizeObjectLiteral } from '../../../inputs';
import {
    createDecisionMock,
    createPrimitiveContextMock,
    createValueContextMock,
    mockSizeDefinition,
} from '../../../mocks';
import { createSize } from '../../../primitives';
import type { ValueRefNotFoundError } from '../../../value';
import { createSizeValue } from '../../domains';
import { resolveSetRefDecision } from '../../functions';

import { resolveSizeBaseValueRef } from './resolveSizeBaseValueRef';

vi.mock('../../functions');

const resolveSetRefDecisionMocked = vi.mocked(resolveSetRefDecision);

describe('resolveSizeBaseValueRef()', () => {
    const sizeDef = mockSizeDefinition;
    const fallbackSize = { value: sizeDef.fallback, unit: sizeDef.defaultUnit };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextMock(mockRef);

        it('should return the fallback value', () => {
            const result = resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);
            expect(result).toEqual(fallbackSize);
        });

        it('should add an error to the context', () => {
            resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain('not found');
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe('foo-size-value');
        });
    });

    describe('When it resolves to a SizeScale and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const [mockValueContext, { resolveSpy }] = createValueContextMock(mockRef);

        const mockInput = { model: 'size-scale/foo' } as DecisionInput;
        const sizeObjectLiteral: SizeObjectLiteral = { value: 3.33, unit: 'px' };
        const [, mockDecision] = createDecisionMock([mockInput]);
        const sizeValue = createSizeValue(createValueContextMock(sizeObjectLiteral)[0]);

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
            resolveSetRefDecisionMocked.mockReturnValue(sizeValue);
        });

        it('should call resolveSetRefDecision() with the expected arguments', () => {
            resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockValueContext,
                mockDecision,
                sizeDef.valueName,
                mockRef,
            );
        });

        it('should return the resolved (quantized) SizeValue', () => {
            const result = resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);
            expect(result).toEqual(sizeObjectLiteral);
        });
    });

    describe('When it resolves to a SizeScale decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { resolveSpy }] = createValueContextMock(mockRef);

        const mockInput = { model: 'size-scale/foo' } as DecisionInput;
        const [, mockDecision] = createDecisionMock([mockInput]);

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
            resolveSetRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);
            expect(result).toEqual(fallbackSize);
        });
    });

    describe('When it resolves to a SizeValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { resolveSpy }] = createValueContextMock(mockRef);

        const mockInput = { model: 'size-value/foo' } as DecisionInput;
        const sizeObjectLiteral: SizeObjectLiteral = { value: 3.333, unit: 'px' };
        const [, mockDecision] = createDecisionMock([mockInput], {
            get: () => createSize(sizeDef, createPrimitiveContextMock(sizeObjectLiteral)[0]),
        });

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
        });

        it('should return a SizeObjectLiteral produced from the decision', () => {
            const result = resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);
            expect(result).toEqual(sizeObjectLiteral);
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
            const result = resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);
            expect(result).toEqual(fallbackSize);
        });

        it('should add an error to the context', () => {
            resolveSizeBaseValueRef(sizeDef, mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain('matched "unexpected-type"');
            expect(error.message()).toContain('size-scale, size-value');
            expect(error.message()).toContain(sizeDef.decisionTypes.set);
            expect(error.message()).toContain(sizeDef.decisionTypes.value);
        });
    });
});
