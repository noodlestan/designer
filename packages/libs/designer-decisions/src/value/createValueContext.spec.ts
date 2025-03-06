import { beforeEach, describe, expect, it, vi } from 'vitest';

import { resolveLookupContext } from '../lookup';
import { createModelContextMock, createValueContextMock } from '../mocks';

import { createValueContext } from './createValueContext';
import { createValueContextPrivate } from './functions';

vi.mock('./functions');
vi.mock('../lookup');

const createValueContextPrivateMocked = vi.mocked(createValueContextPrivate);
const resolveLookupContextMocked = vi.mocked(resolveLookupContext);

describe('resolveLookupContext()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given a context and an input', () => {
        const mockDecisionInput = { model: 'model', name: 'value-1', params: {} };
        const [mockModelContext] = createModelContextMock(mockDecisionInput);
        const mockInput = { $uuid: 'test-uuid' };

        const [mockValueContext] = createValueContextMock();
        const defaultLookupContext = { all: [] };
        resolveLookupContextMocked.mockReturnValue(defaultLookupContext);

        beforeEach(() => {
            createValueContextPrivateMocked.mockReturnValue(mockValueContext);
        });

        it('should call resolveLookupContext with undefined', () => {
            createValueContext(mockModelContext, mockInput);
            expect(resolveLookupContextMocked).toHaveBeenCalledWith(undefined);
        });

        it('should call createValueContextPrivate() with ModelContext, provided input, and default lookup', () => {
            createValueContext(mockModelContext, mockInput);
            expect(createValueContextPrivateMocked).toHaveBeenCalledWith(
                mockModelContext,
                mockInput,
                defaultLookupContext,
            );
        });

        it('should return the created context', () => {
            const result = createValueContext(mockModelContext, mockInput);
            expect(result).toEqual(mockValueContext);
        });
    });

    describe('Given a context, an input, and LookupContexts', () => {
        const mockDecisionInput = { model: 'model', name: 'value-1', params: {} };
        const [mockModelContext] = createModelContextMock(mockDecisionInput);
        const mockInput = { $uuid: 'test-uuid' };
        const mockLookupContext = { all: ['Context A'] };

        const [mockValueContext] = createValueContextMock();

        beforeEach(() => {
            createValueContextPrivateMocked.mockReturnValue(mockValueContext);
            resolveLookupContextMocked.mockReturnValue(mockLookupContext);
        });

        it('should call resolveLookupContext with the provided context', () => {
            createValueContext(mockModelContext, mockInput, mockLookupContext);
            expect(resolveLookupContextMocked).toHaveBeenCalledWith(mockLookupContext);
        });

        it('should call createValueContextPrivateMocked() with the ModelContext and the provided input and lookup', () => {
            createValueContext(mockModelContext, mockInput, mockLookupContext);
            expect(createValueContextPrivate).toHaveBeenCalledWith(
                mockModelContext,
                mockInput,
                mockLookupContext,
            );
        });

        it('should return the created context', () => {
            const result = createValueContext(mockModelContext, mockInput, mockLookupContext);
            expect(result).toEqual(mockValueContext);
        });
    });

    describe('Given a ParentValueContext and an input', () => {
        const mockDecisionInput = { model: 'model', name: 'value-1', params: {} };
        const [mockModelContext] = createModelContextMock(mockDecisionInput);
        const mockInput = { $uuid: 'test-uuid' };

        const [mockValueContext] = createValueContextMock();

        const mockChildContext = createValueContextMock()[0];
        const childContextSpy = vi.fn().mockReturnValue(mockChildContext);

        const [mockParentContext] = createValueContextMock();
        mockParentContext.lookupContexts = () => ({ all: ['Context V'] });
        mockParentContext.childContext = childContextSpy;

        beforeEach(() => {
            createValueContextPrivateMocked.mockReturnValue(mockValueContext);
        });

        it('should call resolveLookupContext() with the parent context', () => {
            createValueContext(mockModelContext, mockInput, mockParentContext);
            expect(resolveLookupContextMocked).toHaveBeenCalledWith(mockParentContext);
        });

        it('should call parent context childContext() with the input', () => {
            createValueContext(mockModelContext, mockInput, mockParentContext);
            expect(mockParentContext.childContext).toHaveBeenCalledWith(mockInput);
        });

        it('should not call createValueContextPrivate()', () => {
            createValueContext(mockModelContext, mockInput, mockParentContext);
            expect(createValueContextPrivateMocked).not.toHaveBeenCalled();
        });

        it('should return the child context', () => {
            const result = createValueContext(mockModelContext, mockInput, mockParentContext);
            expect(result).toEqual(mockChildContext);
        });
    });
});
