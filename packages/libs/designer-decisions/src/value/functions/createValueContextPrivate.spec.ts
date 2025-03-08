import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionUnknown } from '../../decision';
import type { DecisionInput } from '../../inputs';
import { createModelContextMock } from '../../mocks';
import type { LinkedModelContext } from '../../model';
import type { PrimitiveError } from '../../primitive';
import type { ValueError } from '../types';

import { createValueContextPrivate } from './createValueContextPrivate';

describe('createValueContextPrivate()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given a LinkedModelContext and an empty input', () => {
        const mockModelInput = { model: 'foo/bar', name: 'value-1', params: {} };
        const [mockModelContext] = createModelContextMock(mockModelInput);

        const mockInput = undefined;

        it('should have the provided LinkedModelContext', () => {
            const result = createValueContextPrivate(mockModelContext, mockInput);
            expect(result.modelContext()).toEqual(mockModelContext);
        });

        it('should have no parent', () => {
            const result = createValueContextPrivate(mockModelContext, mockInput);
            expect(result.parent()).toBeUndefined();
        });

        it('should have default lookupContexts', () => {
            const result = createValueContextPrivate(mockModelContext, mockInput);
            expect(result.lookupContexts()).toEqual({ all: [] });
        });

        it('should have the decision input provided to the model context', () => {
            const result = createValueContextPrivate(mockModelContext, mockInput);
            expect(result.decisionInput()).toEqual(mockModelInput);
        });

        it('should have no empty ', () => {
            const result = createValueContextPrivate(mockModelContext, mockInput);
            expect(result.input()).toEqual(undefined);
        });

        it('should have no child contexts, primitive contexts, or lookups', () => {
            const result = createValueContextPrivate(mockModelContext, mockInput);
            expect(result.lookups()).toEqual([]);
            expect(result.primitiveContexts()).toEqual([]);
            expect(result.childContexts()).toEqual([]);
        });

        it('should have no errors', () => {
            const result = createValueContextPrivate(mockModelContext, mockInput);
            expect(result.hasErrors()).toEqual(false);
            expect(result.errors()).toEqual([]);
        });
    });

    describe('Given a LinkedModelContext, LookupContexts, and input', () => {
        const mockModelInput = { model: 'foo/bar', name: 'value-1', params: {} };
        const [mockModelContext] = createModelContextMock(mockModelInput);
        const mockLookup = { all: ['Context A'] };

        const mockInput = { foo: 'bar' };

        it('should have the provided LinkedModelContext', () => {
            const result = createValueContextPrivate(mockModelContext, mockInput, mockLookup);
            expect(result.modelContext()).toEqual(mockModelContext);
        });

        it('should have no parent', () => {
            const result = createValueContextPrivate(mockModelContext, mockInput, mockLookup);
            expect(result.parent()).toBeUndefined();
        });

        it('should have the provided lookupContexts', () => {
            const result = createValueContextPrivate(mockModelContext, mockInput, mockLookup);
            expect(result.lookupContexts()).toEqual(mockLookup);
        });

        it('should have the provided input', () => {
            const result = createValueContextPrivate(mockModelContext, mockInput, mockLookup);
            expect(result.input()).toEqual(mockInput);
        });
    });

    describe('When resolve() is called', () => {
        const mockInput = {} as DecisionInput;

        describe('And the resolver returns a decision', () => {
            const mockModelContext = {
                resolve: vi.fn(),
                ref: vi.fn(() => ({ $uuid: 'test-uuid' })),
            } as unknown as LinkedModelContext;
            const mockDecision = {} as DecisionUnknown;
            const resolveMocked = vi.mocked(mockModelContext.resolve);
            resolveMocked.mockReturnValue(mockDecision);
            const mockDecisionRef = { $uuid: 'test-uuid' };
            mockDecision.uuid = () => mockDecisionRef.$uuid;

            it('should call resolver on the LinkedModelContext with the DecisionRef', () => {
                const context = createValueContextPrivate(mockModelContext, mockInput);
                context.resolve(mockDecisionRef);
                expect(resolveMocked).toHaveBeenCalledWith(mockDecisionRef);
            });

            it('should add the successful lookup to the lookups list', () => {
                const context = createValueContextPrivate(mockModelContext, mockInput);
                context.resolve(mockDecisionRef);

                expect(context.lookups()).toContainEqual({
                    ref: mockDecisionRef,
                    context: mockModelContext,
                    decision: mockDecision,
                });
            });

            it("should return the resolution's context and decision", () => {
                const context = createValueContextPrivate(mockModelContext, mockInput);
                const result = context.resolve(mockDecisionRef);
                expect(result).toEqual(mockDecision);
            });
        });
    });

    describe('When addError() is called', () => {
        const [mockModelContext] = createModelContextMock();

        const mockError = {} as ValueError;
        mockError.valueName = 'ValueName';

        it('should return true for hasErrors()', () => {
            const context = createValueContextPrivate(mockModelContext);
            context.addError(mockError);
            expect(context.hasErrors()).toBe(true);
        });

        it('should expose the error in errors()', () => {
            const context = createValueContextPrivate(mockModelContext);
            context.addError(mockError);
            expect(context.errors()).toContain(mockError);
        });
    });

    describe('When forChildValue() is called with an input', () => {
        const [mockModelContext] = createModelContextMock();

        const mockChildInput = 'foo';

        it('should add the child context to the list', () => {
            const result = createValueContextPrivate(mockModelContext);
            const child = result.forChildValue(mockChildInput);
            expect(result.childContexts()).toHaveLength(1);
            expect(result.childContexts()[0]).toBe(child);
        });

        it('should return the child context with the provided input and parent', () => {
            const result = createValueContextPrivate(mockModelContext);
            const child = result.forChildValue(mockChildInput);
            expect(child.input()).toEqual(mockChildInput);
            expect(child.modelContext()).toEqual(mockModelContext);
        });
    });

    describe('When forPrimitive() is called with an input', () => {
        const [mockModelContext] = createModelContextMock();
        const mockPrimitiveInput = 'foo';

        it('should add the primitive context to the list', () => {
            const result = createValueContextPrivate(mockModelContext);
            const primitiveContext = result.forPrimitive(mockPrimitiveInput);
            expect(result.primitiveContexts()).toHaveLength(1);
            expect(result.primitiveContexts()[0]).toBe(primitiveContext);
        });

        it('should return the primitive context with the provided input and parent', () => {
            const result = createValueContextPrivate(mockModelContext);
            const primitiveContext = result.forPrimitive(mockPrimitiveInput);
            expect(primitiveContext.input()).toEqual(mockPrimitiveInput);
            expect(primitiveContext.valueContext()?.modelContext()).toEqual(mockModelContext);
        });
    });

    describe('When forOutputValue() is called with an input', () => {
        const [mockModelContext] = createModelContextMock();
        const mockOutputInput = 'foo';

        it('should return the output context with the provided input and parent', () => {
            const result = createValueContextPrivate(mockModelContext);
            const forOutput = result.forOutputValue(mockOutputInput);
            expect(forOutput.input()).toEqual(mockOutputInput);
            expect(forOutput.parent()?.modelContext()).toEqual(mockModelContext);
        });
    });

    describe('When a child context has errors', () => {
        const [mockModelContext] = createModelContextMock();
        const mockChildInput = { model: 'baz/qux', name: 'value-2', params: {} };

        const mockError = {} as ValueError;
        mockError.valueName = 'ValueName';

        it('should return true for hasErrors()', () => {
            const result = createValueContextPrivate(mockModelContext);
            const child = result.forChildValue(mockChildInput);
            child.addError(mockError);
            expect(result.hasErrors()).toBe(true);
        });

        it('should expose the error in errors()', () => {
            const result = createValueContextPrivate(mockModelContext);
            const child = result.forChildValue(mockChildInput);
            child.addError(mockError);
            expect(result.errors()).toContain(mockError);
        });
    });

    describe('When a primitive context has errors', () => {
        const [mockModelContext] = createModelContextMock();
        const mockPrimitiveInpui = { model: 'baz/qux', name: 'value-2', params: {} };

        const mockError = {} as PrimitiveError;
        mockError.primitiveName = 'PrimitiveName';

        it('should return true for hasErrors()', () => {
            const result = createValueContextPrivate(mockModelContext);
            const primitive = result.forPrimitive(mockPrimitiveInpui);
            primitive.addError(mockError);
            expect(result.hasErrors()).toBe(true);
        });

        it('should not expose the error in errors()', () => {
            const result = createValueContextPrivate(mockModelContext);
            const primitive = result.forPrimitive(mockPrimitiveInpui);
            primitive.addError(mockError);
            expect(result.errors()).toContain(mockError);
        });
    });

    describe('When an output context has errors', () => {
        const [mockModelContext] = createModelContextMock();
        const mockOutputInput = { model: 'baz/qux', name: 'value-2', params: {} };

        const mockError = {} as ValueError;
        mockError.valueName = 'ValueName';

        it('should return true for hasErrors()', () => {
            const result = createValueContextPrivate(mockModelContext);
            const output = result.forOutputValue(mockOutputInput);
            output.addError(mockError);
            expect(result.hasErrors()).toBe(false);
        });

        it('should not expose the error in errors()', () => {
            const result = createValueContextPrivate(mockModelContext);
            const output = result.forOutputValue(mockOutputInput);
            output.addError(mockError);
            expect(result.errors()).not.toContain(mockError);
        });
    });
});
