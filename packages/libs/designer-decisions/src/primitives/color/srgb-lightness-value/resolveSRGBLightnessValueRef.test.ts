import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DecisionInput, DecisionRef } from '../../../inputs';
import {
    createStaticDecisionMock,
    createValueContextMock,
    createValueContextWithResolveMock,
} from '../../../mocks';
import { ValueRefNotFoundError } from '../../../values';
import { resolveSetRefDecision } from '../../functions';
import { ColorSet, ColorValue } from '../../types';
import { createColorValue } from '../value';

import { createSRGBLightnessValue } from './createSRGBLightnessValue';
import { FALLBACK_VALUE } from './private';
import { resolveSRGBLightnessValueRef } from './resolveSRGBLightnessValueRef';

vi.mock('../../functions', async importOriginal => {
    return {
        ...(await importOriginal<typeof import('../../functions')>()),
        resolveSetRefDecision: vi.fn(),
    };
});

const resolveSetRefDecisionMocked = vi.mocked(resolveSetRefDecision);

describe('resolveSRGBLightnessValueRef()', () => {
    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock();

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveSRGBLightnessValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveSRGBLightnessValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain('not found');
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe('SRGBLightnessValue');
        });
    });

    describe('When it resolves to a ColorSet decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-set' } as DecisionInput;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const mockColor = { h: 123, s: 0.7, l: 0.3 };
        const colorValue = createColorValue(createValueContextMock()[0], mockColor);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveSetRefDecision() with the correct arguments', () => {
            resolveSRGBLightnessValueRef(mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                'SRGBLightnessValue',
                mockRef,
            );
        });

        it('should return the SRGBLightnessValue channel of the resolved ColorValue', () => {
            const result = resolveSRGBLightnessValueRef(mockValueContext, mockRef);
            expect(result).toBeCloseTo(mockColor.l);
        });
    });

    describe('When it resolves to a ColorSet decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-set' } as DecisionInput;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveSRGBLightnessValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });
    });

    describe('When it resolves to a ColorValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'color-value' } as DecisionInput;
        const mockColor = { h: 100, s: 0.7, l: 0.1 };
        const [, mockDecision] = createStaticDecisionMock<ColorValue>([mockInput], {
            toObject: () => mockColor,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the SRGBLightnessValue channel of the ColorValue', () => {
            const result = resolveSRGBLightnessValueRef(mockValueContext, mockRef);
            expect(result).toBeCloseTo(mockColor.l);
        });
    });

    describe('When it resolves to a ColorSRGBLightnessScale decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-srgb-lightness-scale' } as DecisionInput;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const mockColor = { h: 123, s: 0.7, l: 0.3 };
        const colorValue = createSRGBLightnessValue(createValueContextMock()[0], mockColor.l);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveSetRefDecision() with the correct arguments', () => {
            resolveSRGBLightnessValueRef(mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                'SRGBLightnessValue',
                mockRef,
            );
        });

        it('should return the resolved SRGBLightnessValue', () => {
            const result = resolveSRGBLightnessValueRef(mockValueContext, mockRef);
            expect(result).toEqual(mockColor.l);
        });
    });

    describe('When it resolves to a ColorSRGBLightnessScale decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-srgb-lightness-scale' } as DecisionInput;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveSRGBLightnessValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });
    });

    describe('When it resolves to a ColorSRGBLightnessValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'color-srgb-lightness-value' } as DecisionInput;
        const mockColor = { h: 100, s: 0.7, l: 0.1 };
        const [, mockDecision] = createStaticDecisionMock<ColorValue>([mockInput], {
            get: () => mockColor.l,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the resolved ColorSRGBLightnessValue', () => {
            const result = resolveSRGBLightnessValueRef(mockValueContext, mockRef);
            expect(result).toEqual(mockColor.l);
        });
    });

    describe('When the decision does not match the expected type', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'unexpected-model' } as DecisionInput;
        const [, mockDecision] = createStaticDecisionMock([mockInput]);
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock([
            undefined,
            mockDecision,
        ]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveSRGBLightnessValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveSRGBLightnessValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain('unexpected-model');
        });
    });
});
