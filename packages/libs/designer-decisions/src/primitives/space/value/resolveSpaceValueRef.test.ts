import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
    createStaticDecisionMock,
    createValueContextMock,
    createValueContextWithResolveMock,
} from '../../../mocks';
import type {
    DecisionRef,
    DecisionValueRefNotFoundError,
    InputRecord,
    SpaceScale,
    SpaceValue,
    SpaceWithUnits,
} from '../../../types';
import { resolveSetRefDecision } from '../../functions';

import { createSpaceValue } from './createSpaceValue';
import { FALLBACK_VALUE } from './private';
import { resolveSpaceValueRef } from './resolveSpaceValueRef';

vi.mock('../../functions', async importOriginal => {
    return {
        ...(await importOriginal<typeof import('../../functions')>()),
        resolveSetRefDecision: vi.fn(),
    };
});

const resolveSetRefDecisionMocked = vi.mocked(resolveSetRefDecision);

describe('resolveSpaceValueRef()', () => {
    describe('When the decision cannot be resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock();

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveSpaceValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveSpaceValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as DecisionValueRefNotFoundError;
            expect(error.message()).toContain('not found');
            expect(error.context).toBe(mockValueContext);
            expect(error.ref).toBe(mockRef);
            expect(error.valueName).toBe('SpaceValue');
        });
    });

    describe('When it resolves to a SpaceScale with a quantized value and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'space-scale' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<SpaceScale>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const spaceWithUnits: SpaceWithUnits = { value: 3.33, units: 'px' };
        const spaceValue = createSpaceValue(createValueContextMock()[0], spaceWithUnits, {
            quantize: 5,
        });

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(spaceValue);
        });

        it('should call resolveSetRefDecision() with the correct arguments', () => {
            resolveSpaceValueRef(mockValueContext, mockRef);
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveSetRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                'SpaceValue',
                mockRef,
            );
        });

        it('should return the resolved (quantized) SpaceValue', () => {
            const result = resolveSpaceValueRef(mockValueContext, mockRef);
            expect(result).toEqual({
                value: 5,
                units: 'px',
            });
        });
    });

    describe('When it resolves to a SpaceScale decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'space-scale' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<SpaceScale>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveSetRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveSpaceValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });
    });

    describe('When it resolves to a SpaceValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'space-value' } as InputRecord;
        const spaceWithUnits: SpaceWithUnits = { value: 3.33, units: 'px' };
        const spaceValue = createSpaceValue(createValueContextMock()[0], spaceWithUnits, {
            quantize: 5,
        });
        const [, mockDecision] = createStaticDecisionMock<SpaceValue>([mockInput], {
            getObject: spaceValue.getObject,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the (quantized) SpaceValue produced by the decision', () => {
            const result = resolveSpaceValueRef(mockValueContext, mockRef);
            expect(result).toEqual({
                value: 5,
                units: 'px',
            });
        });
    });

    describe('When the decision does not match the expected type', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'decision-model' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock([mockInput]);
        const [mockValueContext, { addErrorSpy }] = createValueContextWithResolveMock([
            undefined,
            mockDecision,
        ]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the fallback value', () => {
            const result = resolveSpaceValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });

        it('should add an error to the context', () => {
            resolveSpaceValueRef(mockValueContext, mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0] as DecisionValueRefNotFoundError;
            expect(error.message()).toContain('matched "decision-model", expected space-value');
        });
    });
});
