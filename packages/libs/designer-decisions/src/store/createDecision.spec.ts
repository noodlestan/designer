import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionInput } from '../inputs';
import { createDecisionContextMock, createDecisionModelMock } from '../mocks';
import type { ValueError } from '../value';

import { createDecision } from './createDecision';
import { getDecisionModelFactory } from './getDecisionModelFactory';

vi.mock('./getDecisionModelFactory');

const getDecisionModelFactoryMocked = vi.mocked(getDecisionModelFactory);

describe('createDecision()', () => {
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
            const [decisionContext] = createDecisionContextMock(mockInputs);
            const decision = createDecision<string>(decisionContext);

            expect(decision.uuid()).toBe('test-uuid');
            expect(decision.type()).toBe('decision-type');
            expect(decision.name()).toBe('Test Decision');
            expect(decision.description()).toBe('A test decision');
            expect(decision.inputs()).toEqual(mockInputs);
            expect(decision.model()).toBe('decision-type/model');
            expect(decision.params()).toEqual({ key: 'value' });
        });
    });

    describe('When produce() is invoked', () => {
        const mockValue = 'mockProducedValue';
        const mockModel = createDecisionModelMock('decision-type', mockValue);
        const [decisionContext] = createDecisionContextMock(mockInputs);

        beforeEach(() => {
            getDecisionModelFactoryMocked.mockReturnValue(() => mockModel);
        });

        it('should return a value with the expected context', () => {
            const result = createDecision<string>(decisionContext);
            const producedValue = result.produce();

            expect(producedValue.context().decisionContext()).toBe(decisionContext);
            expect(producedValue.context().input()).toBe(mockInputs[0]);
        });

        it('should return the decision produced by the model', () => {
            const result = createDecision<string>(decisionContext);
            const producedValue = result.produce();

            expect(producedValue.get()).toBe(mockValue);
            expect(producedValue.type()).toBe('decision-type');
        });
    });

    describe('When produce() is invoked and getDecisionModelFactory() throws an error', () => {
        const [decisionContext] = createDecisionContextMock(mockInputs);

        beforeEach(() => {
            getDecisionModelFactoryMocked.mockImplementationOnce(() => {
                throw new Error('The error "foo/bar".');
            });
        });

        it('should return an empty value', () => {
            const result = createDecision<string>(decisionContext);
            const producedValue = result.produce();

            expect(producedValue.get()).toBe(undefined);
            expect(producedValue.type()).toBe('decision-type');
        });

        it('should return a value with errors', () => {
            const result = createDecision<string>(decisionContext);
            const producedValue = result.produce();

            expect(producedValue.context().hasErrors()).toBe(true);

            const error = producedValue.context().allErrors()[0] as ValueError;
            expect(error.valueName).toEqual('unknown');
            expect(error.message()).toContain('The error "foo/bar"');
        });
    });
});
