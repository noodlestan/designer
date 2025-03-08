import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionInput } from '../inputs';
import { createDecisionContextMock, createDecisionModelMock } from '../mocks';
import type { ModelContext } from '../model';

import { createDecision } from './createDecision';
import { getDecisionModelFactory } from './getDecisionModelFactory';

vi.mock('./getDecisionModelFactory');

const getDecisionModelFactoryMocked = vi.mocked(getDecisionModelFactory);

type MockValueType = {
    foo: 'Bar';
};

describe('createDecision()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const defaultLookupContext = { all: [] };
    const mockInputs: DecisionInput[] = [
        {
            uuid: 'test-uuid',
            model: 'decision-type/model',
            name: 'Test Decision',
            description: 'A test decision',
            params: { key: 'value' },
        },
    ];

    describe('Given a decision context and inputs', () => {
        it('should return a valid Decision object with the expected state', () => {
            const [mockDecisionContext] = createDecisionContextMock(mockInputs);
            const decision = createDecision<MockValueType>(mockDecisionContext);

            expect(decision.uuid()).toBe('test-uuid');
            expect(decision.type()).toBe('decision-type');
            expect(decision.name()).toBe('Test Decision');
            expect(decision.description()).toBe('A test decision');
            expect(decision.records().map(r => r.input)).toEqual(mockInputs);
            expect(decision.model()).toBe('decision-type/model');
            expect(decision.params()).toEqual({ key: 'value' });
        });
    });

    describe('When produce() is invoked', () => {
        const mockValue = { foo: 'mockProducedValue' };
        const [mockModel, { produceSpy }] = createDecisionModelMock('decision-type', mockValue);
        const [mockDecisionContext] = createDecisionContextMock(mockInputs);

        beforeEach(() => {
            getDecisionModelFactoryMocked.mockReturnValue(() => mockModel);
        });

        it('should call getDecisionModelFactory() with the decision model', () => {
            const result = createDecision<MockValueType>(mockDecisionContext);
            result.produce();

            expect(getDecisionModelFactoryMocked).toHaveBeenCalledExactlyOnceWith(
                'decision-type/model',
            );
        });

        it('should call the model produce() method with a model context', () => {
            const result = createDecision<MockValueType>(mockDecisionContext);
            result.produce();

            expect(produceSpy).toHaveBeenCalledOnce();
            const modelContext = produceSpy.mock.calls[0][0] as ModelContext;
            expect(modelContext.decisionContext()).toBe(mockDecisionContext);
            expect(modelContext.decisionInput()).toBe(mockInputs[0]);
            expect(modelContext.lookupContexts()).toEqual(defaultLookupContext);
        });

        it('should return the value produced by the model', () => {
            const result = createDecision<MockValueType>(mockDecisionContext);
            const producedValue = result.produce();

            expect(producedValue.get()).toBe(mockValue);
            expect(producedValue.foo).toBe('mockProducedValue');
            expect(producedValue.type()).toBe('decision-type');
        });
    });

    describe('When produce() is invoked with a Lookup context', () => {
        const mockValue = { foo: 'mockProducedValue' };
        const [mockModel, { produceSpy }] = createDecisionModelMock('decision-type', mockValue);
        const [mockDecisionContext] = createDecisionContextMock(mockInputs);
        const mockLookupContexts = { all: ['foo'] };

        beforeEach(() => {
            getDecisionModelFactoryMocked.mockReturnValue(() => mockModel);
        });

        it('should call the model produce() method with a model context', () => {
            const result = createDecision<MockValueType>(mockDecisionContext);
            result.produce(mockLookupContexts);

            expect(produceSpy).toHaveBeenCalledOnce();
            const modelContext = produceSpy.mock.calls[0][0] as ModelContext;
            expect(modelContext.lookupContexts()).toBe(mockLookupContexts);
        });
    });

    describe('When produce() is invoked and getDecisionModelFactory() throws an error', () => {
        const [mockDecisionContext] = createDecisionContextMock(mockInputs);

        beforeEach(() => {
            getDecisionModelFactoryMocked.mockImplementationOnce(() => {
                throw new Error('The error "foo/bar".');
            });
        });

        it('should return an empty value', () => {
            const result = createDecision<MockValueType>(mockDecisionContext);

            expect(() => result.produce()).toThrow('The error "foo/bar"');
        });
    });
});
