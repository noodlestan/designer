import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createStaticDecisionMock } from '../../../mocks';
import type {
    ColorSet,
    ColorValue,
    DecisionRef,
    DecisionValueRefNotFoundError,
    InputRecord,
} from '../../../types';
import { resolveSetRefDecision } from '../../functions';
import { createValueContextMock, createValueContextWithResolveMock } from '../../mocks';
import { createColorValue } from '../value';

import { createSRGBSaturationValue } from './createSRGBSaturationValue';
import { FALLBACK_VALUE } from './private';
import { resolveSRGBSaturationValueRef } from './resolveSRGBSaturationValueRef';

vi.mock('../../functions', async importOriginal => {
    return {
        ...(await importOriginal<typeof import('../../functions')>()),
        resolveSetRefDecision: vi.fn(),
    };
});

const resolveSetRefDecisionMocked = vi.mocked(resolveSetRefDecision);

describe('resolveSRGBSaturationValueRef()', () => {
    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock();

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveSRGBSaturationValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveSRGBSaturationValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as DecisionValueRefNotFoundError;
            expect(error.message()).toContain('not found');
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe('SRGBSaturationValue');
        });
    });

    describe('When it resolves to a ColorSet decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-set' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const mockColor = { h: 123, s: 0.7, l: 0.3 };
        const colorValue = createColorValue(createValueContextMock()[0], mockColor);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveSetRefDecision() with the correct arguments', () => {
            resolveSRGBSaturationValueRef(mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                'SRGBSaturationValue',
                mockRef,
            );
        });

        it('should return the SRGBSaturationValue channel of the resolved ColorValue', () => {
            const result = resolveSRGBSaturationValueRef(mockValueContext, mockRef);
            expect(result).toBeCloseTo(mockColor.s);
        });
    });

    describe('When it resolves to a ColorSet decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-set' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveSRGBSaturationValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });
    });

    describe('When it resolves to a ColorValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'color-value' } as InputRecord;
        const mockColor = { h: 100, s: 0.7, l: 0.1 };
        const [, mockDecision] = createStaticDecisionMock<ColorValue>([mockInput], {
            toObject: () => mockColor,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the SRGBSaturationValue channel of the ColorValue', () => {
            const result = resolveSRGBSaturationValueRef(mockValueContext, mockRef);
            expect(result).toBeCloseTo(mockColor.s);
        });
    });

    describe('When it resolves to a ColorSRGBSaturationScale decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-srgb-saturation-scale' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const mockColor = { h: 123, s: 0.7, l: 0.3 };
        const colorValue = createSRGBSaturationValue(createValueContextMock()[0], mockColor.s);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveSetRefDecision() with the correct arguments', () => {
            resolveSRGBSaturationValueRef(mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                'SRGBSaturationValue',
                mockRef,
            );
        });

        it('should return the resolved SRGBSaturationValue', () => {
            const result = resolveSRGBSaturationValueRef(mockValueContext, mockRef);
            expect(result).toEqual(mockColor.s);
        });
    });

    describe('When it resolves to a ColorSRGBSaturationScale decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-srgb-saturation-scale' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveSRGBSaturationValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });
    });

    describe('When it resolves to a ColorSRGBSaturationValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'color-srgb-saturation-value' } as InputRecord;
        const mockColor = { h: 100, s: 0.7, l: 0.1 };
        const [, mockDecision] = createStaticDecisionMock<ColorValue>([mockInput], {
            get: () => mockColor.s,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the resolved ColorSRGBSaturationValue', () => {
            const result = resolveSRGBSaturationValueRef(mockValueContext, mockRef);
            expect(result).toEqual(mockColor.s);
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
            const result = resolveSRGBSaturationValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveSRGBSaturationValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as DecisionValueRefNotFoundError;
            expect(error.message()).toContain('unexpected-model');
        });
    });
});
