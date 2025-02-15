import type { ErrorObject } from 'ajv';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createStaticDecisionMockImplementation, createStaticInputMapMock } from '../mocks';
import type { InputRecord } from '../types';

import { createStaticDecision } from './createStaticDecision';
import { createStaticDecisionMap } from './createStaticDecisionMap';
import type { StaticInputMap } from './types';

vi.mock('./createStaticDecision', () => ({
    createStaticDecision: vi.fn(),
}));

const createStaticDecisionMocked = vi.mocked(createStaticDecision);

describe('createStaticDecisionMap()', () => {
    describe('Given a ref and matching inputs', () => {
        const mockRef = { $name: 'Decision1' };
        const inputs = [{ uuid: '1', model: 'model/type', name: 'Decision1', params: {} }];
        const inputStore: StaticInputMap = createStaticInputMapMock(inputs);
        const staticDecisionMap = createStaticDecisionMap(inputStore);
        const mockValue = 'mockProducedValue';

        beforeEach(() => {
            vi.clearAllMocks();
            createStaticDecisionMocked.mockImplementation(
                createStaticDecisionMockImplementation({ get: () => mockValue }),
            );
        });

        it('should invoke decision factory with a new context and the matching inputs', () => {
            const [context] = staticDecisionMap.resolve(mockRef);

            expect(createStaticDecisionMocked).toHaveBeenCalledOnce();
            expect(createStaticDecisionMocked).toHaveBeenCalledWith(context, inputs);
        });

        it('should return a context with the expected ref and inputs', () => {
            const [context] = staticDecisionMap.resolve(mockRef);

            expect(context.ref()).toEqual(mockRef);
            expect(context.inputs()).toEqual(inputs);
        });

        it('should return the resolved decision', () => {
            const [, decision] = staticDecisionMap.resolve(mockRef);

            expect(decision?.produce().get()).toBe(mockValue);
        });
    });

    describe('Given a ref and matching inputs and errors', () => {
        const mockRef = { $name: 'Decision2' };
        const inputs = [{ uuid: '1', model: 'model/type', name: 'Decision1', params: {} }];
        const errors = [{ message: 'error' }] as ErrorObject[];
        const inputStore: StaticInputMap = createStaticInputMapMock(inputs, errors);
        const staticDecisionMap = createStaticDecisionMap(inputStore);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return a context with a DecisionError', () => {
            const [context] = staticDecisionMap.resolve(mockRef);

            expect(context.hasErrors()).toBe(true);
            expect(context.errors()).toHaveLength(1);
            expect(context.errors()[0].message()).toContain('Validation error');
        });
    });

    describe('Given a ref and no matching inputs', () => {
        const mockRef = { $name: 'NonexistentDecision' };
        const inputStore: StaticInputMap = createStaticInputMapMock();
        const staticDecisionMap = createStaticDecisionMap(inputStore);

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should return a context with a DecisionError', () => {
            const [context] = staticDecisionMap.resolve(mockRef);

            expect(context.hasErrors()).toBe(true);
            expect(context.errors()).toHaveLength(1);
            expect(context.errors()[0].message()).toContain('not found');
        });

        it('should return a context with the expected ref and empty inputs', () => {
            const [context] = staticDecisionMap.resolve(mockRef);

            expect(context.ref()).toEqual(mockRef);
            expect(context.inputs()).toEqual([]);
        });

        it('should not return a decision', () => {
            const [, decision] = staticDecisionMap.resolve(mockRef);

            expect(decision).toBeUndefined();
        });
    });

    describe('When an unexpected error occurs during decision creation', () => {
        const mockRef = { $name: 'Decision3' };
        const mockInputs: InputRecord[] = [
            { uuid: '2', model: 'model/type', name: 'Decision3', params: {} },
        ];
        const inputStore: StaticInputMap = createStaticInputMapMock(mockInputs);
        const staticDecisionMap = createStaticDecisionMap(inputStore);

        beforeEach(() => {
            vi.clearAllMocks();
            createStaticDecisionMocked.mockImplementation(() => {
                throw new Error('Mock error');
            });
        });

        it('should return a context with a DecisionError', () => {
            const [context] = staticDecisionMap.resolve(mockRef);

            expect(context.hasErrors()).toBe(true);
            expect(context.errors()).toHaveLength(1);
            expect(context.errors()[0].message()).toContain('Unexpected error');
            expect(context.errors()[0].message()).toContain('Mock error');
        });

        it('should return a context with the expected ref and inputs', () => {
            const [context] = staticDecisionMap.resolve(mockRef);

            expect(context.ref()).toEqual(mockRef);
            expect(context.inputs()).toEqual(mockInputs);
        });

        it('should not return a decision', () => {
            const [, decision] = staticDecisionMap.resolve(mockRef);

            expect(decision).toBeUndefined();
        });
    });
});
