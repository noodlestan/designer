import {
    type DecisionInput,
    type DecisionInputError,
    type StaticValidatedMap,
    createStaticDecision,
} from '@noodlestan/designer-decisions';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
    createStaticDecisionMockImplementation,
    createStaticValidatedMapMock,
} from '../../../mocks';

import { createStaticResolver } from './createStaticResolver';

vi.mock(import('@noodlestan/designer-decisions'), async importOriginal => {
    const actual = await importOriginal();
    return {
        ...actual,
        // your mocked methods
        createStaticDecision: vi.fn(),
    };
});

const createStaticDecisionMocked = vi.mocked(createStaticDecision);

describe('createStaticResolver()', () => {
    describe('Given a ref and matching inputs', () => {
        const mockRef = { $name: 'Decision1' };
        const inputs = [{ uuid: '1', model: 'model/type', name: 'Decision1', params: {} }];
        const inputStore: StaticValidatedMap = createStaticValidatedMapMock(inputs);
        const staticResolver = createStaticResolver(inputStore);
        const mockValue = 'mockProducedValue';

        beforeEach(() => {
            vi.clearAllMocks();
            createStaticDecisionMocked.mockImplementation(
                createStaticDecisionMockImplementation({ get: () => mockValue }, inputs),
            );
        });

        it('should invoke decision factory with a new context and the matching inputs', () => {
            const [context] = staticResolver.resolve(mockRef);

            expect(createStaticDecisionMocked).toHaveBeenCalledOnce();
            expect(createStaticDecisionMocked).toHaveBeenCalledWith(context);
        });

        it('should return a context with the expected ref and inputs', () => {
            const [context] = staticResolver.resolve(mockRef);

            expect(context.ref()).toEqual(mockRef);
            expect(context.inputs()).toEqual(inputs);
        });

        it('should return the resolved decision', () => {
            const [, decision] = staticResolver.resolve(mockRef);

            expect(decision?.produce().get()).toBe(mockValue);
        });
    });

    describe('Given a ref and matching inputs and errors', () => {
        const mockRef = { $name: 'Decision2' };
        const inputs = [{ uuid: '1', model: 'model/type', name: 'Decision1', params: {} }];
        const errors = [{ input: inputs[0] }] as DecisionInputError[];
        const inputStore: StaticValidatedMap = createStaticValidatedMapMock(inputs, errors);
        const staticResolver = createStaticResolver(inputStore);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return a context with a DecisionError', () => {
            const [context] = staticResolver.resolve(mockRef);

            expect(context.hasErrors()).toBe(true);
            expect(context.errors()).toHaveLength(1);
            expect(context.errors()[0]).toEqual(errors[0]);
        });
    });

    describe('Given a ref and no matching inputs', () => {
        const mockRef = { $name: 'NonexistentDecision' };
        const inputStore: StaticValidatedMap = createStaticValidatedMapMock();
        const staticResolver = createStaticResolver(inputStore);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return a context with a DecisionError', () => {
            const [context] = staticResolver.resolve(mockRef);

            expect(context.hasErrors()).toBe(true);
            expect(context.errors()).toHaveLength(1);
            expect(context.errors()[0].message()).toContain('not found');
        });

        it('should return a context with the expected ref and empty inputs', () => {
            const [context] = staticResolver.resolve(mockRef);

            expect(context.ref()).toEqual(mockRef);
            expect(context.inputs()).toEqual([]);
        });

        it('should not return a decision', () => {
            const [, decision] = staticResolver.resolve(mockRef);

            expect(decision).toBeUndefined();
        });
    });

    describe('When an unexpected error occurs during decision creation', () => {
        const mockRef = { $name: 'Decision3' };
        const mockInputs: DecisionInput[] = [
            { uuid: '2', model: 'model/type', name: 'Decision3', params: {} },
        ];
        const inputStore: StaticValidatedMap = createStaticValidatedMapMock(mockInputs);
        const staticResolver = createStaticResolver(inputStore);

        beforeEach(() => {
            vi.clearAllMocks();
            createStaticDecisionMocked.mockImplementation(() => {
                throw new Error('Mock error');
            });
        });

        it('should return a context with a DecisionError', () => {
            const [context] = staticResolver.resolve(mockRef);

            expect(context.hasErrors()).toBe(true);
            expect(context.errors()).toHaveLength(1);
            expect(context.errors()[0].message()).toContain('Unexpected error');
            expect(context.errors()[0].message()).toContain('Mock error');
        });

        it('should return a context with the expected ref and inputs', () => {
            const [context] = staticResolver.resolve(mockRef);

            expect(context.ref()).toEqual(mockRef);
            expect(context.inputs()).toEqual(mockInputs);
        });

        it('should not return a decision', () => {
            const [, decision] = staticResolver.resolve(mockRef);

            expect(decision).toBeUndefined();
        });
    });
});
