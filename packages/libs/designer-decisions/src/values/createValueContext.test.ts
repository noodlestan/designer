import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createDecisionContext } from '../decisions';
import { DecisionSource } from '../meta';

import { createValueContext } from './createValueContext';
import * as functionsModule from './functions';
import { createValueContextPrivate } from './functions/createValueContextPrivate';
import { type ValueContext } from './types';

vi.mock('./functions/createValueContextPrivate', () => ({
    createValueContextPrivate: vi.fn(),
}));

const createValueContextMocked = vi.mocked(createValueContextPrivate);

describe('createValueContext()', () => {
    describe('Given no context', () => {
        const mockRef = { $uuid: 'test-uuid' };
        const mockInputs = [{ model: 'model', name: 'value-1', params: {} }];
        const mockRecords = mockInputs?.map(input => ({
            input,
            source: {} as DecisionSource,
            loaded: input,
            errors: [],
        }));
        const decisionContext = createDecisionContext(mockRef, vi.fn(), mockRecords);

        const valueContextMock = {} as ValueContext;
        createValueContextMocked.mockReturnValue(valueContextMock);
        const resolveLookupContextSpy = vi.spyOn(functionsModule, 'resolveLookupContext');

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should call createValueContext with decisionContext', () => {
            createValueContext(decisionContext);

            expect(createValueContextPrivate).toHaveBeenCalledWith(
                decisionContext,
                { all: [] },
                undefined,
            );
        });

        it('should call resolveLookupContext with undefined', () => {
            createValueContext(decisionContext);

            expect(resolveLookupContextSpy).toHaveBeenCalledWith(undefined);
        });

        it('should return the created context', () => {
            const result = createValueContext(decisionContext);

            expect(result).toEqual(valueContextMock);
        });
    });

    describe('Given a LookupContext and an input', () => {
        const mockRef = { $uuid: 'test-uuid' };
        const mockInputs = [{ model: 'model', name: 'value-1', params: {} }];
        const mockRecords = mockInputs?.map(input => ({
            input,
            source: {} as DecisionSource,
            loaded: input,
            errors: [],
        }));

        const decisionContext = createDecisionContext(mockRef, vi.fn(), mockRecords);
        const mockLookupContext = { all: ['Context A'] };

        const valueContextMock = {} as ValueContext;
        createValueContextMocked.mockReturnValue(valueContextMock);
        const resolveLookupContextSpy = vi.spyOn(functionsModule, 'resolveLookupContext');

        beforeEach(() => {
            vi.clearAllMocks();
        });

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should call resolveLookupContext with the provided context', () => {
            createValueContext(decisionContext, mockLookupContext, mockInputs[0]);

            expect(resolveLookupContextSpy).toHaveBeenCalledWith(mockLookupContext);
        });

        it('should call createValueContext with decisionContext, provided lookup context, and input', () => {
            createValueContext(decisionContext, mockLookupContext, mockInputs[0]);

            expect(createValueContextPrivate).toHaveBeenCalledWith(
                decisionContext,
                mockLookupContext,
                mockInputs[0],
            );
        });

        it('should return the created context', () => {
            const result = createValueContext(decisionContext, mockLookupContext, mockInputs[0]);

            expect(result).toEqual(valueContextMock);
        });
    });

    describe('Given a ParentValueContext and an input', () => {
        const mockRef = { $uuid: 'test-uuid' };
        const mockInputs = [{ model: 'model', name: 'value-1', params: {} }];
        const mockRecords = mockInputs?.map(input => ({
            input,
            source: {} as DecisionSource,
            loaded: input,
            errors: [],
        }));

        const decisionContext = createDecisionContext(mockRef, vi.fn(), mockRecords);

        const valueContextMock = {} as ValueContext;
        createValueContextMocked.mockReturnValue(valueContextMock);
        const resolveLookupContextSpy = vi.spyOn(functionsModule, 'resolveLookupContext');

        const childContext = vi.fn();
        childContext.mockReturnValue(valueContextMock);
        const mockParentContext = {} as ValueContext;
        mockParentContext.lookupContexts = () => ({ all: ['Context V'] });
        mockParentContext.childContext = childContext;

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('should call resolveLookupContext with the parent context', () => {
            createValueContext(decisionContext, mockParentContext, mockInputs[0]);

            expect(resolveLookupContextSpy).toHaveBeenCalledWith(mockParentContext);
        });

        it('should call parent context childContext() with the input', () => {
            createValueContext(decisionContext, mockParentContext, mockInputs[0]);

            expect(mockParentContext.childContext).toHaveBeenCalledWith(mockInputs[0]);
        });

        it('should not call createValueContext', () => {
            createValueContext(decisionContext, mockParentContext, mockInputs[0]);

            expect(createValueContextPrivate).not.toHaveBeenCalled();
        });

        it('should return the child context', () => {
            const result = createValueContext(decisionContext, mockParentContext, mockInputs[0]);

            expect(result).toEqual(valueContextMock);
        });
    });
});
