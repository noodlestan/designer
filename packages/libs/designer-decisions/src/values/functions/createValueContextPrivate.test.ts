import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DecisionContext, DecisionUnknown } from '../../decisions';
import { ValueError } from '../types';

import { createValueContextPrivate } from './createValueContextPrivate';

describe('createValueContextPrivate()', () => {
    describe('Given a DecisionContext and no parentContext or input', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(),
        } as unknown as DecisionContext;

        it('should have the provided decisionContext', () => {
            const result = createValueContextPrivate(mockDecisionContext);

            expect(result.decisionContext()).toEqual(mockDecisionContext);
        });

        it('should have no parent', () => {
            const result = createValueContextPrivate(mockDecisionContext);

            expect(result.parent()).toBeUndefined();
        });

        it('should have default lookupContexts', () => {
            const result = createValueContextPrivate(mockDecisionContext);

            expect(result.lookupContexts()).toEqual({ all: [] });
        });

        it('should have no decisionInput', () => {
            const result = createValueContextPrivate(mockDecisionContext);

            expect(result.decisionInput()).toEqual(undefined);
        });

        it('should have no valueInput ', () => {
            const result = createValueContextPrivate(mockDecisionContext);

            expect(result.valueInput()).toBeUndefined();
        });

        it('should have no children, nested contexts, lookups', () => {
            const result = createValueContextPrivate(mockDecisionContext);

            expect(result.lookups()).toEqual([]);
            expect(result.nested()).toEqual([]);
            expect(result.children()).toEqual([]);
        });

        it('should have no errors', () => {
            const result = createValueContextPrivate(mockDecisionContext);

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
        const mockInput = { model: 'model', name: 'value-1', params: {} };

        const context = mockDecisionContext;

        it('should have the provided decisionContext', () => {
            const result = createValueContextPrivate(context, mockLookupContexts, mockInput);

            expect(result.decisionContext()).toEqual(mockDecisionContext);
        });

        it('should have no parent', () => {
            const result = createValueContextPrivate(context, mockLookupContexts, mockInput);

            expect(result.parent()).toBeUndefined();
        });

        it('should have the provided lookupContexts', () => {
            const result = createValueContextPrivate(context, mockLookupContexts, mockInput);

            expect(result.lookupContexts()).toEqual(mockLookupContexts);
        });

        it('should have the provided decisionInput', () => {
            const result = createValueContextPrivate(context, mockLookupContexts, mockInput);

            expect(result.decisionInput()).toEqual(mockInput);
        });
    });

    describe('When resolve() is called', () => {
        describe('And the resolver returns no decision', () => {
            const mockDecisionContext = {
                resolve: vi.fn(),
                ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
            } as unknown as DecisionContext;
            const resolveMocked = vi.mocked(mockDecisionContext.resolve);
            resolveMocked.mockReturnValue([mockDecisionContext, undefined]);
            const mockDecisionRef = { $uuid: 'test-uuid' };

            beforeEach(() => {
                vi.clearAllMocks();
            });

            it('should call resolver on the DecisionContext with the DecisionRef', () => {
                const context = createValueContextPrivate(mockDecisionContext);
                context.resolve(mockDecisionRef);

                expect(resolveMocked).toHaveBeenCalledWith(mockDecisionRef);
            });

            it('should add the failed lookup to the lookups list', () => {
                const context = createValueContextPrivate(mockDecisionContext);
                context.resolve(mockDecisionRef);

                expect(context.lookups()).toContainEqual({
                    ref: mockDecisionRef,
                    context: mockDecisionContext,
                    decision: undefined,
                });
            });

            it("should return the resolution's context and no decision", () => {
                const context = createValueContextPrivate(mockDecisionContext);
                const [resolvedContext, resolvedDecision] = context.resolve(mockDecisionRef);

                expect(resolvedContext).toEqual(mockDecisionContext);
                expect(resolvedDecision).toBeUndefined();
            });
        });

        describe('And the resolver returns a decision', () => {
            const mockDecisionContext = {
                resolve: vi.fn(),
                ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
            } as unknown as DecisionContext;
            const mockDecision = {} as DecisionUnknown;
            const resolveMocked = vi.mocked(mockDecisionContext.resolve);
            resolveMocked.mockReturnValue([mockDecisionContext, mockDecision]);
            const mockDecisionRef = { $uuid: 'test-uuid' };
            mockDecision.uuid = () => mockDecisionRef.$uuid;

            beforeEach(() => {
                vi.clearAllMocks();
            });

            it('should call resolver on the DecisionContext with the DecisionRef', () => {
                const context = createValueContextPrivate(mockDecisionContext);
                context.resolve(mockDecisionRef);

                expect(resolveMocked).toHaveBeenCalledWith(mockDecisionRef);
            });

            it('should add the successful lookup to the lookups list', () => {
                const context = createValueContextPrivate(mockDecisionContext);
                context.resolve(mockDecisionRef);

                expect(context.lookups()).toContainEqual({
                    ref: mockDecisionRef,
                    context: mockDecisionContext,
                    decision: mockDecision,
                });
            });

            it("should return the resolution's context and decision", () => {
                const context = createValueContextPrivate(mockDecisionContext);
                const [resolvedContext, resolvedDecision] = context.resolve(mockDecisionRef);

                expect(resolvedContext).toEqual(mockDecisionContext);
                expect(resolvedDecision).toEqual(mockDecision);
            });
        });
    });

    describe('When consume() is called', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as DecisionContext;
        const mockInput = { model: 'model', name: 'value-1', params: {} };

        it('should set the valueInput state', () => {
            const result = createValueContextPrivate(mockDecisionContext);
            result.consume(mockInput);

            expect(result.valueInput()).toEqual(mockInput);
        });

        describe('When consume() is called twice', () => {
            it('should throw an error', () => {
                const result = createValueContextPrivate(mockDecisionContext);
                result.consume(mockInput);

                expect(() => result.consume(mockInput)).toThrowError(
                    `Value for "{"$uuid":"test-uuid"}" has already consumed input ({"model":"model","name":"value-1","params":{}}).`,
                );
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

        it('should return true for hasErrors()', () => {
            const context = createValueContextPrivate(mockDecisionContext);
            context.addError(mockError);

            expect(context.hasErrors()).toBe(true);
        });

        it('should expose the error in ownErrors()', () => {
            const context = createValueContextPrivate(mockDecisionContext);
            context.addError(mockError);

            expect(context.ownErrors()).toContain(mockError);
        });

        it('should expose the error in allErrors()', () => {
            const context = createValueContextPrivate(mockDecisionContext);
            context.addError(mockError);

            expect(context.ownErrors()).toContain(mockError);
        });
    });

    describe('When nestedContext() is called', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as DecisionContext;

        it('should add the nested context to the list', () => {
            const result = createValueContextPrivate(mockDecisionContext);
            const nested = result.nestedContext();

            expect(result.nested()).toHaveLength(1);
            expect(result.nested()[0]).toBe(nested);
        });

        it('should return the nested context', () => {
            const result = createValueContextPrivate(mockDecisionContext);
            const nested = result.nestedContext();

            expect(nested.parent()?.decisionContext()).toEqual(result.decisionContext());
            expect(nested.parent()?.decisionInput()).toEqual(result.decisionInput());
        });
    });

    describe('When childContext() is called with undefined', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as DecisionContext;

        it('should add the child context to the list', () => {
            const result = createValueContextPrivate(mockDecisionContext);
            const child = result.childContext();

            expect(result.children()).toHaveLength(1);
            expect(result.children()[0]).toBe(child);
        });

        it('should return the child context', () => {
            const result = createValueContextPrivate(mockDecisionContext);
            const child = result.childContext();

            expect(child.parent()?.decisionContext()).toEqual(result.decisionContext());
            expect(child.parent()?.decisionInput()).toEqual(result.decisionInput());
        });
    });

    describe('When childContext() is called with an input', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as DecisionContext;
        const mockInput = { model: 'model', name: 'value-1', params: {} };

        it('should add the child context to the list', () => {
            const result = createValueContextPrivate(mockDecisionContext);
            const child = result.childContext(mockInput);

            expect(result.children()).toHaveLength(1);
            expect(result.children()[0]).toBe(child);
        });

        it('should return the child context with the provided input', () => {
            const result = createValueContextPrivate(mockDecisionContext);
            const child = result.childContext(mockInput);

            expect(child.decisionInput()).toEqual(mockInput);
        });
    });

    describe('When a child context has errors', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as DecisionContext;
        const mockError = {} as ValueError;
        mockError.valueName = 'ValueName';

        it('should return true for hasErrors()', () => {
            const result = createValueContextPrivate(mockDecisionContext);
            const child = result.childContext();
            child.addError(mockError);

            expect(result.hasErrors()).toBe(true);
        });

        it('should not expose the error in ownErrors()', () => {
            const result = createValueContextPrivate(mockDecisionContext);
            const child = result.childContext();
            child.addError(mockError);

            expect(result.ownErrors()).not.toContain(mockError);
        });

        it('should expose the error in allErrors()', () => {
            const result = createValueContextPrivate(mockDecisionContext);
            const child = result.childContext();
            child.addError(mockError);

            expect(result.allErrors()).toContain(mockError);
        });
    });

    describe('When a nested context has errors', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as DecisionContext;
        const mockError = {} as ValueError;
        mockError.valueName = 'ValueName';

        it('should return true for hasErrors()', () => {
            const result = createValueContextPrivate(mockDecisionContext);
            const nested = result.nestedContext();
            nested.addError(mockError);

            expect(result.hasErrors()).toBe(true);
        });

        it('should not expose the error in ownErrors()', () => {
            const result = createValueContextPrivate(mockDecisionContext);
            const nested = result.nestedContext();
            nested.addError(mockError);

            expect(result.ownErrors()).not.toContain(mockError);
        });

        it('should expose the error in allErrors()', () => {
            const result = createValueContextPrivate(mockDecisionContext);
            const nested = result.nestedContext();
            nested.addError(mockError);

            expect(result.allErrors()).toContain(mockError);
        });
    });
});
