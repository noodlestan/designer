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

import { createOklabHueValue } from './createOklabHueValue';
import { FALLBACK_VALUE } from './private';
import { resolveOklabHueValueRef } from './resolveOklabHueValueRef';

vi.mock('../../functions', async importOriginal => {
    return {
        ...(await importOriginal<typeof import('../../functions')>()),
        resolveSetRefDecision: vi.fn(),
    };
});

const resolveSetRefDecisionMocked = vi.mocked(resolveSetRefDecision);

describe('resolveOklabHueValueRef()', () => {
    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock();

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveOklabHueValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveOklabHueValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as DecisionValueRefNotFoundError;
            expect(error.message()).toContain('not found');
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe('OklabHueValue');
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
            resolveSetRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveSetRefDecision() with the correct arguments', () => {
            resolveOklabHueValueRef(mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                'OklabHueValue',
                mockRef,
            );
        });

        it('should return the OklabHueValue channel of the resolved ColorValue', () => {
            const result = resolveOklabHueValueRef(mockValueContext, mockRef);
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
            const result = resolveOklabHueValueRef(mockValueContext, mockRef);
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

        it('should return the OklabHueValue channel of the ColorValue', () => {
            const result = resolveOklabHueValueRef(mockValueContext, mockRef);
            expect(result).toBeCloseTo(mockColor.h);
        });
    });

    describe('When it resolves to a ColorOklabHueSet decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-oklab-hue-set' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const mockColor = { l: 0.1, c: 0.01, h: 333 };
        const colorValue = createOklabHueValue(createValueContextMock()[0], mockColor.h);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveSetRefDecision() with the correct arguments', () => {
            resolveOklabHueValueRef(mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                'OklabHueValue',
                mockRef,
            );
        });

        it('should return the resolved OklabHueValue', () => {
            const result = resolveOklabHueValueRef(mockValueContext, mockRef);
            expect(result).toEqual(mockColor.h);
        });
    });

    describe('When it resolves to a ColorOklabHueSet decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-oklab-hue-set' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveOklabHueValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });
    });

    describe('When it resolves to a ColorOklabHueValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'color-oklab-hue-value' } as InputRecord;
        const mockColor = { l: 0.1, c: 0.01, h: 333 };
        const [, mockDecision] = createStaticDecisionMock<ColorValue>([mockInput], {
            get: () => mockColor.h,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the resolved ColorOklabHueValue', () => {
            const result = resolveOklabHueValueRef(mockValueContext, mockRef);
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
            const result = resolveOklabHueValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveOklabHueValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as DecisionValueRefNotFoundError;
            expect(error.message()).toContain('unexpected-model');
        });
    });
});
