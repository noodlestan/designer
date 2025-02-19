import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionInput } from '../inputs';
import { createDecisionContextMock, createDecisionModelMock } from '../mocks';

import { createStaticDecision } from './createStaticDecision';
import { getDecisionModelFactory } from './getDecisionModelFactory';

vi.mock('./getDecisionModelFactory');

const getDecisionModelFactoryMocked = vi.mocked(getDecisionModelFactory);

describe('createStaticStoreDecision()', () => {
    const mockInputs: DecisionInput[] = [
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
            const [decisionContext] = createDecisionContextMock(mockInputs);
            const decision = createStaticDecision<string>(decisionContext);

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
        const [decisionContext] = createDecisionContextMock(mockInputs);

        beforeEach(() => {
            getDecisionModelFactoryMocked.mockReturnValue(() => mockModel);
        });

        it('should return a value with the expected context', () => {
            const result = createStaticDecision<string>(decisionContext);
            const producedValue = result.produce();

            expect(producedValue.context().decisionContext()).toBe(decisionContext);
            expect(producedValue.context().decisionInput()).toBe(mockInputs[0]);
        });

        it('should return the decision produced by the model', () => {
            const result = createStaticDecision<string>(decisionContext);
            const producedValue = result.produce();

            expect(producedValue.get()).toBe(mockValue);
        });
    });

    describe('When produce() is invoked and getDecisionModelFactory() throws an error', () => {
        const [decisionContext] = createDecisionContextMock(mockInputs);

        beforeEach(() => {
            getDecisionModelFactoryMocked.mockImplementationOnce(() => {
                throw new Error('The error "foo/bar".');
            });
        });

        it('should throw the same error', () => {
            expect(() => createStaticDecision<string>(decisionContext)).toThrow(
                'The error "foo/bar".',
            );
        });
    });
});
