import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionInput, DecisionRef } from '../../../inputs';
import { createDecisionMock, createValueContextMock, mockChannelDefinition } from '../../../mocks';
import {
    ERROR_VALUE_REF_MISMATCH,
    ERROR_VALUE_REF_NOT_FOUND,
    type ValueRefMismatchError,
    type ValueRefNotFoundError,
} from '../../../value';
import { createColorValue, createOklabHueValue } from '../../domains';
import { resolveSetRefDecision } from '../../functions';

import { resolveColorChannelBaseValueRef } from './resolveColorChannelBaseValueRef';

vi.mock('../../functions');

const resolveSetRefDecisionMocked = vi.mocked(resolveSetRefDecision);

describe('resolveColorChannelBaseValueRef()', () => {
    const channelDef = mockChannelDefinition;
    const fallbackChannel = { value: channelDef.fallback };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextMock();

        it('should return the fallback value', () => {
            const result = resolveColorChannelBaseValueRef(channelDef, mockValueContext, mockRef);
            expect(result).toEqual(fallbackChannel);
        });

        it('should add an error to the context', () => {
            resolveColorChannelBaseValueRef(channelDef, mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.name).toEqual(ERROR_VALUE_REF_NOT_FOUND);
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe(channelDef.valueName);
        });
    });

    describe('When it resolves to a ColorSet decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const [mockValueContext, { resolveSpy }] = createValueContextMock(mockRef);

        const mockInput = { model: 'color-set/foo' } as DecisionInput;
        const colorLiteral = { l: 0.1, c: 0.01, h: 333 };
        const [, mockDecision] = createDecisionMock([mockInput]);
        const colorValue = createColorValue(createValueContextMock(colorLiteral)[0]);

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
            resolveSetRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveSetRefDecision() with the expected arguments', () => {
            resolveColorChannelBaseValueRef(channelDef, mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockValueContext,
                mockDecision,
                channelDef.valueName,
                mockRef,
            );
        });

        it('should return the correct channel of the resolved ColorValue', () => {
            const result = resolveColorChannelBaseValueRef(channelDef, mockValueContext, mockRef);
            expect(result).toEqual({ value: colorLiteral.h });
        });
    });

    describe('When it resolves to a ColorSet decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const [mockValueContext, { resolveSpy }] = createValueContextMock(mockRef);

        const mockInput = { model: 'color-set/foo' } as DecisionInput;
        const [, mockDecision] = createDecisionMock([mockInput]);

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
            resolveSetRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveColorChannelBaseValueRef(channelDef, mockValueContext, mockRef);
            expect(result).toEqual(fallbackChannel);
        });
    });

    describe('When it resolves to a ColorValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { resolveSpy }] = createValueContextMock(mockRef);

        const mockInput = { model: 'color-value/foo' } as DecisionInput;
        const colorLiteral = { l: 0.1, c: 0.01, h: 333 };
        const [, mockDecision] = createDecisionMock([mockInput], {
            toObject: () => colorLiteral,
        });

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
        });

        it('should return the correct channel of the ColorValue', () => {
            const result = resolveColorChannelBaseValueRef(channelDef, mockValueContext, mockRef);
            expect(result).toEqual({ value: colorLiteral.h });
        });
    });

    describe('When it resolves to a ColorOklabHueSet decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const [mockValueContext, { resolveSpy }] = createValueContextMock(mockRef);

        const mockInput = { model: 'color-oklab-hue-set/foo' } as DecisionInput;
        const channelLiteral = { value: 123 };
        const [, mockDecision] = createDecisionMock([mockInput]);
        const colorChannelBaseValue = createOklabHueValue(createValueContextMock(123)[0]);

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
            resolveSetRefDecisionMocked.mockReturnValue(colorChannelBaseValue);
        });

        it('should call resolveSetRefDecision() with the expected arguments', () => {
            resolveColorChannelBaseValueRef(channelDef, mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockValueContext,
                mockDecision,
                channelDef.valueName,
                mockRef,
            );
        });

        it('should return the resolved OklabHueValue', () => {
            const result = resolveColorChannelBaseValueRef(channelDef, mockValueContext, mockRef);
            expect(result).toEqual(channelLiteral);
        });
    });

    describe('When it resolves to a ColorOklabHueSet decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const [mockValueContext, { resolveSpy }] = createValueContextMock(mockRef);

        const mockInput = { model: 'color-oklab-hue-set/foo' } as DecisionInput;
        const [, mockDecision] = createDecisionMock([mockInput]);

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
            resolveSetRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveColorChannelBaseValueRef(channelDef, mockValueContext, mockRef);
            expect(result).toEqual(fallbackChannel);
        });
    });

    describe('When it resolves to a ColorOklabHueValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { resolveSpy }] = createValueContextMock(mockRef);

        const mockInput = { model: 'color-oklab-hue-value/foo' } as DecisionInput;
        const channelLiteral = { value: 123 };
        const [, mockDecision] = createDecisionMock([mockInput], {
            literal: () => channelLiteral,
        });

        beforeEach(() => {
            resolveSpy.mockReturnValue(mockDecision);
        });

        it('should return the resolved ColorOklabHueValue', () => {
            const result = resolveColorChannelBaseValueRef(channelDef, mockValueContext, mockRef);
            expect(result).toEqual(channelLiteral);
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
            const result = resolveColorChannelBaseValueRef(channelDef, mockValueContext, mockRef);
            expect(result).toEqual(fallbackChannel);
        });

        it('should add an error to the context', () => {
            resolveColorChannelBaseValueRef(channelDef, mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefMismatchError;
            expect(error.name).toEqual(ERROR_VALUE_REF_MISMATCH);
            expect(error.accepted).toContain('color-set');
            expect(error.accepted).toContain('color-value');
            expect(error.accepted).toContain(channelDef.decisionTypes.set);
            expect(error.accepted).toContain(channelDef.decisionTypes.value);
        });
    });
});
