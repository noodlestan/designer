import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionContext, DecisionUnknown } from '../../decision-types';
import type { DecisionInput } from '../../inputs';
import type { ValueError } from '../types';

import { createValueContextPrivate } from './createValueContextPrivate';

describe('createValueContextPrivate()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given a DecisionContext an empty input', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(),
        } as unknown as DecisionContext;
        const mockInput = {} as DecisionInput;

        it('should have the provided decisionContext', () => {
            const result = createValueContextPrivate(mockDecisionContext, mockInput);

            expect(result.decisionContext()).toEqual(mockDecisionContext);
        });

        it('should have no parent', () => {
            const result = createValueContextPrivate(mockDecisionContext, mockInput);

            expect(result.parent()).toBeUndefined();
        });

        it('should have default lookupContexts', () => {
            const result = createValueContextPrivate(mockDecisionContext, mockInput);

            expect(result.lookupContexts()).toEqual({ all: [] });
        });

        it('should have no input ', () => {
            const result = createValueContextPrivate(mockDecisionContext, mockInput);

            expect(result.input()).toEqual({});
        });

        it('should have empty params ', () => {
            const result = createValueContextPrivate(mockDecisionContext, mockInput);

            expect(result.params()).toEqual({});
        });

        it('should have no children, nested contexts, lookups', () => {
            const result = createValueContextPrivate(mockDecisionContext, mockInput);

            expect(result.lookups()).toEqual([]);
            expect(result.nested()).toEqual([]);
            expect(result.children()).toEqual([]);
        });

        it('should have no errors', () => {
            const result = createValueContextPrivate(mockDecisionContext, mockInput);

            expect(result.hasErrors()).toEqual(false);
            expect(result.ownErrors()).toEqual([]);
            expect(result.allErrors()).toEqual([]);
        });
    });

    describe('Given a DecisionContext, LookupContexts, and input', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(),
        } as unknown as DecisionContext;
        const mockLookupContexts = { all: ['Context A'] };
        const mockInput = { model: 'foo/bar', name: 'value-1', params: {} };

        const context = mockDecisionContext;

        it('should have the provided decisionContext', () => {
            const result = createValueContextPrivate(context, mockInput, mockLookupContexts);

            expect(result.decisionContext()).toEqual(mockDecisionContext);
        });

        it('should have no parent', () => {
            const result = createValueContextPrivate(context, mockInput, mockLookupContexts);

            expect(result.parent()).toBeUndefined();
        });

        it('should have the provided lookupContexts', () => {
            const result = createValueContextPrivate(context, mockInput, mockLookupContexts);

            expect(result.lookupContexts()).toEqual(mockLookupContexts);
        });

        it('should have the provided input', () => {
            const result = createValueContextPrivate(context, mockInput, mockLookupContexts);

            expect(result.input()).toEqual(mockInput);
        });

        it('should have the provided params', () => {
            const result = createValueContextPrivate(context, mockInput, mockLookupContexts);

            expect(result.params()).toEqual(mockInput.params);
        });
    });

    describe('When resolve() is called', () => {
        const mockInput = {} as DecisionInput;

        describe('And the resolver returns a decision', () => {
            const mockDecisionContext = {
                resolve: vi.fn(),
                ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
            } as unknown as DecisionContext;
            const mockDecision = {} as DecisionUnknown;
            const resolveMocked = vi.mocked(mockDecisionContext.resolve);
            resolveMocked.mockReturnValue(mockDecision);
            const mockDecisionRef = { $uuid: 'test-uuid' };
            mockDecision.uuid = () => mockDecisionRef.$uuid;

            it('should call resolver on the DecisionContext with the DecisionRef', () => {
                const context = createValueContextPrivate(mockDecisionContext, mockInput);
                context.resolve(mockDecisionRef);

                expect(resolveMocked).toHaveBeenCalledWith(mockDecisionRef);
            });

            it('should add the successful lookup to the lookups list', () => {
                const context = createValueContextPrivate(mockDecisionContext, mockInput);
                context.resolve(mockDecisionRef);

                expect(context.lookups()).toContainEqual({
                    ref: mockDecisionRef,
                    context: mockDecisionContext,
                    decision: mockDecision,
                });
            });

            it("should return the resolution's context and decision", () => {
                const context = createValueContextPrivate(mockDecisionContext, mockInput);
                const result = context.resolve(mockDecisionRef);

                expect(result).toEqual(mockDecision);
            });
        });
    });

    describe('When addError() is called', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as DecisionContext;
        const mockError = {} as ValueError;
        mockError.valueName = 'ValueName';
        const mockInput = {} as DecisionInput;

        it('should return true for hasErrors()', () => {
            const context = createValueContextPrivate(mockDecisionContext, mockInput);
            context.addError(mockError);

            expect(context.hasErrors()).toBe(true);
        });

        it('should expose the error in ownErrors()', () => {
            const context = createValueContextPrivate(mockDecisionContext, mockInput);
            context.addError(mockError);

            expect(context.ownErrors()).toContain(mockError);
        });

        it('should expose the error in allErrors()', () => {
            const context = createValueContextPrivate(mockDecisionContext, mockInput);
            context.addError(mockError);

            expect(context.ownErrors()).toContain(mockError);
        });
    });

    describe('When childContext() is called with an input', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as DecisionContext;
        const mockInput = { model: 'foo/bar', name: 'value-1', params: {} };
        const mockChildInput = { model: 'baz/qux', name: 'value-2', params: {} };

        it('should add the child context to the list', () => {
            const result = createValueContextPrivate(mockDecisionContext, mockInput);
            const child = result.childContext(mockChildInput);

            expect(result.children()).toHaveLength(1);
            expect(result.children()[0]).toBe(child);
        });

        it('should return the child context with the provided input', () => {
            const result = createValueContextPrivate(mockDecisionContext, mockInput);
            const child = result.childContext(mockChildInput);

            expect(child.input()).toEqual(mockChildInput);
        });
    });

    describe('When primitiveContext() is called with an input', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as DecisionContext;
        const mockInput = { model: 'foo/bar', name: 'value-1', params: {} };
        const mockPrimitiveInput = { model: 'baz/qux', name: 'value-2', params: {} };

        it('should add the primitive context to the list', () => {
            const result = createValueContextPrivate(mockDecisionContext, mockInput);
            const primitiveContext = result.primitiveContext(mockPrimitiveInput);

            expect(result.nested()).toHaveLength(1);
            expect(result.nested()[0]).toBe(primitiveContext);
        });

        it('should return the primitive context with the provided input', () => {
            const result = createValueContextPrivate(mockDecisionContext, mockInput);
            const primitiveContext = result.primitiveContext(mockPrimitiveInput);

            expect(primitiveContext.input()).toEqual(mockPrimitiveInput);
        });
    });

    describe('When a child context has errors', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as DecisionContext;
        const mockInput = { model: 'foo/bar', name: 'value-1', params: {} };
        const mockChildInput = { model: 'baz/qux', name: 'value-2', params: {} };
        const mockError = {} as ValueError;
        mockError.valueName = 'ValueName';

        it('should return true for hasErrors()', () => {
            const result = createValueContextPrivate(mockDecisionContext, mockInput);
            const child = result.childContext(mockChildInput);
            child.addError(mockError);

            expect(result.hasErrors()).toBe(true);
        });

        it('should not expose the error in ownErrors()', () => {
            const result = createValueContextPrivate(mockDecisionContext, mockInput);
            const child = result.childContext(mockChildInput);
            child.addError(mockError);

            expect(result.ownErrors()).not.toContain(mockError);
        });

        it('should expose the error in allErrors()', () => {
            const result = createValueContextPrivate(mockDecisionContext, mockInput);
            const child = result.childContext(mockChildInput);
            child.addError(mockError);

            expect(result.allErrors()).toContain(mockError);
        });
    });
});
