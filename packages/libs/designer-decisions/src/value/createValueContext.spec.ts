import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createDecisionContext } from '../decision-context';
import type { DecisionSource } from '../records';

import { createValueContext } from './createValueContext';
import { createValueContextPrivate, resolveLookupContext } from './functions';
import type { ValueContext } from './types';

vi.mock('./functions', async importOriginal => {
    const fns = await importOriginal<typeof import('./functions')>();
    return {
        resolveLookupContext: vi.fn().mockImplementation(fns.resolveLookupContext),
        createValueContextPrivate: vi.fn(),
    };
});

const createValueContextPrivateMocked = vi.mocked(createValueContextPrivate);
const resolveLookupContextMocked = vi.mocked(resolveLookupContext);

describe('resolveLookupContext()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given an input', () => {
        const mockRef = { $uuid: 'test-uuid' };
        const mockInputs = [{ model: 'model', name: 'value-1', params: {} }];
        const mockRecords = mockInputs?.map((input, index) => ({
            uuid: `${index}`,
            input,
            source: {} as DecisionSource,
            loaded: input,
            errors: [],
        }));
        const decisionContext = createDecisionContext(mockRef, vi.fn(), mockRecords);
        const valueContextMock = {} as ValueContext;

        beforeEach(() => {
            createValueContextPrivateMocked.mockReturnValue(valueContextMock);
        });

        it('should call createValueContext with decisionContext', () => {
            createValueContext(decisionContext, mockInputs[0]);

            expect(createValueContextPrivate).toHaveBeenCalledWith(decisionContext, mockInputs[0], {
                all: [],
            });
        });

        it('should call resolveLookupContext with undefined', () => {
            createValueContext(decisionContext, mockInputs[0]);

            expect(resolveLookupContextMocked).toHaveBeenCalledWith(undefined);
        });

        it('should return the created context', () => {
            const result = createValueContext(decisionContext, mockInputs[0]);

            expect(result).toEqual(valueContextMock);
        });
    });

    describe('Given a LookupContext and an input', () => {
        const mockRef = { $uuid: 'test-uuid' };
        const mockInputs = [{ model: 'model', name: 'value-1', params: {} }];
        const mockRecords = mockInputs?.map((input, index) => ({
            uuid: `${index}`,
            input,
            source: {} as DecisionSource,
            loaded: input,
            errors: [],
        }));

        const decisionContext = createDecisionContext(mockRef, vi.fn(), mockRecords);
        const mockLookupContext = { all: ['Context A'] };
        const valueContextMock = {} as ValueContext;

        beforeEach(() => {
            createValueContextPrivateMocked.mockReturnValue(valueContextMock);
        });

        it('should call resolveLookupContext with the provided context', () => {
            createValueContext(decisionContext, mockInputs[0], mockLookupContext);

            expect(resolveLookupContextMocked).toHaveBeenCalledWith(mockLookupContext);
        });

        it('should call createValueContext with decisionContext, provided lookup context, and input', () => {
            createValueContext(decisionContext, mockInputs[0], mockLookupContext);

            expect(createValueContextPrivate).toHaveBeenCalledWith(
                decisionContext,
                mockInputs[0],
                mockLookupContext,
            );
        });

        it('should return the created context', () => {
            const result = createValueContext(decisionContext, mockInputs[0], mockLookupContext);

            expect(result).toEqual(valueContextMock);
        });
    });

    describe('Given a ParentValueContext and an input', () => {
        const mockRef = { $uuid: 'test-uuid' };
        const mockInputs = [{ model: 'model', name: 'value-1', params: {} }];
        const mockRecords = mockInputs?.map((input, index) => ({
            uuid: `${index}`,
            input,
            source: {} as DecisionSource,
            loaded: input,
            errors: [],
        }));

        const decisionContext = createDecisionContext(mockRef, vi.fn(), mockRecords);

        const valueContextMock = {} as ValueContext;
        createValueContextPrivateMocked.mockReturnValue(valueContextMock);
        const childContext = vi.fn();
        childContext.mockReturnValue(valueContextMock);
        const mockParentContext = {} as ValueContext;
        mockParentContext.lookupContexts = () => ({ all: ['Context V'] });
        mockParentContext.childContext = childContext;

        it('should call resolveLookupContext with the parent context', () => {
            createValueContext(decisionContext, mockInputs[0], mockParentContext);

            expect(resolveLookupContextMocked).toHaveBeenCalledWith(mockParentContext);
        });

        it('should call parent context childContext() with the input', () => {
            createValueContext(decisionContext, mockInputs[0], mockParentContext);

            expect(mockParentContext.childContext).toHaveBeenCalledWith(mockInputs[0]);
        });

        it('should not call createValueContext', () => {
            createValueContext(decisionContext, mockInputs[0], mockParentContext);

            expect(createValueContextPrivate).not.toHaveBeenCalled();
        });

        it('should return the child context', () => {
            const result = createValueContext(decisionContext, mockInputs[0], mockParentContext);

            expect(result).toEqual(valueContextMock);
        });
    });
});
