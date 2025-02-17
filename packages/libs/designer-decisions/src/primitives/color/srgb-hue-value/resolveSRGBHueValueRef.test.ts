import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DecisionRef, InputRecord } from '../../../inputs';
import {
    createStaticDecisionMock,
    createValueContextMock,
    createValueContextWithResolveMock,
} from '../../../mocks';
import { DecisionValueRefNotFoundError } from '../../../values';
import { resolveSetRefDecision } from '../../functions';
import { ColorSet, ColorValue } from '../../types';
import { createColorValue } from '../value';

import { createSRGBHueValue } from './createSRGBHueValue';
import { FALLBACK_VALUE } from './private';
import { resolveSRGBHueValueRef } from './resolveSRGBHueValueRef';

vi.mock('../../functions', async importOriginal => {
    return {
        ...(await importOriginal<typeof import('../../functions')>()),
        resolveSetRefDecision: vi.fn(),
    };
});

const resolveSetRefDecisionMocked = vi.mocked(resolveSetRefDecision);

describe('resolveSRGBHueValueRef()', () => {
    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock();

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveSRGBHueValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveSRGBHueValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as DecisionValueRefNotFoundError;
            expect(error.message()).toContain('not found');
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe('SRGBHueValue');
        });
    });

    describe('When it resolves to a ColorSet decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-set' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const mockColor = { h: 122, s: 0.7, l: 0.3 };
        const colorValue = createColorValue(createValueContextMock()[0], mockColor);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveSetRefDecision() with the correct arguments', () => {
            resolveSRGBHueValueRef(mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                'SRGBHueValue',
                mockRef,
            );
        });

        it('should return the SRGBHueValue channel of the resolved ColorValue', () => {
            const result = resolveSRGBHueValueRef(mockValueContext, mockRef);
            expect(result).toBeCloseTo(mockColor.h);
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
            const result = resolveSRGBHueValueRef(mockValueContext, mockRef);
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

        it('should return the SRGBHueValue channel of the ColorValue', () => {
            const result = resolveSRGBHueValueRef(mockValueContext, mockRef);
            expect(result).toBeCloseTo(mockColor.h);
        });
    });

    describe('When it resolves to a ColorSRGBHueScale decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-srgb-hue-set' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const mockColor = { h: 123, s: 0.7, l: 0.3 };
        const colorValue = createSRGBHueValue(createValueContextMock()[0], mockColor.h);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveSetRefDecision() with the correct arguments', () => {
            resolveSRGBHueValueRef(mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                'SRGBHueValue',
                mockRef,
            );
        });

        it('should return the resolved SRGBHueValue', () => {
            const result = resolveSRGBHueValueRef(mockValueContext, mockRef);
            expect(result).toEqual(mockColor.h);
        });
    });

    describe('When it resolves to a ColorSRGBHueScale decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-srgb-hue-set' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveSRGBHueValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });
    });

    describe('When it resolves to a ColorSRGBHueValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'color-srgb-hue-value' } as InputRecord;
        const mockColor = { h: 100, s: 0.7, l: 0.1 };
        const [, mockDecision] = createStaticDecisionMock<ColorValue>([mockInput], {
            get: () => mockColor.h,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the resolved ColorSRGBHueValue', () => {
            const result = resolveSRGBHueValueRef(mockValueContext, mockRef);
            expect(result).toEqual(mockColor.h);
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
            const result = resolveSRGBHueValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveSRGBHueValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as DecisionValueRefNotFoundError;
            expect(error.message()).toContain('unexpected-model');
        });
    });
});
