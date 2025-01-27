import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionUnknown, InputRecord } from '../types';

import { createDecisionContext } from './createDecisionContext';
import { createStaticDecision } from './createStaticDecision';
import { getDecisionModelFactory } from './getDecisionModelFactory';
import { createDecisionModelMock } from './mocks';

vi.mock('./getDecisionModelFactory', () => ({
    getDecisionModelFactory: vi.fn(),
}));

const getDecisionModelFactoryMocked = vi.mocked(getDecisionModelFactory);

describe('createStaticStoreDecision()', () => {
    const mockInputs: InputRecord[] = [
        {
            uuid: 'test-uuid',
            model: 'type/model',
            name: 'Test Decision',
            description: 'A test decision',
            params: { key: 'value' },
        },
    ];

    describe('Given a decision context and inputs', () => {
        it('should return a valid Decision object with the expected state', () => {
            const decisionContext = createDecisionContext(
                { $uuid: 'decision-context' },
                vi.fn(),
                [],
            );
            const decision = createStaticDecision<string>(decisionContext, mockInputs);

            expect(decision.uuid()).toBe('test-uuid');
            expect(decision.type()).toBe('type');
            expect(decision.name()).toBe('Test Decision');
            expect(decision.description()).toBe('A test decision');
            expect(decision.inputs()).toEqual(mockInputs);
            expect(decision.input()).toEqual(mockInputs[0]);
            expect(decision.model()).toBe('type/model');
            expect(decision.params()).toEqual({ key: 'value' });
        });
    });

    describe('When produce() is invoked', () => {
        const mockValue = 'mockProducedValue';
        const mockModel = createDecisionModelMock(mockValue);
        const decisionContext = createDecisionContext({ $uuid: 'decision-context' }, vi.fn(), []);

        let result: DecisionUnknown;

        beforeEach(() => {
            getDecisionModelFactoryMocked.mockReturnValue(() => mockModel);
            result = createStaticDecision<string>(decisionContext, mockInputs);
        });

        it('should invoke the model produce method with context and params', () => {
            const producedValue = result.produce();

            expect(mockModel.produce).toHaveBeenCalledOnce();
            expect(mockModel.produce).toHaveBeenCalledWith(
                producedValue.context(),
                mockInputs[0].params,
            );
        });

        it('should return a value with the expected context', () => {
            const decisionContext = createDecisionContext(
                { $uuid: 'decision-context' },
                vi.fn(),
                [],
            );
            const decision = createStaticDecision<string>(decisionContext, mockInputs);
            const producedValue = decision.produce();

            expect(producedValue.context().decisionContext()).toBe(decisionContext);
            expect(producedValue.context().decisionInput()).toBe(mockInputs[0]);
        });

        it('should return the decision produced by the model', () => {
            const decisionContext = createDecisionContext(
                { $uuid: 'decision-context' },
                vi.fn(),
                [],
            );
            const decision = createStaticDecision<string>(decisionContext, mockInputs);
            const producedValue = decision.produce();

            expect(producedValue.get()).toBe(mockValue);
        });
    });
});
