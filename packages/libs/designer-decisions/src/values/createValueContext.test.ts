import { type MockInstance, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createDecisionContext } from '../decisions';
import type { DecisionContext, ValueContext } from '../types';

import { createValueContext } from './createValueContext';
import * as functionsModule from './functions';
import { createValueContextPrivate } from './functions/createValueContextPrivate';

vi.mock('./functions/createValueContextPrivate', () => ({
    createValueContextPrivate: vi.fn(),
}));

const createValueContextMocked = vi.mocked(createValueContextPrivate);

describe('createValueContext()', () => {
    describe('Given no context', () => {
        const mockRef = { $uuid: 'test-uuid' };
        const mockInputs = [{ model: 'model', name: 'value-1', params: {} }];
        const valueContextMock = {} as ValueContext;
        let resolveLookupContextSpy: MockInstance;

        let decisionContext: DecisionContext;
        let result: ValueContext;

        beforeEach(() => {
            vi.clearAllMocks();
            resolveLookupContextSpy = vi.spyOn(functionsModule, 'resolveLookupContext');
            createValueContextMocked.mockReturnValue(valueContextMock);
            decisionContext = createDecisionContext(mockRef, vi.fn(), mockInputs);
            result = createValueContext(decisionContext);
        });

        afterEach(() => {
            resolveLookupContextSpy.mockRestore();
        });

        it('should call createValueContext with decisionContext', () => {
            expect(createValueContextPrivate).toHaveBeenCalledWith(
                decisionContext,
                { all: [] },
                undefined,
            );
        });

        it('should call resolveLookupContext with undefined', () => {
            expect(resolveLookupContextSpy).toHaveBeenCalledWith(undefined);
        });

        it('should return the created context', () => {
            expect(result).toEqual(valueContextMock);
        });
    });

    describe('Given a LookupContext and an input', () => {
        const mockRef = { $uuid: 'test-uuid' };
        const mockInputs = [{ model: 'model', name: 'value-1', params: {} }];
        const mockLookupContext = { all: ['Context A'] };
        const valueContextMock = {} as ValueContext;
        let resolveLookupContextSpy: MockInstance;

        let decisionContext: DecisionContext;
        let result: ValueContext;

        beforeEach(() => {
            vi.clearAllMocks();
            resolveLookupContextSpy = vi.spyOn(functionsModule, 'resolveLookupContext');
            createValueContextMocked.mockReturnValue(valueContextMock);
            decisionContext = createDecisionContext(mockRef, vi.fn(), mockInputs);
            result = createValueContext(decisionContext, mockLookupContext, mockInputs[0]);
        });

        afterEach(() => {
            resolveLookupContextSpy.mockRestore();
        });

        it('should call resolveLookupContext with the provided context', () => {
            expect(resolveLookupContextSpy).toHaveBeenCalledWith(mockLookupContext);
        });

        it('should call createValueContext with decisionContext, provided lookup context, and input', () => {
            expect(createValueContextPrivate).toHaveBeenCalledWith(
                decisionContext,
                mockLookupContext,
                mockInputs[0],
            );
        });

        it('should return the created context', () => {
            expect(result).toEqual(valueContextMock);
        });
    });

    describe('Given a ParentValueContext and an input', () => {
        const mockRef = { $uuid: 'test-uuid' };
        const mockInputs = [{ model: 'model', name: 'value-1', params: {} }];
        const childContext = vi.fn();
        const mockParentContext = {} as ValueContext;
        mockParentContext.lookupContexts = () => ({ all: ['Context V'] });
        mockParentContext.childContext = childContext;
        const valueContextMock = {} as ValueContext;
        let resolveLookupContextSpy: MockInstance;

        let decisionContext: DecisionContext;
        let result: ValueContext;

        beforeEach(() => {
            vi.clearAllMocks();
            resolveLookupContextSpy = vi.spyOn(functionsModule, 'resolveLookupContext');
            childContext.mockReturnValue(valueContextMock);
            decisionContext = createDecisionContext(mockRef, vi.fn(), mockInputs);
            result = createValueContext(decisionContext, mockParentContext, mockInputs[0]);
        });

        afterEach(() => {
            resolveLookupContextSpy.mockRestore();
        });

        it('should call resolveLookupContext with the parent context', () => {
            expect(resolveLookupContextSpy).toHaveBeenCalledWith(mockParentContext);
        });

        it('should call parent context childContext() with the input', () => {
            expect(mockParentContext.childContext).toHaveBeenCalledWith(mockInputs[0]);
        });

        it('should not call createValueContext', () => {
            expect(createValueContextPrivate).not.toHaveBeenCalled();
        });

        it('should return the child context', () => {
            expect(result).toEqual(valueContextMock);
        });
    });
});
