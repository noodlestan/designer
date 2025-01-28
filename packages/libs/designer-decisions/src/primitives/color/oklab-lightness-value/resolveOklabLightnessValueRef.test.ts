import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createStaticDecisionMock } from '../../../mocks';
import type {
    ColorSet,
    ColorValue,
    DecisionRef,
    DecisionValueRefNotFoundError,
    InputRecord,
} from '../../../types';
import { resolveScaleRefDecision } from '../../functions';
import { createValueContextMock, createValueContextWithResolveMock } from '../../mocks';
import { createColorValue } from '../value';

import { createOklabLightnessValue } from './createOklabLightnessValue';
import { FALLBACK_VALUE } from './private';
import { resolveOklabLightnessValueRef } from './resolveOklabLightnessValueRef';

vi.mock('../../functions', async importOriginal => {
    return {
        ...(await importOriginal<typeof import('../../functions')>()),
        resolveScaleRefDecision: vi.fn(),
    };
});

const resolveScaleRefDecisionMocked = vi.mocked(resolveScaleRefDecision);

describe('resolveOklabLightnessValueRef()', () => {
    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock();

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveOklabLightnessValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveOklabLightnessValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as DecisionValueRefNotFoundError;
            expect(error.message()).toContain('not found');
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe('OklabLightnessValue');
        });
    });

    describe('When it resolves to a ColorSet decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-set' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const mockColor = { l: 0.1, c: 0.01, h: 333 };
        const colorValue = createColorValue(createValueContextMock()[0], mockColor);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveScaleRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveScaleRefDecision() with the correct arguments', () => {
            resolveOklabLightnessValueRef(mockValueContext, mockRef);
            expect(resolveScaleRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveScaleRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                'OklabLightnessValue',
                mockRef,
            );
        });

        it('should return the OklabLightnessValue channel of the resolved ColorValue', () => {
            const result = resolveOklabLightnessValueRef(mockValueContext, mockRef);
            expect(result).toBeCloseTo(mockColor.l);
        });
    });

    describe('When it resolves to a ColorSet decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-set' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveScaleRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveOklabLightnessValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });
    });

    describe('When it resolves to a ColorValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'color-value' } as InputRecord;
        const mockColor = { l: 0.1, c: 0.01, h: 333 };
        const [, mockDecision] = createStaticDecisionMock<ColorValue>([mockInput], {
            toObject: () => mockColor,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the OklabLightnessValue channel of the ColorValue', () => {
            const result = resolveOklabLightnessValueRef(mockValueContext, mockRef);
            expect(result).toBeCloseTo(mockColor.l);
        });
    });

    describe('When it resolves to a ColorOklabLightnessScale decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-oklab-lightness-scale' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const mockColor = { l: 0.1, c: 0.01, h: 333 };
        const colorValue = createOklabLightnessValue(createValueContextMock()[0], mockColor.l);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveScaleRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveScaleRefDecision() with the correct arguments', () => {
            resolveOklabLightnessValueRef(mockValueContext, mockRef);
            expect(resolveScaleRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveScaleRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                'OklabLightnessValue',
                mockRef,
            );
        });

        it('should return the resolved OklabLightnessValue', () => {
            const result = resolveOklabLightnessValueRef(mockValueContext, mockRef);
            expect(result).toEqual(mockColor.l);
        });
    });

    describe('When it resolves to a ColorOklabLightnessScale decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-oklab-lightness-scale' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveScaleRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveOklabLightnessValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });
    });

    describe('When it resolves to a ColorOklabLightnessValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'color-oklab-lightness-value' } as InputRecord;
        const mockColor = { l: 0.1, c: 0.01, h: 333 };
        const [, mockDecision] = createStaticDecisionMock<ColorValue>([mockInput], {
            get: () => mockColor.l,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the resolved ColorOklabLightnessValue', () => {
            const result = resolveOklabLightnessValueRef(mockValueContext, mockRef);
            expect(result).toEqual(mockColor.l);
        });
    });

    describe('When the decision does not match the expected type', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'unexpected-model' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock([mockInput]);
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock([
            undefined,
            mockDecision,
        ]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveOklabLightnessValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveOklabLightnessValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as DecisionValueRefNotFoundError;
            expect(error.message()).toContain('unexpected-model');
        });
    });
});
