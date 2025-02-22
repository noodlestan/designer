import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DECISION_COLOR_OKLAB_HUE_VALUE } from '../../../../../constants';
import type { DecisionInput, DecisionRef } from '../../../../../inputs';
import {
    createStaticDecisionMock,
    createValueContextMock,
    createValueContextWithResolveMock,
} from '../../../../../mocks';
import type { ValueRefNotFoundError } from '../../../../../value';
import { resolveSetRefDecision } from '../../../../functions';
import { type ColorSet, type ColorValue } from '../../../../primitives';
import { createColorValue } from '../../color-value';

import { createColorChannelValue } from './createColorChannelValue';
import { mockChannelAttributes } from './mocks';
import { resolveColorChannelValueRef } from './resolveColorChannelValueRef';

vi.mock('../../../../functions', async importOriginal => {
    return {
        ...(await importOriginal<typeof import('../../../../functions')>()),
        resolveSetRefDecision: vi.fn(),
    };
});

const resolveSetRefDecisionMocked = vi.mocked(resolveSetRefDecision);

describe('resolveColorChannelValueRef()', () => {
    const mockChannel = mockChannelAttributes;

    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock();

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveColorChannelValueRef(mockChannel, mockValueContext, mockRef);
            expect(result).toEqual(mockChannel.fallback);
        });

        it('should add an error to the context', () => {
            resolveColorChannelValueRef(mockChannel, mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain('not found');
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe('color-oklab-hue-value');
        });
    });

    describe('When it resolves to a ColorSet decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-set' } as DecisionInput;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const mockColor = { l: 0.1, c: 0.01, h: 333 };
        const colorValue = createColorValue(createValueContextMock()[0], mockColor);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveSetRefDecision() with the correct arguments', () => {
            resolveColorChannelValueRef(mockChannel, mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                DECISION_COLOR_OKLAB_HUE_VALUE,
                mockRef,
            );
        });

        it('should return the correct channel of the resolved ColorValue', () => {
            const result = resolveColorChannelValueRef(mockChannel, mockValueContext, mockRef);
            expect(result).toBeCloseTo(mockColor.h);
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
            const result = resolveColorChannelValueRef(mockChannel, mockValueContext, mockRef);
            expect(result).toEqual(mockChannel.fallback);
        });
    });

    describe('When it resolves to a ColorValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'color-value' } as DecisionInput;
        const mockColor = { l: 0.1, c: 0.01, h: 333 };
        const [, mockDecision] = createStaticDecisionMock<ColorValue>([mockInput], {
            toObject: () => mockColor,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the correct channel of the ColorValue', () => {
            const result = resolveColorChannelValueRef(mockChannel, mockValueContext, mockRef);
            expect(result).toBeCloseTo(mockColor.h);
        });
    });

    describe('When it resolves to a ColorOklabHueSet decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-oklab-hue-set' } as DecisionInput;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const mockColor = { l: 0.1, c: 0.01, h: 333 };
        const colorValue = createColorChannelValue(
            mockChannel,
            createValueContextMock()[0],
            mockColor.h,
        );

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveSetRefDecision() with the correct arguments', () => {
            resolveColorChannelValueRef(mockChannel, mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                DECISION_COLOR_OKLAB_HUE_VALUE,
                mockRef,
            );
        });

        it('should return the resolved OklabHueValue', () => {
            const result = resolveColorChannelValueRef(mockChannel, mockValueContext, mockRef);
            expect(result).toEqual(mockColor.h);
        });
    });

    describe('When it resolves to a ColorOklabHueSet decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-oklab-hue-set' } as DecisionInput;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveColorChannelValueRef(mockChannel, mockValueContext, mockRef);
            expect(result).toEqual(mockChannel.fallback);
        });
    });

    describe('When it resolves to a ColorOklabHueValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'color-oklab-hue-value' } as DecisionInput;
        const mockColor = { l: 0.1, c: 0.01, h: 333 };
        const [, mockDecision] = createStaticDecisionMock<ColorValue>([mockInput], {
            get: () => mockColor.h,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the resolved ColorOklabHueValue', () => {
            const result = resolveColorChannelValueRef(mockChannel, mockValueContext, mockRef);
            expect(result).toEqual(mockColor.h);
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
            const result = resolveColorChannelValueRef(mockChannel, mockValueContext, mockRef);
            expect(result).toEqual(mockChannel.fallback);
        });

        it('should add an error to the context', () => {
            resolveColorChannelValueRef(mockChannel, mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as ValueRefNotFoundError;
            expect(error.message()).toContain('unexpected-model');
        });
    });
});
