import chroma from 'chroma-js';
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

import { createColorValue } from './createColorValue';
import { FALLBACK_VALUE } from './private';
import { resolveColorValueRef } from './resolveColorValueRef';

vi.mock('../../functions', async importOriginal => {
    return {
        ...(await importOriginal<typeof import('../../functions')>()),
        resolveScaleRefDecision: vi.fn(),
    };
});

const resolveScaleRefDecisionMocked = vi.mocked(resolveScaleRefDecision);

describe('resolveColorValueRef()', () => {
    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock();

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveColorValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveColorValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as DecisionValueRefNotFoundError;
            expect(error.message()).toContain('not found');
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe('ColorValue');
        });
    });

    describe('When it resolves to a ColorSet decision and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid', index: 1 };
        const mockInput = { model: 'color-set' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<ColorSet>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const mockColor = `#123456`;
        const colorValue = createColorValue(createValueContextMock()[0], mockColor);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveScaleRefDecisionMocked.mockReturnValue(colorValue);
        });

        it('should call resolveScaleRefDecision() with the correct arguments', () => {
            resolveColorValueRef(mockValueContext, mockRef);
            expect(resolveScaleRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveScaleRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                'ColorValue',
                mockRef,
            );
        });

        it('should return the resolved ColorValue', () => {
            const result = resolveColorValueRef(mockValueContext, mockRef);
            expect(result).toEqual(colorValue);
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
            const result = resolveColorValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });
    });

    describe('When it resolves to a ColorValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'color-value' } as InputRecord;
        const mockColor = chroma('#ff0000');
        const [, mockDecision] = createStaticDecisionMock<ColorValue>([mockInput], {
            get: () => mockColor,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the ColorValue produced by the decision', () => {
            const result = resolveColorValueRef(mockValueContext, mockRef);
            expect(result.get()).toEqual(mockColor);
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
            const result = resolveColorValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveColorValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as DecisionValueRefNotFoundError;
            expect(error.message()).toContain('unexpected-model');
        });
    });
});
