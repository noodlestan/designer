import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createStaticDecisionMock } from '../../../mocks';
import type {
    DecisionRef,
    DecisionValueRefNotFoundError,
    InputRecord,
    SpaceScale,
    SpaceValue,
    SpaceWithUnits,
} from '../../../types';
import { resolveScaleRefDecision } from '../../functions';
import { createValueContextMock, createValueContextWithResolveMock } from '../../mocks';

import { createSpaceValue } from './createSpaceValue';
import { FALLBACK_VALUE } from './private';
import { resolveSpaceValueRef } from './resolveSpaceValueRef';

vi.mock('../../functions', async importOriginal => {
    return {
        ...(await importOriginal<typeof import('../../functions')>()),
        resolveScaleRefDecision: vi.fn(),
    };
});

const resolveScaleRefDecisionMocked = vi.mocked(resolveScaleRefDecision);

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

    describe('When it resolves to a SpaceScale and the item is resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'space-scale' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<SpaceScale>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        const spaceWithUnits: SpaceWithUnits = { value: 3, units: 'px' };
        const spaceValue = createSpaceValue(createValueContextMock()[0], spaceWithUnits);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveScaleRefDecisionMocked.mockReturnValue(spaceValue);
        });

        it('should call resolveScaleRefDecision() with the correct arguments', () => {
            resolveSpaceValueRef(mockValueContext, mockRef);
            expect(resolveScaleRefDecisionMocked).toHaveBeenCalledOnce();
            expect(resolveScaleRefDecisionMocked).toHaveBeenCalledWith(
                mockDecision,
                mockValueContext,
                'SpaceValue',
                mockRef,
            );
        });

        it('should return the resolved SpaceValue', () => {
            const result = resolveSpaceValueRef(mockValueContext, mockRef);
            expect(result).toEqual(spaceWithUnits);
        });
    });

    describe('When it resolves to a SpaceScale decision and the item is not resolved', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'space-scale' } as InputRecord;
        const [, mockDecision] = createStaticDecisionMock<SpaceScale>([mockInput]);
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
            resolveScaleRefDecisionMocked.mockReturnValue(undefined);
        });

        it('should return the fallback value', () => {
            const result = resolveSpaceValueRef(mockValueContext, mockRef);
            expect(result).toEqual(FALLBACK_VALUE);
        });
    });

    describe('When it resolves to a SpaceValue decision', () => {
        const mockRef: DecisionRef = { $uuid: 'mock-uuid' };
        const mockInput = { model: 'space-value' } as InputRecord;
        const spaceWithUnits: SpaceWithUnits = { value: 3, units: 'px' };
        const [, mockDecision] = createStaticDecisionMock<SpaceValue>([mockInput], {
            getValueWithUnits: () => spaceWithUnits,
        });
        const [mockValueContext] = createValueContextWithResolveMock([undefined, mockDecision]);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return the SpaceValue produced by the decision', () => {
            const result = resolveSpaceValueRef(mockValueContext, mockRef);
            expect(result).toEqual(spaceWithUnits);
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
