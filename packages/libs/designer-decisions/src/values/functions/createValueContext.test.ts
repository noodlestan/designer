import { beforeEach, describe, expect, it, vi } from 'vitest';

import type {
    DecisionContext,
    DecisionUnknown,
    DecisionValueContext,
    DecisionValueError,
} from '../../types';

import { createValueContext } from './createValueContext';

describe('createValueContext', () => {
    describe('Given a DecisionContext and no parentContext or input', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(),
        } as unknown as DecisionContext;

        let result: DecisionValueContext;

        beforeEach(() => {
            result = createValueContext(mockDecisionContext);
        });

        it('should have the provided decisionContext', () => {
            expect(result.decisionContext()).toEqual(mockDecisionContext);
        });

        it('should have no parent', () => {
            expect(result.parent()).toBeUndefined();
        });

        it('should have default lookupContexts', () => {
            expect(result.lookupContexts()).toEqual({ all: [] });
        });

        it('should have no decisionInput', () => {
            expect(result.decisionInput()).toEqual(undefined);
        });

        it('should have no valueInput ', () => {
            expect(result.valueInput()).toBeUndefined();
        });

        it('should have no children, nested contexts, lookups', () => {
            expect(result.lookups()).toEqual([]);
            expect(result.nested()).toEqual([]);
            expect(result.children()).toEqual([]);
        });

        it('should have no errors', () => {
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

        let result: DecisionValueContext;

        beforeEach(() => {
            result = createValueContext(mockDecisionContext, mockLookupContexts, mockInput);
        });

        it('should have the provided decisionContext', () => {
            expect(result.decisionContext()).toEqual(mockDecisionContext);
        });

        it('should have no parent', () => {
            expect(result.parent()).toBeUndefined();
        });

        it('should have the provided lookupContexts', () => {
            expect(result.lookupContexts()).toEqual(mockLookupContexts);
        });

        it('should have the provided decisionInput', () => {
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
            const mockDecisionRef = { $uuid: 'test-uuid' };

            let result: DecisionValueContext;

            beforeEach(() => {
                resolveMocked.mockReturnValue([mockDecisionContext, undefined]);
                result = createValueContext(mockDecisionContext);
            });

            it('should call resolver on the DecisionContext with the DecisionRef', () => {
                result.resolve(mockDecisionRef);
                expect(resolveMocked).toHaveBeenCalledWith(mockDecisionRef);
            });

            it('should add the failed lookup to the lookups list', () => {
                result.resolve(mockDecisionRef);
                expect(result.lookups()).toContainEqual({
                    ref: mockDecisionRef,
                    context: mockDecisionContext,
                    decision: undefined,
                });
            });

            it("should return the resolution's context and no decision", () => {
                const [resolvedContext, resolvedDecision] = result.resolve(mockDecisionRef);
                expect(resolvedContext).toEqual(mockDecisionContext);
                expect(resolvedDecision).toBeUndefined();
            });
        });

        describe('And the resolver returns a decision', () => {
            const mockDecisionContext = {
                resolve: vi.fn(),
                ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
            } as unknown as DecisionContext;
            const resolveMocked = vi.mocked(mockDecisionContext.resolve);
            const mockDecisionRef = { $uuid: 'test-uuid' };
            const mockDecision = {} as DecisionUnknown;
            mockDecision.uuid = () => mockDecisionRef.$uuid;

            let result: DecisionValueContext;
            let resolved: [DecisionContext, DecisionUnknown | undefined];

            beforeEach(() => {
                resolveMocked.mockReturnValue([mockDecisionContext, mockDecision]);
                result = createValueContext(mockDecisionContext);
                resolved = result.resolve(mockDecisionRef);
            });

            it('should call resolver on the DecisionContext with the DecisionRef', () => {
                expect(resolveMocked).toHaveBeenCalledWith(mockDecisionRef);
            });

            it('should add the successful lookup to the lookups list', () => {
                expect(result.lookups()).toContainEqual({
                    ref: mockDecisionRef,
                    context: mockDecisionContext,
                    decision: mockDecision,
                });
            });

            it("should return the resolution's context and decision", () => {
                const [resolvedContext, resolvedDecision] = resolved;

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

        let result: DecisionValueContext;

        beforeEach(() => {
            result = createValueContext(mockDecisionContext);
            result.consume(mockInput);
        });

        it('should set the valueInput state', () => {
            expect(result.valueInput()).toEqual(mockInput);
        });

        describe('When consume() is called twice', () => {
            it('should throw an error', () => {
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
        const mockError = { msg: 'Test error' } as DecisionValueError;

        let result: DecisionValueContext;

        beforeEach(() => {
            result = createValueContext(mockDecisionContext);
            result.addError(mockError);
        });

        it('should return true for hasErrors()', () => {
            expect(result.hasErrors()).toBe(true);
        });

        it('should expose the error in ownErrors()', () => {
            expect(result.ownErrors()).toContain(mockError);
        });

        it('should expose the error in allErrors()', () => {
            expect(result.ownErrors()).toContain(mockError);
        });
    });

    describe('When nestedContext() is called', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as DecisionContext;

        let result: DecisionValueContext;
        let nested: DecisionValueContext;

        beforeEach(() => {
            result = createValueContext(mockDecisionContext);
            nested = result.nestedContext();
        });

        it('should add the nested context to the list', () => {
            expect(result.nested()).toHaveLength(1);
            expect(result.nested()[0]).toBe(nested);
        });

        it('should return the nested context', () => {
            expect(nested.parent()?.decisionContext()).toEqual(result.decisionContext());
            expect(nested.parent()?.decisionInput()).toEqual(result.decisionInput());
        });
    });

    describe('When childContext() is called with undefined', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as DecisionContext;

        let result: DecisionValueContext;
        let child: DecisionValueContext;

        beforeEach(() => {
            result = createValueContext(mockDecisionContext);
            child = result.childContext();
        });

        it('should add the child context to the list', () => {
            expect(result.children()).toHaveLength(1);
            expect(result.children()[0]).toBe(child);
        });

        it('should return the child context', () => {
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

        let result: DecisionValueContext;
        let child: DecisionValueContext;

        beforeEach(() => {
            result = createValueContext(mockDecisionContext);
            child = result.childContext(mockInput);
        });

        it('should add the child context to the list', () => {
            expect(result.children()).toHaveLength(1);
            expect(result.children()[0]).toBe(child);
        });

        it('should return the child context with the provided input', () => {
            expect(child.decisionInput()).toEqual(mockInput);
        });
    });

    describe('When a child context has errors', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as DecisionContext;
        const mockError = { msg: 'Test error' } as DecisionValueError;

        let result: DecisionValueContext;
        let child: DecisionValueContext;

        beforeEach(() => {
            result = createValueContext(mockDecisionContext);
            child = result.childContext();
            child.addError(mockError);
        });

        it('should return true for hasErrors()', () => {
            expect(result.hasErrors()).toBe(true);
        });

        it('should not expose the error in ownErrors()', () => {
            expect(result.ownErrors()).not.toContain(mockError);
        });

        it('should expose the error in allErrors()', () => {
            expect(result.allErrors()).toContain(mockError);
        });
    });

    describe('When a nested context has errors', () => {
        const mockDecisionContext = {
            resolve: vi.fn(),
            ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
        } as unknown as DecisionContext;
        const mockError = { msg: 'Test error' } as DecisionValueError;

        let result: DecisionValueContext;
        let nested: DecisionValueContext;

        beforeEach(() => {
            result = createValueContext(mockDecisionContext);
            nested = result.nestedContext();
            nested.addError(mockError);
        });

        it('should return true for hasErrors()', () => {
            expect(result.hasErrors()).toBe(true);
        });

        it('should not expose the error in ownErrors()', () => {
            expect(result.ownErrors()).not.toContain(mockError);
        });

        it('should expose the error in allErrors()', () => {
            expect(result.allErrors()).toContain(mockError);
        });
    });
});
