import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createStaticDecisionMockImplementation, createStaticInputMapMock } from '../mocks';
import type { DecisionContext, DecisionRef, DecisionUnknown, InputRecord } from '../types';

import { createStaticDecision } from './createStaticDecision';
import { createStaticDecisionMap } from './createStaticDecisionMap';
import type { StaticDecisionMap, StaticInputMap } from './types';

vi.mock('./createStaticDecision', () => ({
    createStaticDecision: vi.fn(),
}));

const createStaticDecisionMocked = vi.mocked(createStaticDecision);

describe('createStaticDecisionMap()', () => {
    describe('Given a ref and matching inputs', () => {
        const inputs = [{ uuid: '1', model: 'model/type', name: 'Decision1', params: {} }];
        const mockValue = 'mockProducedValue';

        let staticDecisionMap: StaticDecisionMap;
        let ref: DecisionRef;
        let result: [DecisionContext, DecisionUnknown | undefined];

        beforeEach(() => {
            vi.resetAllMocks();
            const inputStore: StaticInputMap = createStaticInputMapMock(inputs);
            createStaticDecisionMocked.mockImplementation(
                createStaticDecisionMockImplementation({ get: () => mockValue }),
            );

            staticDecisionMap = createStaticDecisionMap(inputStore);
            ref = { $name: 'Decision1' };
            result = staticDecisionMap.resolve(ref);
        });

        it('should invoke decision factory with a new context and the matching inputs', () => {
            const [context] = result;

            expect(createStaticDecisionMocked).toHaveBeenCalledOnce();
            expect(createStaticDecisionMocked).toHaveBeenCalledWith(context, inputs);
        });

        it('should return a context with the expected ref and inputs', () => {
            const [context] = result;

            expect(context.ref()).toEqual(ref);
            expect(context.inputs()).toEqual(inputs);
        });

        it('should return the resolved decision', () => {
            const [, decision] = result;

            expect(decision?.produce().get()).toBe(mockValue);
        });
    });

    describe('Given a ref and no matching inputs', () => {
        let staticDecisionMap: StaticDecisionMap;
        let ref: DecisionRef;
        let result: [DecisionContext, DecisionUnknown | undefined];

        beforeEach(() => {
            vi.resetAllMocks();
            const inputStore: StaticInputMap = createStaticInputMapMock([]);

            staticDecisionMap = createStaticDecisionMap(inputStore);
            ref = { $name: 'NonexistentDecision' };
            result = staticDecisionMap.resolve(ref);
        });

        it('should return a context with a DecisionError', () => {
            const [context] = result;

            expect(context.hasErrors()).toBe(true);
            expect(context.errors()).toHaveLength(1);
            expect(context.errors()[0].message()).toContain('not found');
        });

        it('should return a context with the expected ref and empty inputs', () => {
            const [context] = result;

            expect(context.ref()).toEqual(ref);
            expect(context.inputs()).toEqual([]);
        });

        it('should not return a decision', () => {
            const [, decision] = result;

            expect(decision).toBeUndefined();
        });
    });

    describe('When an unexpected error occurs during decision creation', () => {
        const mockInputs: InputRecord[] = [
            { uuid: '2', model: 'model/type', name: 'Decision2', params: {} },
        ];

        let staticDecisionMap: StaticDecisionMap;
        let ref: DecisionRef;
        let result: [DecisionContext, DecisionUnknown | undefined];

        beforeEach(() => {
            vi.resetAllMocks();
            const inputStore: StaticInputMap = createStaticInputMapMock(mockInputs);

            createStaticDecisionMocked.mockImplementation(() => {
                throw new Error('Mock error');
            });

            staticDecisionMap = createStaticDecisionMap(inputStore);
            ref = { $name: 'Decision2' };
            result = staticDecisionMap.resolve(ref);
        });

        it('should return a context with a DecisionError', () => {
            const [context] = result;

            expect(context.hasErrors()).toBe(true);
            expect(context.errors()).toHaveLength(1);
            expect(context.errors()[0].message()).toContain('Unexpected error');
            expect(context.errors()[0].message()).toContain('Mock error');
        });

        it('should return a context with the expected ref and inputs', () => {
            const [context] = result;

            expect(context.ref()).toEqual(ref);
            expect(context.inputs()).toEqual(mockInputs);
        });

        it('should not return a decision', () => {
            const [, decision] = result;

            expect(decision).toBeUndefined();
        });
    });
});
