import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createDecisionContext, createDecisionNotFoundError } from '../../decision-context';
import type { DecisionNotFoundError } from '../../decision-context';
import type { DecisionInput } from '../../inputs';
import { createDecisionContextMock, createDecisionMock, createRecordMapMock } from '../../mocks';
import type { RecordMap } from '../../record';
import type { BaseValue } from '../../values';
import { createDecision } from '../createDecision';

import { createResolver } from './createResolver';

vi.mock('../createDecision');
vi.mock('../../decision-context');

const createDecisionMocked = vi.mocked(createDecision);
const createDecisionContextMocked = vi.mocked(createDecisionContext);
const createDecisionNotFoundErrorMocked = vi.mocked(createDecisionNotFoundError);

describe('createResolver()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given a ref and matching inputs', () => {
        const mockRef = { $name: 'Decision1' };
        const inputs = [{ uuid: '1', model: 'model/type', name: 'Decision1', params: {} }];
        const inputStore: RecordMap = createRecordMapMock(inputs);
        const resolver = createResolver(inputStore);
        const [mockDecisionContext, mockDecision] = createDecisionMock<BaseValue<object>>(inputs);

        beforeEach(() => {
            createDecisionContextMocked.mockReturnValue(mockDecisionContext);
            createDecisionMocked.mockReturnValue(mockDecision);
        });

        it('should create a new context', () => {
            resolver.resolve(mockRef);

            expect(createDecisionContextMocked).toHaveBeenCalledOnce();
            expect(createDecisionContextMocked).toHaveBeenCalledWith(
                mockRef,
                resolver.resolve,
                inputStore.records(),
            );
        });

        it('should invoke decision factory with a new context and the matching inputs', () => {
            resolver.resolve(mockRef);

            expect(createDecisionMocked).toHaveBeenCalledOnce();
            expect(createDecisionMocked).toHaveBeenCalledWith(mockDecisionContext);
        });

        it('should return the created decision', () => {
            const decision = resolver.resolve(mockRef);

            expect(decision).toEqual(mockDecision);
        });
    });

    describe('Given a ref and no matching inputs', () => {
        const mockRef = { $name: 'NonexistentDecision' };
        const inputStore: RecordMap = createRecordMapMock();
        const resolver = createResolver(inputStore);
        const [, mockDecision] = createDecisionMock<BaseValue<object>>([]);
        const mockError = {} as DecisionNotFoundError;

        const [mockDecisionContext, { addErrorSpy }] = createDecisionContextMock();

        beforeEach(() => {
            createDecisionContextMocked.mockReturnValue(mockDecisionContext);
            createDecisionMocked.mockReturnValue(mockDecision);
            createDecisionNotFoundErrorMocked.mockReturnValue(mockError);
        });

        it('should create a DecisionNotFoundError', () => {
            resolver.resolve(mockRef);

            expect(createDecisionNotFoundErrorMocked).toHaveBeenCalledOnce();
            expect(createDecisionNotFoundErrorMocked).toHaveBeenCalledWith({
                context: mockDecisionContext,
                ref: mockRef,
            });
        });

        it('should add the error to the context', () => {
            resolver.resolve(mockRef);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            expect(addErrorSpy).toHaveBeenCalledWith(mockError);
        });
    });

    describe('When an unexpected error occurs during decision creation', () => {
        const mockRef = { $name: 'Decision3' };
        const mockInputs: DecisionInput[] = [
            { uuid: '2', model: 'model/type', name: 'Decision3', params: {} },
        ];
        const inputStore: RecordMap = createRecordMapMock(mockInputs);
        const resolver = createResolver(inputStore);

        beforeEach(() => {
            createDecisionMocked.mockImplementation(() => {
                throw new Error('Mock error');
            });
        });

        it('should throw the underlying error', () => {
            expect(() => resolver.resolve(mockRef)).toThrow('Mock error');
        });
    });
});
